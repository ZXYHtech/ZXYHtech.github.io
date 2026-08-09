(()=>{
  'use strict';
  const $=(selector,root=document)=>root.querySelector(selector),$$=(selector,root=document)=>[...root.querySelectorAll(selector)];
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  const quantize=value=>(Math.round(clamp(Number(value)||0,0,31.75)*4)/4).toFixed(2);
  const storeKey='zya1000.web-console.v1';
  const consoleParams=new URLSearchParams(location.search),compactMode=consoleParams.get('embed')==='compact';
  document.body.classList.toggle('compact-console',compactMode);
  const state={devices:[],activeId:null,view:'device',sync:false,automationStop:false,timeline:[],compensation:{type:'csv',points:[]},cardOrder:[]};
  const attenuationQueue={timer:null,pending:null,inFlight:false};
  const multiRealtimeTimers=new Map();
  const multiDraggingIds=new Set();
  let mainAttenuationDragging=false;
  let toastTimer;

  function toast(message){const node=$('#toast');node.textContent=message;node.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove('show'),2600)}
  function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
  function now(){return new Date().toLocaleTimeString('zh-CN',{hour12:false})}
  function activeDevice(){return state.devices.find(device=>device.id===state.activeId)||null}
  function connectedDevices(){return state.devices.filter(device=>device.controller.connected)}
  function deviceLabel(index){return index?`ZYC100-${index+1}`:'ZYC100'}
  function persist(){const names={...(state.savedNames||{}),...Object.fromEntries(state.devices.filter(device=>device.portKey).map(device=>[device.portKey,device.name]))};state.savedNames=names;localStorage.setItem(storeKey,JSON.stringify({timeline:state.timeline,compensation:state.compensation,cardOrder:state.cardOrder,names}))}
  function restore(){try{const data=JSON.parse(localStorage.getItem(storeKey)||'{}');state.timeline=Array.isArray(data.timeline)?data.timeline:[];if(data.compensation)state.compensation=data.compensation;state.cardOrder=Array.isArray(data.cardOrder)?data.cardOrder:[];state.savedNames=data.names||{}}catch{state.timeline=[];state.cardOrder=[];state.savedNames={}}if(!state.timeline.length)state.timeline=[{delay:0,command:'at+Connect?',note:'确认设备在线'},{delay:250,command:'at+GetAttenuationVal?',note:'读取当前衰减'},{delay:250,command:'at+GetBattery?',note:'读取电池状态'}]}

  async function requestDevice(){
    if(!window.ZYAWebSerialController){toast('串口模块未加载');return}
    const controller=new window.ZYAWebSerialController();
    const device={id:`web-${Date.now()}-${Math.random().toString(16).slice(2)}`,name:deviceLabel(state.devices.length),controller,logs:[],attenuation:null,tru:false,frequency:1,rfPath:0,output:false,battery:null,firmware:'--',hardware:'--',serial:'--',connectedAt:Date.now(),portKey:''};
    controller.addEventListener('log',event=>handleSerialLog(device,event.detail));
    controller.addEventListener('status',event=>handleSerialStatus(device,event.detail));
    try{
      const connected=await controller.requestAndConnect();
      if(!connected){controller.dispose?.();return}
      const info=controller.describePort();device.portKey=`${info.usbVendorId||0}:${info.usbProductId||0}:${state.devices.length}`;device.name=state.savedNames?.[device.portKey]||device.name;
      state.devices.push(device);state.activeId=device.id;switchView('device');renderAll();await wait(180);await refreshDevice(device);toast(`${device.name} 已连接`);
    }catch(error){toast(error.message||'连接失败')}
  }

  function handleSerialStatus(device,detail){if(detail.state==='idle'&&!device.controller.connected&&state.devices.includes(device)){device.disconnected=true}if(detail.state==='connected')device.disconnected=false;renderSidebar();renderWorkspaceState();renderMulti()}
  function handleSerialLog(device,detail){
    const direction=String(detail.direction||'').toLowerCase(),entry={time:detail.time||now(),direction,text:detail.text};device.logs.push(entry);if(device.logs.length>1000)device.logs.shift();
    if(direction==='rx'||direction==='receive')parseResponse(device,detail.text);
    if(device.id===state.activeId)appendMainLog(entry);
  }
  function parseResponse(device,text){
    const value=String(text);
    let match=value.match(/(?:\+ATTENUATION\s*:|(?:at\+)?(?:Get|Set)AttenuationVal\s*(?:=|:)\s*[`'"]?\s*)(-?\d+(?:\.\d+)?)/i),attenuationUpdated=false;if(match){device.attenuation=clamp(Math.abs(Number(match[1])),0,31.75);attenuationUpdated=true}
    match=value.match(/(?:BATTERY|GetBattery(?:=|:))[^\d]*(\d{1,3})[^\d]+(\d+(?:\.\d+)?)(?:[^\d]+(\d+(?:\.\d+)?))?/i);if(match)device.battery={percent:clamp(Number(match[1]),0,100),voltage:Number(match[2]),current:match[3]?Number(match[3]):0,charging:/charg|充电|,1(?:\D|$)/i.test(value)};
    match=value.match(/SW:PATH(?:=|:)(\d)/i);if(match)device.rfPath=Number(match[1]);
    match=value.match(/SW:EN(?:=|:)(\d)/i);if(match)device.output=match[1]==='1';
    match=value.match(/(?:serial|sn)(?:=|:)[`'\s]*([\w-]{5,})/i);if(match)device.serial=match[1];
    match=value.match(/\+CONNECT\s*:\s*[^,]+\s*,\s*([^,]+)\s*,\s*(?:SN\s*:)?\s*([\w-]+)/i);if(match){device.firmware=match[1];device.serial=match[2]}
    match=value.match(/(?:\+?(?:firmware|software)(?:=|:)|\bsw(?:=|:))[`'\s]*([\w.-]+)/i);if(match)device.firmware=match[1];
    match=value.match(/(?:hardware|hw)(?:=|:)[`'\s]*([\w.-]+)/i);if(match)device.hardware=match[1];
    if(attenuationUpdated){
      if(device.id===state.activeId){clearTimeout(attenuationQueue.timer);attenuationQueue.pending=null;mainAttenuationDragging=false;renderDeviceData()}
      if(state.view==='multi'){if(multiDraggingIds.has(device.id))updateMultiCard(device,false);else renderMulti()}
    }else{
      if(device.id===state.activeId&&!mainAttenuationDragging)renderDeviceData();
      if(state.view==='multi'&&!multiDraggingIds.has(device.id))renderMulti();
    }
    renderSidebar();
  }

  async function refreshDevice(device=activeDevice()){
    if(!device?.controller.connected)return;
    for(const command of ['at+GetAttenuationVal?','at+GetBattery?','at+SW:PATH?','at+SW:EN?','at+Connect?']){await device.controller.send(command);await wait(160)}
  }
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  function targetDevices(){return state.sync?connectedDevices():[activeDevice()].filter(Boolean)}
  async function send(command,devices=targetDevices()){
    if(!devices.length){toast('请先连接设备');return false}
    const results=await Promise.allSettled(devices.map(device=>device.controller.send(command)));
    const failed=results.filter(result=>result.status==='rejected');if(failed.length){toast(`${failed.length} 台设备发送失败`);return false}return true;
  }
  async function setAttenuation(value,source='control'){
    const target=quantize(value),targets=targetDevices();
    if(!targets.length){toast('请先连接设备');return}
    const previous=new Map(targets.map(device=>[device.id,device.attenuation]));targets.forEach(device=>device.attenuation=Number(target));if(!mainAttenuationDragging)renderDeviceData();if(state.view==='multi'&&!multiDraggingIds.size)renderMulti();
    const results=await Promise.allSettled(targets.map(device=>{const comp=device.tru?getCompensation(device.frequency||1):0;return device.controller.send(device.tru?`at+SetTrueAttenuationVal=${target},${quantize(Number(target)+comp)}`:`at+SetAttenuationVal=\`${target}\``)}));
    if(results.some(result=>result.status==='rejected')){targets.forEach(device=>device.attenuation=previous.get(device.id));renderDeviceData();if(state.view==='multi')renderMulti();toast('部分设备衰减下发失败');return}
    if(!['slider','realtime'].includes(source))toast(`设备衰减已设置为 ${target} dB`)
  }
  function displayAttenuation(device=activeDevice()){if(!device||!Number.isFinite(device.attenuation))return null;const comp=device.tru?getCompensation(device.frequency||1):0;return clamp(device.attenuation+comp,0,63.5)}
  function setDisplayedAttenuation(value,source='control'){const device=activeDevice(),comp=device?.tru?getCompensation(device.frequency||1):0;return setAttenuation(Number(value)-comp,source)}
  function attenuationStep(){return clamp(Math.round((Number($('#attenuation-step').value)||.25)*4)/4,.25,31.75)}
  function renderAttenuationStep(normalise=false){const step=attenuationStep(),label=step.toFixed(2);if(normalise)$('#attenuation-step').value=label;$('#attenuation-down').textContent=`− ${label}`;$('#attenuation-up').textContent=`＋ ${label}`}
  function scheduleRealtimeAttenuation(value){
    const target=Number(quantize(value));attenuationQueue.pending=target;
    const device=activeDevice();if(device)device.attenuation=target;
    const shown=displayAttenuation(device);$('#attenuation-value').value=shown===null?'':shown.toFixed(2);clearTimeout(attenuationQueue.timer);
    attenuationQueue.timer=setTimeout(flushRealtimeAttenuation,16);
  }
  async function flushRealtimeAttenuation(){
    if(attenuationQueue.inFlight||attenuationQueue.pending===null)return;
    const target=attenuationQueue.pending;attenuationQueue.pending=null;attenuationQueue.inFlight=true;
    try{await setAttenuation(target,'realtime')}finally{attenuationQueue.inFlight=false;if(attenuationQueue.pending!==null){clearTimeout(attenuationQueue.timer);attenuationQueue.timer=setTimeout(flushRealtimeAttenuation,0)}}
  }
  async function setRF(path){if(await send(`at+SW:PATH=${path}`)){targetDevices().forEach(device=>device.rfPath=path);renderDeviceData();renderMulti()}}
  async function setOutput(enabled){if(await send(`at+SW:EN=${enabled?1:0}`)){targetDevices().forEach(device=>device.output=enabled);renderDeviceData();renderMulti()}}
  function interpolate(points,frequency){if(!points?.length)return 0;const sorted=[...points].sort((a,b)=>a[0]-b[0]);if(frequency<=sorted[0][0])return sorted[0][1];if(frequency>=sorted.at(-1)[0])return sorted.at(-1)[1];const upperIndex=sorted.findIndex(point=>point[0]>=frequency),lower=sorted[upperIndex-1],upper=sorted[upperIndex],ratio=(frequency-lower[0])/(upper[0]-lower[0]);return lower[1]+(upper[1]-lower[1])*ratio}
  function evaluateFormula(formula,frequency){let expression=String(formula||'').replace(/^.*?=/,'').replace(/\^/g,'**').trim();if(!/^[\d\s.fFeE+*/()\-]+$/.test(expression))throw new Error('公式只能包含数字、f 和基本运算符');const result=Function('f',`"use strict";return (${expression})`)(frequency);if(!Number.isFinite(result))throw new Error('公式计算结果无效');return Math.abs(result)}
  function getCompensation(frequency){const c=state.compensation;if(c.type==='formula')return evaluateFormula(c.formula,frequency);if((c.type==='csv'||c.type==='s2p')&&c.points?.length)return interpolate(c.points,frequency);return 0}

  function renderAll(){renderSidebar();renderWorkspaceState();renderDeviceData();renderMulti();renderAutomationDevices();renderTimeline()}
  function applyCardOrder(){const grid=$('.control-grid');if(!grid)return;const cards=new Map($$('.control-card',grid).map(card=>[card.dataset.cardId,card]));state.cardOrder.forEach(id=>{if(cards.has(id))grid.append(cards.get(id))});$$('.control-card',grid).forEach(card=>{if(!state.cardOrder.includes(card.dataset.cardId))state.cardOrder.push(card.dataset.cardId)})}
  function bindCardDragging(){const grid=$('.control-grid');$$('.control-card',grid).forEach(card=>{const header=$(':scope > header',card);header.title='按住标题栏拖动卡片';header.onpointerdown=()=>card.draggable=true;header.onpointerup=()=>card.draggable=false;card.ondragstart=event=>{event.dataTransfer.setData('text/zya-card',card.dataset.cardId);card.classList.add('dragging')};card.ondragend=()=>{card.draggable=false;card.classList.remove('dragging')};card.ondragover=event=>event.preventDefault();card.ondrop=event=>{event.preventDefault();const sourceId=event.dataTransfer.getData('text/zya-card');if(!sourceId||sourceId===card.dataset.cardId)return;const source=$(`[data-card-id="${sourceId}"]`,grid);grid.insertBefore(source,card);state.cardOrder=$$('.control-card',grid).map(item=>item.dataset.cardId);persist()}})}
  function renderSidebar(){
    const list=$('#device-list');if(!state.devices.length)list.innerHTML='<div class="empty-device">尚未连接设备</div>';else list.innerHTML=state.devices.map(device=>`<div draggable="true" class="device-item ${device.id===state.activeId?'active':''}" data-device-id="${device.id}" title="拖动排序；右键重命名"><button class="device-select" type="button"><i class="device-dot" style="background:${device.controller.connected?'var(--green)':'#aeb3bc'}"></i><span><b>${escapeHtml(device.name)}</b><small>${escapeHtml(device.serial==='--'?device.controller.describePort().label:device.serial)} · ${device.controller.connected?'已连接':'已断开'}</small></span></button>${device.controller.connected?'':`<button class="device-delete" type="button" title="删除 ${escapeHtml(device.name)}" aria-label="删除 ${escapeHtml(device.name)}">×</button>`}</div>`).join('');
    $$('.device-item',list).forEach(item=>{const select=$('.device-select',item);select.onclick=()=>{state.activeId=item.dataset.deviceId;switchView('device');renderAll()};item.oncontextmenu=event=>{event.preventDefault();state.activeId=item.dataset.deviceId;renameActive()};$('.device-delete',item)?.addEventListener('click',event=>{event.stopPropagation();removeDevice(item.dataset.deviceId)});item.ondragstart=event=>{event.dataTransfer.setData('text/zya-device',item.dataset.deviceId);item.classList.add('dragging')};item.ondragend=()=>item.classList.remove('dragging');item.ondragover=event=>event.preventDefault();item.ondrop=event=>{event.preventDefault();const sourceId=event.dataTransfer.getData('text/zya-device'),targetId=item.dataset.deviceId;if(!sourceId||sourceId===targetId)return;const sourceIndex=state.devices.findIndex(device=>device.id===sourceId),targetIndex=state.devices.findIndex(device=>device.id===targetId),[moved]=state.devices.splice(sourceIndex,1);state.devices.splice(targetIndex,0,moved);renderSidebar();renderMulti();persist()}});
    $('#device-summary').textContent=`USB ${connectedDevices().length} 台 · 115200 Baud`;
  }
  function renderWorkspaceState(){const device=activeDevice(),has=Boolean(device);$('#workspace-empty').hidden=has;$('#device-workspace').hidden=!has;if(!has)return;$('#disconnect-device').textContent=device.controller.connected?'断开连接':'移除设备';$$('#device-workspace button,#device-workspace input').forEach(control=>{if(!['rename-device','disconnect-device'].includes(control.id))control.disabled=!device.controller.connected})}
  function renderDeviceData(){
    const device=activeDevice();if(!device)return;
    $('#active-device-name').textContent=device.name;$('#active-device-meta').textContent=`${device.serial} · ${device.controller.connected?'已连接':'已断开'} · USB · ${device.controller.describePort().label}`;
    const hasAttenuation=Number.isFinite(device.attenuation),shown=displayAttenuation(device);$('#attenuation-value').value=shown===null?'':shown.toFixed(2);$('#attenuation-slider').disabled=!device.controller.connected||!hasAttenuation;if(hasAttenuation)$('#attenuation-slider').value=device.attenuation;$('#mode-toggle').classList.toggle('tru',device.tru);$('#mode-toggle').textContent=device.tru?'TRU':'REL';$('#frequency-input').value=device.frequency||1;
    $('#info-firmware').textContent=device.firmware;$('#info-hardware').textContent=device.hardware;$('#info-serial').textContent=device.serial;$('#info-port').textContent=device.controller.describePort().label;
    const battery=device.battery;$('#battery-percent').textContent=battery?`${battery.percent}%`:'--%';$('#battery-charge').textContent=battery?(battery.charging?'Charging':'Battery'):'等待查询';$('#battery-bar').style.width=battery?`${battery.percent}%`:'0';$('#battery-voltage').textContent=battery?`${battery.voltage.toFixed(2)} V`:'-- V';$('#battery-current').textContent=battery?`${battery.current.toFixed(1)} mA`:'-- mA';
    $('#output-enable').dataset.enabled=String(device.output);$('#output-enable').textContent=device.output?'开':'关';$('#output-state').textContent=device.output?'已开启':'已关闭';$('#rf1').classList.toggle('active',device.rfPath===1);$('#rf2').classList.toggle('active',device.rfPath===2);
    let comp=0;try{comp=getCompensation(device.frequency||1)}catch(error){$('#compensation-state').textContent=`补偿公式错误：${error.message}`;return}$('#compensation-state').textContent=device.tru?`TRU 显示 ${shown?.toFixed(2)??'--'} dB = 设备 ${hasAttenuation?Number(device.attenuation).toFixed(2):'--'} dB + 插损 ${comp.toFixed(2)} dB`:'当前为相对衰减，未应用插入损耗补偿。';
    renderMainLog();
  }
  function formatMultiFrequency(frequency){const value=Number(frequency)||1;if(value<1)return `${Math.round(value*1000)}MHz`;return `${Number(value.toFixed(3))}GHz`}
  function renderMainLog(){const device=activeDevice(),output=$('#console-log');if(!device||!device.logs.length){output.innerHTML='<span class="sys"><time>--:--:--</time><i>SYS</i><code>等待设备通信</code></span>';return}const limit=Number($('#log-limit').value)||300;output.innerHTML=device.logs.slice(-limit).map(entry=>`<span class="${entry.direction}"><time>${escapeHtml(entry.time)}</time><i>${({tx:'TX',rx:'RX',error:'ERR',system:'SYS'})[entry.direction]||'SYS'}</i><code>${escapeHtml(entry.text)}</code></span>`).join('');output.scrollTop=output.scrollHeight}
  function appendMainLog(entry){const output=$('#console-log');if(!output)return;renderMainLog()}

  function renderMulti(){
    const devices=state.devices;$('#multi-summary').textContent=`${connectedDevices().length} 台在线 · 共 ${devices.length} 台设备`;
    const grid=$('#multi-grid');if(!devices.length){grid.innerHTML='<div class="view-empty"><b>尚无在线设备</b><span>从左侧连接一个或多个 ZYC100 后，可在这里统一控制。</span></div>';return}
    grid.innerHTML=devices.map(device=>{const has=Number.isFinite(device.attenuation),shown=displayAttenuation(device),serial=device.serial==='--'?device.controller.describePort().label:device.serial;return `<article class="multi-card" data-multi-id="${device.id}"><header><div><b>${escapeHtml(device.name)}</b><small>${escapeHtml(serial)} · USB · ${device.controller.connected?'已连接':'已断开'}</small></div><button type="button" class="mode-tag ${device.tru?'tru':''}" data-mode>${device.tru?'TRU':'REL'}</button></header><div class="multi-value"><strong>${has?`−${shown.toFixed(2)}`:'--'}</strong><span>dB</span><span class="multi-frequency">@ <b>${formatMultiFrequency(device.frequency)}</b></span></div><input type="range" min="0" max="31.75" step="0.25" value="${has?device.attenuation:0}" ${device.controller.connected&&has?'':'disabled'} aria-label="${escapeHtml(device.name)} 衰减值"><footer><button data-rf="1" class="${device.rfPath===1?'active':''}">RF1</button><button data-rf="2" class="${device.rfPath===2?'active':''}">RF2</button><button data-output class="${device.output?'active':''}">输出</button></footer></article>`}).join('');
    $$('.multi-card',grid).forEach(card=>{const device=state.devices.find(item=>item.id===card.dataset.multiId),slider=$('input[type="range"]',card),finish=event=>{if(event?.pointerId!==undefined&&slider.hasPointerCapture?.(event.pointerId))slider.releasePointerCapture(event.pointerId);finishMultiAttenuation(device)};slider.onpointerdown=event=>{multiDraggingIds.add(device.id);slider.setPointerCapture?.(event.pointerId)};slider.oninput=()=>scheduleMultiAttenuation(device,slider.value,card);slider.onchange=()=>finishMultiAttenuation(device);slider.onpointerup=finish;slider.onpointercancel=finish;$('[data-mode]',card).onclick=()=>toggleMultiMode(device);$$('[data-rf]',card).forEach(button=>button.onclick=()=>setMultiRF(device,Number(button.dataset.rf)));$('[data-output]',card).onclick=()=>setMultiOutput(device,!device.output)});
  }
  function multiTargets(device){return state.sync?connectedDevices():[device].filter(item=>item?.controller.connected)}
  function updateMultiCard(device,updateSlider=true){const card=$(`.multi-card[data-multi-id="${device.id}"]`),shown=displayAttenuation(device);if(!card||shown===null)return;$('strong',card).textContent=`−${shown.toFixed(2)}`;const slider=$('input[type="range"]',card);if(updateSlider&&slider)slider.value=device.attenuation}
  function scheduleMultiAttenuation(device,value){const target=Number(quantize(value));multiTargets(device).forEach(targetDevice=>{targetDevice.attenuation=target;updateMultiCard(targetDevice);let queue=multiRealtimeTimers.get(targetDevice.id);if(!queue){queue={pending:null,inFlight:false,timer:null};multiRealtimeTimers.set(targetDevice.id,queue)}queue.pending=target;clearTimeout(queue.timer);queue.timer=setTimeout(()=>flushMultiAttenuation(targetDevice),16)})}
  async function flushMultiAttenuation(device){const queue=multiRealtimeTimers.get(device.id);if(!queue||queue.inFlight||queue.pending===null)return;const target=queue.pending;queue.pending=null;queue.inFlight=true;try{await sendToOneAttenuation(device,target)}finally{queue.inFlight=false;if(queue.pending!==null)queue.timer=setTimeout(()=>flushMultiAttenuation(device),0)}}
  function finishMultiAttenuation(device){multiDraggingIds.delete(device.id);flushMultiAttenuation(device)}
  function toggleMultiMode(device){state.activeId=device.id;if(!hasCompensation())return $('#compensation-dialog').showModal();const enabled=!device.tru;multiTargets(device).forEach(target=>target.tru=enabled);renderMulti()}
  async function setMultiRF(device,path){const targets=multiTargets(device);if(await send(`at+SW:PATH=${path}`,targets)){targets.forEach(target=>target.rfPath=path);renderMulti()}}
  async function setMultiOutput(device,enabled){const targets=multiTargets(device);if(await send(`at+SW:EN=${enabled?1:0}`,targets)){targets.forEach(target=>target.output=enabled);renderMulti()}}
  async function sendToOne(device,command,update){if(!device?.controller.connected)return toast('设备已断开');try{await device.controller.send(command);update?.();renderAll()}catch(error){toast(error.message)}}
  async function sendToOneAttenuation(device,value){if(!device?.controller.connected)return;const target=quantize(value),comp=device.tru?getCompensation(device.frequency||1):0,command=device.tru?`at+SetTrueAttenuationVal=${target},${quantize(Number(target)+comp)}`:`at+SetAttenuationVal=\`${target}\``;await device.controller.send(command)}

  function renderAutomationDevices(){const select=$('#automation-device'),current=select.value;select.innerHTML='<option value="active">当前设备</option><option value="all">全部在线设备</option>'+state.devices.map(device=>`<option value="${device.id}">${escapeHtml(device.name)}</option>`).join('');if([...select.options].some(option=>option.value===current))select.value=current}
  function renderTimeline(){const rows=$('#timeline-rows');rows.innerHTML=state.timeline.map((row,index)=>`<div class="timeline-row" data-index="${index}"><span>${index+1}</span><input type="number" min="0" max="600000" step="10" value="${Number(row.delay)||0}" data-field="delay"><input value="${escapeHtml(row.command)}" data-field="command"><input value="${escapeHtml(row.note||'')}" data-field="note"><button data-delete>删除</button></div>`).join('');$$('.timeline-row',rows).forEach(row=>{$$('[data-field]',row).forEach(input=>input.onchange=()=>{const field=input.dataset.field;state.timeline[Number(row.dataset.index)][field]=field==='delay'?Number(input.value):input.value;persist()});$('[data-delete]',row).onclick=()=>{state.timeline.splice(Number(row.dataset.index),1);renderTimeline();persist()}})}
  function automationTargets(){const value=$('#automation-device').value;if(value==='all')return connectedDevices();if(value==='active')return [activeDevice()].filter(device=>device?.controller.connected);return state.devices.filter(device=>device.id===value&&device.controller.connected)}
  function automationLog(message,type=''){const output=$('#automation-log'),row=document.createElement('span');row.className=type;row.textContent=`${now()}  ${message}`;output.append(row);output.scrollTop=output.scrollHeight}
  function matchesAutomationResponse(command,text){const value=String(text).trim(),lower=command.toLowerCase();if(value.toLowerCase()===lower)return false;if(lower.includes('getattenuation'))return /\+ATTENUATION\s*:|GetAttenuationVal\s*=/i.test(value);if(lower.includes('getbattery'))return /\+BATTERY\s*:|GetBattery\s*=/i.test(value);if(lower.includes('sw:path?'))return /SW:PATH\s*(?:=|:)\s*\d/i.test(value);if(lower.includes('sw:en?'))return /SW:EN\s*(?:=|:)\s*\d/i.test(value);if(lower.includes('connect?'))return /ZYC100|\+?CONNECT\s*(?:=|:)|\bsw\d|\bSN\s*:/i.test(value);return /\bok\b|SetAttenuationVal\s*=|SetTrueAttenuationVal\s*=|SW:(?:PATH|EN)\s*=/i.test(value)}
  function sendAndWait(device,command,timeout=1600){return new Promise((resolve,reject)=>{let timer;const cleanup=()=>{clearTimeout(timer);device.controller.removeEventListener('log',onLog)};const onLog=event=>{const detail=event.detail;if(detail.direction==='rx'&&matchesAutomationResponse(command,detail.text)){cleanup();resolve(String(detail.text).trim())}if(detail.direction==='error'){cleanup();reject(new Error(detail.text))}};device.controller.addEventListener('log',onLog);timer=setTimeout(()=>{cleanup();reject(new Error(`${device.name} 等待设备回包超时`))},timeout);device.controller.send(command).catch(error=>{cleanup();reject(error)})})}
  async function runAutomationCommand(command,devices=automationTargets()){if(!devices.length)throw new Error('没有在线的 Web Serial 设备');const responses=await Promise.all(devices.map(async device=>({device,response:await sendAndWait(device,command)})));responses.forEach(({device,response})=>automationLog(`${device.name} RX：${response}`,'ok'));return responses}
  async function runTimeline(){const devices=automationTargets();if(!devices.length)return toast('没有可执行任务的在线设备');state.automationStop=false;$('#automation-run').disabled=true;$('#automation-stop').disabled=false;automationLog(`开始执行，共 ${state.timeline.length} 个步骤，直连 ${devices.length} 台 Web Serial 设备`);for(let index=0;index<state.timeline.length;index++){if(state.automationStop){automationLog('任务已由用户停止','bad');break}const row=state.timeline[index],node=$(`.timeline-row[data-index="${index}"]`);node?.classList.add('running');if(row.delay)await wait(Number(row.delay));try{await runAutomationCommand(row.command,devices);automationLog(`步骤 ${index+1} 已确认：${row.command}`,'ok')}catch(error){automationLog(`步骤 ${index+1} 失败：${error.message}`,'bad');node?.classList.remove('running');break}node?.classList.remove('running')}$('#automation-run').disabled=false;$('#automation-stop').disabled=true;if(!state.automationStop)automationLog('时间线执行完成','ok')}

  function switchView(view){state.view=view;$$('[data-console-view]').forEach(section=>{const active=section.dataset.consoleView===view;section.classList.toggle('active',active);section.hidden=!active});$$('[data-view]').forEach(button=>{const active=button.dataset.view===view;button.classList.toggle('active',active);button.setAttribute('aria-current',active?'page':'false')});$('.app-sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'instant'});if(view==='multi')renderMulti();if(view==='automation'){renderAutomationDevices();renderTimeline()}}
  async function disconnectActive(){const device=activeDevice();if(!device)return;if(device.controller.connected)await device.controller.disconnect();else{state.devices=state.devices.filter(item=>item!==device);state.activeId=state.devices[0]?.id||null}renderAll()}
  function removeDevice(id){const device=state.devices.find(item=>item.id===id);if(!device||device.controller.connected)return;device.controller.dispose?.();state.devices=state.devices.filter(item=>item!==device);if(state.activeId===id)state.activeId=state.devices[0]?.id||null;renderAll();persist();toast(`${device.name} 已从列表删除`)}
  function renameActive(){const device=activeDevice();if(!device)return;$('#rename-input').value=device.name;$('#rename-dialog').showModal();requestAnimationFrame(()=>$('#rename-input').select())}
  function applyRename(){const device=activeDevice();if(!device)return;device.name=$('#rename-input').value.trim()||deviceLabel(state.devices.indexOf(device));$('#rename-dialog').close();persist();renderAll();toast(`设备已重命名为 ${device.name}`)}
  function saveLog(){const device=activeDevice();if(!device)return;const data=device.logs.map(entry=>`${entry.time}\t${entry.direction.toUpperCase()}\t${entry.text}`).join('\r\n'),blob=new Blob([data],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`${device.name}-log-${Date.now()}.txt`;link.click();URL.revokeObjectURL(url)}
  function parseCsvCompensation(text){const points=text.split(/\r?\n/).map(line=>line.trim()).filter(line=>line&&!/^[#!]/.test(line)).map(line=>line.split(/[,;\t]/).slice(0,2).map(Number)).filter(row=>row.length===2&&row.every(Number.isFinite)).map(([frequency,loss])=>[frequency,Math.abs(loss)]);if(!points.length)throw new Error('CSV 中没有有效的“频率 GHz, 损耗 dB”数据');return points}
  function parseTouchstone(text){
    let unit='ghz',format='ma';const values=[];
    for(const raw of text.split(/\r?\n/)){const line=raw.replace(/!.*/,'').trim();if(!line)continue;if(line.startsWith('#')){const parts=line.slice(1).toLowerCase().split(/\s+/);unit=parts.find(part=>['hz','khz','mhz','ghz'].includes(part))||unit;const sIndex=parts.indexOf('s');if(sIndex>=0&&['db','ma','ri'].includes(parts[sIndex+1]))format=parts[sIndex+1];continue}values.push(...line.split(/\s+/).map(Number).filter(Number.isFinite))}
    const factor={hz:1e-9,khz:1e-6,mhz:1e-3,ghz:1}[unit],points=[];
    for(let index=0;index+8<values.length;index+=9){const frequency=values[index]*factor,a=values[index+3],b=values[index+4];let db;if(format==='db')db=a;else if(format==='ma')db=20*Math.log10(Math.max(Math.abs(a),1e-15));else db=20*Math.log10(Math.max(Math.hypot(a,b),1e-15));if(Number.isFinite(frequency)&&Number.isFinite(db))points.push([frequency,Math.abs(db)])}
    if(!points.length)throw new Error('S2P 文件中没有可用的 S21 数据');return points
  }
  function hasCompensation(){const c=state.compensation;return c.type==='formula'?Boolean(c.formula):(c.type==='csv'||c.type==='s2p')&&Boolean(c.points?.length)}
  async function applyCompensation(){
    try{
      const type=$('input[name="compensation-type"]:checked').value;
      if(type==='csv'){const file=$('#compensation-csv-file').files[0];if(!file)throw new Error('请选择 CSV 文件');state.compensation={type,points:parseCsvCompensation(await file.text()),name:file.name}}
      if(type==='formula'){const formula=$('#compensation-formula').value.trim();evaluateFormula(formula,Number($('#frequency-input').value));state.compensation={type,formula,name:'多项式公式'}}
      if(type==='s2p'){const file=$('#compensation-s2p-file').files[0];if(!file)throw new Error('请选择 S2P 文件');state.compensation={type,points:parseTouchstone(await file.text()),name:file.name}}
      const device=activeDevice();if(device)device.tru=true;persist();$('#compensation-dialog').close();renderDeviceData();renderMulti();toast(`${state.compensation.name} 已应用`)
    }catch(error){toast(error.message||'补偿数据无效')}
  }

  function bind(){
    $$('#add-device,[data-connect-device]').forEach(button=>button.onclick=requestDevice);$('#mobile-connect').onclick=requestDevice;$('#refresh-ports').onclick=async()=>{if(!navigator.serial)return toast('当前浏览器不支持 Web Serial');const ports=await navigator.serial.getPorts();toast(`发现 ${ports.length} 个已授权串口，点击连接设备进行打开`)};$('#mobile-menu').onclick=()=>$('.app-sidebar').classList.toggle('open');$('.console-nav').addEventListener('click',event=>{const button=event.target.closest('[data-view]');if(button)switchView(button.dataset.view)});
    $('#refresh-device').onclick=()=>refreshDevice();$('#disconnect-device').onclick=disconnectActive;$('#rename-device').onclick=renameActive;$('#sync-control').onchange=event=>{state.sync=event.target.checked;$('#multi-sync').checked=state.sync};$('#multi-sync').onchange=event=>{state.sync=event.target.checked;$('#sync-control').checked=state.sync};
    const attenuationSlider=$('#attenuation-slider'),stepInput=$('#attenuation-step'),finishMainAttenuationDrag=()=>{mainAttenuationDragging=false;flushRealtimeAttenuation()};attenuationSlider.onpointerdown=()=>{mainAttenuationDragging=true};attenuationSlider.oninput=event=>scheduleRealtimeAttenuation(event.target.value);attenuationSlider.onchange=finishMainAttenuationDrag;attenuationSlider.onpointerup=finishMainAttenuationDrag;attenuationSlider.onpointercancel=finishMainAttenuationDrag;window.addEventListener('pointerup',()=>{if(mainAttenuationDragging)finishMainAttenuationDrag()});$('#attenuation-value').onchange=event=>setDisplayedAttenuation(event.target.value);$('#attenuation-value').onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();setDisplayedAttenuation(event.currentTarget.value);event.currentTarget.blur()}};$('#attenuation-value').onwheel=event=>{event.preventDefault();const step=attenuationStep(),current=displayAttenuation()||0;setDisplayedAttenuation(current+(event.deltaY<0?step:-step),'realtime')};stepInput.oninput=()=>renderAttenuationStep();stepInput.onchange=()=>renderAttenuationStep(true);$('#attenuation-down').onclick=()=>setDisplayedAttenuation((displayAttenuation()||0)-attenuationStep());$('#attenuation-up').onclick=()=>setDisplayedAttenuation((displayAttenuation()||0)+attenuationStep());renderAttenuationStep(true);$('#frequency-input').onchange=event=>{const device=activeDevice();if(device)device.frequency=clamp(Number(event.target.value)||1,.001,40);renderDeviceData();renderMulti()};
    $('#rf1').onclick=()=>setRF(1);$('#rf2').onclick=()=>setRF(2);$('#output-enable').onclick=()=>setOutput(!activeDevice()?.output);$('#mode-toggle').onclick=()=>{if(!hasCompensation())return $('#compensation-dialog').showModal();const device=activeDevice();if(!device)return;device.tru=!device.tru;renderDeviceData();renderMulti()};
    $$('[data-at]').forEach(button=>button.onclick=()=>send(button.dataset.at));$('#raw-command-form').onsubmit=event=>{event.preventDefault();send($('#raw-command').value)};$('#log-limit').onchange=renderMainLog;$('#clear-log').onclick=()=>{const device=activeDevice();if(device)device.logs=[];renderMainLog()};$('#save-log').onclick=saveLog;$('#rename-dialog form').onsubmit=event=>{if(event.submitter?.value==='apply'){event.preventDefault();applyRename()}};$('#apply-rename').onclick=event=>{event.preventDefault();applyRename()};$('#import-compensation').onclick=()=>$('#compensation-dialog').showModal();$('#apply-compensation').onclick=event=>{event.preventDefault();applyCompensation()};$$('input[name="compensation-type"]').forEach(radio=>radio.onchange=()=>{$$('[data-compensation-panel]').forEach(panel=>panel.hidden=panel.dataset.compensationPanel!==radio.value)});
    $('#timeline-add').onclick=()=>{state.timeline.push({delay:250,command:'at+GetAttenuationVal?',note:''});renderTimeline()};$('#timeline-save').onclick=()=>{persist();toast('自动化配置已保存在当前浏览器')};$('#timeline-clear').onclick=()=>{state.timeline=[];renderTimeline();persist()};$('#automation-run').onclick=runTimeline;$('#automation-stop').onclick=()=>{state.automationStop=true};$('#automation-log-clear').onclick=()=>{$('#automation-log').innerHTML='<span>执行日志已清空</span>'};$$('[data-auto-command]').forEach(button=>button.onclick=async()=>{button.disabled=true;automationLog(`通过 Web Serial 发送：${button.dataset.autoCommand}`);try{await runAutomationCommand(button.dataset.autoCommand);toast('设备已返回有效响应')}catch(error){automationLog(`测试失败：${error.message}`,'bad');toast(error.message)}finally{button.disabled=false}});
    $$('.collapse').forEach(button=>button.onclick=()=>{const card=button.closest('.control-card'),collapsed=card.classList.toggle('collapsed');[...card.children].slice(1).forEach(child=>child.hidden=collapsed);button.textContent=collapsed?'+':'−'});
    window.addEventListener('beforeunload',()=>{state.devices.forEach(device=>device.controller.disconnect().catch(()=>{}));persist()});
  }
  restore();bind();applyCardOrder();bindCardDragging();renderAll();const requestedView=consoleParams.get('view');switchView(compactMode?'device':['device','multi','automation'].includes(requestedView)?requestedView:'device');
  if(!window.isSecureContext||!navigator.serial){toast(!window.isSecureContext?'请通过 HTTPS 或 localhost 访问':'请使用 Chrome 或 Edge 桌面版浏览器');$$('[data-connect-device],#add-device,#mobile-connect').forEach(button=>button.disabled=true)}
})();
