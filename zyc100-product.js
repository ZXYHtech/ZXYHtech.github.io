/* Presentation only. Commercial prices and purchase flow remain server-owned. */
window.zyc100Story = function () {
  const asset = name => `assets/zyc100/${name}`;
  return `<section class="zyc-story" aria-label="ZYC100 产品介绍">
    <header class="zyc-story-hero"><div><span class="zyc-kicker">ZYC100 · RF CONTROL</span><h2>把射频调节，<br>握在手里。</h2><p>一块屏幕，一个拨杆。<br>从本机调整到电脑控制，让 ZYE660 衰减模块更好用。</p><a href="#zyc100-experience" class="zyc-link">先体验 ZYC100 →</a></div><figure><img src="${asset('real-hand.jpg')}" alt="手持 ZYC100 与 ZYE660 组合实拍" width="1280" height="1280"><figcaption>实物拍摄 · 组合状态</figcaption></figure></header>
    <div class="zyc-pillars"><article><span>01 / ON DEVICE</span><h3>本机操作</h3><p>左右拨动调整，按下进入菜单或确认。OLED 显示当前数值与工作状态。</p></article><article><span>02 / ON COMPUTER</span><h3>电脑联动</h3><p>通过 USB 连接 ZYA1000，使用衰减控制、通信日志和自动化功能。</p></article><article><span>03 / TRY BEFORE BUY</span><h3>先体验，后购买</h3><p>购买前先熟悉按键、菜单与操作逻辑。下方仿真器只做交互预览，不连接真实设备。</p></article></div>
    <section class="zyc-configs"><div class="zyc-title"><span class="zyc-kicker">CHOOSE YOUR SETUP</span><h2>三种配置，按使用方式选择。</h2><p>两款组合均搭配 ZYE660 衰减模块；区别在于模块下方是否集成电池。</p></div><div class="zyc-config-grid">
      <article class="real-controller zyc-no-product-image"><span class="zyc-kicker">CONTROLLER</span><h3>单独控制器</h3><p>已有兼容模块，或希望自行搭配。控制器本体不包含射频衰减模块。</p><footer>不含 ZYE660 模块 · 询价</footer></article>
      <article><img src="${asset('real-thin-top.jpg')}" alt="ZYC100 加 ZYE660 无电池薄款组合实拍" width="1280" height="1280" loading="lazy"><span class="zyc-kicker">USB POWERED</span><h3>无电池组合 · 薄款</h3><p>控制器 + ZYE660 模块。使用时保持 USB 供电，适合电脑旁和固定测试台。</p><footer>USB 供电 · 询价</footer></article>
      <article><img src="${asset('real-battery-lit.jpg')}" alt="ZYC100 加 ZYE660 集成电池厚款组合实拍" width="1280" height="1280" loading="lazy"><span class="zyc-kicker">BATTERY EDITION</span><h3>带电池组合 · 厚款</h3><p>电池集成在模块下方，因此机身更厚。可脱离 USB 供电进行本机操作。</p><footer>模块下方集成电池 · 询价</footer></article>
    </div><p class="zyc-note">单独控制器实物图更新中，当前暂不展示图片；两款组合使用实物照片。价格、库存及交期请咨询确认。</p></section>
    <section class="zyc-how"><div class="zyc-title"><span class="zyc-kicker">ONE SYSTEM · THREE PARTS</span><h2>控制器、模块、软件，各司其职。</h2></div><div class="zyc-system"><article><b>ZYC100</b><span>显示与操作</span><p>读取状态、调整设置，让模块具备直观的本机操作界面。</p></article><article><b>ZYE660</b><span>射频衰减</span><p>承担 RF 信号的衰减功能。实际射频指标以模块规格为准。</p></article><article><b>ZYA1000</b><span>电脑控制</span><p>连接真实设备，进行数值设置、通信观察与自动化操作。</p></article></div></section>
    <section class="zyc-inbox"><div><span class="zyc-kicker">IN THE BOX</span><h2>配套到位，开始使用。</h2><p>主体（所选配置） + USB 线缆 + 串口杜邦线</p></div><ol><li><b>连接</b><span>断电确认模块连接和接口方向。</span></li><li><b>供电</b><span>无电池款保持 USB 供电；带电池款确认电量。</span></li><li><b>操作</b><span>使用本机拨杆，或通过 USB 在上位机中选择设备。</span></li></ol></section>
  </section>`;
};
