function readLocalList(key){try{const value=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(value)?value:[]}catch(_){return []}}
const state = {
  products: [], categories: [], cart: readLocalList('zya-cart'),
  compare: readLocalList('zya-compare').map(Number).filter(Number.isInteger),
  favorites: readLocalList('zya-favorites').map(Number).filter(Number.isInteger),
  availability: {}, availabilityCheckedAt: 0, availabilityPromise: null,
  adminToken: sessionStorage.getItem('zya-admin-token') || '',
  adminTab: 'products',
  route: '', review: false, reviewMode: 'area', annotations: [], selection: null,
  zyaSerialCleanup: null,
  theme: document.documentElement.dataset.theme || 'rf-dark'
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const app = $('#app');
const launchParams = new URLSearchParams(location.search);
const runtime = Object.freeze({mode:'full',apiBaseUrl:'',catalogUrl:'data/catalog.json',...(window.ZYA_RUNTIME||{})});
const siteBase = new URL('./', document.baseURI);
const sitePath = path => new URL(String(path||'').replace(/^\//,''), siteBase).href;
const apiPath = path => runtime.apiBaseUrl
  ? `${String(runtime.apiBaseUrl).replace(/\/$/,'')}${path.startsWith('/')?path:`/${path}`}`
  : path;
const resolveContentUrl = path => {
  const value=String(path||'');
  if(!value||value.startsWith('#')||/^(?:https?:|data:|blob:|mailto:|tel:)/i.test(value))return value;
  if(runtime.apiBaseUrl&&/^\/?(?:api|uploads)\//i.test(value))return apiPath(value.startsWith('/')?value:`/${value}`);
  return sitePath(value);
};
const PRODUCT_DISPLAY_IMAGES = Object.freeze({
  'zya-dat-63': 'assets/products/zye660-cutout-v1.png?v=1.7.5',
  'zyc100-controller': 'assets/products/zyc100-cutout-v3.png?v=1.16.2'
});
const productDisplayImage = product => PRODUCT_DISPLAY_IMAGES[product?.slug]
  ? sitePath(PRODUCT_DISPLAY_IMAGES[product.slug])
  : resolveContentUrl(product?.image_url || '');
if (launchParams.get('embed') === 'zya1000') document.body.classList.add('embed-mode');
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
addEventListener('load',()=>navigator.serviceWorker.register(sitePath('service-worker.js?v=1.30.8'),{updateViaCache:'none'}).catch(()=>{}));
}
function updateOnlineState(){document.body.classList.toggle('is-offline',!navigator.onLine)}
addEventListener('online',updateOnlineState);addEventListener('offline',updateOnlineState);updateOnlineState();

const THEMES = new Set(['rf-dark','cosy','lab-light','contrast']);
function closeThemePanel() {
  const panel=$('#theme-panel');
  panel.classList.remove('open');panel.setAttribute('aria-hidden','true');
  $('#theme-toggle').setAttribute('aria-expanded','false');
}
function updateThemeControls() {
  $$('[data-theme-choice]').forEach(button=>{
    const active=button.dataset.themeChoice===state.theme;
    button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
  });
}
function applyTheme(theme,{announce=true}={}) {
  state.theme=THEMES.has(theme)?theme:'rf-dark';
  document.documentElement.dataset.theme=state.theme;
  try{localStorage.setItem('zya-theme',state.theme)}catch(_){}
  const colors={'rf-dark':'#07120f',cosy:'#f5f4f8','lab-light':'#eef4f8',contrast:'#000000'};
  $('meta[name="theme-color"]')?.setAttribute('content',colors[state.theme]);
  updateThemeControls();
  if(announce)toast(`已切换为 ${{'rf-dark':'射频深色',cosy:'Cosy 灵感','lab-light':'工程浅色',contrast:'高对比'}[state.theme]} 风格`);
}
applyTheme(state.theme,{announce:false});

const zyaBridge = (()=>{
  const pending=new Map();
  const controlChannel='BroadcastChannel' in window?new BroadcastChannel('zya1000-control'):null;
  const browserAcks=new Map();controlChannel?.addEventListener('message',event=>{const id=event.data?.request_id,task=browserAcks.get(id);if(event.data?.type==='zya1000-control-ack'&&task){browserAcks.delete(id);task(event.data)}});
  const mode=window.chrome?.webview?'webview2':window.ZYA1000Bridge?.invoke?'native-object':'browser-demo';
  if(window.chrome?.webview){window.chrome.webview.addEventListener('message',event=>{const message=typeof event.data==='string'?JSON.parse(event.data):event.data;const task=pending.get(message.requestId);if(task){pending.delete(message.requestId);message.ok===false?task.reject(new Error(message.error||'ZYA1000 操作失败')):task.resolve(message)}})}
  async function send(action,payload={}){
    const requestId=`zya-${Date.now()}-${Math.random().toString(16).slice(2)}`;const message={protocol:'zya1000.web/v1',requestId,action,payload,context:{model:launchParams.get('model')||'',serial:launchParams.get('serial')||'',hardware:launchParams.get('hardware')||'',firmware:launchParams.get('firmware')||''}};
    if(mode==='webview2')return new Promise((resolve,reject)=>{pending.set(requestId,{resolve,reject});window.chrome.webview.postMessage(message);setTimeout(()=>{if(pending.delete(requestId))reject(new Error('ZYA1000 响应超时'))},8000)});
    if(mode==='native-object'){const result=await window.ZYA1000Bridge.invoke(JSON.stringify(message));return typeof result==='string'?JSON.parse(result):result}
    if(action==='set-attenuation'){
      const command={action,value_db:Number(payload.value_db),mode:payload.mode||'parallel',request_id:requestId,created_at:Date.now(),expires_at:Date.now()+10*60*1000};
      localStorage.setItem('zya1000.pending-command',JSON.stringify(command));controlChannel?.postMessage(command);
      if(controlChannel)return new Promise(resolve=>{browserAcks.set(requestId,result=>resolve({ok:true,mode:'web-console-live',requestId,action,payload,queued:false,...result}));setTimeout(()=>{if(browserAcks.delete(requestId))resolve({ok:true,mode:'web-console-queue',requestId,action,payload,queued:true,message:'配置已进入网页上位机待发送队列'})},450)});
      return {ok:true,mode:'web-console-queue',requestId,action,payload,queued:true,message:'配置已进入网页上位机待发送队列'};
    }
    return {ok:true,mode:'browser-demo',requestId,action,payload,message:'浏览器演示已完成，未调用真实设备'};
  }
  return {mode,send};
})();

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function money(value) { return `¥${Number(value || 0).toLocaleString('zh-CN', {minimumFractionDigits: 0, maximumFractionDigits: 2})}`; }
function priceLabel(value){return Number(value)>0?money(value):'联系询价'}
function formatBytes(value) { const bytes=Number(value||0);if(!bytes)return String(value||'大小待补充');if(bytes<1024)return `${bytes} B`;if(bytes<1024*1024)return `${(bytes/1024).toFixed(1)} KB`;return `${(bytes/1024/1024).toFixed(1)} MB`; }
const resourceLabels={datasheet:'数据手册',drawing:'尺寸图',report:'测试报告',software:'软件',firmware:'固件',document:'文档',model:'3D 模型',video:'视频',image:'产品图片'};
const resourceIcons={datasheet:'DS',drawing:'DWG',report:'RPT',software:'ZIP',firmware:'FW',document:'DOC',model:'3D',video:'▶',image:'IMG'};
function resourceCard(resource,{showProduct=true}={}) {
  const type=resource.resource_type||resource.doc_type||resource.asset_type||'document',available=resource.available!==false&&Boolean(resource.url||resource.asset_url||resource.file_url),rawUrl=resource.url||resource.asset_url||resource.file_url||'',url=resolveContentUrl(rawUrl),mime=resource.mime_type||'',previewable=mime.startsWith('image/')||mime.startsWith('video/')||mime==='application/pdf'||/\.(html?|pdf|png|jpe?g|webp|mp4|webm)$/i.test(rawUrl),size=resource.source==='asset'?formatBytes(resource.file_size):String(resource.file_size||'大小待补充');
  if(!available)return '';
  return `<article class="resource-card" data-resource-type="${escapeHtml(type)}" data-review-id="resource.${escapeHtml(resource.resource_id||`${type}-${resource.id}`)}">
    <div class="resource-icon">${escapeHtml(resourceIcons[type]||'FILE')}</div><div class="resource-info">${showProduct?`<span class="eyebrow">${escapeHtml(resource.model||'')} · ${escapeHtml(resourceLabels[type]||type)}</span>`:`<span class="eyebrow">${escapeHtml(resourceLabels[type]||type)}</span>`}<h3>${escapeHtml(resource.title||resource.original_name||'产品资源')}</h3><p>版本 ${escapeHtml(resource.version||'1.0')} · ${escapeHtml(resource.language||'通用')} · ${escapeHtml(size)}</p>${resource.original_name?`<small>${escapeHtml(resource.original_name)}</small>`:''}</div>
    <div class="resource-actions">${(previewable?`<a class="button ghost compact" href="${escapeHtml(url)}" target="_blank" rel="noopener">预览</a>`:'')+`<a class="button secondary compact" href="${escapeHtml(url)}" download="${escapeHtml(resource.original_name||'')}">下载 ⇩</a>`}</div></article>`;
}
let staticCatalogPromise=null;
async function loadStaticCatalog(){
  if(!staticCatalogPromise)staticCatalogPromise=fetch(sitePath(runtime.catalogUrl||'data/catalog.json'),{cache:'no-cache'}).then(response=>{if(!response.ok)throw new Error('静态产品数据包不可用');return response.json()});
  return staticCatalogPromise;
}
async function staticCatalogResponse(path){
  const pathname=path.split('?')[0],catalog=await loadStaticCatalog();
  if(pathname==='/api/categories')return {rows:catalog.categories||[]};
  if(pathname==='/api/products')return {rows:catalog.products||[],count:(catalog.products||[]).length};
  if(pathname==='/api/tutorials')return {rows:catalog.tutorials||[]};
  if(pathname==='/api/documents')return {rows:catalog.documents||[]};
  if(pathname==='/api/resources')return {rows:catalog.resources||[],count:(catalog.resources||[]).length};
  const match=pathname.match(/^\/api\/products\/([^/]+)$/);
  if(match&&catalog.details?.[decodeURIComponent(match[1])])return {product:catalog.details[decodeURIComponent(match[1])]};
  return null;
}
async function api(path, options = {}) {
  const method=String(options.method||'GET').toUpperCase();
  const staticFallback=method==='GET'&&runtime.mode==='hybrid'?await staticCatalogResponse(path):null;
  if(staticFallback&&!runtime.apiBaseUrl)return staticFallback;
  if(runtime.mode==='hybrid'&&!runtime.apiBaseUrl&&path.startsWith('/api/'))throw new Error('下单服务尚未配置，请联系网站管理员');
  try{
    const response = await fetch(apiPath(path), {...options,headers:{'Content-Type':'application/json',...(state.adminToken?{'Authorization':`Bearer ${state.adminToken}`}:{}) ,...(options.headers||{})}});
    const text = await response.text();
    let data={};try{data=text?JSON.parse(text):{}}catch(error){if(staticFallback)return staticFallback;throw new Error('数据服务返回了无法识别的内容')}
    if (!response.ok){if(staticFallback&&[404,408,429,500,502,503,504].includes(response.status))return staticFallback;throw new Error(data.error || '请求失败')}
    return data;
  }catch(error){if(staticFallback)return staticFallback;throw error}
}
function syncRoleUI(){const admin=Boolean(state.adminToken);document.body.classList.toggle('is-admin-session',admin);const button=$('#review-toggle');if(button)button.hidden=!admin;if(!admin&&state.review)toggleReview(false)}
async function protectedDownload(path,filename){try{const response=await fetch(apiPath(path),{headers:{'Authorization':`Bearer ${state.adminToken}`}});if(!response.ok)throw new Error('没有权限导出该文件');const blob=await response.blob(),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=filename;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return true}catch(err){toast(err.message);return false}}
function toast(message) {
  const el = $('#toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}
function saveCart() {
  localStorage.setItem('zya-cart', JSON.stringify(state.cart));
  $('#cart-count').textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  renderCart();
}
function saveCompare() {
  localStorage.setItem('zya-compare', JSON.stringify(state.compare));
}
function toggleFavorite(productId){
  productId=Number(productId);const saved=state.favorites.includes(productId);
  state.favorites=saved?state.favorites.filter(id=>id!==productId):[...state.favorites,productId];
  localStorage.setItem('zya-favorites',JSON.stringify(state.favorites));
  $$(`[data-favorite="${productId}"]`).forEach(button=>{const active=!saved;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));button.setAttribute('aria-label',active?'取消收藏':'加入收藏');const label=$('[data-favorite-label]',button);if(label)label.textContent=active?'已收藏':'收藏'});
  toast(saved?'已取消收藏':'已加入我的收藏');
}
function toggleCompare(productId) {
  productId = Number(productId);
  if (state.compare.includes(productId)) {
    state.compare = state.compare.filter(id => id !== productId);
    toast('已移出产品对比');
  } else {
    if (state.compare.length >= 3) return toast('最多同时对比 3 款产品');
    state.compare.push(productId); toast('已加入产品对比');
  }
  saveCompare();
  if (state.route === '#compare') renderCompare();
}
function addToCart(productId) {
  const product = state.products.find(p => p.id === Number(productId));
  if (!product) return;
  const item = state.cart.find(row => row.product_id === product.id);
  if (item) item.quantity += 1;
  else state.cart.push({product_id: product.id, material_code:product.material_code, name: product.name, model: product.model, price: product.price, quantity: 1});
  saveCart(); toast(`${product.model} 已加入购买清单`);
}
function renderCart() {
  const body = $('#cart-body'); if (!body) return;
  if (!state.cart.length) { body.innerHTML = '<div class="empty">购买清单还是空的<br><small>从产品页添加你需要的模块</small></div>'; return; }
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  body.innerHTML = state.cart.map(item => {const stock=state.availability[item.product_id],quantity=Number(stock?.quantity||0),enough=stock&&quantity>=item.quantity,status=!stock?'库存待核对':enough?`现货可满足 · ${quantity} 件`:quantity>0?`现货 ${quantity} 件 · 其余需确认`:'需确认库存与交期';return `<div class="cart-item ${stock&&!enough?'stock-warning':''}">
    <div><b>${escapeHtml(item.model)}</b><p>${escapeHtml(item.name)}</p><strong>${money(item.price)}</strong><small class="cart-stock">${escapeHtml(status)}</small></div>
    <div class="quantity"><button data-cart-minus="${item.product_id}">−</button><span>${item.quantity}</span><button data-cart-plus="${item.product_id}">＋</button></div>
  </div>`}).join('') + `<div class="cart-total"><span>参考合计</span><b>${money(total)}</b></div><button class="button primary" id="checkout-button" style="width:100%">核对并提交需求</button><p class="cart-inventory-note">库存来自当前库存适配器；数量不足仍可提交需求，由销售确认补货和交期。</p>`;
}
function renderCheckoutSummary(){
  const summary=$('#checkout-summary');if(!summary)return;
  const total=state.cart.reduce((sum,item)=>sum+item.price*item.quantity,0),quantity=state.cart.reduce((sum,item)=>sum+item.quantity,0);
  summary.innerHTML=`<div class="checkout-summary-head"><b>本次购买清单</b><span>${quantity} 件商品</span></div>${state.cart.map(item=>{const stock=state.availability[item.product_id],available=Number(stock?.quantity||0),enough=stock&&available>=item.quantity,status=!stock?'库存待核对':enough?`现货 ${available} 件，可满足本次需求`:available?`现货 ${available} 件，缺少 ${item.quantity-available} 件`:'暂无现货，需确认交期';return `<div class="checkout-summary-item ${stock&&!enough?'stock-warning':''}"><span><b>${escapeHtml(item.model)}</b><small>${escapeHtml(item.name)}</small><small class="checkout-stock">${escapeHtml(status)}</small></span><span>× ${item.quantity}</span><strong>${money(item.price*item.quantity)}</strong></div>`}).join('')}<div class="checkout-summary-total"><span>参考合计</span><b>${money(total)}</b></div>`;
}
function openCart() { $('#cart-drawer').classList.add('open'); $('#backdrop').classList.add('open'); $('#cart-drawer').setAttribute('aria-hidden','false');loadAvailability().then(renderCart); }
function closeCart() { $('#cart-drawer').classList.remove('open'); $('#backdrop').classList.remove('open'); $('#cart-drawer').setAttribute('aria-hidden','true'); }

function productVisual(product, large = false) {
  const hotspots = product.hotspots || [];
  const imageAsset = product.assets?.find(asset=>asset.asset_type==='image');
  const imageUrl = imageAsset?.asset_url || product.image_url || '';
  // Product-page visual rule: use a transparent, tightly cropped subject.
  // Never restore a studio-background photo or rotate the whole bitmap.
  const displayImageUrl=product.model==='ZYE660'?sitePath('assets/products/zye660-cutout-v1.png?v=1.7.5'):product.model==='ZYC100'?sitePath('assets/products/zyc100-cutout-v3.png?v=1.16.2'):resolveContentUrl(imageUrl);
  const modelAsset = product.assets?.find(asset=>asset.asset_type==='model');
  const pseudo3d = large && (product.model === 'ZYE660'||product.model === 'ZYC100');
  if (pseudo3d) {
    const controller=product.model==='ZYC100';
    const preferred=controller?['usb','display','rf-in','rf-out','button']:['power','dip','rf-in','rf-out','type-c','spi','check','battery'];
    const guide=preferred.map(key=>hotspots.find(item=>item.hotspot_key===key)).filter(Boolean);
    const positions=controller?{usb:[50,15],display:[50,51],'rf-in':[17,58],'rf-out':[83,58],button:[50,78]}:{power:[27,10],dip:[54,18],spi:[75,16],'rf-in':[9,50],'rf-out':[91,50],battery:[24,76],'type-c':[50,84],check:[74,82]};
    return `<div class="device-stage interactive-viewer pseudo3d-viewer" data-product-viewer data-pseudo3d-viewer data-uploaded-source="${escapeHtml(imageUrl)}" tabindex="0" data-review-id="product.${product.slug}.model" data-review-image="product-model:${product.slug}">
      <button class="pseudo3d-hotspot-toggle" type="button" data-hotspot-toggle aria-pressed="false"><span aria-hidden="true">●</span><b>隐藏标注</b></button>
      <div class="pseudo3d-backdrop" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="pseudo3d-scene" data-pseudo3d-scene>
        <div class="pseudo3d-shadow" aria-hidden="true"></div>
        <div class="pseudo3d-product ${controller?'pseudo3d-controller':''}">
          <img class="pseudo3d-subject" src="${displayImageUrl}" alt="${escapeHtml(product.name)}" draggable="false">
          <div class="pseudo3d-glare" aria-hidden="true"></div>
          <div class="pseudo3d-features" aria-label="产品功能位置">${guide.map(h=>{const position=positions[h.hotspot_key]||[Number(h.position?.x)||50,Number(h.position?.y)||50];return `<button type="button" style="--hotspot-x:${position[0]}%;--hotspot-y:${position[1]}%" data-hotspot="${escapeHtml(h.hotspot_key)}" data-label="${escapeHtml(h.label)}" data-description="${escapeHtml(h.description)}" data-action-type="${escapeHtml(h.action?.type||'')}" data-action-target="${escapeHtml(h.action?.target||'')}" data-action-label="${escapeHtml(h.action?.label||'')}" aria-expanded="false"><i aria-hidden="true"></i><span>${escapeHtml(h.label)}</span></button>`}).join('')}</div>
        </div>
      </div>
      <div class="hotspot-detail"><b></b><br><span></span><button type="button" class="button primary compact hotspot-action" data-hotspot-action hidden></button></div>
    </div>`;
  }
  return `<div class="device-stage ${large?'interactive-viewer':''}" ${large?'data-product-viewer tabindex="0"':''} data-review-id="product.${product.slug}.model" data-review-image="product-model:${product.slug}">
    <div class="product-object-layer" data-product-object>${displayImageUrl?`<img class="uploaded-product-image" src="${escapeHtml(displayImageUrl)}" alt="${escapeHtml(product.name)}" draggable="false">`:`<div class="device-card"><span class="device-label">${escapeHtml(product.model)}</span><div class="dip-row">${[1,2,3,4,5,6,7].map(i=>`<i></i>`).join('')}</div></div>`}</div>
    ${large?`<div class="viewer-status"><span data-viewer-angle>0°</span><span data-viewer-zoom>100%</span></div><div class="viewer-controls" aria-label="产品视图控制"><button type="button" data-viewer-action="rotate-left" title="向左旋转" aria-label="向左旋转">↶</button><button type="button" data-viewer-action="zoom-out" title="缩小" aria-label="缩小">−</button><button type="button" data-viewer-action="reset" title="复位视图">复位</button><button type="button" data-viewer-action="zoom-in" title="放大" aria-label="放大">＋</button><button type="button" data-viewer-action="rotate-right" title="向右旋转" aria-label="向右旋转">↷</button></div><span class="viewer-help">左右拖动旋转 · 按钮缩放</span>`:''}
    ${modelAsset?`<a class="model-asset-link" href="${escapeHtml(modelAsset.asset_url)}" download>3D模型 ${escapeHtml(modelAsset.version)} ⇩</a>`:''}
    ${hotspots.length ? hotspots.map(h=>`<button class="model-hotspot" style="left:${Number(h.position.x)||50}%;top:${Number(h.position.y)||50}%" data-hotspot="${escapeHtml(h.hotspot_key)}" data-label="${escapeHtml(h.label)}" data-description="${escapeHtml(h.description)}" data-action-type="${escapeHtml(h.action?.type||'')}" data-action-target="${escapeHtml(h.action?.target||'')}" data-action-label="${escapeHtml(h.action?.label||'')}">${escapeHtml(h.label.slice(0,2))}</button>`).join('') : '<div class="float-tag a"><b>RF IN</b><br>输入端口</div><div class="float-tag b"><b>RF OUT</b><br>输出端口</div>'}
    <div class="hotspot-detail"><b></b><br><span></span><button type="button" class="button primary compact hotspot-action" data-hotspot-action hidden></button></div>
  </div>`;
}
function bindProductViewers(){
  $$('[data-pseudo3d-viewer]').forEach(stage=>{const scene=$('[data-pseudo3d-scene]',stage);let x=0,y=0,motionBound=false,baseBeta=null;const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));const apply=(nextX,nextY)=>{x=clamp(nextX,-1,1);y=clamp(nextY,-1,1);const rotateY=x*6.5,rotateX=-y*5;stage.style.setProperty('--pseudo-x',x.toFixed(3));stage.style.setProperty('--pseudo-y',y.toFixed(3));stage.style.setProperty('--pseudo-rx',`${rotateX.toFixed(2)}deg`);stage.style.setProperty('--pseudo-ry',`${rotateY.toFixed(2)}deg`);stage.dataset.tilt=`${x.toFixed(2)},${y.toFixed(2)}`};const reset=()=>apply(0,0);stage.onpointermove=e=>{if(e.pointerType==='touch')return;const rect=stage.getBoundingClientRect();apply(((e.clientX-rect.left)/rect.width-.5)*2,((e.clientY-rect.top)/rect.height-.5)*2)};stage.onpointerleave=reset;stage.onkeydown=e=>{if(e.key==='ArrowLeft')apply(x-.18,y);else if(e.key==='ArrowRight')apply(x+.18,y);else if(e.key==='ArrowUp')apply(x,y-.18);else if(e.key==='ArrowDown')apply(x,y+.18);else if(e.key==='0')reset();else return;e.preventDefault()};const onOrientation=e=>{if(e.gamma==null||e.beta==null)return;if(baseBeta==null)baseBeta=e.beta;apply(clamp(e.gamma/18,-1,1),clamp((e.beta-baseBeta)/14,-1,1))};const enableMotion=async()=>{if(motionBound||typeof DeviceOrientationEvent==='undefined')return;try{if(typeof DeviceOrientationEvent.requestPermission==='function'&&await DeviceOrientationEvent.requestPermission()!=='granted')return;addEventListener('deviceorientation',onOrientation,true);motionBound=true}catch(_){}};stage.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')enableMotion()});if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission!=='function')enableMotion();scene.ondragstart=()=>false;reset()});
  $$('[data-product-viewer]:not(.pseudo3d-viewer)').forEach(stage=>{const object=$('[data-product-object]',stage);let rotation=0,zoom=1,drag=null;const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));const apply=()=>{rotation=Math.round(rotation);zoom=clamp(zoom,.7,1.6);object.style.transform=`rotate(${rotation}deg) scale(${zoom})`;stage.dataset.rotation=String(rotation);stage.dataset.zoom=String(zoom);$('[data-viewer-angle]',stage).textContent=`${rotation}°`;$('[data-viewer-zoom]',stage).textContent=`${Math.round(zoom*100)}%`};const reset=()=>{rotation=0;zoom=1;apply()};$('.viewer-controls',stage).onclick=e=>{const action=e.target.closest('[data-viewer-action]')?.dataset.viewerAction;if(!action)return;if(action==='rotate-left')rotation-=15;if(action==='rotate-right')rotation+=15;if(action==='zoom-out')zoom-=.15;if(action==='zoom-in')zoom+=.15;if(action==='reset')return reset();apply()};object.onpointerdown=e=>{if(e.button!==0)return;drag={x:e.clientX,rotation};object.setPointerCapture?.(e.pointerId);object.classList.add('dragging')};object.onpointermove=e=>{if(!drag)return;rotation=drag.rotation+(e.clientX-drag.x)*.45;apply()};const stop=e=>{if(!drag)return;object.releasePointerCapture?.(e.pointerId);drag=null;object.classList.remove('dragging')};object.onpointerup=stop;object.onpointercancel=stop;object.ondblclick=reset;stage.onkeydown=e=>{if(e.key==='ArrowLeft'){rotation-=15;apply()}else if(e.key==='ArrowRight'){rotation+=15;apply()}else if(e.key==='+'||e.key==='='){zoom+=.15;apply()}else if(e.key==='-'){zoom-=.15;apply()}else if(e.key==='0'){reset()}else return;e.preventDefault()};apply()})
}
function productCard(p) {
  const favorite=state.favorites.includes(p.id);
  const availability=state.availability[p.id],stockLabel=!availability?'核对库存与交期':availability.available?`现货 ${Number(availability.quantity).toLocaleString('zh-CN')} 件`:'暂无现货 · 可询交期';
  const imageUrl=p.model==='ZYE660'?sitePath('assets/products/zye660-cutout-v1.png?v=1.7.5'):p.model==='ZYC100'?sitePath('assets/products/zyc100-cutout-v3.png?v=1.16.2'):resolveContentUrl(p.image_url);
  return `<article class="product-card" data-review-id="product.card.${p.slug}">
    <button class="favorite-button ${favorite?'active':''}" data-favorite="${p.id}" aria-pressed="${favorite}" aria-label="${favorite?'取消收藏':'加入收藏'}">♥</button>
    <a href="#product/${p.slug}"><div class="product-visual" data-review-id="product.image.${p.slug}" data-review-image="product-card:${p.slug}"><span class="product-badge">${escapeHtml(p.category_code.toUpperCase())}</span>${imageUrl?`<img class="product-card-image" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(p.name)}">`:'<div class="mini-device"></div>'}</div></a>
    <div class="product-body"><span class="eyebrow">${escapeHtml(p.model)}</span><a href="#product/${p.slug}"><h3>${escapeHtml(p.name)}</h3></a><p>${escapeHtml(p.subtitle)}</p>
      <div class="product-meta"><div><span class="price">${priceLabel(p.price)}</span><br><a class="stock ${availability&&!availability.available?'is-empty':''}" href="#product/${p.slug}">${escapeHtml(stockLabel)} →</a></div><div class="card-actions"><button class="button ghost compact" data-compare="${p.id}">${state.compare.includes(p.id)?'移出对比':'对比'}</button><button class="button secondary compact" data-add-cart="${p.id}">加入清单</button></div></div>
    </div></article>`;
}
async function ensureCatalog() {
  if (!state.products.length) {
    const [products, categories] = await Promise.all([api('/api/products'), api('/api/categories')]);
    state.products = products.rows; state.categories = categories.rows;
    const validIds=new Set(state.products.map(product=>product.id)),validFavorites=state.favorites.filter(id=>validIds.has(id));if(validFavorites.length!==state.favorites.length){state.favorites=validFavorites;localStorage.setItem('zya-favorites',JSON.stringify(state.favorites))}
  }
}

async function loadAvailability(force=false){
  if(!force&&state.availabilityCheckedAt&&Date.now()-state.availabilityCheckedAt<30000)return state.availability;
  if(state.availabilityPromise)return state.availabilityPromise;
  state.availabilityPromise=api('/api/products/availability').then(result=>{state.availability=Object.fromEntries((result.rows||[]).map(row=>[Number(row.id),row]));state.availabilityCheckedAt=Date.now();return state.availability}).catch(()=>state.availability).finally(()=>{state.availabilityPromise=null});
  return state.availabilityPromise;
}

function recentProductIds(){
  const valid=new Set(state.products.map(product=>product.id));
  return readLocalList('zya-recent-products').map(Number).filter(id=>Number.isInteger(id)&&valid.has(id)).slice(0,6);
}
function rememberProduct(productId){
  const ids=[Number(productId),...recentProductIds().filter(id=>id!==Number(productId))].slice(0,6);
  try{localStorage.setItem('zya-recent-products',JSON.stringify(ids))}catch(_){}
  return ids;
}
function compactProductLink(product){
  const imageUrl=product.model==='ZYE660'?sitePath('assets/products/zye660-cutout-v1.png?v=1.7.5'):product.model==='ZYC100'?sitePath('assets/products/zyc100-cutout-v3.png?v=1.16.2'):resolveContentUrl(product.image_url);
  return `<a class="recent-product-link" href="#product/${escapeHtml(product.slug)}">${imageUrl?`<img src="${escapeHtml(imageUrl)}" alt="">`:'<span class="mini-device"></span>'}<span><small>${escapeHtml(product.model)}</small><b>${escapeHtml(product.name)}</b></span><i>→</i></a>`;
}

async function renderHome() {
  await ensureCatalog();
  await loadAvailability();
  app.innerHTML = `<div class="page" data-module="home">
    <section class="hero" data-review-id="home.hero"><div><span class="eyebrow">INTERACTIVE RF PRODUCT EXPERIENCE</span><h1 class="page-title">不用翻说明书，<br><em>直接把产品用起来。</em></h1>
      <p class="lead">选型、购买、接线、设置、教程和资料都集中在一个页面。网页、手机与 ZYA1000 使用同一套产品知识。</p>
      <div class="hero-actions"><a class="button primary" href="#products">浏览射频产品 →</a><a class="button secondary" href="#selector">开始智能选型</a></div>
      <div class="hero-metrics"><div><b>4 类</b><small>核心射频模块</small></div><div><b>一站式</b><small>购买到售后</small></div><div><b>多端</b><small>Web / ZYA1000</small></div></div>
    </div>${productVisual(state.products[0], false)}</section>
    <section class="task-grid" data-review-id="home.tasks">
      <a class="task-card" href="#selector"><span class="task-icon">⌁</span><h3>我需要选产品</h3><p>根据频率、功能和目标参数快速筛选。</p></a>
      <a class="task-card" href="#product/zya-dat-63"><span class="task-icon">◫</span><h3>第一次使用</h3><p>跟随互动步骤完成供电、接线和设置。</p></a>
      <a class="task-card" href="#downloads"><span class="task-icon">⇩</span><h3>我要下载资料</h3><p>按型号定位手册、图纸、报告和软件。</p></a>
      <a class="task-card" href="#support"><span class="task-icon">◎</span><h3>遇到使用问题</h3><p>按现象排查，或把设备信息提交给我们。</p></a>
    </section>
    <section style="margin-top:90px" data-review-id="home.featured"><div class="section-head"><div><span class="eyebrow">FEATURED PRODUCTS</span><h2>从热门产品开始</h2></div><a href="#products">查看全部 →</a></div><div class="product-grid">${state.products.slice(0,3).map(productCard).join('')}</div></section>
  </div>`;
}

async function renderProducts(initialCategory = '') {
  await ensureCatalog();
  await loadAvailability();
  const categoryHero={controller:['CONTROL PLATFORM','控制射频模块，<br><em>也管理测试流程</em>','从本机操作到 ZYA1000 自动化，一个控制器连接多种射频功能模块。'],attenuator:['ATTENUATORS','精确设定信号，<br><em>快速得到目标衰减</em>','从手动拨码到串行控制，按工作频率、步进和控制方式选择。'],amplifier:['AMPLIFIERS','放大微弱信号，<br><em>保护整条测试链路</em>','结合增益、噪声系数、输出功率和供电条件选择。'],divider:['POWER DIVIDERS','把一路信号，<br><em>稳定分配到多路</em>','按频率、路数、插损和隔离度选择功分与合路方案。'],filter:['FILTERS','保留需要的频段，<br><em>抑制链路外干扰</em>','按通带、插损、抑制度和接口形式定位滤波器。']}[initialCategory]||['PRODUCT CENTER','找到适合你链路的<br><em>射频产品</em>','控制器、衰减器、放大器、功分器和滤波器集中查找。'];
  const recentProducts=initialCategory?[]:recentProductIds().map(id=>state.products.find(product=>product.id===id)).filter(Boolean);
  const controllerCategory=initialCategory==='controller';
  app.innerHTML = `<div class="page ${controllerCategory?'controller-category-page':''}" data-module="products"><span class="eyebrow">${categoryHero[0]}</span><h1 class="page-title">${categoryHero[1]}</h1><p class="lead category-lead">${categoryHero[2]}</p>
    ${recentProducts.length?`<section class="recent-products" data-review-id="products.recent"><div><span class="eyebrow">RECENTLY VIEWED</span><b>最近浏览</b></div><div class="recent-product-list">${recentProducts.map(compactProductLink).join('')}</div><button type="button" id="clear-recent-products" aria-label="清除最近浏览">清除</button></section>`:''}
    <div class="filters product-category-row" data-review-id="products.filters"><button class="filter-chip category-chip ${initialCategory?'':'active'}" data-category="">全部</button>${state.categories.map(c=>`<button class="filter-chip category-chip ${c.code===initialCategory?'active':''}" data-category="${c.code}">${escapeHtml(c.name)}</button>`).join('')}<button class="filter-chip favorite-filter" id="favorite-filter" aria-pressed="false">♥ 我的收藏</button></div>
    <div class="product-filter-panel ${controllerCategory?'controller-filter-panel':''}"><label class="search-box"><span>关键词</span><input id="product-search" placeholder="搜索型号、名称或用途"></label>${controllerCategory?'':`<label><span>工作频率</span><span class="product-filter-input"><input id="product-frequency" type="number" min="0.001" max="100" step="0.05" placeholder="不限"><i>GHz</i></span></label><label><span>价格上限</span><select id="product-price"><option value="">不限</option><option value="400">¥400</option><option value="600">¥600</option><option value="800">¥800</option><option value="1000">¥1000</option></select></label>`}<label><span>排序方式</span><select id="product-sort"><option value="featured">推荐优先</option><option value="price-asc">价格从低到高</option><option value="price-desc">价格从高到低</option><option value="model">型号名称</option></select></label><button type="button" class="button ghost compact" id="clear-product-filters">清除条件</button></div>
    <div class="product-result-head"><b id="product-result-count"></b><span id="product-filter-summary">显示全部已发布商品</span></div>
    <div class="product-grid" id="product-grid" data-review-id="products.grid">${state.products.map(productCard).join('')}</div></div>`;
  const update = () => {
    const category = $('.category-chip.active')?.dataset.category || '';
    const q = ($('#product-search').value || '').trim().toLowerCase(),frequencyText=$('#product-frequency')?.value||'',frequency=Number(frequencyText),priceText=$('#product-price')?.value||'',priceLimit=Number(priceText),sort=$('#product-sort').value;
    const favoritesOnly=$('#favorite-filter').classList.contains('active');
    const rows = state.products.filter(p => {const window=productFrequencyWindow(p),price=Number(p.price);return (!category || p.category_code === category) && (!favoritesOnly||state.favorites.includes(p.id)) && (!q || `${p.name} ${p.model} ${p.description} ${JSON.stringify(p.specs)} ${(p.capabilities||[]).join(' ')}`.toLowerCase().includes(q)) && (!frequencyText||!Number.isFinite(frequency)||(Boolean(window)&&frequency>=window.min&&frequency<=window.max)) && (!priceText||(price>0&&price<=priceLimit))});
    rows.sort((a,b)=>sort==='price-asc'?a.price-b.price:sort==='price-desc'?b.price-a.price:sort==='model'?a.model.localeCompare(b.model):Number(b.featured)-Number(a.featured)||a.id-b.id);
    $('#product-grid').innerHTML = rows.length ? rows.map(productCard).join('') : `<div class="empty">${favoritesOnly?'还没有收藏符合条件的产品':'没有符合条件的产品'}</div>`;
    $('#product-result-count').textContent=`找到 ${rows.length} 款产品`;
    const conditions=[category&&state.categories.find(c=>c.code===category)?.name,frequencyText&&`${frequencyText} GHz`,priceText&&`不超过 ¥${priceText}`,favoritesOnly&&'仅收藏',q&&`“${q}”`].filter(Boolean);$('#product-filter-summary').textContent=conditions.length?conditions.join(' · '):'显示全部已发布商品';
  };
  $$('.category-chip').forEach(button => button.onclick = () => { $$('.category-chip').forEach(x=>x.classList.remove('active')); button.classList.add('active'); update(); });
  $('#favorite-filter').onclick=e=>{e.currentTarget.classList.toggle('active');e.currentTarget.setAttribute('aria-pressed',String(e.currentTarget.classList.contains('active')));update()};
  ['#product-search','#product-frequency'].map(id=>$(id)).filter(Boolean).forEach(control=>control.oninput=update);['#product-price','#product-sort'].map(id=>$(id)).filter(Boolean).forEach(control=>control.onchange=update);$('#clear-product-filters').onclick=()=>{$$('.category-chip').forEach(button=>button.classList.toggle('active',button.dataset.category===''));$('#favorite-filter').classList.remove('active');$('#favorite-filter').setAttribute('aria-pressed','false');$('#product-search').value='';if($('#product-frequency'))$('#product-frequency').value='';if($('#product-price'))$('#product-price').value='';$('#product-sort').value='featured';update()};update();
  if($('#clear-recent-products'))$('#clear-recent-products').onclick=()=>{localStorage.removeItem('zya-recent-products');$('.recent-products').remove();toast('最近浏览已清除')};
}

async function renderCompare() {
  await ensureCatalog();
  const selected = state.compare.map(id => state.products.find(p => p.id === id)).filter(Boolean);
  const allSpecs = [...new Set(selected.flatMap(p => Object.keys(p.specs || {})))];
  app.innerHTML = `<div class="page" data-module="compare"><span class="eyebrow">PRODUCT COMPARISON</span><h1 class="page-title">把关键差异放在<br><em>同一张表里</em></h1>
    <div class="compare-bar" data-review-id="compare.selection"><div>${selected.length ? selected.map(p=>`<span class="compare-pill">${escapeHtml(p.model)} <button data-compare="${p.id}" aria-label="移除">×</button></span>`).join('') : '<span style="color:var(--muted)">还没有选择产品</span>'}</div><a class="button secondary" href="#products">${selected.length?'继续添加':'前往产品中心'}</a></div>
    ${selected.length < 2 ? '<div class="empty panel">请至少添加两款产品进行对比，最多可同时选择三款。</div>' : `<div class="comparison-wrap" data-review-id="compare.table"><table class="comparison-table"><thead><tr><th>比较项目</th>${selected.map(p=>`<th><a href="#product/${p.slug}">${escapeHtml(p.model)}</a></th>`).join('')}</tr></thead><tbody>
      <tr><td>产品名称</td>${selected.map(p=>`<td>${escapeHtml(p.name)}</td>`).join('')}</tr><tr><td>销售价格</td>${selected.map(p=>`<td><b>${priceLabel(p.price)}</b></td>`).join('')}</tr><tr><td>产品类型</td>${selected.map(p=>`<td>${escapeHtml(p.category_code)}</td>`).join('')}</tr>
      ${allSpecs.map(key=>`<tr><td>${escapeHtml(key)}</td>${selected.map(p=>`<td>${escapeHtml(p.specs?.[key] || '—')}</td>`).join('')}</tr>`).join('')}
      <tr><td>操作</td>${selected.map(p=>`<td><a class="button secondary compact" href="#product/${p.slug}">查看详情</a> <button class="button primary compact" data-add-cart="${p.id}">加入清单</button></td>`).join('')}</tr>
    </tbody></table></div>`}</div>`;
}
function zye660Essentials(){return `<section class="zye660-essentials" data-review-id="product.zye660.essentials"><div class="section-head"><div><span class="eyebrow">BEFORE POWER ON</span><h2>先确认版本，再接电源</h2></div><p>外形相似，但允许的供电方式不同</p></div><div class="zye-version-grid"><article><b>P</b><h3>电源直供款</h3><strong>3.4–20 V DC</strong><p>XH2.54 或 Type-C 二选一供电；没有充电和低电检测功能。</p></article><article><b>C</b><h3>锂电充电款</h3><strong>4.2 V 锂电池</strong><p>Type-C 接入 3.4–7 V 充电，支持边充边用但不推荐。</p></article><article><b>M</b><h3>内置电池款</h3><strong>内置锂电池</strong><p>使用方式同 C 款，通过 Type-C 充电，无需外接电池。</p></article></div><div class="zye-mode-grid"><article><span>01</span><div><b>并行拨码</b><p>第 1 位 PS 往下拨为 0；第 2–8 位往上拨为 ON，衰减量为各档位之和。</p></div></article><article><span>02</span><div><b>SPI 串行</b><p>第 1 位 PS 往上拨为 1；通过 SI、CLK、LE 传输 8 位数据，目标衰减乘以 4 得到控制码。</p></div></article></div><div class="zye-warning-grid"><div><b>不是自动功率控制器</b><span>设定的是相对衰减变化量，不会自动输出指定功率。</span></div><div><b>不支持直流偏置输入</b><span>最低工作频率为 9 kHz，RF IN 不可叠加直流电压。</span></div><div><b>以实际测量为准</b><span>器件存在衰减误差与相位误差，精密应用应使用仪器校准。</span></div></div></section>`}

const PRODUCT_RELATIONS={
  'zya-dat-63':['zyc100-controller','zya-lna-6000','zya-pd-4'],
  'zyc100-controller':['zya-dat-63','zya-lna-6000','zya-pd-4']
};
function relatedProductsFor(product){
  const configured=Array.isArray(product.related_slugs)&&product.related_slugs.length?product.related_slugs:(PRODUCT_RELATIONS[product.slug]||[]);
  const preferred=configured.map(slug=>state.products.find(item=>item.slug===slug)).filter(item=>item&&item.id!==product.id);
  const fallback=state.products.filter(item=>item.id!==product.id&&!preferred.some(row=>row.id===item.id)).sort((a,b)=>Number(b.category_code===product.category_code)-Number(a.category_code===product.category_code)||Number(b.featured)-Number(a.featured)||a.id-b.id);
  return [...preferred,...fallback].slice(0,3);
}
function ecosystemLinks(product){
  const isController=product.slug==='zyc100-controller',isAttenuator=product.slug==='zya-dat-63';
  if(!isController&&!isAttenuator)return '';
  return `<section class="product-ecosystem" data-review-id="product.${escapeHtml(product.slug)}.ecosystem"><div class="section-head"><div><span class="eyebrow">PRODUCT ECOSYSTEM</span><h2>控制器、模块与上位机协同使用</h2></div><p>相关入口按实际组合关系连接</p></div><div class="ecosystem-grid">
    <a href="#product/${isController?'zya-dat-63':'zyc100-controller'}"><span>${isController?'RF MODULE':'CONTROLLER'}</span><b>${isController?'ZYE660 数字衰减模块':'ZYC100 射频测试控制器'}</b><p>${isController?'由 ZYC100 完成衰减设置、扫描和自动化控制。':'连接 ZYE660，实现本机操作与上位机统一控制。'}</p><i>查看产品 →</i></a>
<a href="${sitePath('zya1000-console.html?v=1.30.1')}" target="_blank" rel="noopener"><span>WEB CONSOLE</span><b>ZYA1000 网页上位机</b><p>设备发现、多设备同步、补偿数据、日志和自动化测试。</p><i>打开网页版上位机 →</i></a>
    <a href="#downloads"><span>DOCUMENTS</span><b>说明书、固件与软件</b><p>资料由 Pages 静态站和 Gitee 发布页提供，按型号集中查找。</p><i>前往下载中心 →</i></a>
  </div></section>`;
}
function controllerEntryHub(product){
  if(product.slug!=='zyc100-controller')return '';
  const serialReady='serial' in navigator;
  return `<section class="controller-entry-hub" data-review-id="product.zyc100.controller-center">
    <div class="controller-entry-head"><div><span class="eyebrow">CONTROLLER WORKSPACE</span><h2>ZYC100 控制与资料入口</h2><p>控制器相关操作集中在产品页，不再占用网站顶部导航。</p></div><span class="serial-ready ${serialReady?'on':''}">${serialReady?'● 当前浏览器支持串口直连':'○ 当前浏览器不支持 Web Serial'}</span></div>
    <div class="controller-entry-grid">
<a class="primary-entry" href="${sitePath('zya1000-console.html?v=1.30.1')}" target="_blank" rel="noopener"><span>WEB APP</span><b>打开网页版上位机</b><p>连接 USB CDC，控制衰减、多设备同步并执行自动化时间线。</p><i>进入全功能控制台 →</i></a>
<a href="${sitePath('zya1000-console.html?v=1.30.1&embed=compact')}" target="_blank" rel="noopener"><span>QUICK CONTROL</span><b>快速衰减控制</b><p>只保留衰减值和实时通信日志，适合现场快速调整。</p><i>打开紧凑模式 →</i></a>
      <a href="${sitePath('legacy/ZYC100_Manual_V5.0.html')}" target="_blank" rel="noopener"><span>CONTROLLER MANUAL</span><b>ZYC100 在线说明书</b><p>查看接口、按键、本机操作、AT 指令和模块连接方法。</p><i>查看控制器说明书 →</i></a>
      <a href="${sitePath('legacy/ZYA1000_User_Manual.html')}" target="_blank" rel="noopener"><span>SOFTWARE MANUAL</span><b>ZYA1000 使用说明</b><p>查看设备发现、补偿参数、多设备控制和自动化测试流程。</p><i>查看软件说明书 →</i></a>
      <a href="https://gitee.com/ZXYHtech/zyc100/releases" target="_blank" rel="noopener"><span>FIRMWARE</span><b>控制器固件发布</b><p>获取 ZYC100 固件、版本说明及升级文件。</p><i>前往 Gitee →</i></a>
      <a href="https://gitee.com/ZXYHtech/zya1000/releases" target="_blank" rel="noopener"><span>OFFLINE APP</span><b>下载离线版上位机</b><p>用于不支持 Web Serial 的浏览器或需要长期离线运行的电脑。</p><i>下载桌面软件 →</i></a>
    </div>
    <div class="controller-start-flow"><b>快速开始</b><ol><li>断电连接 ZYE660 等兼容模块</li><li>用 USB 数据线连接电脑</li><li>打开网页版上位机并授权串口</li><li>确认设备状态后开始控制</li></ol><a href="#product/zya-dat-63">查看配套 ZYE660 →</a></div>
  </section>`;
}
function controllerConsoleEmbed(product){
  if(product.slug!=='zyc100-controller')return '';
  return `<section class="controller-console-inline" data-review-id="product.zyc100.web-console">
<div class="section-head"><div><span class="eyebrow">WEB SERIAL CONTROL</span><h2>网页衰减控制</h2><p>连接控制器后，仅显示衰减控制和实时通信日志。</p></div><a class="button primary" href="${sitePath('zya1000-console.html?v=1.30.1')}" target="_blank" rel="noopener">进入全屏上位机 →</a></div>
<iframe data-zya-compact src="${sitePath('zya1000-console.html?v=1.30.1&embed=compact')}" title="ZYA1000 快速衰减控制" allow="serial" loading="lazy"></iframe>
  </section>`;
}
function productBrandFooter(product){
return `<section class="product-brand-footer" data-review-id="product.${escapeHtml(product.slug)}.brand"><img src="${sitePath('legacy/assets/zxyh-logo-cutout-v1.png')}" alt="智行远航科技"><div><span class="eyebrow">ZXYH TECHNOLOGY</span><h2>智行远航科技出品</h2><p>${escapeHtml(product.model)} 的产品信息、说明书和配套入口均在本页统一维护。</p></div><nav><a href="#products">全部产品</a><a href="#downloads">资料下载</a><a href="#support">联系我们</a></nav></section>`;
}

async function renderProduct(slug) {
  await ensureCatalog();
  const [{product}, availabilityResult] = await Promise.all([api(`/api/products/${slug}`), api(`/api/products/${slug}/availability`).catch(()=>({availability:{quantity:'—',available:false,mode:'offline'}}))]);
  const previousRecent=recentProductIds().filter(id=>id!==product.id).map(id=>state.products.find(item=>item.id===id)).filter(Boolean).slice(0,3);
  rememberProduct(product.id);
  const relatedProducts=relatedProductsFor(product);
  const a = availabilityResult.availability;
  const category=state.categories.find(item=>item.code===product.category_code);
  const publicResources=[...product.documents.map(d=>({...d,resource_id:`document-${d.id}`,resource_type:d.doc_type,url:d.file_url,source:'document',available:true})),...product.assets.filter(a=>a.asset_type!=='image').map(a=>({...a,resource_id:`asset-${a.id}`,resource_type:a.asset_type,url:a.asset_url,source:'asset',available:true}))];
  app.innerHTML = `<div class="page ${product.model==='ZYC100'?'controller-detail-page':''}" data-module="product-detail"><nav class="product-breadcrumb" aria-label="商品分类层级"><a href="#home">首页</a><i aria-hidden="true">›</i><a href="#products">产品中心</a><i aria-hidden="true">›</i><a href="#products/category/${encodeURIComponent(product.category_code)}">${escapeHtml(category?.name||product.category_code)}</a><i aria-hidden="true">›</i><span aria-current="page">${escapeHtml(product.model)}</span></nav><div class="detail-hero">
    <div class="model-panel">${productVisual(product, true)}</div>
    <section class="detail-copy" data-review-id="product.${product.slug}.summary"><span class="eyebrow">${escapeHtml(product.model)}</span><h1>${escapeHtml(product.name)}</h1><p class="subtitle">${escapeHtml(product.subtitle)}</p><p class="description">${escapeHtml(product.description)}</p>
      <div class="capabilities">${product.capabilities.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div>
      <div class="detail-buy"><div><small class="stock">${a.available ? '● 当前可售' : '○ 请询价'} · ${escapeHtml(a.mode)}库存 ${escapeHtml(a.quantity)}</small><div class="price">${priceLabel(product.price)}</div></div><button class="button ghost favorite-detail ${state.favorites.includes(product.id)?'active':''}" data-favorite="${product.id}" aria-pressed="${state.favorites.includes(product.id)}"><span>♥</span><span data-favorite-label>${state.favorites.includes(product.id)?'已收藏':'收藏'}</span></button><button class="button primary" data-add-cart="${product.id}">加入购买清单</button></div>
      <div class="tab-row"><button class="active">关键参数</button><button onclick="document.querySelector('#tutorial-section').scrollIntoView()">快速指导</button>${publicResources.length?`<button onclick="document.querySelector('#document-section').scrollIntoView()">资料</button>`:''}</div>
      <table class="spec-table" data-review-id="product.${product.slug}.specs">${Object.entries(product.specs).map(([k,v])=>`<tr><td>${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`).join('')}</table>
    </section></div>
    ${controllerConsoleEmbed(product)}
    ${controllerEntryHub(product)}
    ${product.attenuator ? attenuatorCalculator(product) : ''}
    ${product.model==='ZYE660'?zye660Essentials():''}
    <section id="tutorial-section" style="margin-top:90px" data-review-id="product.${product.slug}.tutorial"><div class="section-head"><div><span class="eyebrow">QUICK START</span><h2>跟着步骤完成第一次使用</h2></div><p>约 ${product.tutorials[0]?.duration_minutes || 3} 分钟</p></div>
      <div class="product-guide-layout"><div class="panel steps">${(product.tutorials[0]?.steps || []).map(s=>`<div class="step"><h4>${escapeHtml(s.title)}</h4><p>${escapeHtml(s.body)}</p></div>`).join('')}</div>${product.tutorials[0]?`<aside class="panel product-guide-cta"><span class="eyebrow">INTERACTIVE MODE</span><h3>一次只完成一个动作</h3><p>进入视觉操作模式，逐步确认并自动保存进度。</p><a class="button primary" href="#tutorial/${product.tutorials[0].id}">开始交互指导 →</a></aside>`:''}</div></section>
    ${publicResources.length?`<section id="document-section" style="margin-top:70px" data-review-id="product.${product.slug}.documents"><div class="section-head"><div><span class="eyebrow">DOWNLOADS</span><h2>产品资料与资源</h2></div><a href="#downloads">打开下载中心 →</a></div><div class="resource-list">${publicResources.map(r=>resourceCard(r,{showProduct:false})).join('')}</div></section>`:''}
    ${ecosystemLinks(product)}
    ${relatedProducts.length?`<section class="product-discovery" data-review-id="product.${product.slug}.related"><div class="section-head"><div><span class="eyebrow">BUILD YOUR RF CHAIN</span><h2>继续搭建完整射频链路</h2></div><a href="#products">查看全部产品 →</a></div><div class="product-grid">${relatedProducts.map(productCard).join('')}</div></section>`:''}
    ${previousRecent.length?`<section class="product-history" data-review-id="product.${product.slug}.history"><div class="section-head"><div><span class="eyebrow">BACK TO RECENT</span><h2>刚才看过的产品</h2></div></div><div class="recent-product-list">${previousRecent.map(compactProductLink).join('')}</div></section>`:''}
    ${productBrandFooter(product)}
  </div>`;
  bindProductViewers();
  if (product.attenuator) bindAttenuator(product.attenuator);
}
function attenuatorCalculator(product) {
  const config=product.attenuator,step=Number(config.step)||.5,max=Number(config.max)||0,presets=[0,10,20,30,max].filter((value,index,rows)=>value<=max&&rows.indexOf(value)===index);
  return `<section class="calculator panel" data-review-id="product.${product.slug}.attenuator-calculator"><div class="calculator-heading"><div><span class="eyebrow">ATTENUATION CALCULATOR</span><h2>拨码与 SPI 衰减计算器</h2><p class="calculator-lead">DIP1（PS）决定控制模式；DIP2–DIP8 仅在 PS=0 时参与衰减。</p></div><div class="mode-summary" id="mode-summary"><b>并行拨码</b><span>PS = 0</span></div></div><div class="calculator-workspace"><div class="calculator-input-panel"><div class="attenuator-presets" aria-label="常用衰减值">${presets.map(value=>`<button type="button" data-attenuation-preset="${value}">${value===max?'最大值':`${value} dB`}</button>`).join('')}</div><div class="calculator-row"><label><span>目标衰减</span><span class="attenuation-input-wrap"><input id="attenuation-input" type="number" min="0" max="${max}" step="${step}" value="${Math.min(.5,max)}"><i>dB</i><span class="attenuation-stepper"><button type="button" data-attenuation-step="up" aria-label="增加一个步进">▲</button><button type="button" data-attenuation-step="down" aria-label="减少一个步进">▼</button></span></span></label><button type="button" class="button primary" id="calculate-attenuation">计算配置</button></div><div class="calc-result" id="calc-result" role="status"></div></div><div class="calculator-switch-panel"><div class="dip-legend"><span><i class="top"></i>顶部 = ON</span><span><i class="bottom"></i>底部 = OFF</span></div><p class="dip-instruction">先设置 DIP1（PS）。PS=1 时进入 SPI 模式，DIP2–DIP8 不再控制衰减。</p><div class="dip-switches" id="dip-switches"></div></div></div><div class="calculator-footer"><div class="calculator-actions"><button type="button" class="button ghost" id="copy-attenuation">复制配置</button><button type="button" class="button secondary" id="send-attenuation">发送至 ZYA1000</button><span>${zyaBridge.mode==='browser-demo'?'当前为浏览器演示模式':'已连接上位机'}</span></div><div class="calculator-safety"><b>使用前检查</b><span>请确认 RF IN/OUT 线缆连接可靠，并确认左上角电源开关已开启、PWR 绿色指示灯点亮。</span></div></div></section>`;
}
function bindAttenuator(config) {
  const step=Number(config.step)||.5,max=Math.max(0,Number(config.max)||0),bits=(config.bits||[]).map(Number).filter(value=>Number.isFinite(value)&&value>0),switchStart=Number(config.switch_start)||1,digits=Math.max(0,String(step).split('.')[1]?.length||0),input=$('#attenuation-input'),switches=$('#dip-switches'),result=$('#calc-result'),modeSummary=$('#mode-summary');let current=null,psOn=false;
  if(zyaBridge.mode==='browser-demo')$('.calculator-actions>span').textContent='可转交网页上位机，连接后自动发送';
  const format=value=>Number(value.toFixed(Math.min(digits+1,4)));
  const dipMarkup=(number,label,value,on,options={})=>`<button type="button" class="dip-toggle ${on?'on':'off'} ${options.ps?'ps-switch':''} ${options.locked?'locked':''}" ${options.ps?'data-ps-switch':'data-dip="'+options.index+'"'} aria-pressed="${on}" ${options.locked?'disabled aria-disabled="true"':''}><span class="dip-number">${number}</span><span class="dip-on-label">ON</span><span class="dip-track"><i></i></span><b>${label}</b><small>${value}</small></button>`;
  const calculate = () => {
    const requested = Number(input.value);
    if(input.value===''||!Number.isFinite(requested)){switches.innerHTML='';result.innerHTML='<span class="calc-warning">请输入有效的衰减值。</span>';current=null;return}
    const clamped = Math.max(0, Math.min(max, requested));
    const achievable = format(Math.round(clamped / step) * step);
    let remaining = Math.round(achievable / step);
    const unitBits = bits.map(v => Math.round(v / step));
    const on = unitBits.map(bit => Boolean(remaining & bit));
    switches.innerHTML = dipMarkup(1,'PS',psOn?'SPI 串行':'并行拨码',psOn,{ps:true}) + bits.map((value,i)=>dipMarkup(switchStart+i,`DIP${switchStart+i}`,`${value} dB`,on[i],{index:i,locked:psOn})).join('');
    const selected = bits.filter((_,i)=>on[i]),switchNames=on.map((active,index)=>active?`DIP${switchStart+index}`:'').filter(Boolean),code=Math.round(achievable/step),hex=`0x${code.toString(16).toUpperCase().padStart(2,'0')}`,binary=code.toString(2).padStart(8,'0');current={requested,achievable,on,selected,switchNames,code,hex,binary};
    current.ps=psOn?1:0;current.mode=psOn?'spi':'parallel';
    const limited=requested<0||requested>max,rounded=Math.abs(requested-achievable)>1e-9;
    modeSummary.innerHTML=psOn?'<b>SPI 串行控制</b><span>PS = 1 · DIP2–DIP8 已停用</span>':'<b>并行拨码控制</b><span>PS = 0 · DIP2–DIP8 有效</span>';
    modeSummary.classList.toggle('spi',psOn);
    result.innerHTML = `<div><span>${psOn?'SPI 目标衰减':'拨码可实现衰减'}</span><b>${achievable} dB</b></div><p>${psOn?'DIP2–DIP8 的物理位置将被忽略，请通过 SI、CLK、LE 写入控制码。':`拨到顶部 ON：${switchNames.length?switchNames.join('、'):'无'}${selected.length?`（${selected.join(' + ')} dB）`:''}`}</p><div class="spi-code"><span>SPI 控制码</span><code>${code} · ${hex} · ${binary}</code></div>${limited?`<span class="calc-warning">输入超出 0–${max} dB 范围，已按允许范围计算。</span>`:rounded?`<span class="calc-warning">已按 ${step} dB 步进取整，误差 ${format(achievable-requested)} dB。</span>`:''}`;
  };
  $('#calculate-attenuation').onclick = calculate; input.oninput = calculate;
  $$('[data-attenuation-step]').forEach(button=>button.onclick=()=>{const value=Number(input.value),base=Number.isFinite(value)?value:0,direction=button.dataset.attenuationStep==='up'?1:-1;input.value=String(format(Math.max(0,Math.min(max,base+direction*step))));calculate()});
  switches.onclick=e=>{const ps=e.target.closest('[data-ps-switch]');if(ps){psOn=!psOn;calculate();return}const button=e.target.closest('[data-dip]');if(!button||psOn)return;const selected=$$('.dip-toggle.on[data-dip]',switches).map(item=>Number(item.dataset.dip)),index=Number(button.dataset.dip),next=selected.includes(index)?selected.filter(value=>value!==index):[...selected,index],value=format(next.reduce((sum,bitIndex)=>sum+bits[bitIndex],0));input.value=String(value);calculate()};
  $$('[data-attenuation-preset]').forEach(button=>button.onclick=()=>{input.value=button.dataset.attenuationPreset;calculate()});
  $('#copy-attenuation').onclick=async()=>{if(!current)return toast('请先输入有效衰减值');const text=current.ps?`衰减 ${current.achievable} dB；DIP1/PS=1（SPI）；控制码：${current.code}/${current.hex}/${current.binary}；DIP2–DIP8 无效`:`衰减 ${current.achievable} dB；DIP1/PS=0（并行）；顶部 ON：${current.switchNames.join('、')||'无'}；SPI参考码：${current.code}/${current.hex}/${current.binary}`;try{await navigator.clipboard.writeText(text);toast('控制配置已复制')}catch(_){toast(text)}};
  $('#send-attenuation').onclick=async e=>{if(!current)return toast('请先输入有效衰减值');const button=e.currentTarget;button.disabled=true;try{const response=await zyaBridge.send('set-attenuation',{mode:current.mode,ps:current.ps,value_db:current.achievable,spi_code:current.code,switches:[{switch:1,on:Boolean(current.ps),role:'PS'},...current.on.map((on,index)=>({switch:switchStart+index,on:current.ps?false:on,ignored:Boolean(current.ps),value_db:bits[index]}))]});if(response?.queued){toast(`已转交 ${current.achievable} dB，正在打开控制器`);setTimeout(()=>location.hash='#product/zyc100-controller',180)}else toast('衰减配置已发送至 ZYA1000')}catch(err){toast(err.message)}finally{button.disabled=false}};
  calculate();
}

function productFrequencyWindow(product){const specs=product.specs||{},text=String(specs['工作频段']||specs['频率范围']||specs['通带']||specs['中心频率']||''),matches=[...text.matchAll(/(\d+(?:\.\d+)?)\s*(kHz|MHz|GHz)?/gi)];if(!matches.length)return null;const fallback=/kHz/i.test(text)&&!/MHz|GHz/i.test(text)?'kHz':/MHz/i.test(text)&&!/GHz/i.test(text)?'MHz':'GHz',values=matches.map(match=>{const unit=(match[2]||fallback).toLowerCase();return Number(match[1])*(unit==='khz'?.000001:unit==='mhz'?.001:1)});if(values.length===1)return{min:Math.max(0,values[0]-.05),max:values[0]+.05,label:text};return{min:Math.min(...values),max:Math.max(...values),label:text}}
function scoreProduct(product,requirements){const window=productFrequencyWindow(product),frequencyKnown=Boolean(window),frequencyOk=frequencyKnown&&requirements.frequency>=window.min&&requirements.frequency<=window.max,taskCategories={'实验室测量':['attenuator','amplifier','divider'],'自动化测试':['attenuator'],'无线接收':['amplifier','filter'],'多通道分配':['divider','amplifier'],'干扰抑制':['filter','attenuator']},taskOk=(taskCategories[requirements.task]||[]).includes(product.category_code),price=Number(product.price),priceKnown=price>0,budgetOk=priceKnown&&price<=requirements.budget,reasons=[];let score=15;if(frequencyOk){score+=42;reasons.push(`覆盖 ${requirements.frequency} GHz`)}else{score-=35;reasons.push(frequencyKnown?`频率范围 ${window.label}`:'未提供可验证的频率范围')}if(taskOk){score+=25;reasons.push(`适合${requirements.task}`)}else reasons.push(`并非${requirements.task}首选`);if(budgetOk){score+=12;reasons.push(`预算内余量 ${money(requirements.budget-price)}`)}else if(!priceKnown){score-=8;reasons.push('价格需要联系询价')}else{score-=18;reasons.push(`超预算 ${money(price-requirements.budget)}`)}if(requirements.priority==='价格优先'&&priceKnown)score+=Math.max(0,14-price/100);if(requirements.priority==='易用优先')score+=Math.min(12,(product.capabilities||[]).length*2+(product.specs?.供电?0:4));if(requirements.priority==='性能优先'&&frequencyOk)score+=8;if(!frequencyOk)score=Math.min(score,39);return{product,score:Math.max(0,Math.min(99,Math.round(score))),frequencyOk,frequencyKnown,priceKnown,taskOk,budgetOk,reasons}}
async function renderSelector() {
  await ensureCatalog();
  app.innerHTML = `<div class="page" data-module="selector"><span class="eyebrow">SMART SELECTOR</span><h1 class="page-title">告诉我你的目标，<br><em>得到有理由的推荐</em></h1><p class="lead">频率是硬约束，应用任务和预算参与评分。推荐结果会同时解释“为什么适合”和“哪里存在风险”。</p><div class="selector-layout selector-v2">
    <section class="panel selector-form" data-review-id="selector.form"><div class="selector-form-head"><span>01</span><div><h2>填写使用条件</h2><p>无需理解全部射频参数</p></div></div><label>需要哪类功能<select id="select-category"><option value="">暂不确定，由系统推荐</option>${state.categories.map(c=>`<option value="${c.code}">${c.name}</option>`).join('')}</select></label>
      <label>目标工作频率 <span class="selector-value"><b id="frequency-value">2.45 GHz</b><small>0.1–12 GHz</small></span><input id="select-frequency" type="range" min="0.1" max="12" step="0.05" value="2.45"></label>
      <label>我的主要任务<select id="select-task"><option>实验室测量</option><option>自动化测试</option><option>无线接收</option><option>多通道分配</option><option>干扰抑制</option></select></label>
      <label>单件预算上限 <span class="selector-value"><b id="budget-value">¥900</b><small>人民币</small></span><input id="select-budget" type="range" min="300" max="1500" step="50" value="900"></label>
      <label>推荐偏好<select id="select-priority"><option>性能优先</option><option>价格优先</option><option>易用优先</option></select></label><button class="button primary" id="run-selector">重新计算推荐</button><small class="selector-disclaimer">结果用于初步选型，最终仍应核对最大输入功率、接口和环境条件。</small></section>
    <section class="selector-output"><div class="section-head"><div><span class="eyebrow">MATCH SCORE</span><h2>推荐结果</h2></div><a class="selector-compare-link" href="#compare">打开参数对比 →</a></div><div class="selector-requirements" id="selector-requirements"></div><div class="selector-results" id="selector-results"></div></section></div></div>`;
  const update=()=>{const requirements={category:$('#select-category').value,frequency:Number($('#select-frequency').value),task:$('#select-task').value,budget:Number($('#select-budget').value),priority:$('#select-priority').value},ranked=state.products.filter(p=>!requirements.category||p.category_code===requirements.category).map(p=>scoreProduct(p,requirements)).sort((a,b)=>b.score-a.score);$('#selector-requirements').innerHTML=`<span>${requirements.frequency} GHz</span><span>${escapeHtml(requirements.task)}</span><span>预算 ${money(requirements.budget)}</span><span>${escapeHtml(requirements.priority)}</span>`;$('#selector-results').innerHTML=ranked.map((result,index)=>{const p=result.product,label=!result.frequencyOk?'频率不匹配':result.score>=75?'高度匹配':result.score>=55?'可以考虑':'谨慎选择';return `<article class="selector-result ${result.frequencyOk?'':'has-risk'}" data-review-id="selector.result.${p.slug}"><div class="selector-rank">${String(index+1).padStart(2,'0')}</div><div class="selector-product-visual">${p.image_url?`<img class="selector-product-image" src="${escapeHtml(p.image_url)}" alt="${escapeHtml(p.name)}">`:'<div class="mini-device"></div>'}</div><div class="selector-result-main"><div class="selector-result-title"><span class="eyebrow">${escapeHtml(p.model)}</span><h3>${escapeHtml(p.name)}</h3></div><div class="score-line"><i style="width:${result.score}%"></i></div><div class="reason-chips">${result.reasons.map((reason,i)=>`<span class="${(i===0&&!result.frequencyOk)||(i===2&&!result.budgetOk)?'warn':''}">${escapeHtml(reason)}</span>`).join('')}</div><p>${escapeHtml(p.subtitle)}</p></div><div class="selector-result-side"><strong>${result.score}<small>/100</small></strong><b class="match-label">${label}</b><span>${money(p.price)}</span><div><button class="button ghost compact" data-compare="${p.id}">${state.compare.includes(p.id)?'已在对比':'加入对比'}</button><a class="button secondary compact" href="#product/${p.slug}">查看产品</a></div></div></article>`}).join('')||'<div class="empty panel">当前分类暂无产品，请返回选择“暂不确定”。</div>'};
  const refreshSelector=()=>{update();$$('.selector-product-image').forEach(img=>{const product=state.products.find(item=>item.name===img.alt),url=productDisplayImage(product);if(url)img.src=url})};
  $('#select-frequency').oninput=e=>{$('#frequency-value').textContent=`${Number(e.target.value).toFixed(2).replace(/0+$/,'').replace(/\.$/,'')} GHz`;refreshSelector()};$('#select-budget').oninput=e=>{$('#budget-value').textContent=money(e.target.value);refreshSelector()};['#select-category','#select-task','#select-priority'].forEach(id=>$(id).onchange=refreshSelector);$('#run-selector').onclick=refreshSelector;refreshSelector();
}

async function renderTutorials() {
  const {rows} = await api('/api/tutorials');
  const progress=JSON.parse(localStorage.getItem('zya-tutorial-progress')||'{}');
  const card=t=>{const saved=progress[t.id]||{},done=saved.completed===true,current=Math.min(Number(saved.step||0)+1,t.steps.length);return `<article class="tutorial-entry" data-review-id="tutorial.card.${t.id}">
    <div class="tutorial-entry-visual"><span>${escapeHtml(t.model)}</span><div class="tutorial-device"><i></i><i></i></div><b>${done?'✓ 已完成':`${current}/${t.steps.length}`}</b></div>
    <div class="tutorial-entry-body"><span class="eyebrow">${escapeHtml(t.tutorial_type.replaceAll('_',' '))} · ${t.duration_minutes} MIN</span><h3>${escapeHtml(t.title)}</h3><p>${escapeHtml(t.summary)}</p><div class="tutorial-entry-meta"><span>${t.steps.length} 个操作步骤</span><a class="button ${done?'ghost':'primary'}" href="#tutorial/${t.id}">${done?'重新查看':'开始指导'} →</a></div></div></article>`};
  app.innerHTML = `<div class="page" data-module="tutorials"><span class="eyebrow">PROFESSIONAL GUIDES</span><h1 class="page-title">少读一点文字，<br><em>多完成一个动作</em></h1><p class="lead">选择产品后进入全屏任务指导。每次只看一个动作，完成进度会自动保存在当前设备。</p>
    <div class="tutorial-tools" data-review-id="tutorials.filters"><label class="search-box"><input id="tutorial-search" placeholder="搜索产品型号或教程"></label><div class="tutorial-summary"><b>${rows.length}</b> 个教程 · <b>${rows.filter(t=>progress[t.id]?.completed).length}</b> 个已完成</div></div>
    <div class="tutorial-library" id="tutorial-library" data-review-id="tutorials.list">${rows.map(card).join('')}</div></div>`;
  $('#tutorial-search').oninput=e=>{const q=e.target.value.trim().toLowerCase();$('#tutorial-library').innerHTML=rows.filter(t=>!q||`${t.model} ${t.product_name} ${t.title} ${t.summary}`.toLowerCase().includes(q)).map(card).join('')||'<div class="empty panel">没有找到匹配的教程</div>'};
}

function tutorialProgress(){try{return JSON.parse(localStorage.getItem('zya-tutorial-progress')||'{}')}catch(_){return {}}}
function saveTutorialProgress(id,value){const all=tutorialProgress();all[id]=value;localStorage.setItem('zya-tutorial-progress',JSON.stringify(all))}
async function renderTutorial(id) {
  const {rows}=await api('/api/tutorials');const tutorial=rows.find(row=>row.id===Number(id));if(!tutorial)return renderNotFound();
  const saved=tutorialProgress()[tutorial.id]||{};let current=Math.min(Number(saved.step||0),Math.max(0,tutorial.steps.length-1));
  const renderStep=()=>{const step=tutorial.steps[current],last=current===tutorial.steps.length-1,percent=Math.round(((current+1)/tutorial.steps.length)*100);app.innerHTML=`<div class="tutorial-player page" data-module="tutorial-player">
    <header class="tutorial-player-head" data-review-id="tutorial.${tutorial.id}.header"><a href="#tutorials" class="tutorial-back">← 全部指导</a><div><span class="eyebrow">${escapeHtml(tutorial.model)} · ${tutorial.duration_minutes} MIN</span><h1>${escapeHtml(tutorial.title)}</h1></div><a class="button ghost compact" href="#product/${tutorial.slug}">产品详情</a></header>
    <div class="tutorial-progress" aria-label="教程进度"><i style="width:${percent}%"></i></div>
    <div class="tutorial-player-grid">
      <section class="tutorial-stage stage-${current%4}" data-review-id="tutorial.${tutorial.id}.visual" data-review-image="tutorial-step:${tutorial.id}:${current}">
        <div class="tutorial-orbit"></div><div class="tutorial-product"><span>${escapeHtml(tutorial.model)}</span><div class="tutorial-ports"><i>IN</i><i>OUT</i></div><div class="tutorial-switches">${[1,2,3,4,5,6].map((_,i)=>`<b class="${i<=current?'active':''}"></b>`).join('')}</div></div>
        <div class="tutorial-callout callout-${current%4}"><b>${current+1}</b><span>${escapeHtml(step.title)}</span></div>
        <small>产品视觉区域帮助用户建立端口与操作位置认知</small>
      </section>
      <section class="tutorial-instruction" data-review-id="tutorial.${tutorial.id}.step.${current}"><span class="tutorial-step-count">步骤 ${current+1} / ${tutorial.steps.length}</span><h2>${escapeHtml(step.title)}</h2><p>${escapeHtml(step.body)}</p>
        <div class="tutorial-safety"><b>${current===0?'核对提示':current===2?'连接安全':'操作提示'}</b><span>${current===0?'型号、版本或接口不一致时，请暂停操作并联系技术支持。':current===2?'务必先关闭信号源输出，再连接射频线缆。':'完成本步后再继续，出现异常输出请立即断电。'}</span></div>
        <label class="tutorial-check"><input id="tutorial-confirm" type="checkbox"><span>我已经完成并检查了这一步</span></label>
        <div class="tutorial-controls"><button class="button ghost" id="tutorial-prev" ${current===0?'disabled':''}>← 上一步</button><button class="button primary" id="tutorial-next" disabled>${last?'完成教程':'下一步 →'}</button></div>
      </section>
    </div>
    <nav class="tutorial-step-nav" aria-label="教程步骤">${tutorial.steps.map((item,index)=>`<button data-tutorial-step="${index}" class="${index===current?'active':''} ${index<current||saved.completed?'visited':''}"><i>${index<current||saved.completed?'✓':index+1}</i><span>${escapeHtml(item.title)}</span></button>`).join('')}</nav>
  </div>`;
    const confirm=$('#tutorial-confirm'),next=$('#tutorial-next'),prev=$('#tutorial-prev');confirm.onchange=()=>next.disabled=!confirm.checked;
    prev.onclick=()=>{if(current>0){current--;saveTutorialProgress(tutorial.id,{step:current,completed:false,updated_at:new Date().toISOString()});renderStep()}};
    next.onclick=()=>{if(!confirm.checked)return;if(last){saveTutorialProgress(tutorial.id,{step:current,completed:true,updated_at:new Date().toISOString()});toast('教程已完成，进度已经保存');location.hash='#tutorials'}else{current++;saveTutorialProgress(tutorial.id,{step:current,completed:false,updated_at:new Date().toISOString()});renderStep()}};
    $$('[data-tutorial-step]').forEach(button=>button.onclick=()=>{current=Number(button.dataset.tutorialStep);saveTutorialProgress(tutorial.id,{step:current,completed:false,updated_at:new Date().toISOString()});renderStep()});
  };renderStep();
}
async function renderDownloads() {
  const {rows} = await api('/api/resources');
  const types=[...new Set(rows.map(r=>r.resource_type))],models=[...new Set(rows.map(r=>r.model))];
  app.innerHTML = `<div class="page" data-module="downloads"><span class="eyebrow">DOWNLOAD CENTER</span><h1 class="page-title">资料不再藏在<br><em>页面的角落</em></h1><p class="lead">统一查找数据手册、尺寸图、测试报告、3D 模型、操作视频、驱动和软件包。</p>
    <div class="download-tools" data-review-id="downloads.filters"><label class="search-box"><input id="doc-search" placeholder="输入型号、文件名称或版本"></label><select id="resource-model"><option value="">全部型号</option>${models.map(model=>`<option>${escapeHtml(model)}</option>`).join('')}</select></div>
    <div class="resource-chips"><button class="filter-chip active" data-resource-filter="">全部</button>${types.map(type=>`<button class="filter-chip" data-resource-filter="${escapeHtml(type)}">${escapeHtml(resourceLabels[type]||type)}</button>`).join('')}</div>
    <div class="download-result-head"><span id="resource-count"></span><small>资料版本由产品团队统一维护</small></div><div class="resource-list" id="resource-list" data-review-id="downloads.grid"></div></div>`;
  const update=()=>{const q=$('#doc-search').value.trim().toLowerCase(),model=$('#resource-model').value,type=$('.resource-chips .active')?.dataset.resourceFilter||'';const selected=rows.filter(r=>(!q||`${r.model} ${r.product_name} ${r.title} ${r.original_name||''} ${r.version}`.toLowerCase().includes(q))&&(!model||r.model===model)&&(!type||r.resource_type===type));$('#resource-count').textContent=`共 ${selected.length} 个文件`;$('#resource-list').innerHTML=selected.map(r=>resourceCard(r)).join('')||'<div class="empty panel">没有找到匹配的资料，请尝试其他型号或分类。</div>'};
  $('#doc-search').oninput=update;$('#resource-model').onchange=update;$$('[data-resource-filter]').forEach(button=>button.onclick=()=>{$$('[data-resource-filter]').forEach(x=>x.classList.remove('active'));button.classList.add('active');update()});update();
}
const orderStatusLabels={submitted:'已提交',processing:'处理中',shipped:'已发货',completed:'已完成',cancelled:'已取消'};
const externalStatusLabels={pushed:'已同步库存系统',failed:'库存同步待重试',not_pushed:'等待库存同步'};
const stockStatusLabels={available:'现货可满足',partial:'部分数量需确认',unavailable:'暂无足量现货',unverified:'库存暂未核实',unchecked:'等待核对库存'};
function orderAccessHash(orderNo,token){return `#order/${encodeURIComponent(orderNo)}?token=${encodeURIComponent(token)}`}
function orderTimeline(order){const steps=[['submitted','需求已提交','系统已经保存购买清单'],['processing','销售处理中','确认库存、价格和交期'],['shipped','商品已发出','物流信息已经登记'],['completed','订单已完成','订单处理流程已经结束']],current=Math.max(0,steps.findIndex(step=>step[0]===order.status));return `<div class="order-timeline ${order.status==='cancelled'?'is-cancelled':''}">${steps.map((step,index)=>`<div class="${index<=current&&order.status!=='cancelled'?'active':''}"><i>${index<current?'✓':index+1}</i><b>${step[1]}</b><span>${step[2]}</span></div>`).join('')}${order.status==='cancelled'?'<div class="active cancelled"><i>×</i><b>订单已取消</b><span>如仍需采购，可以重新加入清单。</span></div>':''}</div>`}
function orderNextContent(order){const content={submitted:['接下来会发生什么？',['销售人员复核库存快照与交期','通过你留下的联系方式确认订单','确认后进入正式订单与发货流程']],processing:['订单正在确认中',['销售人员确认价格、数量与交期','确认完成后安排备货与发出','发货后本页会显示物流单号']],shipped:['包裹正在运输中',['复制物流单号查询运输轨迹','收货时检查包装、型号和数量','如发现异常，请保留包装并联系支持']],completed:['订单已经完成',['妥善保存产品资料与订单编号','可从产品页面查看专业指导','需要再次采购时可重新加入清单']],cancelled:['本次订单已取消',['如仍有需求，可重新加入购买清单','需要调整型号或数量可联系销售','新需求会生成独立订单编号']]};const [title,steps]=content[order.status]||content.submitted;return `<h2>${title}</h2><ol>${steps.map(step=>`<li>${step}</li>`).join('')}</ol>`}
async function renderOrders(){const recent=JSON.parse(localStorage.getItem('zya-last-order')||'null');app.innerHTML=`<div class="page" data-module="order-lookup"><span class="eyebrow">ORDER TRACKING</span><h1 class="page-title">提交之后，<br><em>随时找回处理进度</em></h1><p class="lead">输入订单号，以及下单时填写的电话或邮箱。查询不会展示联系方式和后台成本数据。</p><div class="order-lookup-layout">
  <form class="panel order-lookup-form" id="order-lookup-form" data-review-id="orders.lookup"><h2>查询购买需求</h2><label>订单号<input name="order_no" required placeholder="WEB-20260808..." value="${escapeHtml(recent?.order_no||'')}"></label><label>联系电话或邮箱<input name="contact" required placeholder="必须与下单时填写的一致"></label><button class="button primary">查询订单</button><p class="form-error" id="order-lookup-error"></p></form>
  <aside class="panel order-lookup-help"><span class="eyebrow">WHERE TO FIND</span><h2>在哪里找到订单号？</h2><p>提交成功后，订单号会显示在结果页面并保存在当前浏览器。也可以从销售人员发送的确认信息中找到。</p>${recent?`<a class="recent-order" href="${orderAccessHash(recent.order_no,recent.access_token)}"><span>当前浏览器最近订单</span><b>${escapeHtml(recent.order_no)}</b><small>直接查看 →</small></a>`:''}<div class="order-privacy"><b>隐私说明</b><span>查询必须同时匹配订单号与联系方式，直接访问订单则需要随机访问凭据。</span></div></aside></div></div>`;
  $('#order-lookup-form').onsubmit=async e=>{e.preventDefault();const button=$('button',e.target),error=$('#order-lookup-error');button.disabled=true;error.textContent='';try{const result=await api('/api/orders/lookup',{method:'POST',body:JSON.stringify(Object.fromEntries(new FormData(e.target)))});localStorage.setItem('zya-last-order',JSON.stringify({order_no:result.order.order_no,access_token:result.access_token}));location.hash=orderAccessHash(result.order.order_no,result.access_token)}catch(err){error.textContent=err.message}finally{button.disabled=false}};
}
async function renderOrder(routeValue){const [encodedNo,query='']=routeValue.slice('order/'.length).split('?'),orderNo=decodeURIComponent(encodedNo),token=new URLSearchParams(query).get('token')||'';if(!token){location.hash='#orders';return}const {order}=await api(`/api/orders/${encodeURIComponent(orderNo)}?token=${encodeURIComponent(token)}`);state.currentOrder=order;const success=JSON.parse(localStorage.getItem('zya-last-order')||'null')?.order_no===order.order_no;app.innerHTML=`<div class="page order-page" data-module="order-detail"><div class="order-result-head" data-review-id="order.${escapeHtml(order.order_no)}.summary"><div class="order-result-icon">${order.status==='cancelled'?'×':'✓'}</div><div><span class="eyebrow">${success?'ORDER SAVED':'ORDER STATUS'}</span><h1>${order.status==='submitted'?'购买需求已提交':orderStatusLabels[order.status]||'订单状态'}</h1><p>订单号 <button class="copy-order" data-copy-order="${escapeHtml(order.order_no)}">${escapeHtml(order.order_no)} ⧉</button></p></div><div class="order-total"><small>订单金额</small><b>${money(order.total_amount)}</b><span>${escapeHtml(order.created_at)}</span></div></div>
  ${orderTimeline(order)}${order.tracking_no?`<section class="order-shipment"><div><span class="eyebrow">SHIPPING</span><b>${escapeHtml(order.shipping_carrier||'物流运输')}</b><strong>${escapeHtml(order.tracking_no)}</strong></div><div><small>发货时间</small><span>${escapeHtml(order.shipped_at||order.updated_at||'已登记')}</span></div><button class="button ghost compact" data-copy-tracking="${escapeHtml(order.tracking_no)}">复制物流单号</button></section>`:order.expected_ship_date?`<section class="order-shipment is-expected"><div><span class="eyebrow">EXPECTED SHIPPING</span><b>预计 ${escapeHtml(order.expected_ship_date)} 发货</b></div><span>销售人员确认发货后，物流信息会显示在这里。</span></section>`:''}<div class="order-stock-banner stock-${escapeHtml(order.stock_status||'unchecked')}"><div><span class="eyebrow">STOCK SNAPSHOT</span><b>${escapeHtml(stockStatusLabels[order.stock_status]||order.stock_status)}</b></div><p>${order.stock_status==='available'?'提交时库存快照可以满足清单数量，最终交期仍以销售确认为准。':order.stock_status==='partial'||order.stock_status==='unavailable'?'购买需求已保存，销售人员会确认补货数量和预计交期。':'库存系统暂时无法完成核对，需求不会丢失，销售人员将人工确认。'}</p></div><div class="order-detail-grid"><section class="panel"><div class="section-head"><div><span class="eyebrow">ITEMS</span><h2>商品明细</h2></div><span class="status-tag ${order.external_status==='pushed'?'on':'warn'}">${escapeHtml(externalStatusLabels[order.external_status]||order.external_status)}</span></div><div class="order-items">${order.items.map(item=>{const snapshot=order.stock_snapshot?.[item.material_code],stockText=snapshot?`提交时库存 ${Number(snapshot.quantity).toLocaleString('zh-CN')} 件`:'库存待核对';return `<a class="order-item" href="#product/${escapeHtml(item.slug||'')}"><div class="mini-device"></div><div><b>${escapeHtml(item.model||item.material_code)}</b><span>${escapeHtml(item.product_name)}</span><small>${money(item.unit_price)} × ${item.quantity}</small><small class="order-item-stock">${escapeHtml(stockText)}</small></div><strong>${money(item.line_total)}</strong></a>`}).join('')}</div></section>
  <aside class="panel order-next"><span class="eyebrow">NEXT</span>${orderNextContent(order)}${order.note?`<div class="order-note"><b>下单备注</b><p>${escapeHtml(order.note)}</p></div>`:''}<button class="button secondary" data-repeat-order>再次加入购买清单</button><a class="button ghost" href="#support">联系销售或技术支持</a><a class="order-query-link" href="#orders">查询其他订单</a></aside></div></div>`}
const supportStatusLabels={new:'已收到',processing:'处理中',resolved:'已解决'};
function supportAccessHash(ticketNo,token){return `#support-ticket/${encodeURIComponent(ticketNo)}?token=${encodeURIComponent(token)}`}
function supportTimeline(ticket){const steps=[['new','问题已收到','支持单已经进入处理队列'],['processing','正在处理','销售或技术人员正在跟进'],['resolved','处理完成','本次支持流程已经结束']],current=Math.max(0,steps.findIndex(step=>step[0]===ticket.status));return `<div class="support-timeline">${steps.map((step,index)=>`<div class="${index<=current?'active':''}"><i>${index<current?'✓':index+1}</i><b>${step[1]}</b><span>${step[2]}</span></div>`).join('')}</div>`}
async function renderSupportTicket(routeValue){const [encodedNo,query='']=routeValue.slice('support-ticket/'.length).split('?'),ticketNo=decodeURIComponent(encodedNo),token=new URLSearchParams(query).get('token')||'';if(!token){location.hash='#support';return}const {ticket}=await api(`/api/contacts/${encodeURIComponent(ticketNo)}?token=${encodeURIComponent(token)}&_=${Date.now()}`);app.innerHTML=`<div class="page support-ticket-page" data-module="support-ticket"><div class="support-ticket-head"><div><span class="eyebrow">SUPPORT TRACKING</span><h1>${escapeHtml(supportStatusLabels[ticket.status]||ticket.status)}</h1><p>支持单 <b>${escapeHtml(ticket.ticket_no)}</b></p></div><span class="status-tag ${ticket.status==='resolved'?'on':ticket.status==='processing'?'warn':''}">${escapeHtml(supportStatusLabels[ticket.status]||ticket.status)}</span></div>${supportTimeline(ticket)}<div class="support-ticket-layout"><section class="panel"><span class="eyebrow">YOUR REQUEST</span><h2>${escapeHtml({support:'技术支持',sales:'售前咨询',custom:'定制需求'}[ticket.contact_type]||ticket.contact_type)}</h2>${ticket.product_model?`<p class="support-ticket-model">相关型号：${escapeHtml(ticket.product_model)}</p>`:''}<p class="support-ticket-message">${escapeHtml(ticket.message)}</p><small>提交于 ${escapeHtml(ticket.created_at)}</small></section><aside class="panel support-response"><span class="eyebrow">LATEST RESPONSE</span><h2>${ticket.response?'处理回复':'等待回复'}</h2><p>${ticket.response?escapeHtml(ticket.response):'支持人员处理后，回复会显示在这里。你也可以通过提交时填写的联系方式接收通知。'}</p><small>最后更新：${escapeHtml(ticket.updated_at||ticket.created_at)}</small></aside></div><div class="support-ticket-actions"><a class="button ghost" href="#support">查询其他支持单</a><a class="button primary" href="#products">继续浏览产品</a></div></div>`}
async function renderSupport() {
  await ensureCatalog();
  const recent=JSON.parse(localStorage.getItem('zya-last-support')||'null');
  const typeGuides={support:['请说明供电、连接方式、输入信号和实际现象','例如：使用 5V 供电，接入 1 GHz 信号后没有输出……'],sales:['请说明频率、功率、数量和期望交期','例如：需要覆盖 0.1–6 GHz，预计采购 20 件……'],custom:['请说明目标指标、接口、尺寸和使用环境','例如：需要定制 2–8 GHz、SMA 接口的小型滤波模块……']};
  app.innerHTML = `<div class="page" data-module="support"><span class="eyebrow">CONTACT & SUPPORT</span><h1 class="page-title">把问题说清楚，<br><em>让支持更快到达</em></h1><p class="lead">选择问题类型并留下必要信息，提交后会立即生成支持单编号。</p><div class="support-layout"><section class="panel support-intro"><h2>我们可以协助你</h2><div class="feature-card"><span class="eyebrow">SALES</span><h3>售前选型与批量采购</h3><p>提供频率、功率、数量和交期，我们会协助匹配产品。</p></div><div class="feature-card"><span class="eyebrow">SUPPORT</span><h3>使用问题与故障排查</h3><p>提供型号、供电、连接方式和测试现象，可减少反复确认。</p></div><p class="support-privacy">联系方式仅用于回复本次咨询，不在客户页面公开显示。</p><form class="support-lookup" id="support-lookup-form"><h3>查询支持进度</h3><label>支持单编号<input name="ticket_no" required placeholder="SUP-20260808..." value="${escapeHtml(recent?.ticket_no||'')}"></label><label>提交时的联系方式<input name="contact" required></label><button class="button ghost" type="submit">查询进度</button><p class="form-error" id="support-lookup-error"></p>${recent?`<a class="recent-support" href="${supportAccessHash(recent.ticket_no,recent.access_token)}">打开当前浏览器最近的支持单 →</a>`:''}</form></section>
    <section class="support-submit"><form class="panel support-form" id="support-form" data-review-id="support.form"><h2>提交咨询</h2><label>问题类型<select name="contact_type"><option value="support">技术支持</option><option value="sales">售前选型</option><option value="custom">定制需求</option></select></label><p class="support-type-hint" id="support-type-hint"></p><label>姓名<input name="name" maxlength="80" autocomplete="name" required></label><label>联系方式<input name="contact" maxlength="120" autocomplete="email" required placeholder="手机、微信或邮箱"></label><label>相关型号<select name="product_model"><option value="">暂不确定</option>${state.products.map(p=>`<option>${escapeHtml(p.model)}</option>`).join('')}</select></label><label>问题描述<textarea name="message" rows="6" minlength="10" maxlength="2000" required></textarea><span class="field-meta"><span>至少填写 10 个字</span><span id="support-message-count">0 / 2000</span></span></label><p class="form-error" id="support-error" role="alert"></p><button class="button primary" type="submit">提交问题</button></form>
    <div class="panel support-result" id="support-result" hidden tabindex="-1"><span class="support-result-icon">✓</span><span class="eyebrow">SUBMITTED</span><h2>咨询已经提交</h2><p>支持单编号</p><strong id="support-ticket-id"></strong><p>我们会通过你填写的联系方式回复，也可以随时返回查看处理状态。</p><div class="support-result-actions"><a class="button primary" id="support-track-link" href="#support">查看处理进度</a><button class="button ghost" type="button" id="support-again">再提交一个问题</button></div></div></section></div></div>`;
  const form=$('#support-form'),type=$('[name="contact_type"]',form),message=$('[name="message"]',form),hint=$('#support-type-hint'),count=$('#support-message-count'),error=$('#support-error'),resultPanel=$('#support-result');
  const modelSelect=$('[name="product_model"]',form),modelInput=document.createElement('input'),modelList=document.createElement('datalist');
  modelInput.name='product_model';modelInput.maxLength=80;modelInput.placeholder='输入或选择型号';modelInput.defaultValue='暂不确定';modelInput.value='暂不确定';modelInput.setAttribute('list','support-model-options');
  modelList.id='support-model-options';['暂不确定',...state.products.map(product=>product.model)].forEach(value=>{const option=document.createElement('option');option.value=value;modelList.append(option)});
  modelSelect.replaceWith(modelInput);form.append(modelList);
  const updateGuide=()=>{const guide=typeGuides[type.value]||typeGuides.support;hint.textContent=guide[0];message.placeholder=guide[1]};
  type.onchange=updateGuide;message.oninput=()=>count.textContent=`${message.value.length} / 2000`;updateGuide();
  form.onsubmit=async e=>{e.preventDefault();if(!form.reportValidity())return;const button=$('button[type="submit"]',form),payload=Object.fromEntries(new FormData(form));button.disabled=true;button.textContent='正在提交…';error.textContent='';try{const response=await api('/api/contacts',{method:'POST',body:JSON.stringify(payload)}),saved={ticket_no:response.ticket_no,access_token:response.access_token};localStorage.setItem('zya-last-support',JSON.stringify(saved));$('#support-ticket-id').textContent=response.ticket_no;$('#support-track-link').href=supportAccessHash(saved.ticket_no,saved.access_token);form.hidden=true;resultPanel.hidden=false;resultPanel.focus();toast('咨询已成功提交')}catch(err){error.textContent=err.message}finally{button.disabled=false;button.textContent='提交问题'}};
  $('#support-again').onclick=()=>{form.reset();message.dispatchEvent(new Event('input'));updateGuide();resultPanel.hidden=true;form.hidden=false;$('[name="contact_type"]',form).focus()};
  $('#support-lookup-form').onsubmit=async e=>{e.preventDefault();const button=$('button',e.target),lookupError=$('#support-lookup-error');button.disabled=true;lookupError.textContent='';try{const response=await api('/api/contacts/lookup',{method:'POST',body:JSON.stringify(Object.fromEntries(new FormData(e.target)))}),saved={ticket_no:response.ticket.ticket_no,access_token:response.access_token};localStorage.setItem('zya-last-support',JSON.stringify(saved));location.hash=supportAccessHash(saved.ticket_no,saved.access_token)}catch(err){lookupError.textContent=err.message}finally{button.disabled=false}};
}
async function renderZya() {
  app.innerHTML = `<div class="page zya1000-page" data-module="zya1000"><span class="eyebrow">ZYA1000 DESKTOP APP</span><h1 class="page-title">设备连接、衰减控制与<br><em>自动化测试集中完成</em></h1><p class="lead">ZYA1000 用于连接 ZYC100 控制器，支持设备发现、多设备同步、插入损耗补偿、日志和自动化时间线。</p><div class="zya-hero-actions"><a class="button primary" href="${sitePath('zya1000-console.html?v=1.28.0')}" target="_blank" rel="noopener">打开网页版上位机</a><a class="button secondary" href="${sitePath('legacy/ZYA1000_User_Manual.html')}" target="_blank" rel="noopener">查看在线说明书</a><a class="button secondary" href="https://gitee.com/ZXYHtech/zya1000/releases" target="_blank" rel="noopener">下载离线版上位机</a><a class="button ghost" href="#product/zyc100-controller">查看 ZYC100 控制器</a></div>
    <section class="zya-embedded-console" data-review-id="zya1000.embedded-console"><div class="section-head"><div><span class="eyebrow">WEB CONSOLE</span><h2>在线衰减控制</h2><p>直接连接 ZYC100，仅保留衰减控制与实时通信日志。</p></div><a class="button primary" href="${sitePath('zya1000-console.html?v=1.28.0')}" target="_blank" rel="noopener">进入全屏全功能上位机</a></div><iframe src="${sitePath('zya1000-console.html?v=1.28.0&embed=compact')}" title="ZYA1000 在线衰减控制" allow="serial" loading="lazy"></iframe></section>
    <section class="zya-feature-section"><div class="section-head"><div><span class="eyebrow">CORE WORKFLOW</span><h2>从连接设备到自动化执行</h2></div><a href="${sitePath('legacy/ZYA1000_User_Manual.html')}" target="_blank" rel="noopener">打开完整说明书 →</a></div><div class="ecosystem-grid"><article><span>01</span><b>设备连接</b><p>自动发现 USB CDC 设备，也可手动选择串口并为多个设备设置别名。</p></article><article><span>02</span><b>同步控制</b><p>集中设置衰减、查看通信日志，并维护插入损耗补偿数据。</p></article><article><span>03</span><b>自动化测试</b><p>使用时间线、循环、变量和代码编辑器组合重复测试流程。</p></article></div></section>
<section class="zya-screenshots"><div class="section-head"><div><span class="eyebrow">ZYA1000 SOFTWARE</span><h2>上位机软件一览</h2></div><a class="button secondary" href="https://gitee.com/ZXYHtech/zya1000/releases" target="_blank" rel="noopener">下载离线版上位机</a></div><div class="screenshot-grid">${[['zya1000-start-cutout-v1.png','启动与设备发现'],['zya1000-device-control-cutout-v1.png','设备控制'],['zya1000-multi-device-sync-cutout-v1.png','多设备同步'],['zya1000-auto-timeline-vars-cutout-v1.png','自动化时间线']].map(([file,title])=>`<figure><img src="${sitePath(`legacy/assets/zya1000-screenshots/${file}`)}" alt="${title}" loading="lazy"><figcaption>${title}</figcaption></figure>`).join('')}</div></section>
    <section style="margin-top:70px"><div class="section-head"><div><span class="eyebrow">RELATED PRODUCTS</span><h2>配套产品与资料</h2></div><div><a href="#product/zyc100-controller">ZYC100 控制器 →</a>&nbsp;&nbsp;<a href="#product/zya-dat-63">ZYE660 衰减器 →</a>&nbsp;&nbsp;<a href="#downloads">下载资料 →</a></div></div></section></div>`;
}
async function renderAnalytics(period='30d') {
  if(!state.adminToken){app.innerHTML='<div class="page access-denied"><span class="eyebrow">ADMIN ONLY</span><h1 class="page-title">经营数据仅管理员可见</h1><p class="lead">客户页面不会展示成本、利润或内部库存同步数据。</p><a class="button primary" href="#admin">管理员登录</a></div>';return}
  const routeAtStart=location.hash;
  const p=await adminApi(`/api/analytics/profit-summary?period=${encodeURIComponent(period)}`),periodLabels={'7d':'近 7 天','30d':'近 30 天','90d':'近 90 天',all:'全部时间'},maxTrend=Math.max(1,...p.trend.map(row=>Number(row.revenue))),maxProduct=Math.max(1,...p.products.map(row=>Number(row.gross_profit)));
  if(location.hash!==routeAtStart)return;
  const inventory=[...p.inventory].sort((a,b)=>Number(a.quantity)-Number(b.quantity));
  app.innerHTML=`<div class="page analytics-page" data-module="analytics"><div class="admin-head"><div><span class="eyebrow">BUSINESS ANALYTICS · ADMIN</span><h1 class="page-title">库存、订单与利润，<br><em>集中看清经营状态</em></h1></div><a class="button ghost" href="#admin">返回运营后台</a></div><div class="analytics-toolbar"><div class="analytics-periods" role="group" aria-label="统计周期">${Object.entries(periodLabels).map(([key,label])=>`<button class="${p.period===key?'active':''}" data-analytics-period="${key}">${label}</button>`).join('')}</div><button class="button ghost compact" id="export-analytics">导出本期明细 CSV</button></div>
    <p class="analytics-scope">统计口径：排除已取消订单；成本采用产品当前成本字段。生成时间 ${escapeHtml(p.generated_at)}，仅管理员可见。</p>
    <div class="analytics-kpis" data-review-id="analytics.kpis"><div class="analytics-kpi"><span>有效订单</span><b>${p.order_count}</b><small>客单价 ${money(p.average_order)}</small></div><div class="analytics-kpi"><span>销售额</span><b>${money(p.revenue)}</b><small>${escapeHtml(periodLabels[p.period])}</small></div><div class="analytics-kpi"><span>毛利润</span><b>${money(p.gross_profit)}</b><small>销售额 − 商品成本</small></div><div class="analytics-kpi"><span>毛利率</span><b>${p.margin}%</b><small>成本 ${money(p.cost)}</small></div><div class="analytics-kpi inventory"><span>库存成本金额</span><b>${money(p.inventory_value)}</b><small>${p.low_stock_count} 款低库存</small></div></div>
    <div class="analytics-grid"><section class="analytics-panel"><div class="analytics-panel-head"><div><span class="eyebrow">REVENUE TREND</span><h2>销售趋势</h2></div><b>${money(p.revenue)}</b></div><div class="revenue-chart">${p.trend.length?p.trend.map(row=>`<div class="revenue-bar" title="${escapeHtml(row.day)} · ${money(row.revenue)} · ${row.orders} 单"><i style="height:${Math.max(5,Math.round(Number(row.revenue)/maxTrend*100))}%"></i><small>${escapeHtml(row.day.slice(5))}</small></div>`).join(''):'<div class="analytics-empty">当前周期还没有有效订单</div>'}</div></section>
      <section class="analytics-panel"><div class="analytics-panel-head"><div><span class="eyebrow">ORDER PIPELINE</span><h2>订单状态</h2></div></div><div class="order-status-grid">${[['submitted','已提交'],['processing','处理中'],['completed','已完成'],['cancelled','已取消']].map(([key,label])=>`<div><b>${Number(p.statuses[key]||0)}</b><span>${label}</span></div>`).join('')}</div><p class="analytics-note">取消订单单独显示，但不计入销售额、成本和利润。</p></section></div>
    <div class="analytics-grid lower"><section class="analytics-panel"><div class="analytics-panel-head"><div><span class="eyebrow">PRODUCT PROFIT</span><h2>产品利润贡献</h2></div></div><div class="profit-ranking">${p.products.length?p.products.map((row,index)=>`<div><span>${index+1}</span><div><b>${escapeHtml(row.model)}</b><small>销量 ${row.units} · 销售额 ${money(row.revenue)}</small><i><em style="width:${Math.max(3,Number(row.gross_profit)/maxProduct*100)}%"></em></i></div><strong>${money(row.gross_profit)}</strong></div>`).join(''):'<div class="analytics-empty">暂无产品利润数据</div>'}</div></section>
      <section class="analytics-panel"><div class="analytics-panel-head"><div><span class="eyebrow">INVENTORY RISK</span><h2>库存与补货提醒</h2></div><span class="status-tag ${p.inventory_error?'warn':'on'}">${p.inventory_error?'库存连接异常':'库存已同步'}</span></div>${p.inventory_error?`<div class="analytics-empty">${escapeHtml(p.inventory_error)}</div>`:`<div class="inventory-risk-list">${inventory.map(row=>`<div class="${row.low_stock?'low':''}"><span><b>${escapeHtml(row.model)}</b><small>${escapeHtml(row.material_code)}</small></span><strong>${Number(row.quantity).toLocaleString('zh-CN')}<small> 件</small></strong><em>${row.quantity<=0?'缺货':row.low_stock?'建议补货':'库存正常'}</em></div>`).join('')}</div>`}</section></div>
  </div>`;
  $$('[data-analytics-period]').forEach(button=>button.onclick=()=>renderAnalytics(button.dataset.analyticsPeriod));
  $('#export-analytics').onclick=()=>protectedDownload(`/api/analytics/export.csv?period=${encodeURIComponent(p.period)}`,`zya-business-${p.period}.csv`);
}
async function adminApi(path, options={}) {
  const response = await fetch(path, {...options, headers:{'Content-Type':'application/json','Authorization':`Bearer ${state.adminToken}`}});
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) { state.adminToken=''; sessionStorage.removeItem('zya-admin-token');syncRoleUI(); }
    throw new Error(data.error || '管理请求失败');
  }
  return data;
}
function adminLoginView() {
  app.innerHTML=`<div class="page" data-module="admin"><span class="eyebrow">OPERATIONS CONSOLE</span><h1 class="page-title">管理产品内容与<br><em>业务协同</em></h1><form class="panel admin-login" id="admin-login" data-review-id="admin.login"><h2>管理员登录</h2><p style="color:var(--muted)">本地初始账号为 admin / admin123，服务器部署前必须通过环境变量修改。</p><label>账号<input name="username" value="admin" required></label><label>密码<input name="password" type="password" required></label><button class="button primary" style="width:100%">进入运营后台</button></form></div>`;
  $('#admin-login').onsubmit=async e=>{e.preventDefault();try{const result=await api('/api/admin/login',{method:'POST',body:JSON.stringify(Object.fromEntries(new FormData(e.target)))});state.adminToken=result.token;sessionStorage.setItem('zya-admin-token',result.token);syncRoleUI();renderAdmin()}catch(err){toast(err.message)}};
}
function adminRowsTable(columns, rows, renderActions=()=> '') {
  return `<div class="admin-table-wrap"><table class="admin-table"><thead><tr>${columns.map(c=>`<th>${escapeHtml(c.label)}</th>`).join('')}<th>操作</th></tr></thead><tbody>${rows.map(row=>`<tr>${columns.map(c=>`<td>${c.render?c.render(row):escapeHtml(row[c.key]??'')}</td>`).join('')}<td>${renderActions(row)}</td></tr>`).join('')||`<tr><td colspan="${columns.length+1}">暂无数据</td></tr>`}</tbody></table></div>`;
}
function versionAtLeast(actual,required){const left=String(actual||'').split('.').map(Number),right=String(required||'').split('.').map(Number);for(let i=0;i<Math.max(left.length,right.length);i++){const a=left[i]||0,b=right[i]||0;if(a!==b)return a>b}return true}
function pagesPublishPanel(pages){
  const snapshot=pages.snapshot||{},preflight=pages.preflight||{},excluded=preflight.excluded||[],history=pages.history||[];
  const canPublish=Boolean(pages.publish_ready&&preflight.can_publish);
  const readiness=excluded.length?`<div class="pages-preflight warning"><div><b>${excluded.length} 款启用商品本次不会公开</b><p>草稿记录仍会保留，不影响已经完整的商品发布。</p></div><div class="pages-excluded-list">${excluded.map(item=>`<article><span><strong>${escapeHtml(item.model)}</strong><small>缺少：${escapeHtml(item.missing.join('、'))}</small></span><button type="button" class="button ghost compact" data-product-workspace="${item.id}">完善资料</button></article>`).join('')}</div></div>`:`<div class="pages-preflight clean"><b>发布预检通过</b><span>所有启用商品资料完整。</span></div>`;
  const historyHtml=history.length?`<div class="pages-history"><h4>最近发布记录</h4>${history.map(item=>`<div><span class="status-tag ${item.action==='publish'?'on':''}">${item.action==='publish'?'已发布':'预览'}</span><b>${escapeHtml(item.created_at||'')}</b><code>${escapeHtml((item.result?.sha256||'').slice(0,12))}</code><small>${escapeHtml(item.actor||'')}</small></div>`).join('')}</div>`:'<div class="admin-note">尚无 Pages 预览或发布记录。</div>';
  return `<section class="panel pages-publish-panel"><div class="admin-toolbar"><div><span class="eyebrow">PAGES CONTENT PUBLISHER</span><h3>发布商品目录静态快照</h3><p>仅公开资料完整商品，同时在快照中保留全部目录记录；访客联网时仍优先读取服务器。</p></div><span class="status-tag ${canPublish?'on':'warn'}">${canPublish?'可以发布':preflight.can_publish?'仅可预览':'无可发布商品'}</span></div><div class="pages-publish-meta"><span><b>${snapshot.products??0}</b> 款公开商品</span><span><b>${snapshot.archived_products??snapshot.products??0}</b> 条保留记录</span><span><b>${snapshot.documents??0}</b> 份公开文档</span><span><b>${snapshot.resources??0}</b> 个公开资源</span><span><b>${formatBytes(snapshot.bytes||0)}</b> 快照大小</span></div>${readiness}<dl><div><dt>目标仓库</dt><dd>${escapeHtml(pages.repository)}</dd></div><div><dt>分支与路径</dt><dd>${escapeHtml(pages.branch)} · ${escapeHtml(pages.path)}</dd></div><div><dt>预览指纹</dt><dd><code>${escapeHtml(snapshot.sha256||'')}</code></dd></div></dl><div class="modal-actions"><button type="button" class="button ghost" id="pages-publish-preview">重新生成预览</button><button type="button" class="button primary" id="pages-publish-confirm" ${canPublish?'':'disabled'}>确认发布到 Pages</button></div>${pages.publish_ready?'':'<div class="admin-note">实际发布默认关闭。服务器需同时配置 SMART_MANUAL_PAGES_PUBLISH_ENABLED=1 与 SMART_MANUAL_GITHUB_TOKEN；令牌不会返回网页或写入日志。</div>'}${historyHtml}</section>`
}
async function renderAdmin() {
  if (!state.adminToken) return adminLoginView();
  const routeAtStart=location.hash;
  await ensureCatalog();
  try {
    const [overview,categories,products,documents,tutorials,hotspots,assets,orders,contacts,annotations,integrationEvents,auditLogs,diagnostics]=await Promise.all([
      adminApi('/api/admin/overview'),adminApi('/api/admin/categories'),adminApi('/api/admin/products'),adminApi('/api/admin/documents'),adminApi('/api/admin/tutorials'),adminApi('/api/admin/hotspots'),adminApi('/api/admin/assets'),adminApi('/api/admin/orders'),adminApi('/api/admin/contacts'),adminApi('/api/admin/annotations'),adminApi('/api/admin/integration-events'),adminApi('/api/admin/audit-logs'),adminApi('/api/admin/system/diagnostics')
    ]);
    const pagesStatus=versionAtLeast(diagnostics.app_version,'1.29.6')?await adminApi('/api/admin/pages/status'):null;
    state.admin={overview,categories:categories.rows,products:products.rows,documents:documents.rows,tutorials:tutorials.rows,hotspots:hotspots.rows,assets:assets.rows,orders:orders.rows,contacts:contacts.rows,annotations:annotations.rows,integrationEvents:integrationEvents.rows,auditLogs:auditLogs.rows,diagnostics,pagesStatus};
  } catch(err) { if(location.hash!==routeAtStart)return;if(!state.adminToken)return adminLoginView(); app.innerHTML=`<div class="page"><h1>后台加载失败</h1><p>${escapeHtml(err.message)}</p></div>`;return; }
  if(location.hash!==routeAtStart)return;
  const d=state.admin,c=d.overview.counts,diag=d.diagnostics;
  const categoriesTable=adminRowsTable([{label:'分类代码',render:r=>`<strong>${escapeHtml(r.code)}</strong>`},{label:'名称',key:'name'},{label:'说明',key:'description'},{label:'商品数',key:'product_count'},{label:'排序',key:'sort_order'}],d.categories,r=>`<button class="button ghost compact" data-admin-edit="category" data-id="${r.id}">编辑</button> <button class="button ghost compact" data-admin-delete="category" data-id="${r.id}" ${r.product_count?'disabled title="分类下仍有商品"':''}>删除</button>`);
  const productsTable=adminRowsTable([
    {label:'型号',render:r=>`<strong>${escapeHtml(r.model)}</strong><br>${escapeHtml(r.material_code)}`},{label:'名称',key:'name'},{label:'分类',key:'category_code'},{label:'售价',render:r=>money(r.price)},{label:'成本',render:r=>money(r.cost)},{label:'公开完整度',render:r=>r.readiness?.ready?'<span class="status-tag on">资料完整</span>':`<span class="status-tag warn">待完善</span><br><small>${escapeHtml((r.readiness?.missing||[]).join('、'))}</small>`},{label:'状态',render:r=>`<span class="status-tag ${r.enabled&&r.readiness?.ready?'on':'warn'}">${!r.enabled?'已下架':r.readiness?.ready?'已公开':'未公开'}</span>`}
  ],d.products,r=>`<button class="button primary compact" data-product-workspace="${r.id}">资料工作台</button> <button class="button ghost compact" data-admin-edit="product" data-id="${r.id}">编辑参数</button>`);
  const docsTable=adminRowsTable([{label:'型号',key:'model'},{label:'类型',key:'doc_type'},{label:'文件名称',key:'title'},{label:'版本',key:'version'},{label:'语言',key:'language'}],d.documents,r=>`<button class="button ghost compact" data-admin-edit="document" data-id="${r.id}">编辑</button> <button class="button ghost compact" data-admin-delete="document" data-id="${r.id}">删除</button>`);
  const tutorialsTable=adminRowsTable([{label:'型号',key:'model'},{label:'类型',key:'tutorial_type'},{label:'标题',key:'title'},{label:'时长',render:r=>`${r.duration_minutes} 分钟`},{label:'步骤',render:r=>String(r.steps.length)}],d.tutorials,r=>`<button class="button ghost compact" data-admin-edit="tutorial" data-id="${r.id}">编辑</button> <button class="button ghost compact" data-admin-delete="tutorial" data-id="${r.id}">删除</button>`);
  const hotspotsTable=adminRowsTable([{label:'型号',key:'model'},{label:'标识',key:'hotspot_key'},{label:'名称',key:'label'},{label:'说明',key:'description'},{label:'位置',render:r=>`${r.position.x??0}% / ${r.position.y??0}%`}],d.hotspots,r=>`<button class="button ghost compact" data-admin-edit="hotspot" data-id="${r.id}">编辑</button> <button class="button ghost compact" data-admin-delete="hotspot" data-id="${r.id}">删除</button>`);
  const assetsTable=adminRowsTable([{label:'型号',key:'model'},{label:'类型',key:'asset_type'},{label:'文件',render:r=>`<a href="${escapeHtml(r.asset_url)}" target="_blank">${escapeHtml(r.original_name||r.title)}</a>`},{label:'版本',key:'version'},{label:'大小',render:r=>`${(Number(r.file_size||0)/1024).toFixed(1)} KB`},{label:'格式',key:'mime_type'}],d.assets,r=>`<button class="button ghost compact" data-admin-delete="asset" data-id="${r.id}">删除</button>`);
  const ordersTable=adminRowsTable([{label:'订单号',render:r=>`<strong>${escapeHtml(r.order_no)}</strong><br>${r.items.map(i=>`${escapeHtml(i.material_code)} × ${i.quantity}`).join('<br>')}`},{label:'客户',render:r=>`${escapeHtml(r.customer_name)}<br><small>${escapeHtml(r.company||'')}</small>`},{label:'金额',render:r=>money(r.total_amount)},{label:'状态',render:r=>`<span class="status-tag ${r.status==='completed'||r.status==='shipped'?'on':r.status==='cancelled'?'warn':''}">${escapeHtml(orderStatusLabels[r.status]||r.status)}</span>`},{label:'履约',render:r=>r.tracking_no?`${escapeHtml(r.shipping_carrier)}<br><code>${escapeHtml(r.tracking_no)}</code>`:r.expected_ship_date?`预计 ${escapeHtml(r.expected_ship_date)}`:'尚未登记'},{label:'库存',render:r=>`<span class="status-tag ${r.stock_status==='available'?'on':r.stock_status==='partial'||r.stock_status==='unavailable'?'warn':''}">${escapeHtml(stockStatusLabels[r.stock_status]||r.stock_status||'待核对')}</span><br><small>${escapeHtml(externalStatusLabels[r.external_status]||r.external_status)}</small>`},{label:'更新时间',render:r=>escapeHtml(r.updated_at||r.created_at)}],d.orders,r=>`<button class="button primary compact" data-admin-edit="order" data-id="${r.id}">处理履约</button> <button class="button ghost compact" data-admin-retry="${r.id}">重试同步</button>`);
  const contactsTable=adminRowsTable([{label:'支持单',render:r=>`<strong>${escapeHtml(r.ticket_no||'#'+r.id)}</strong><br><span class="status-tag ${r.status==='resolved'?'on':r.status==='processing'?'warn':''}">${escapeHtml(supportStatusLabels[r.status]||r.status)}</span>`},{label:'类型',key:'contact_type'},{label:'姓名',key:'name'},{label:'联系方式',key:'contact'},{label:'型号',key:'product_model'},{label:'问题与回复',render:r=>`${escapeHtml(r.message)}${r.response?`<br><b>回复：</b>${escapeHtml(r.response)}`:''}`}],d.contacts,r=>`<button class="button ghost compact" data-admin-edit="contact" data-id="${r.id}">处理与回复</button>`);
  const annotationsTable=adminRowsTable([{label:'编号',render:r=>`#${r.id}`},{label:'类型',render:r=>({area:'框选',text:'文字',image:'图片'}[r.annotation_type]||r.annotation_type)},{label:'页面',key:'page_route'},{label:'元素/引用',render:r=>`${escapeHtml(r.element_key)}${r.selected_text?`<br>“${escapeHtml(r.selected_text.slice(0,60))}”`:''}${r.selected_image?`<br>${escapeHtml(r.selected_image)}`:''}`},{label:'级别',key:'severity'},{label:'问题',key:'note'},{label:'状态',key:'status'}],d.annotations,r=>`<button class="button ghost compact" data-admin-resolve="${r.id}">${r.status==='resolved'?'重新打开':'标记解决'}</button>`);
  const integrationTable=adminRowsTable([{label:'时间',key:'created_at'},{label:'动作',key:'action'},{label:'幂等键',key:'idempotency_key'},{label:'状态',key:'status'},{label:'响应',render:r=>`<code>${escapeHtml((r.response_json||'').slice(0,180))}</code>`}],d.integrationEvents,()=> '—');
  const auditActionLabels={create:'新增',update:'更新',delete:'删除',retry:'重试',export:'导出',preview:'预览',publish:'发布',login:'登录',logout:'退出'};
  const auditEntityLabels={category:'分类',product:'商品',document:'文档',tutorial:'教程',hotspot:'热点',asset:'资源',order:'订单',contact:'支持单',annotation:'批注',pages_catalog:'Pages 目录',session:'会话'};
  const auditTable=adminRowsTable([{label:'时间',key:'created_at'},{label:'管理员',key:'actor'},{label:'动作',render:r=>`<span class="status-tag ${r.action==='delete'?'warn':r.action==='create'?'on':''}">${escapeHtml(auditActionLabels[r.action]||r.action)}</span>`},{label:'对象',render:r=>`${escapeHtml(auditEntityLabels[r.entity_type]||r.entity_type)}${r.entity_id?` #${escapeHtml(r.entity_id)}`:''}`},{label:'摘要',key:'summary'},{label:'来源',key:'ip_address'},{label:'修改内容',render:r=>`<details class="audit-detail"><summary>查看差异</summary><b>修改前</b><code>${escapeHtml((r.before_json||'{}').slice(0,800))}</code><b>修改后</b><code>${escapeHtml((r.after_json||'{}').slice(0,800))}</code></details>`}],d.auditLogs,()=> '—');
  app.innerHTML=`<div class="page" data-module="admin"><div class="admin-role-banner"><b>管理员工作区</b><span>此区域包含上传、成本、订单、同步日志和验收工具，访客不可见。</span></div><div class="admin-head"><div><span class="eyebrow">OPERATIONS CONSOLE</span><h1 class="page-title">运营管理后台</h1></div><div><a class="button ghost" href="#analytics">经营分析</a> <span class="status-tag ${d.overview.inventory.ok?'on':'warn'}">库存：${escapeHtml(d.overview.inventory.mode)}</span> <button class="button ghost" id="admin-logout">退出</button></div></div>
    <div class="kpi-grid"><div class="kpi"><span>商品</span><b>${c.products_public} / ${c.products}</b><small>${c.products_incomplete} 个待完善 · ${c.products_disabled} 个下架</small></div><div class="kpi"><span>订单</span><b>${c.orders}</b><small>${c.orders_pending} 个待处理</small></div><div class="kpi"><span>待处理支持</span><b>${c.contacts_open}</b><small>${c.contacts_processing} 个处理中</small></div><div class="kpi"><span>开放批注</span><b>${c.annotations_open}</b><small>集中验收修改项</small></div></div>
    <div class="admin-action-strip"><button data-admin-jump="orders"><b>${c.orders_pending}</b><span>待推进订单</span></button><button data-admin-jump="contacts"><b>${c.contacts_open+c.contacts_processing}</b><span>支持单工作量</span></button><button data-admin-jump="integration" class="${c.sync_failed?'has-alert':''}"><b>${c.sync_failed}</b><span>失败同步记录</span></button><button data-admin-jump="audit"><b>${c.audit_logs}</b><span>后台操作记录</span></button></div>
    <div class="admin-shell"><nav class="admin-tabs">${[['categories','分类'],['products','商品'],['documents','文档'],['tutorials','教程'],['hotspots','产品热点'],['assets','资源文件'],['orders','订单'],['contacts','支持单'],['annotations','验收批注'],['integration','同步日志'],['audit','操作记录'],['system','系统维护']].map(([k,n],i)=>`<button data-admin-tab="${k}" class="${i?'':'active'}">${n}</button>`).join('')}</nav>
      <section class="admin-pane active" data-admin-pane="categories"><div class="admin-toolbar"><div><h2>商品分类</h2><p>分类代码用于网址和系统关联，创建后保持不变。</p></div><button class="button primary" data-admin-new="category">新增分类</button></div>${categoriesTable}</section>
      <section class="admin-pane" data-admin-pane="products"><div class="admin-toolbar"><div><h2>商品内容</h2><p>同时满足产品图片、公开文档、使用教程和功能热点后才会进入访客页面与 Pages 快照。</p></div><button class="button primary" data-admin-new="product">新增商品</button></div>${productsTable}</section>
      <section class="admin-pane" data-admin-pane="documents"><div class="admin-toolbar"><h2>文档与版本</h2><button class="button primary" data-admin-new="document">新增文档</button></div>${docsTable}</section>
      <section class="admin-pane" data-admin-pane="tutorials"><div class="admin-toolbar"><h2>教程与步骤</h2><button class="button primary" data-admin-new="tutorial">新增教程</button></div>${tutorialsTable}</section>
      <section class="admin-pane" data-admin-pane="hotspots"><div class="admin-toolbar"><h2>3D/实物热点</h2><button class="button primary" data-admin-new="hotspot">新增热点</button></div><div class="admin-note">热点位置使用相对百分比，因此替换真实 GLB 模型或产品图片后，编辑器仍可复用同一套说明内容。</div>${hotspotsTable}</section>
      <section class="admin-pane" data-admin-pane="assets"><div class="admin-toolbar"><h2>产品资源文件</h2></div><form class="panel form-grid" id="asset-upload-form"><label>产品<select name="product_id">${productOptions()}</select></label><label>资源类型<select name="asset_type"><option value="image">产品图片</option><option value="model">GLB/GLTF 模型</option><option value="document">文档</option><option value="report">测试报告</option><option value="video">视频</option><option value="software">软件包</option></select></label><label>版本<input name="version" value="1.0"></label><label>选择文件<input name="file" type="file" required accept=".glb,.gltf,.png,.jpg,.jpeg,.webp,.pdf,.zip,.csv,.xlsx,.mp4,.webm"></label><div><button class="button primary">上传资源</button></div></form><div class="admin-note">单文件上限 50 MB。服务器按块写入文件，下载也按块传输，不会把整个大文件长期占用在内存中。</div>${assetsTable}</section>
      <section class="admin-pane" data-admin-pane="orders"><div class="admin-toolbar"><div><h2>门户订单与履约</h2><p>核对需求、登记预计发货时间和物流信息，客户订单页会同步显示公开进度。</p></div><button class="button ghost compact" data-admin-export-orders>导出CSV</button></div><div class="admin-order-filter"><label>搜索<input id="admin-order-search" type="search" placeholder="订单号、客户、公司、物料或物流单号"></label><label>状态<select id="admin-order-status"><option value="">全部状态</option>${Object.entries(orderStatusLabels).map(([value,label])=>`<option value="${value}">${label}</option>`).join('')}</select></label><span id="admin-order-count">${d.orders.length} 个订单</span></div><div id="admin-order-table-host">${ordersTable}</div></section>
      <section class="admin-pane" data-admin-pane="contacts"><div class="admin-toolbar"><h2>售前与售后支持单</h2></div>${contactsTable}</section>
      <section class="admin-pane" data-admin-pane="annotations"><div class="admin-toolbar"><h2>成品验收批注</h2><div><button class="button ghost compact" data-protected-download="json">导出 JSON</button> <button class="button ghost compact" data-protected-download="md">导出 Markdown</button></div></div>${annotationsTable}</section>
      <section class="admin-pane" data-admin-pane="integration"><div class="admin-toolbar"><h2>库存与订单同步日志</h2></div>${integrationTable}</section>
      <section class="admin-pane" data-admin-pane="audit"><div class="admin-toolbar"><div><h2>管理员操作记录</h2><p>记录关键内容、业务状态与资源变更，可筛选并导出留档。</p></div><button class="button ghost compact" data-admin-export-audit>导出CSV</button></div><div class="admin-audit-filter"><label>搜索<input id="audit-search" type="search" placeholder="摘要、管理员或对象编号"></label><label>动作<select id="audit-action"><option value="">全部动作</option>${Object.entries(auditActionLabels).map(([value,label])=>`<option value="${value}">${label}</option>`).join('')}</select></label><label>对象<select id="audit-entity"><option value="">全部对象</option>${Object.entries(auditEntityLabels).map(([value,label])=>`<option value="${value}">${label}</option>`).join('')}</select></label><span id="audit-result-count">${d.auditLogs.length} 条记录</span></div><div id="audit-table-host">${auditTable}</div></section>
      <section class="admin-pane" data-admin-pane="system"><div class="admin-toolbar"><div><h2>系统维护与数据安全</h2><p>诊断数据库、库存连接和上传资源，并生成可离线保存的完整备份。</p></div><button class="button primary" id="download-full-backup">下载完整备份 ZIP</button></div><div class="system-health-grid"><div class="system-health-card ${diag.database.integrity==='ok'?'ok':'warn'}"><span>数据库完整性</span><b>${diag.database.integrity==='ok'?'正常':'需要检查'}</b><small>SQLite ${escapeHtml(diag.database.journal_mode.toUpperCase())} · ${formatBytes(diag.database.bytes)}</small></div><div class="system-health-card ${diag.inventory.ok?'ok':'warn'}"><span>库存连接</span><b>${diag.inventory.ok?'正常':'不可用'}</b><small>${escapeHtml(diag.inventory.mode)} · ${escapeHtml(diag.inventory.message||'')}</small></div><div class="system-health-card"><span>上传资源</span><b>${diag.uploads.files} 个文件</b><small>${formatBytes(diag.uploads.bytes)}</small></div><div class="system-health-card"><span>当前版本</span><b>v${escapeHtml(diag.app_version)}</b><small>已运行 ${Math.max(1,Math.floor(diag.uptime_seconds/60))} 分钟</small></div></div><div class="system-backup-layout"><section class="panel"><span class="eyebrow">FULL BACKUP</span><h3>备份包含什么？</h3><ul><li>商品、分类、参数、教程和热点</li><li>订单、履约、支持单和经营数据</li><li>资料文件、图片、模型和视频</li><li>验收批注、同步日志和操作记录</li></ul><p>数据库使用在线快照，生成备份时网站仍可浏览；ZIP 采用分块下载，不会长期占用大量内存。</p></section><section class="panel"><span class="eyebrow">SAFE RESTORE</span><h3>恢复前必须停服</h3><p>恢复工具会先验证格式、路径和数据库完整性；正式覆盖前会自动再保存一份当前数据。</p><code>python scripts/restore_backup.py 备份文件.zip --check-only</code><code>python scripts/restore_backup.py 备份文件.zip --yes</code><div class="admin-note">正式恢复检测到 8788 端口仍在运行时会主动拒绝执行，防止数据库被并发写入。</div></section></div><div class="system-counts">${Object.entries(diag.database.counts).map(([key,value])=>`<span><b>${value}</b>${escapeHtml({products:'商品',documents:'文档',tutorials:'教程',product_assets:'资源',orders:'订单',contacts:'支持单',annotations:'批注',admin_audit_logs:'操作记录'}[key]||key)}</span>`).join('')}</div>${d.pagesStatus?pagesPublishPanel(d.pagesStatus):'<div class="admin-note">当前后台版本尚未提供 Pages 发布接口；升级服务器后此处会自动显示发布预览。</div>'}</section>
    </div><dialog class="modal admin-editor" id="admin-editor"></dialog></div>`;
  bindAdmin();
}
function productOptions(selected){return state.admin.products.map(p=>`<option value="${p.id}" ${Number(selected)===p.id?'selected':''}>${escapeHtml(p.model)} · ${escapeHtml(p.name)}</option>`).join('')}
async function openAdminContentTab(tab,productId){
  $('#admin-editor')?.close();state.adminTab=tab;await renderAdmin();
  const pane=$(`[data-admin-pane="${tab}"]`);pane?.scrollIntoView({behavior:'smooth',block:'start'});
  if(tab==='assets'){
    const product=$('#asset-upload-form [name="product_id"]'),type=$('#asset-upload-form [name="asset_type"]'),file=$('#asset-upload-form [name="file"]');
    if(product)product.value=String(productId);if(type)type.value='image';file?.focus();
  }
}
function showProductWorkspace(productId){
  const product=state.admin.products.find(item=>item.id===Number(productId));if(!product)return;
  const readiness=product.readiness||{ready:false,missing:[],counts:{}},counts=readiness.counts||{};
  const items=[
    {key:'images',label:'产品图片',description:'用于商品卡片、产品详情和互动热点底图。',tab:'assets'},
    {key:'documents',label:'公开文档',description:'至少一个有效下载地址，不能使用“待上传”占位链接。',tab:'documents',editor:'document'},
    {key:'tutorials',label:'使用教程',description:'提供可逐步执行的上手流程与操作说明。',tab:'tutorials',editor:'tutorial'},
    {key:'hotspots',label:'功能热点',description:'在实物图上标注接口、开关和关键功能位置。',tab:'hotspots',editor:'hotspot'},
  ];
  const dialog=$('#admin-editor');
  dialog.innerHTML=`<div class="product-workspace"><div class="modal-head"><div><span class="eyebrow">PRODUCT CONTENT WORKSPACE</span><h2>${escapeHtml(product.model)} 资料工作台</h2><p>${escapeHtml(product.name)}</p></div><button type="button" class="close-button" data-workspace-close>×</button></div><div class="workspace-status ${readiness.ready?'ready':'incomplete'}"><span>${readiness.ready?'可以公开':'暂未公开'}</span><b>${readiness.ready?'四项资料已经完整':`还需补齐 ${readiness.missing.length} 项资料`}</b></div><div class="workspace-checklist">${items.map(item=>{const complete=Number(counts[item.key]||0)>0;return `<article class="${complete?'complete':'missing'}"><i>${complete?'✓':'!'}</i><span><b>${item.label}</b><small>${item.description}</small></span><em>${complete?`${counts[item.key]} 项`:'缺失'}</em><div>${item.editor&&!complete?`<button type="button" class="button primary compact" data-workspace-add="${item.editor}">立即新增</button>`:''}<button type="button" class="button ghost compact" data-workspace-tab="${item.tab}">${complete?'查看管理':item.tab==='assets'?'上传图片':'进入列表'}</button></div></article>`}).join('')}</div><div class="modal-actions"><button type="button" class="button ghost" data-workspace-parameters>编辑商品参数</button><button type="button" class="button primary" data-workspace-close>完成</button></div></div>`;
  $$('[data-workspace-close]',dialog).forEach(button=>button.onclick=()=>dialog.close());
  $('[data-workspace-parameters]',dialog).onclick=()=>showAdminEditor('product',product);
  $$('[data-workspace-tab]',dialog).forEach(button=>button.onclick=()=>openAdminContentTab(button.dataset.workspaceTab,product.id));
  $$('[data-workspace-add]',dialog).forEach(button=>button.onclick=()=>showAdminEditor(button.dataset.workspaceAdd,{product_id:product.id}));
  dialog.showModal();
}
async function uploadAdminAsset(productId,assetType,version,file){
  const response=await fetch(apiPath('/api/admin/assets/upload'),{method:'POST',headers:{'Authorization':`Bearer ${state.adminToken}`,'X-Product-Id':String(productId),'X-Asset-Type':assetType,'X-Asset-Version':version||'1.0','X-File-Name':encodeURIComponent(file.name),'Content-Type':file.type||'application/octet-stream'},body:file});
  const result=await response.json();if(!response.ok)throw new Error(result.error||'上传失败');return result.asset;
}
function showAdminEditor(type,row={}) {
  const dialog=$('#admin-editor'); const isNew=!row.id; let fields='';
  if(type==='category') fields=`<div class="form-grid"><label>分类代码<input name="code" value="${escapeHtml(row.code||'')}" pattern="[a-z0-9][a-z0-9_\\-]{1,39}" ${isNew?'required':'readonly'}></label><label>分类名称<input name="name" value="${escapeHtml(row.name||'')}" required maxlength="80"></label><label>排序<input name="sort_order" type="number" value="${row.sort_order??0}"></label></div><label>分类说明<textarea name="description" rows="4" maxlength="500">${escapeHtml(row.description||'')}</textarea></label>${isNew?'':'<div class="admin-note">分类代码已作为商品和网址的稳定关联标识，编辑时不能修改。</div>'}`;
  if(type==='product') fields=`<div class="form-grid"><label>页面标识<input name="slug" value="${escapeHtml(row.slug||'')}" required></label><label>物料编码<input name="material_code" value="${escapeHtml(row.material_code||'')}" required></label><label>分类<select name="category_code">${state.categories.map(c=>`<option value="${c.code}" ${row.category_code===c.code?'selected':''}>${escapeHtml(c.name)}</option>`).join('')}</select></label><label>型号<input name="model" value="${escapeHtml(row.model||'')}" required></label><label>名称<input name="name" value="${escapeHtml(row.name||'')}" required></label><label>副标题<input name="subtitle" value="${escapeHtml(row.subtitle||'')}"></label><label>售价<input name="price" type="number" step="0.01" value="${row.price??0}"></label><label>成本<input name="cost" type="number" step="0.01" value="${row.cost??0}"></label></div><label>产品说明<textarea name="description" rows="3">${escapeHtml(row.description||'')}</textarea></label><section class="product-structured-editor"><div class="admin-toolbar"><div><b>专业参数</b><p>每行填写一个参数名称和对应数值，显示顺序可直接调整。</p></div><button type="button" class="button primary compact" data-product-spec-add>新增参数</button></div><input type="hidden" name="specs" value="${escapeHtml(JSON.stringify(row.specs||{}))}"><div class="product-spec-list"></div></section><section class="product-structured-editor"><div class="admin-toolbar"><div><b>功能特征</b><p>用于商品页的能力标签和核心卖点，可按优先级排序。</p></div><button type="button" class="button primary compact" data-product-capability-add>新增特征</button></div><input type="hidden" name="capabilities" value="${escapeHtml(JSON.stringify(row.capabilities||[]))}"><div class="product-capability-list"></div></section><section class="attenuator-config-editor"><div class="attenuator-config-head"><div><b>数字衰减器交互计算器</b><p>启用后，商品页会显示拨码与 SPI 衰减计算功能。</p></div><label class="attenuator-enable"><input type="checkbox" data-attenuator-enabled ${row.attenuator?'checked':''}><span>启用</span></label></div><input type="hidden" name="attenuator" value="${escapeHtml(row.attenuator?JSON.stringify(row.attenuator):'')}"><div class="attenuator-config-body"><div class="form-grid attenuator-base-fields"><label>最小步进 dB<input type="number" min="0.000001" step="any" data-attenuator-step value="${Number(row.attenuator?.step||0.25)}"></label><label>最大衰减 dB<input type="number" min="0.000001" step="any" data-attenuator-max value="${Number(row.attenuator?.max||31.75)}"></label><label>首个衰减拨码位<input type="number" min="1" max="32" step="1" data-attenuator-switch-start value="${Number(row.attenuator?.switch_start||2)}"></label></div><div class="admin-toolbar attenuator-bits-toolbar"><div><b>拨码权重</b><p>按实物从左到右填写，每一位应为步进的 1、2、4、8…倍。</p></div><button type="button" class="button primary compact" data-attenuator-bit-add>新增拨码</button></div><div class="attenuator-bit-list"></div><div class="attenuator-config-summary" data-attenuator-summary></div></div></section><fieldset class="admin-related-products"><legend>关联商品 <small>越靠前越优先显示在商品页推荐区域</small></legend><div class="admin-related-editor"><div class="admin-related-selected"><b>已关联与推荐顺序</b><div data-related-selected></div><div data-related-inputs></div></div><div class="admin-related-available"><label>搜索可关联商品<input type="search" data-related-search placeholder="输入型号、名称或物料编码"></label><div data-related-available></div></div></div></fieldset><div class="form-grid"><label><span>启用</span><input name="enabled" type="checkbox" ${row.enabled!==0?'checked':''}></label><label><span>首页推荐</span><input name="featured" type="checkbox" ${row.featured?'checked':''}></label></div>`;
  if(type==='document') fields=`<div class="form-grid"><label>产品<select name="product_id">${productOptions(row.product_id)}</select></label><label>类型<select name="doc_type">${['datasheet','drawing','report','software','firmware'].map(x=>`<option ${row.doc_type===x?'selected':''}>${x}</option>`).join('')}</select></label><label>文件名称<input name="title" value="${escapeHtml(row.title||'')}" required></label><label>版本<input name="version" value="${escapeHtml(row.version||'1.0')}"></label><label>语言<input name="language" value="${escapeHtml(row.language||'zh-CN')}"></label><label>文件大小<input name="file_size" value="${escapeHtml(row.file_size||'')}"></label></div><input type="hidden" name="source_asset_id" value="${Number(row.source_asset_id||0)}"><section class="document-upload-editor"><div><b>${row.source_asset_id?'替换上传文件':'直接上传资料文件'}</b><p>${row.source_asset_id?'选择新文件后，保存时会替换当前上传文件并安全回收旧文件。':'选择文件后，保存时会先上传到服务器，再自动填写真实下载地址和文件大小。'}</p></div><label>选择文件<input name="document_file" type="file" accept=".pdf,.zip,.csv,.xlsx,.mp4,.webm"></label></section><label>下载地址<input name="file_url" value="${escapeHtml(row.file_url||'#')}" placeholder="上传文件后自动生成，也可填写外部 HTTPS 地址"></label>`;
  if(type==='tutorial') fields=`<div class="form-grid"><label>产品<select name="product_id">${productOptions(row.product_id)}</select></label><label>教程类型<input name="tutorial_type" value="${escapeHtml(row.tutorial_type||'guide')}"></label><label>标题<input name="title" value="${escapeHtml(row.title||'')}" required></label><label>预计分钟<input name="duration_minutes" type="number" min="1" value="${row.duration_minutes||3}"></label></div><label>摘要<textarea name="summary">${escapeHtml(row.summary||'')}</textarea></label><section class="tutorial-step-editor"><div class="admin-toolbar"><div><b>教程步骤</b><p>按用户实际操作顺序填写，每一步都需要标题和操作说明。</p></div><button type="button" class="button primary compact" data-tutorial-add>新增步骤</button></div><input type="hidden" name="steps" value="${escapeHtml(JSON.stringify(row.steps?.length?row.steps:[{title:'第一步',body:'操作说明'}]))}"><div class="tutorial-step-list"></div></section>`;
  if(type==='hotspot') fields=`<div class="form-grid"><label>产品<select name="product_id">${productOptions(row.product_id)}</select></label><label>稳定标识<input name="hotspot_key" value="${escapeHtml(row.hotspot_key||'')}" required></label><label>显示名称<input name="label" value="${escapeHtml(row.label||'')}" required></label><label>排序<input name="sort_order" type="number" value="${row.sort_order||0}"></label></div><div class="hotspot-position-editor"><div><b>在实物图上定位热点</b><p>点击图片或拖动标记；坐标会同步到下方精确输入框。</p></div><div class="hotspot-picker-stage" tabindex="0"><img alt="当前商品实物图"><button type="button" class="hotspot-picker-marker" aria-label="热点位置"></button><span>当前商品还没有产品图片，可先使用坐标定位，上传图片后再复核。</span></div><div class="form-grid hotspot-coordinate-fields"><label>横向位置 %<input name="x" type="number" min="0" max="100" step="0.1" value="${row.position?.x??50}"></label><label>纵向位置 %<input name="y" type="number" min="0" max="100" step="0.1" value="${row.position?.y??50}"></label></div></div><label>说明<textarea name="description">${escapeHtml(row.description||'')}</textarea></label><section class="hotspot-action-editor"><div><b>点击后的引导动作</b><p>用户查看说明后，可直接前往对应操作区域。</p></div><div class="form-grid"><label>动作类型<select data-hotspot-action-type><option value="none">仅显示说明</option><option value="guide" ${row.action?.type==='guide'?'selected':''}>快速使用指导</option><option value="calculator" ${row.action?.type==='calculator'?'selected':''}>衰减计算器</option><option value="documents" ${row.action?.type==='documents'?'selected':''}>产品资料</option><option value="console" ${row.action?.type==='console'?'selected':''}>网页版上位机</option><option value="link" ${row.action?.type==='link'?'selected':''}>外部链接</option></select></label><label>按钮文字<input data-hotspot-action-label maxlength="40" value="${escapeHtml(row.action?.label||'')}" placeholder="留空时使用默认文字"></label></div><label data-hotspot-action-target-wrap>外部链接<input data-hotspot-action-target type="url" maxlength="500" value="${escapeHtml(row.action?.type==='link'?(row.action?.target||''):'')}" placeholder="https://..."></label><input type="hidden" name="action" value="${escapeHtml(JSON.stringify(row.action||{}))}"><div class="hotspot-action-preview" data-hotspot-action-preview></div></section>`;
  if(type==='order') fields=`<div class="admin-order-summary"><div><span>订单号</span><b>${escapeHtml(row.order_no||'')}</b></div><div><span>客户</span><b>${escapeHtml(row.customer_name||'')} · ${escapeHtml(row.company||'个人')}</b><small>${escapeHtml(row.phone||row.email||'')}</small></div><div><span>商品</span><b>${(row.items||[]).map(item=>`${escapeHtml(item.material_code)} × ${item.quantity}`).join('　')}</b></div><div><span>金额</span><b>${money(row.total_amount||0)}</b></div></div><div class="form-grid"><label>处理状态<select name="status">${Object.entries(orderStatusLabels).map(([value,label])=>`<option value="${value}" ${row.status===value?'selected':''}>${label}</option>`).join('')}</select></label><label>预计发货日期<input name="expected_ship_date" type="date" value="${escapeHtml(row.expected_ship_date||'')}"></label><label>承运商<input name="shipping_carrier" maxlength="80" value="${escapeHtml(row.shipping_carrier||'')}" placeholder="例如：顺丰速运"></label><label>物流单号<input name="tracking_no" maxlength="120" value="${escapeHtml(row.tracking_no||'')}"></label><label>实际发货时间<input name="shipped_at" type="datetime-local" value="${escapeHtml((row.shipped_at||'').slice(0,16))}"></label></div><label>内部处理备注（客户不可见）<textarea name="admin_note" rows="5" maxlength="4000" placeholder="库存确认、报价沟通、交期说明等">${escapeHtml(row.admin_note||'')}</textarea></label><div class="admin-note">选择“已发货”时必须填写承运商和物流单号；物流信息会展示给拥有订单访问凭据的客户，内部备注不会公开。</div>`;
  if(type==='contact') fields=`<div class="admin-note"><b>${escapeHtml(row.ticket_no||'#'+row.id)}</b><br>${escapeHtml(row.message||'')}</div><label>处理状态<select name="status"><option value="new" ${row.status==='new'?'selected':''}>已收到</option><option value="processing" ${row.status==='processing'?'selected':''}>处理中</option><option value="resolved" ${row.status==='resolved'?'selected':''}>已解决</option></select></label><label>给客户的回复<textarea name="response" rows="7" maxlength="4000" placeholder="处理进展、排查建议或最终结论">${escapeHtml(row.response||'')}</textarea></label>`;
  dialog.innerHTML=`<form method="dialog" id="admin-editor-form"><div class="modal-head"><div><span class="eyebrow">CONTENT EDITOR</span><h2>${isNew?'新增':'编辑'}${{category:'分类',product:'商品',document:'文档',tutorial:'教程',hotspot:'热点',order:'订单履约',contact:'支持单'}[type]}</h2></div><button type="button" class="close-button" data-admin-editor-cancel>×</button></div>${fields}<div class="modal-actions"><button type="button" class="button ghost" data-admin-editor-cancel>取消</button><button type="submit" class="button primary">保存</button></div></form>`;
  $$('[data-admin-editor-cancel]',dialog).forEach(button=>button.onclick=()=>dialog.close());
  if(type==='product'){
    const specsHidden=$('[name="specs"]',dialog),capabilitiesHidden=$('[name="capabilities"]',dialog),specList=$('.product-spec-list',dialog),capabilityList=$('.product-capability-list',dialog);
    let specs=Object.entries(JSON.parse(specsHidden.value||'{}')).map(([name,value])=>({name,value:String(value??'')})),capabilities=JSON.parse(capabilitiesHidden.value||'[]').map(value=>String(value));
    const syncSpecs=()=>{const result={};specs.forEach(item=>{const name=item.name.trim();if(name)result[name]=item.value.trim()});specsHidden.value=JSON.stringify(result)};
    const syncCapabilities=()=>capabilitiesHidden.value=JSON.stringify(capabilities.map(value=>value.trim()).filter(Boolean));
    const move=(items,index,offset)=>{const target=index+offset;if(target<0||target>=items.length)return;[items[index],items[target]]=[items[target],items[index]]};
    const renderSpecs=()=>{specList.innerHTML=specs.length?specs.map((item,index)=>`<article class="product-spec-row"><span>${String(index+1).padStart(2,'0')}</span><label>参数名称<input data-product-spec-name="${index}" value="${escapeHtml(item.name)}" maxlength="80" placeholder="例如：工作频段"></label><label>参数值<input data-product-spec-value="${index}" value="${escapeHtml(item.value)}" maxlength="180" placeholder="例如：9 kHz–6 GHz"></label><div><button type="button" class="button ghost compact" data-product-spec-up="${index}" ${index===0?'disabled':''} aria-label="上移参数">↑</button><button type="button" class="button ghost compact" data-product-spec-down="${index}" ${index===specs.length-1?'disabled':''} aria-label="下移参数">↓</button><button type="button" class="button ghost compact" data-product-spec-delete="${index}">删除</button></div></article>`).join(''):'<p class="structured-editor-empty">尚未添加专业参数。</p>';
      $$('[data-product-spec-name]',specList).forEach(input=>input.oninput=()=>{specs[Number(input.dataset.productSpecName)].name=input.value;syncSpecs()});
      $$('[data-product-spec-value]',specList).forEach(input=>input.oninput=()=>{specs[Number(input.dataset.productSpecValue)].value=input.value;syncSpecs()});
      $$('[data-product-spec-up]',specList).forEach(button=>button.onclick=()=>{move(specs,Number(button.dataset.productSpecUp),-1);syncSpecs();renderSpecs()});
      $$('[data-product-spec-down]',specList).forEach(button=>button.onclick=()=>{move(specs,Number(button.dataset.productSpecDown),1);syncSpecs();renderSpecs()});
      $$('[data-product-spec-delete]',specList).forEach(button=>button.onclick=()=>{specs.splice(Number(button.dataset.productSpecDelete),1);syncSpecs();renderSpecs()});
    };
    const renderCapabilities=()=>{capabilityList.innerHTML=capabilities.length?capabilities.map((value,index)=>`<article class="product-capability-row"><span>${String(index+1).padStart(2,'0')}</span><input data-product-capability-value="${index}" value="${escapeHtml(value)}" maxlength="120" placeholder="例如：PS 串并行切换"><div><button type="button" class="button ghost compact" data-product-capability-up="${index}" ${index===0?'disabled':''} aria-label="上移特征">↑</button><button type="button" class="button ghost compact" data-product-capability-down="${index}" ${index===capabilities.length-1?'disabled':''} aria-label="下移特征">↓</button><button type="button" class="button ghost compact" data-product-capability-delete="${index}">删除</button></div></article>`).join(''):'<p class="structured-editor-empty">尚未添加功能特征。</p>';
      $$('[data-product-capability-value]',capabilityList).forEach(input=>input.oninput=()=>{capabilities[Number(input.dataset.productCapabilityValue)]=input.value;syncCapabilities()});
      $$('[data-product-capability-up]',capabilityList).forEach(button=>button.onclick=()=>{move(capabilities,Number(button.dataset.productCapabilityUp),-1);syncCapabilities();renderCapabilities()});
      $$('[data-product-capability-down]',capabilityList).forEach(button=>button.onclick=()=>{move(capabilities,Number(button.dataset.productCapabilityDown),1);syncCapabilities();renderCapabilities()});
      $$('[data-product-capability-delete]',capabilityList).forEach(button=>button.onclick=()=>{capabilities.splice(Number(button.dataset.productCapabilityDelete),1);syncCapabilities();renderCapabilities()});
    };
    $('[data-product-spec-add]',dialog).onclick=()=>{specs.push({name:'',value:''});syncSpecs();renderSpecs();$('[data-product-spec-name="'+(specs.length-1)+'"]',specList)?.focus()};
    $('[data-product-capability-add]',dialog).onclick=()=>{capabilities.push('');syncCapabilities();renderCapabilities();$('[data-product-capability-value="'+(capabilities.length-1)+'"]',capabilityList)?.focus()};
    syncSpecs();syncCapabilities();renderSpecs();renderCapabilities();
    const attenuatorHidden=$('[name="attenuator"]',dialog),attenuatorToggle=$('[data-attenuator-enabled]',dialog),attenuatorBody=$('.attenuator-config-body',dialog),attenuatorStep=$('[data-attenuator-step]',dialog),attenuatorMax=$('[data-attenuator-max]',dialog),attenuatorStart=$('[data-attenuator-switch-start]',dialog),attenuatorBitsList=$('.attenuator-bit-list',dialog),attenuatorSummary=$('[data-attenuator-summary]',dialog),attenuatorAdd=$('[data-attenuator-bit-add]',dialog);
    let attenuatorBits=(row.attenuator?.bits?.length?row.attenuator.bits:[.25,.5,1,2,4,8,16]).map(Number);
    const validateAttenuator=()=>{const enabled=attenuatorToggle.checked;attenuatorBody.hidden=!enabled;$$('input,button',attenuatorBody).forEach(control=>control.disabled=!enabled);attenuatorAdd.disabled=!enabled||attenuatorBits.length>=16;if(!enabled){attenuatorToggle.setCustomValidity('');attenuatorHidden.value='';attenuatorSummary.classList.remove('invalid');attenuatorSummary.textContent='普通商品模式：不显示衰减计算器。';return}
      const step=Number(attenuatorStep.value),maximum=Number(attenuatorMax.value),switchStart=Number(attenuatorStart.value),units=attenuatorBits.map(bit=>Math.round(bit/step)),sum=attenuatorBits.reduce((total,bit)=>total+bit,0);let error='';
      if(!(step>0))error='最小步进必须大于 0。';else if(!attenuatorBits.length)error='至少需要一个拨码权重。';else if(attenuatorBits.some((bit,index)=>!(bit>0)||Math.abs(bit-units[index]*step)>1e-8||units[index]<1||(units[index]&(units[index]-1))))error='每个拨码权重必须是步进值的 1、2、4、8…倍。';else if(new Set(units).size!==units.length)error='拨码权重不能重复。';else if(!(maximum>0)||Math.abs(maximum-Math.round(maximum/step)*step)>1e-8||maximum>sum+1e-8)error='最大衰减必须是步进的整数倍，且不能超过拨码权重总和。';else if(!Number.isInteger(switchStart)||switchStart<1||switchStart>32)error='首个衰减拨码位必须在 1–32 之间。';
      attenuatorToggle.setCustomValidity(error);attenuatorSummary.classList.toggle('invalid',Boolean(error));attenuatorSummary.textContent=error||`DIP${switchStart}–DIP${switchStart+attenuatorBits.length-1} · ${attenuatorBits.length} 位拨码 · 权重合计 ${Number(sum.toFixed(10))} dB · 最大 ${maximum} dB`;attenuatorHidden.value=JSON.stringify({step, max:maximum, bits:attenuatorBits, switch_start:switchStart});
    };
    const renderAttenuatorBits=()=>{attenuatorBitsList.innerHTML=attenuatorBits.map((value,index)=>`<article class="attenuator-bit-row"><span>DIP${Number(attenuatorStart.value||2)+index}</span><label>权重 dB<input type="number" min="0.000001" step="any" data-attenuator-bit="${index}" value="${value}"></label><div><button type="button" class="button ghost compact" data-attenuator-bit-up="${index}" ${index===0?'disabled':''} aria-label="上移拨码">↑</button><button type="button" class="button ghost compact" data-attenuator-bit-down="${index}" ${index===attenuatorBits.length-1?'disabled':''} aria-label="下移拨码">↓</button><button type="button" class="button ghost compact" data-attenuator-bit-delete="${index}" ${attenuatorBits.length===1?'disabled':''}>删除</button></div></article>`).join('');
      $$('[data-attenuator-bit]',attenuatorBitsList).forEach(input=>input.oninput=()=>{attenuatorBits[Number(input.dataset.attenuatorBit)]=Number(input.value);validateAttenuator()});
      $$('[data-attenuator-bit-up]',attenuatorBitsList).forEach(button=>button.onclick=()=>{move(attenuatorBits,Number(button.dataset.attenuatorBitUp),-1);renderAttenuatorBits();validateAttenuator()});
      $$('[data-attenuator-bit-down]',attenuatorBitsList).forEach(button=>button.onclick=()=>{move(attenuatorBits,Number(button.dataset.attenuatorBitDown),1);renderAttenuatorBits();validateAttenuator()});
      $$('[data-attenuator-bit-delete]',attenuatorBitsList).forEach(button=>button.onclick=()=>{attenuatorBits.splice(Number(button.dataset.attenuatorBitDelete),1);renderAttenuatorBits();validateAttenuator()});
    };
    attenuatorToggle.onchange=validateAttenuator;[attenuatorStep,attenuatorMax].forEach(input=>input.oninput=validateAttenuator);attenuatorStart.oninput=()=>{renderAttenuatorBits();validateAttenuator()};attenuatorAdd.onclick=()=>{if(attenuatorBits.length>=16)return;const step=Number(attenuatorStep.value)||.25,last=attenuatorBits.at(-1)||step;attenuatorBits.push(Number((last*2).toFixed(10)));renderAttenuatorBits();validateAttenuator();$('[data-attenuator-bit="'+(attenuatorBits.length-1)+'"]',attenuatorBitsList)?.focus()};renderAttenuatorBits();validateAttenuator();
    const relatedSelectedHost=$('[data-related-selected]',dialog),relatedAvailableHost=$('[data-related-available]',dialog),relatedInputs=$('[data-related-inputs]',dialog),relatedSearch=$('[data-related-search]',dialog);
    const relatedCandidates=state.admin.products.filter(product=>product.slug!==row.slug);
    let relatedSlugs=(row.related_slugs||[]).filter((slug,index,list)=>relatedCandidates.some(product=>product.slug===slug)&&list.indexOf(slug)===index);
    const relatedProduct=slug=>relatedCandidates.find(product=>product.slug===slug);
    const syncRelatedInputs=()=>{relatedInputs.innerHTML=relatedSlugs.map(slug=>`<input type="hidden" name="related_slugs" value="${escapeHtml(slug)}">`).join('')};
    const renderRelatedProducts=()=>{
      relatedSelectedHost.innerHTML=relatedSlugs.length?relatedSlugs.map((slug,index)=>{const product=relatedProduct(slug);return `<article class="admin-related-row"><span>${String(index+1).padStart(2,'0')}</span><div><b>${escapeHtml(product?.model||slug)}</b><small>${escapeHtml(product?.name||slug)} · ${escapeHtml(product?.material_code||slug)}</small></div><div><button type="button" class="button ghost compact" data-related-up="${index}" ${index===0?'disabled':''} aria-label="上移关联商品">↑</button><button type="button" class="button ghost compact" data-related-down="${index}" ${index===relatedSlugs.length-1?'disabled':''} aria-label="下移关联商品">↓</button><button type="button" class="button ghost compact" data-related-remove="${index}">移除</button></div></article>`}).join(''):'<p class="structured-editor-empty">尚未关联其他商品。</p>';
      const query=relatedSearch.value.trim().toLowerCase(),available=relatedCandidates.filter(product=>!relatedSlugs.includes(product.slug)&&(!query||`${product.model} ${product.name} ${product.material_code} ${product.slug}`.toLowerCase().includes(query)));
      relatedAvailableHost.innerHTML=available.length?available.map(product=>`<article class="admin-related-candidate"><div><b>${escapeHtml(product.model)}</b><small>${escapeHtml(product.name)} · ${escapeHtml(product.material_code)}</small></div><button type="button" class="button ghost compact" data-related-add="${escapeHtml(product.slug)}" ${relatedSlugs.length>=24?'disabled':''}>关联</button></article>`).join(''):`<p class="structured-editor-empty">${query?'没有匹配的可关联商品。':'所有商品均已关联。'}</p>`;
      $$('[data-related-up]',relatedSelectedHost).forEach(button=>button.onclick=()=>{move(relatedSlugs,Number(button.dataset.relatedUp),-1);syncRelatedInputs();renderRelatedProducts()});
      $$('[data-related-down]',relatedSelectedHost).forEach(button=>button.onclick=()=>{move(relatedSlugs,Number(button.dataset.relatedDown),1);syncRelatedInputs();renderRelatedProducts()});
      $$('[data-related-remove]',relatedSelectedHost).forEach(button=>button.onclick=()=>{relatedSlugs.splice(Number(button.dataset.relatedRemove),1);syncRelatedInputs();renderRelatedProducts()});
      $$('[data-related-add]',relatedAvailableHost).forEach(button=>button.onclick=()=>{if(relatedSlugs.length>=24)return;relatedSlugs.push(button.dataset.relatedAdd);relatedSearch.value='';syncRelatedInputs();renderRelatedProducts()});
      syncRelatedInputs();
    };
    relatedSearch.addEventListener('input',renderRelatedProducts);renderRelatedProducts();
  }
  if(type==='hotspot'){
    const productSelect=$('[name="product_id"]',dialog),xInput=$('[name="x"]',dialog),yInput=$('[name="y"]',dialog),stage=$('.hotspot-picker-stage',dialog),image=$('img',stage),marker=$('.hotspot-picker-marker',stage);
    const clamp=value=>Math.max(0,Math.min(100,Number(value)||0));
    const syncMarker=()=>{const x=clamp(xInput.value),y=clamp(yInput.value);marker.style.left=`${x}%`;marker.style.top=`${y}%`;marker.setAttribute('aria-label',`热点位置 ${x.toFixed(1)}% / ${y.toFixed(1)}%`)};
    const syncImage=()=>{const product=state.admin.products.find(item=>item.id===Number(productSelect.value)),source=product&&(product.image_url||PRODUCT_DISPLAY_IMAGES[product.slug]||'');image.hidden=!source;stage.classList.toggle('no-image',!source);if(source)image.src=resolveContentUrl(source)};
    const setFromPointer=event=>{const rect=stage.getBoundingClientRect();xInput.value=(clamp((event.clientX-rect.left)/rect.width*100)).toFixed(1);yInput.value=(clamp((event.clientY-rect.top)/rect.height*100)).toFixed(1);syncMarker()};
    let dragging=false;stage.addEventListener('pointerdown',event=>{dragging=true;stage.setPointerCapture?.(event.pointerId);setFromPointer(event)});stage.addEventListener('pointermove',event=>{if(dragging)setFromPointer(event)});stage.addEventListener('pointerup',()=>dragging=false);stage.addEventListener('pointercancel',()=>dragging=false);
    [xInput,yInput].forEach(input=>input.addEventListener('input',syncMarker));productSelect.addEventListener('change',syncImage);syncImage();syncMarker();
    const actionHidden=$('[name="action"]',dialog),actionType=$('[data-hotspot-action-type]',dialog),actionTarget=$('[data-hotspot-action-target]',dialog),actionTargetWrap=$('[data-hotspot-action-target-wrap]',dialog),actionLabel=$('[data-hotspot-action-label]',dialog),actionPreview=$('[data-hotspot-action-preview]',dialog);
    const actionLabels={none:'仅展示热点说明',guide:'查看快速使用指导',calculator:'打开衰减计算器',documents:'查看产品资料',console:'打开网页版上位机',link:'打开外部链接'};
    const syncAction=()=>{const type=actionType.value,target=actionTarget.value.trim(),label=actionLabel.value.trim();actionTargetWrap.hidden=type!=='link';actionTarget.required=type==='link';actionTarget.disabled=type!=='link';const action=type==='none'?{}:{type,...(type==='link'&&target?{target}:{}),...(label?{label}:{})};actionHidden.value=JSON.stringify(action);actionPreview.innerHTML=`<span>用户按钮预览</span><b>${escapeHtml(label||actionLabels[type])}</b>`};
    [actionType,actionTarget,actionLabel].forEach(control=>control.addEventListener(control===actionType?'change':'input',syncAction));syncAction();
  }
  if(type==='tutorial'){
    const hidden=$('[name="steps"]',dialog),list=$('.tutorial-step-list',dialog);let steps=JSON.parse(hidden.value||'[]');
    const sync=()=>hidden.value=JSON.stringify(steps);
    const renderSteps=()=>{list.innerHTML=steps.map((step,index)=>`<article class="tutorial-step-row"><div class="tutorial-step-number">${String(index+1).padStart(2,'0')}</div><div class="tutorial-step-fields"><label>步骤标题<input data-step-title="${index}" maxlength="160" value="${escapeHtml(step.title||'')}" required></label><label>操作说明<textarea data-step-body="${index}" rows="3" maxlength="4000" required>${escapeHtml(step.body||'')}</textarea></label></div><div class="tutorial-step-actions"><button type="button" class="button ghost compact" data-step-up="${index}" ${index===0?'disabled':''} aria-label="上移步骤">↑</button><button type="button" class="button ghost compact" data-step-down="${index}" ${index===steps.length-1?'disabled':''} aria-label="下移步骤">↓</button><button type="button" class="button ghost compact" data-step-delete="${index}" ${steps.length===1?'disabled':''}>删除</button></div></article>`).join('');
      $$('[data-step-title]',list).forEach(input=>input.oninput=()=>{steps[Number(input.dataset.stepTitle)].title=input.value;sync()});
      $$('[data-step-body]',list).forEach(input=>input.oninput=()=>{steps[Number(input.dataset.stepBody)].body=input.value;sync()});
      $$('[data-step-up]',list).forEach(button=>button.onclick=()=>{const index=Number(button.dataset.stepUp);[steps[index-1],steps[index]]=[steps[index],steps[index-1]];sync();renderSteps()});
      $$('[data-step-down]',list).forEach(button=>button.onclick=()=>{const index=Number(button.dataset.stepDown);[steps[index+1],steps[index]]=[steps[index],steps[index+1]];sync();renderSteps()});
      $$('[data-step-delete]',list).forEach(button=>button.onclick=()=>{steps.splice(Number(button.dataset.stepDelete),1);sync();renderSteps()});
    };
    $('[data-tutorial-add]',dialog).onclick=()=>{steps.push({title:`第 ${steps.length+1} 步`,body:''});sync();renderSteps();list.lastElementChild?.scrollIntoView({behavior:'smooth',block:'nearest'});$('[data-step-title="'+(steps.length-1)+'"]',list)?.focus()};sync();renderSteps();
  }
  if(type==='order'){const status=$('[name="status"]',dialog),carrier=$('[name="shipping_carrier"]',dialog),tracking=$('[name="tracking_no"]',dialog);const syncRequired=()=>{const required=status.value==='shipped';carrier.required=required;tracking.required=required};status.onchange=syncRequired;syncRequired()}
  $('#admin-editor-form').onsubmit=async e=>{e.preventDefault();const fd=new FormData(e.target),payload=Object.fromEntries(fd);let transientAssetId=0;try{
    if(type==='category')payload.sort_order=Number(payload.sort_order);
    if(type==='product'){payload.price=Number(payload.price);payload.cost=Number(payload.cost);payload.enabled=fd.has('enabled')?1:0;payload.featured=fd.has('featured')?1:0;payload.specs=JSON.parse(payload.specs||'{}');payload.capabilities=JSON.parse(payload.capabilities||'[]');payload.attenuator=payload.attenuator.trim()?JSON.parse(payload.attenuator):null;payload.related_slugs=fd.getAll('related_slugs')}
    if(type==='tutorial'){payload.product_id=Number(payload.product_id);payload.duration_minutes=Number(payload.duration_minutes);payload.steps=JSON.parse(payload.steps||'[]')}
    if(type==='document'){
      payload.product_id=Number(payload.product_id);const file=fd.get('document_file');delete payload.document_file;
      payload.source_asset_id=Number(payload.source_asset_id||0);
      if(file?.size){const asset=await uploadAdminAsset(payload.product_id,'document',payload.version||'1.0',file);transientAssetId=asset.id;payload.file_url=asset.asset_url;payload.file_size=formatBytes(asset.file_size);payload.source_asset_id=asset.id;if(!payload.title.trim())payload.title=file.name}
      else if(payload.source_asset_id&&String(payload.file_url||'').trim()!==String(row.file_url||'').trim())payload.source_asset_id=0;
    }
    if(type==='hotspot'){payload.product_id=Number(payload.product_id);payload.sort_order=Number(payload.sort_order);payload.position={x:Number(payload.x),y:Number(payload.y)};payload.action=JSON.parse(payload.action||'{}');delete payload.x;delete payload.y}
    const plural={category:'categories',product:'products',document:'documents',tutorial:'tutorials',hotspot:'hotspots',order:'orders',contact:'contacts'}[type];await adminApi(`/api/admin/${plural}${row.id?'/'+row.id:''}`,{method:row.id?'PATCH':'POST',body:JSON.stringify(payload)});transientAssetId=0;dialog.close();state.products=[];state.categories=[];await ensureCatalog();toast(type==='contact'?'支持单已更新':type==='order'?'订单履约已更新':'内容已保存');if(location.hash==='#admin')renderAdmin();
  }catch(err){if(transientAssetId)await adminApi(`/api/admin/assets/${transientAssetId}`,{method:'DELETE'}).catch(()=>{});toast(err.message)}}; dialog.showModal();
}
function bindAdmin(){
  $('#admin-logout').onclick=async()=>{await adminApi('/api/admin/logout',{method:'POST',body:'{}'}).catch(()=>{});state.adminToken='';sessionStorage.removeItem('zya-admin-token');syncRoleUI();adminLoginView()};
  const activateTab=key=>{$$('#app [data-admin-tab]').forEach(x=>x.classList.toggle('active',x.dataset.adminTab===key));$$('#app [data-admin-pane]').forEach(x=>x.classList.toggle('active',x.dataset.adminPane===key))};
  activateTab(state.adminTab);
  $$('#app [data-admin-tab]').forEach(button=>button.onclick=()=>{state.adminTab=button.dataset.adminTab;activateTab(state.adminTab)});
  $$('#app [data-admin-jump]').forEach(button=>button.onclick=()=>{state.adminTab=button.dataset.adminJump;activateTab(state.adminTab);$('#app .admin-shell')?.scrollIntoView({behavior:'smooth',block:'start'})});
  $$('#app [data-admin-new]').forEach(button=>button.onclick=()=>showAdminEditor(button.dataset.adminNew));
  $$('#app [data-product-workspace]').forEach(button=>button.onclick=()=>showProductWorkspace(button.dataset.productWorkspace));
  $$('#app [data-admin-edit]').forEach(button=>button.onclick=()=>{const type=button.dataset.adminEdit;const list={category:'categories',product:'products',document:'documents',tutorial:'tutorials',hotspot:'hotspots',order:'orders',contact:'contacts'}[type];showAdminEditor(type,state.admin[list].find(x=>x.id===Number(button.dataset.id)))});
  $$('#app [data-admin-delete]').forEach(button=>button.onclick=async()=>{if(button.disabled)return;const plural={category:'categories',document:'documents',tutorial:'tutorials',hotspot:'hotspots',asset:'assets'}[button.dataset.adminDelete];if(!confirm('确认删除这条记录？此操作会写入操作记录。'))return;await adminApi(`/api/admin/${plural}/${button.dataset.id}`,{method:'DELETE'});state.products=[];state.categories=[];toast('已删除');if(location.hash==='#admin')renderAdmin()});
  $$('#app [data-admin-status]').forEach(select=>select.onchange=async()=>{const plural=select.dataset.adminStatus==='order'?'orders':'contacts';await adminApi(`/api/admin/${plural}/${select.dataset.id}`,{method:'PATCH',body:JSON.stringify({status:select.value})});toast('状态已更新')});
  $$('#app [data-admin-retry]').forEach(button=>button.onclick=async()=>{button.disabled=true;try{const result=await adminApi(`/api/admin/orders/${button.dataset.adminRetry}/retry-sync`,{method:'POST',body:'{}'});toast(`库存同步：${result.status}`);if(location.hash==='#admin')renderAdmin()}catch(err){toast(err.message)}finally{button.disabled=false}});
  const uploadForm=$('#asset-upload-form');if(uploadForm)uploadForm.onsubmit=async e=>{e.preventDefault();const fd=new FormData(e.target),file=fd.get('file');if(!file?.size)return toast('请选择文件');const button=$('button',e.target);button.disabled=true;button.textContent='上传中…';try{await uploadAdminAsset(fd.get('product_id'),fd.get('asset_type'),fd.get('version')||'1.0',file);state.products=[];toast('资源文件已上传');if(location.hash==='#admin')renderAdmin()}catch(err){toast(err.message)}finally{button.disabled=false;button.textContent='上传资源'}};
  const exportButton=$('[data-admin-export-orders]');if(exportButton)exportButton.onclick=()=>protectedDownload('/api/admin/orders/export.csv','smart-manual-orders.csv');
  const auditExport=$('[data-admin-export-audit]');if(auditExport)auditExport.onclick=()=>protectedDownload('/api/admin/audit-logs/export.csv','smart-manual-admin-audit.csv');
  const backupButton=$('#download-full-backup');if(backupButton)backupButton.onclick=async()=>{backupButton.disabled=true;backupButton.textContent='正在生成一致性备份…';try{if(await protectedDownload('/api/admin/backup/download',`zya-smart-manual-backup-${new Date().toISOString().slice(0,10)}.zip`))toast('完整备份已生成并开始下载')}finally{backupButton.disabled=false;backupButton.textContent='下载完整备份 ZIP'}};
  const pagesPreview=$('#pages-publish-preview');if(pagesPreview)pagesPreview.onclick=async()=>{pagesPreview.disabled=true;pagesPreview.textContent='正在生成…';try{const result=await adminApi('/api/admin/pages/publish',{method:'POST',body:JSON.stringify({dry_run:true})});toast(`快照已生成：${result.snapshot.products} 个商品 · ${result.snapshot.sha256.slice(0,12)}`);if(location.hash==='#admin')renderAdmin()}catch(err){toast(err.message)}finally{pagesPreview.disabled=false;pagesPreview.textContent='重新生成预览'}};
  const pagesPublish=$('#pages-publish-confirm');if(pagesPublish)pagesPublish.onclick=async()=>{if(!confirm('确认发布当前预览中的完整商品与公开资料？未完善商品会保留为目录记录，但不会展示给访客。'))return;pagesPublish.disabled=true;pagesPublish.textContent='正在发布…';try{const result=await adminApi('/api/admin/pages/publish',{method:'POST',body:JSON.stringify({confirm:true,expected_sha256:state.admin.pagesStatus.snapshot.sha256,message:`content: publish catalog ${new Date().toISOString().slice(0,10)}`})});toast(`Pages 目录已发布 · ${result.commit_sha.slice(0,12)}`);if(location.hash==='#admin')renderAdmin()}catch(err){toast(err.message)}finally{pagesPublish.disabled=false;pagesPublish.textContent='确认发布到 Pages'}};
  const orderSearch=$('#admin-order-search'),orderStatus=$('#admin-order-status');
  const filterOrders=()=>{const q=(orderSearch?.value||'').trim().toLowerCase(),status=orderStatus?.value||'',rows=$$('#admin-order-table-host tbody tr');let visible=0;rows.forEach((tr,index)=>{const item=state.admin.orders[index];if(!item)return;const haystack=`${item.order_no} ${item.customer_name} ${item.company} ${item.phone} ${item.email} ${item.shipping_carrier} ${item.tracking_no} ${(item.items||[]).map(x=>`${x.material_code} ${x.product_name}`).join(' ')}`.toLowerCase();const show=(!q||haystack.includes(q))&&(!status||item.status===status);tr.hidden=!show;if(show)visible++});const count=$('#admin-order-count');if(count)count.textContent=`${visible} 个订单`};
  [orderSearch,orderStatus].filter(Boolean).forEach(control=>control.addEventListener(control.tagName==='INPUT'?'input':'change',filterOrders));
  const auditSearch=$('#audit-search'),auditAction=$('#audit-action'),auditEntity=$('#audit-entity');
  const filterAudit=()=>{const q=(auditSearch?.value||'').trim().toLowerCase(),action=auditAction?.value||'',entity=auditEntity?.value||'',rows=$$('#audit-table-host tbody tr');let visible=0;rows.forEach((tr,index)=>{const item=state.admin.auditLogs[index];if(!item)return;const haystack=`${item.actor} ${item.summary} ${item.entity_id} ${item.before_json} ${item.after_json}`.toLowerCase();const show=(!q||haystack.includes(q))&&(!action||item.action===action)&&(!entity||item.entity_type===entity);tr.hidden=!show;if(show)visible++});const count=$('#audit-result-count');if(count)count.textContent=`${visible} 条记录`};
  [auditSearch,auditAction,auditEntity].filter(Boolean).forEach(control=>control.addEventListener(control.tagName==='INPUT'?'input':'change',filterAudit));
  $$('[data-protected-download]').forEach(button=>button.onclick=()=>protectedDownload(`/api/annotations/export.${button.dataset.protectedDownload}`,`agent-change-request.${button.dataset.protectedDownload}`));
  $$('#app [data-admin-resolve]').forEach(button=>button.onclick=async()=>{const row=state.admin.annotations.find(x=>x.id===Number(button.dataset.adminResolve));await api(`/api/annotations/${row.id}`,{method:'PATCH',body:JSON.stringify({status:row.status==='resolved'?'open':'resolved'})});if(location.hash==='#admin')renderAdmin()});
}
async function runZyaAction(action){const output=$('#console-output');if(output)output.innerHTML+=`<div class="line">[request] ${escapeHtml(action)}...</div>`;try{const result=await zyaBridge.send(action);if(output)output.innerHTML+=`<div class="line ok">[response] ${escapeHtml(JSON.stringify(result))}</div>`;toast(zyaBridge.mode==='browser-demo'?'演示动作已完成；嵌入ZYA1000后自动调用真实设备。':'ZYA1000 操作已完成')}catch(err){if(output)output.innerHTML+=`<div class="line" style="color:var(--red)">[error] ${escapeHtml(err.message)}</div>`;toast(err.message)}}
function renderNotFound(){app.innerHTML='<div class="page"><span class="eyebrow">404</span><h1 class="page-title">没有找到这个页面</h1><p class="lead">链接可能已变化。</p><a class="button primary" href="#home">返回首页</a></div>'}

async function route() {
  if (!location.hash && launchParams.get('model')) {
    await ensureCatalog();
    const requested=launchParams.get('model').toUpperCase();
    const matched=state.products.find(p=>p.model.toUpperCase()===requested||p.material_code.toUpperCase()===requested);
    location.hash=matched?`#product/${matched.slug}`:'#products'; return;
  }
  const value=(location.hash||'#home').slice(1);state.zyaSerialCleanup?.();state.route='#'+value;const adminView=value==='admin'||value==='analytics';document.body.classList.toggle('admin-view',adminView);$('.brand small').textContent=adminView?'运营管理工作区':'产品数字服务平台';app.innerHTML='<div class="loading-page"><span class="loader"></span></div>'; window.scrollTo(0,0);
  try {
    if(value==='home') await renderHome(); else if(value==='products') await renderProducts(); else if(value.startsWith('products/category/')) await renderProducts(decodeURIComponent(value.slice('products/category/'.length))); else if(value==='compare') await renderCompare(); else if(value.startsWith('product/')) await renderProduct(value.split('/')[1]); else if(value.startsWith('tutorial/')) await renderTutorial(value.split('/')[1]); else if(value.startsWith('order/')) await renderOrder(value); else if(value==='orders') await renderOrders(); else if(value==='selector') await renderSelector(); else if(value==='tutorials') await renderTutorials(); else if(value==='downloads') await renderDownloads(); else if(value.startsWith('support-ticket/')) await renderSupportTicket(value); else if(value==='support') await renderSupport(); else if(value==='zya1000'){location.hash='#product/zyc100-controller';return} else if(value==='analytics') await renderAnalytics(); else if(value==='admin') await renderAdmin(); else renderNotFound();
  } catch(err) { app.innerHTML=`<div class="page"><span class="eyebrow">LOAD ERROR</span><h1>页面加载失败</h1><p>${escapeHtml(err.message)}</p><button class="button primary" onclick="location.reload()">重新加载</button></div>`; }
  $('#mobile-nav').classList.remove('open'); setTimeout(drawAnnotationMarks,0);
}

document.addEventListener('click', e => {
  const favorite=e.target.closest('[data-favorite]');if(favorite){e.preventDefault();const removeFromFavoriteView=$('#favorite-filter')?.classList.contains('active'),card=favorite.closest('.product-card');toggleFavorite(favorite.dataset.favorite);if(removeFromFavoriteView&&card){card.remove();if(!$('#product-grid .product-card'))$('#product-grid').innerHTML='<div class="empty">还没有收藏符合条件的产品</div>'}return}
  const add=e.target.closest('[data-add-cart]'); if(add) addToCart(add.dataset.addCart);
  const compare=e.target.closest('[data-compare]'); if(compare){toggleCompare(compare.dataset.compare);if(compare.closest('.selector-result'))compare.textContent=state.compare.includes(Number(compare.dataset.compare))?'已在对比':'加入对比'}
  const hotspotToggle=e.target.closest('[data-hotspot-toggle]');if(hotspotToggle){const stage=hotspotToggle.closest('.pseudo3d-viewer'),hidden=stage.classList.toggle('hotspots-hidden');hotspotToggle.setAttribute('aria-pressed',String(hidden));$('b',hotspotToggle).textContent=hidden?'显示标注':'隐藏标注';if(hidden){$('.hotspot-detail',stage)?.classList.remove('open');$$('[data-hotspot]',stage).forEach(item=>{item.classList.remove('active');item.setAttribute('aria-expanded','false')})}return}
  const hotspotAction=e.target.closest('[data-hotspot-action]');if(hotspotAction){const type=hotspotAction.dataset.actionType,target=hotspotAction.dataset.actionTarget;if(type==='link'){window.open(target,'_blank','noopener,noreferrer');return}if(type==='console'){location.href=sitePath('zya1000-console.html');return}const selector={guide:'#tutorial-section',calculator:'.calculator',documents:'#document-section'}[type],section=selector?$(selector):null;if(section)section.scrollIntoView({behavior:'smooth',block:'start'});else toast('当前商品还没有可打开的对应内容');return}
  const hotspot=e.target.closest('[data-hotspot]'); if(hotspot){const stage=hotspot.closest('.device-stage'),detail=$('.hotspot-detail',stage),actionButton=$('[data-hotspot-action]',detail),type=hotspot.dataset.actionType||'',defaultLabels={guide:'查看快速使用指导',calculator:'打开衰减计算器',documents:'查看产品资料',console:'打开网页版上位机',link:'打开外部链接'};$$('[data-hotspot]',stage).forEach(item=>{const active=item===hotspot;item.classList.toggle('active',active);item.setAttribute('aria-expanded',String(active))});$('b',detail).textContent=hotspot.dataset.label;$('span',detail).textContent=hotspot.dataset.description;actionButton.hidden=!defaultLabels[type];actionButton.textContent=hotspot.dataset.actionLabel||defaultLabels[type]||'';actionButton.dataset.actionType=type;actionButton.dataset.actionTarget=hotspot.dataset.actionTarget||'';detail.classList.add('open');}
  const copyOrder=e.target.closest('[data-copy-order]');if(copyOrder){navigator.clipboard?.writeText(copyOrder.dataset.copyOrder);toast('订单号已复制')}
  const copyTracking=e.target.closest('[data-copy-tracking]');if(copyTracking){navigator.clipboard?.writeText(copyTracking.dataset.copyTracking);toast('物流单号已复制')}
  if(e.target.closest('[data-repeat-order]')&&state.currentOrder){state.cart=state.currentOrder.items.map(item=>({product_id:item.product_id,material_code:item.material_code,model:item.model||item.material_code,name:item.product_name,price:item.unit_price,quantity:item.quantity}));saveCart();openCart();toast('商品已重新加入购买清单')}
  const action=e.target.closest('[data-zya-action]'); if(action)runZyaAction(action.dataset.zyaAction);
  if(e.target.matches('[data-cart-minus]')){const item=state.cart.find(x=>x.product_id===Number(e.target.dataset.cartMinus));if(item){item.quantity--;if(item.quantity<=0)state.cart=state.cart.filter(x=>x!==item);saveCart()}}
  if(e.target.matches('[data-cart-plus]')){const item=state.cart.find(x=>x.product_id===Number(e.target.dataset.cartPlus));if(item){item.quantity++;saveCart()}}
  if(e.target.id==='checkout-button'){const button=e.target;button.disabled=true;button.textContent='正在核对库存…';loadAvailability(true).finally(()=>{closeCart();$('#checkout-error').textContent='';renderCheckoutSummary();$('#checkout-dialog').showModal();button.disabled=false;button.textContent='核对并提交需求'})}
});

$('#checkout-form').addEventListener('submit', async e => {
  e.preventDefault();const button=$('#submit-order'),error=$('#checkout-error'),fields=Object.fromEntries(new FormData(e.target));error.textContent='';
  if(!String(fields.phone||'').trim()&&!String(fields.email||'').trim()){error.textContent='请至少填写联系电话或邮箱，方便确认需求和查询进度';return}
  if(!state.cart.length){error.textContent='购买清单为空，请重新选择商品';return}
  button.disabled=true;button.textContent='正在提交…';
  try{await loadAvailability(true);renderCheckoutSummary();const payload={...fields,items:state.cart};const result=await api('/api/orders',{method:'POST',body:JSON.stringify(payload)});state.cart=[];saveCart();$('#checkout-dialog').close();e.target.reset();localStorage.setItem('zya-last-order',JSON.stringify({order_no:result.order_no,access_token:result.access_token}));location.hash=orderAccessHash(result.order_no,result.access_token);}
  catch(err){error.textContent=err.message} finally{button.disabled=false;button.textContent='提交购买需求'}
});
$$('[data-cancel-checkout]').forEach(button=>button.onclick=()=>{$('#checkout-error').textContent='';$('#checkout-dialog').close()});
$('#cart-toggle').onclick=openCart; $('#backdrop').onclick=closeCart; $('[data-close-drawer]').onclick=closeCart;
$('#menu-toggle').onclick=()=>$('#mobile-nav').classList.toggle('open');
$('#theme-toggle').onclick=e=>{e.stopPropagation();const panel=$('#theme-panel'),open=!panel.classList.contains('open');panel.classList.toggle('open',open);panel.setAttribute('aria-hidden',String(!open));e.currentTarget.setAttribute('aria-expanded',String(open));updateThemeControls()};
$('.theme-panel-close').onclick=closeThemePanel;
$$('[data-theme-choice]').forEach(button=>button.onclick=()=>{applyTheme(button.dataset.themeChoice);closeThemePanel()});
$('#theme-panel').onclick=e=>e.stopPropagation();
document.addEventListener('click',closeThemePanel);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeThemePanel()});

// Review mode: drag a rectangle, describe it once, export all notes after finished-product review.
const capture=$('#review-capture'); let drag=null, reviewBox=null;
function clearReviewInteraction(){
  drag=null;if(reviewBox){reviewBox.remove();reviewBox=null}
  capture.classList.remove('active');capture.style.removeProperty('display');capture.style.removeProperty('pointer-events');
  document.body.classList.remove('review-text-mode','review-image-mode');
  const selection=getSelection();if(selection)selection.removeAllRanges();
}
async function toggleReview(force) {
  if(!state.adminToken&&force!==false){syncRoleUI();return toast('批注验收仅管理员登录后可用')}
  state.review=typeof force==='boolean'?force:!state.review;
  $('#review-toolbar').classList.toggle('active',state.review);$('#review-toolbar').setAttribute('aria-hidden',String(!state.review));
  if(state.review){setReviewMode(state.reviewMode);await loadAnnotations();toast('批注模式已开启，可框选区域、选择文字或点击图片。')}else{clearReviewInteraction();$('#annotation-marks').innerHTML=''}
}
function setReviewMode(mode) {
  state.reviewMode=mode;
  $$('#review-toolbar [data-review-mode]').forEach(button=>button.classList.toggle('active',button.dataset.reviewMode===mode));
  document.body.classList.toggle('review-text-mode',state.review&&mode==='text');
  document.body.classList.toggle('review-image-mode',state.review&&mode==='image');
  capture.classList.toggle('active',state.review&&(mode==='area'||mode==='image'));
  const messages={area:'拖动圈选有问题的位置',text:'用鼠标选择页面文字，松开后添加批注',image:'点击产品图、模型区域或页面图片'};
  $('#review-help').textContent=messages[mode];
}
async function loadAnnotations(){const result=await api('/api/annotations');state.annotations=result.rows;$('#annotation-count').textContent=state.annotations.filter(x=>x.status==='open').length;drawAnnotationMarks()}
function rawElementAt(x,y){const previous=capture.style.display;capture.style.display='none';const el=document.elementFromPoint(x,y);capture.style.display=previous;return el;}
function elementAt(x,y){return rawElementAt(x,y)?.closest('[data-review-id]')||app;}
function normalizedRect(anchor,rect){const base=anchor.getBoundingClientRect();return{x:+((rect.left-base.left)/base.width).toFixed(5),y:+((rect.top-base.top)/base.height).toFixed(5),width:+(rect.width/base.width).toFixed(5),height:+(rect.height/base.height).toFixed(5)}}
function openAnnotationSelection({annotation_type='area',anchor,rect,selected_text='',selected_image=''}){
  state.selection={annotation_type,page_route:state.route,module_key:anchor.closest('[data-module]')?.dataset.module||'',element_key:anchor.dataset.reviewId||'page.root',selected_text,selected_image,rect:normalizedRect(anchor,rect),viewport:{width:innerWidth,height:innerHeight,devicePixelRatio}};
  const labels={area:'框选区域',text:'选择文字',image:'选择图片'};
  $('#selection-path').textContent=`${labels[annotation_type]} · ${state.selection.page_route} › ${state.selection.element_key}`;
  const preview=$('#selection-preview');const previewText=selected_text?`“${selected_text}”`:selected_image?`图片：${selected_image}`:'';preview.textContent=previewText;preview.classList.toggle('visible',Boolean(previewText));
  capture.classList.remove('active');$('#annotation-dialog').showModal();
}
capture.addEventListener('pointerdown',e=>{
  if(state.reviewMode==='image'){
    const raw=rawElementAt(e.clientX,e.clientY);const imageTarget=raw?.closest('img,[data-review-image]');
    if(!imageTarget){toast('这里不是可选择的图片或产品模型区域');return;}
    drag={imageTarget};capture.setPointerCapture(e.pointerId);return;
  }
  const target=elementAt(e.clientX,e.clientY);drag={sx:e.clientX,sy:e.clientY,target,targetRect:target.getBoundingClientRect()};reviewBox=document.createElement('div');reviewBox.className='review-box';document.body.appendChild(reviewBox);capture.setPointerCapture(e.pointerId)
});
capture.addEventListener('pointermove',e=>{if(!drag||state.reviewMode!=='area')return;const left=Math.min(drag.sx,e.clientX),top=Math.min(drag.sy,e.clientY),width=Math.abs(e.clientX-drag.sx),height=Math.abs(e.clientY-drag.sy);Object.assign(reviewBox.style,{left:left+'px',top:top+'px',width:width+'px',height:height+'px'})});
capture.addEventListener('pointerup',e=>{
  if(!drag)return;
  if(state.reviewMode==='image'){
    const imageTarget=drag.imageTarget;drag=null;const anchor=imageTarget.closest('[data-review-id]')||app;const imageRef=imageTarget.currentSrc||imageTarget.getAttribute?.('src')||imageTarget.dataset.reviewImage||anchor.dataset.reviewId||'page-image';openAnnotationSelection({annotation_type:'image',anchor,rect:imageTarget.getBoundingClientRect(),selected_image:imageRef});return;
  }
  const left=Math.min(drag.sx,e.clientX),top=Math.min(drag.sy,e.clientY),width=Math.abs(e.clientX-drag.sx),height=Math.abs(e.clientY-drag.sy);reviewBox.remove();reviewBox=null;if(width<8||height<8){drag=null;return toast('请拖动圈出一个范围');}const anchor=drag.target;drag=null;openAnnotationSelection({annotation_type:'area',anchor,rect:{left,top,width,height}})
});
$('#annotation-dialog').addEventListener('close',()=>{state.selection=null;if(state.review)setReviewMode(state.reviewMode)});
document.addEventListener('mouseup',e=>{
  if(!state.review||state.reviewMode!=='text'||$('#annotation-dialog').open||e.target.closest?.('#review-toolbar,.modal'))return;
  setTimeout(()=>{const selection=getSelection();if(!selection||selection.isCollapsed||!selection.rangeCount)return;const text=selection.toString().trim();if(!text)return;const range=selection.getRangeAt(0);const node=range.commonAncestorContainer;const element=node.nodeType===Node.ELEMENT_NODE?node:node.parentElement;if(!element||!app.contains(element))return;const anchor=element.closest('[data-review-id]')||app;const rect=range.getBoundingClientRect();if(rect.width<=0||rect.height<=0)return;openAnnotationSelection({annotation_type:'text',anchor,rect,selected_text:text.slice(0,2000)});selection.removeAllRanges()},0)
});
$$('[data-cancel-annotation]').forEach(button=>button.onclick=()=>{$('#annotation-form').reset();$('#annotation-dialog').close()});
$('#annotation-form').addEventListener('submit',async e=>{e.preventDefault();if(!state.selection)return;const fields=Object.fromEntries(new FormData(e.target));try{await api('/api/annotations',{method:'POST',body:JSON.stringify({...state.selection,note:fields.note,expected:fields.expected,severity:fields.severity,target:undefined})});e.target.reset();$('#annotation-dialog').close();await loadAnnotations();toast('问题已保存，可继续圈选或导出给 Agent。')}catch(err){toast(err.message)}});
function drawAnnotationMarks(){const root=$('#annotation-marks');root.innerHTML='';if(!state.review)return;state.annotations.filter(a=>a.status==='open'&&a.page_route===state.route).forEach(a=>{const target=document.querySelector(`[data-review-id="${CSS.escape(a.element_key)}"]`)||app;const r=target.getBoundingClientRect();const mark=document.createElement('div');mark.className=`annotation-mark annotation-${a.annotation_type||'area'}`;const icon={area:'□',text:'T',image:'▧'}[a.annotation_type]||'□';mark.innerHTML=`<b>${icon} #${a.id}</b>`;Object.assign(mark.style,{left:(scrollX+r.left+a.rect.x*r.width)+'px',top:(scrollY+r.top+a.rect.y*r.height)+'px',width:(a.rect.width*r.width)+'px',height:(a.rect.height*r.height)+'px'});root.appendChild(mark)})}
async function showAnnotationList(){await loadAnnotations();const root=$('#annotation-list');root.innerHTML=state.annotations.length?state.annotations.map(a=>`<article class="annotation-card"><header><b>#${a.id} · ${{area:'框选',text:'文字',image:'图片'}[a.annotation_type]||a.annotation_type} · <span class="severity-${a.severity}">${a.severity}</span></b><small>${escapeHtml(a.status)}</small></header>${a.selected_text?`<blockquote>“${escapeHtml(a.selected_text)}”</blockquote>`:''}${a.selected_image?`<small>图片：${escapeHtml(a.selected_image)}</small>`:''}<p>${escapeHtml(a.note)}</p><small>${escapeHtml(a.page_route)} › ${escapeHtml(a.element_key)}</small><div style="margin-top:10px"><button class="button ghost" data-resolve-annotation="${a.id}">标记已解决</button><button class="button ghost" data-delete-annotation="${a.id}">删除</button></div></article>`).join(''):'<div class="empty">还没有批注</div>';$('#annotation-list-dialog').showModal()}
$('#annotation-list').onclick=async e=>{const resolve=e.target.closest('[data-resolve-annotation]'),del=e.target.closest('[data-delete-annotation]');if(resolve){await api(`/api/annotations/${resolve.dataset.resolveAnnotation}`,{method:'PATCH',body:JSON.stringify({status:'resolved'})});showAnnotationList()}if(del){await api(`/api/annotations/${del.dataset.deleteAnnotation}`,{method:'DELETE'});showAnnotationList()}};
$('#review-toggle').onclick=()=>toggleReview();$('#review-exit').onclick=()=>toggleReview(false);$('#review-list-button').onclick=showAnnotationList;$('[data-close-list]').onclick=()=>$('#annotation-list-dialog').close();$$('#review-toolbar [data-review-mode]').forEach(button=>button.onclick=()=>setReviewMode(button.dataset.reviewMode));
$$('[data-review-export]').forEach(button=>button.onclick=()=>protectedDownload(`/api/annotations/export.${button.dataset.reviewExport}`,`agent-change-request.${button.dataset.reviewExport}`));
addEventListener('resize',()=>state.review&&drawAnnotationMarks());addEventListener('scroll',()=>state.review&&drawAnnotationMarks(),{passive:true});
addEventListener('hashchange',route);syncRoleUI();saveCart(); route();
addEventListener('message',event=>{if(event.origin!==location.origin||event.data?.type!=='zya1000-compact-height')return;const frame=$('iframe[data-zya-compact]');if(frame)frame.style.height=`${Math.max(250,Math.min(760,Number(event.data.height)||320))}px`});
