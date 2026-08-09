(() => {
  'use strict';

  const USB_FILTERS = Object.freeze([{ usbVendorId: 0x0483, usbProductId: 0x5740 }]);
  const BAUD_RATE = 115200;
  const MAX_LINE_LENGTH = 4096;

  class ZYAWebSerialController extends EventTarget {
    constructor() {
      super();
      this.port = null;
      this.reader = null;
      this.readTask = null;
      this.decoder = new TextDecoder();
      this.buffer = '';
      this.closing = false;
      this.state = 'idle';
      this.lastError = '';
      this.writeChain = Promise.resolve();
      this.handleNativeDisconnect = event => {
        if (event.port === this.port || event.target === this.port) {
          this.emitLog('system', '设备已从电脑断开');
          this.finishDisconnected();
        }
      };
      navigator.serial?.addEventListener('disconnect', this.handleNativeDisconnect);
    }

    get supported() {
      return Boolean(window.isSecureContext && navigator.serial);
    }

    get capability() {
      if (!window.isSecureContext) return { ok: false, reason: '需要通过 HTTPS 或本机 localhost/127.0.0.1 访问' };
      if (!navigator.serial) return { ok: false, reason: '当前浏览器不支持 Web Serial，请使用最新版 Chrome 或 Edge 桌面版' };
      return { ok: true, reason: '' };
    }

    get connected() {
      return this.state === 'connected' && Boolean(this.port?.readable && this.port?.writable);
    }

    describePort(port = this.port) {
      if (!port) return { usbVendorId: null, usbProductId: null, label: '未连接' };
      const info = port.getInfo?.() || {};
      const hex = value => Number.isInteger(value) ? `0x${value.toString(16).toUpperCase().padStart(4, '0')}` : '未知';
      return {
        usbVendorId: info.usbVendorId ?? null,
        usbProductId: info.usbProductId ?? null,
        label: `VID ${hex(info.usbVendorId)} · PID ${hex(info.usbProductId)}`
      };
    }

    emitStatus(state, message, extra = {}) {
      this.state = state;
      this.dispatchEvent(new CustomEvent('status', { detail: { state, message, connected: this.connected, port: this.describePort(), ...extra } }));
    }

    emitLog(direction, text) {
      const value = String(text ?? '').trimEnd();
      if (!value) return;
      this.dispatchEvent(new CustomEvent('log', { detail: { direction, text: value, time: new Date().toLocaleTimeString('zh-CN', { hour12: false }) } }));
    }

    ensureAvailable() {
      const capability = this.capability;
      if (!capability.ok) throw new Error(capability.reason);
    }

    async listAuthorized() {
      this.ensureAvailable();
      const ports = await navigator.serial.getPorts();
      this.dispatchEvent(new CustomEvent('ports', { detail: { ports: ports.map(port => this.describePort(port)), count: ports.length } }));
      return ports;
    }

    async requestAndConnect() {
      this.ensureAvailable();
      this.emitStatus('selecting', '请在浏览器窗口中选择 ZYC100 串口');
      let port;
      try {
        port = await navigator.serial.requestPort({ filters: USB_FILTERS });
      } catch (error) {
        if (error?.name === 'NotFoundError') {
          this.emitStatus('idle', '已取消选择串口');
          return false;
        }
        throw error;
      }
      await this.open(port);
      return true;
    }

    async connectAuthorized() {
      const ports = await this.listAuthorized();
      if (!ports.length) throw new Error('没有已授权的串口，请先点击“选择并连接设备”');
      const preferred = ports.find(port => {
        const info = port.getInfo?.() || {};
        return info.usbVendorId === USB_FILTERS[0].usbVendorId && info.usbProductId === USB_FILTERS[0].usbProductId;
      }) || ports[0];
      await this.open(preferred);
      return true;
    }

    async open(port) {
      this.ensureAvailable();
      if (!port) throw new Error('没有可连接的串口');
      if (this.connected && this.port === port) return;
      if (this.port) await this.disconnect();
      this.port = port;
      this.closing = false;
      this.lastError = '';
      this.emitStatus('connecting', '正在以 115200 波特率连接…');
      try {
        await port.open({ baudRate: BAUD_RATE, dataBits: 8, stopBits: 1, parity: 'none', flowControl: 'none', bufferSize: 65536 });
        this.emitStatus('connected', `设备已连接 · ${this.describePort(port).label}`, { baudRate: BAUD_RATE });
        this.emitLog('system', `串口已打开，波特率 ${BAUD_RATE}`);
        this.readTask = this.readLoop(port);
        await this.send('at+Connect?');
      } catch (error) {
        this.lastError = error?.message || String(error);
        this.emitLog('error', `连接失败：${this.lastError}`);
        await this.disconnect().catch(() => {});
        this.emitStatus('error', `连接失败：${this.lastError}`);
        throw error;
      }
    }

    normaliseCommand(command) {
      const value = String(command ?? '').trim();
      if (!value) throw new Error('请输入 AT 指令');
      if (value.length > 256) throw new Error('AT 指令过长');
      if (/[\r\n]/.test(value)) throw new Error('每次只能发送一条 AT 指令');
      if (!/^at\+/i.test(value)) throw new Error('为保护设备，网页端只允许发送以 at+ 开头的指令');
      return value;
    }

    send(command) {
      const value = this.normaliseCommand(command);
      const operation = async () => {
        if (!this.connected) throw new Error('请先连接串口设备');
        const writer = this.port.writable.getWriter();
        try {
          this.emitLog('tx', value);
          await writer.write(new TextEncoder().encode(`${value}\r\n`));
        } finally {
          writer.releaseLock();
        }
      };
      const pending = this.writeChain.then(operation, operation);
      this.writeChain = pending.catch(() => {});
      return pending;
    }

    consumeChunk(chunk) {
      this.buffer += this.decoder.decode(chunk, { stream: true });
      if (this.buffer.length > MAX_LINE_LENGTH * 4) {
        this.emitLog('rx', this.buffer.slice(0, MAX_LINE_LENGTH));
        this.buffer = this.buffer.slice(MAX_LINE_LENGTH);
      }
      const lines = this.buffer.split(/\r\n|[\r\n]/);
      this.buffer = lines.pop() || '';
      lines.forEach(line => this.emitLog('rx', line));
    }

    async readLoop(port) {
      try {
        while (port.readable && this.port === port && !this.closing) {
          this.reader = port.readable.getReader();
          try {
            while (!this.closing) {
              const { value, done } = await this.reader.read();
              if (done) break;
              if (value) this.consumeChunk(value);
            }
          } finally {
            this.reader.releaseLock();
            this.reader = null;
          }
        }
      } catch (error) {
        if (!this.closing) {
          this.lastError = error?.message || String(error);
          this.emitLog('error', `读取失败：${this.lastError}`);
          this.emitStatus('error', `串口读取异常：${this.lastError}`);
        }
      }
    }

    finishDisconnected() {
      this.reader = null;
      this.readTask = null;
      this.port = null;
      this.buffer = '';
      this.closing = false;
      this.emitStatus('idle', '设备未连接');
    }

    async disconnect() {
      const port = this.port;
      if (!port) {
        this.finishDisconnected();
        return;
      }
      this.closing = true;
      this.emitStatus('disconnecting', '正在安全断开串口…');
      try {
        if (this.reader) await this.reader.cancel().catch(() => {});
        if (this.readTask) await this.readTask.catch(() => {});
        if (port.readable || port.writable) await port.close();
        this.emitLog('system', '串口已安全断开');
      } finally {
        if (this.port === port) this.finishDisconnected();
      }
    }

    dispose() {
      navigator.serial?.removeEventListener('disconnect', this.handleNativeDisconnect);
    }
  }

  window.ZYAWebSerialController = ZYAWebSerialController;
  window.zyaWebSerial = new ZYAWebSerialController();
  window.ZYA_WEB_SERIAL = Object.freeze({ filters: USB_FILTERS, baudRate: BAUD_RATE });
})();
