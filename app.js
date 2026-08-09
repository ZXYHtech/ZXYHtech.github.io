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
const resolveContentUrl = path => {
  const value=String(path||'');
  if(!value||value.startsWith('#')||/^(?:https?:|data:|blob:|mailto:|tel:)/i.test(value))return value;
  return sitePath(value);
};
const PRODUCT_DISPLAY_IMAGES = Object.freeze({
  'zya-dat-63': 'assets/products/zye660-cutout-v1.png?v=1.7.5',
  'zyc100-controller': 'assets/products/zyc100-cutout-v3.png?v=1.16.2'
});
const productDisplayImage = product => PRODUCT_DISPLAY_IMAGES[product?.slug]
  ? sitePath(PRODUCT_DISPLAY_IMAGES[product.slug])
  : resolveContentUrl(product?.image_url || '');
const apiPath = path => runtime.apiBaseUrl
  ? `${String(runtime.apiBaseUrl).replace(/\/$/,'')}${path.startsWith('/')?path:`/${path}`}`
  : path;
if (launchParams.get('embed') === 'zya1000') document.body.classList.add('embed-mode');
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  addEventListener('load',()=>navigator.serviceWorker.register(sitePath('service-worker.js?v=1.29.0'),{updateViaCache:'none'}).catch(()=>{}));
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
  const mode=window.chrome?.webview?'webview2':window.ZYA1000Bridge?.invoke?'native-object':'browser-demo';
  if(window.chrome?.webview){window.chrome.webview.addEventListener('message',event=>{const message=typeof event.data==='string'?JSON.parse(event.data):event.data;const task=pending.get(message.requestId);if(task){pending.delete(message.requestId);message.ok===false?task.reject(new Error(message.error||'ZYA1000 操作失败')):task.resolve(message)}})}
  async function send(action,payload={}){
    const requestId=`zya-${Date.now()}-${Math.random().toString(16).slice(2)}`;const message={protocol:'zya1000.web/v1',requestId,action,payload,context:{model:launchParams.get('model')||'',serial:launchParams.get('serial')||'',hardware:launchParams.get('hardware')||'',firmware:launchParams.get('firmware')||''}};
    if(mode==='webview2')return new Promise((resolve,reject)=>{pending.set(requestId,{resolve,reject});window.chrome.webview.postMessage(message);setTimeout(()=>{if(pending.delete(requestId))reject(new Error('ZYA1000 响应超时'))},8000)});
    if(mode==='native-object'){const result=await window.ZYA1000Bridge.invoke(JSON.stringify(message));return typeof result==='string'?JSON.parse(result):result}
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
  if(method==='GET'&&runtime.mode==='hybrid'){
    const local=await staticCatalogResponse(path);
    if(local)return local;
  }
  if(runtime.mode==='hybrid'&&!runtime.apiBaseUrl&&path.startsWith('/api/'))throw new Error('下单服务尚未配置，请联系网站管理员');
  const response = await fetch(apiPath(path), {...options,headers:{'Content-Type':'application/json',...(state.adminToken?{'Authorization':`Bearer ${state.adminToken}`}:{}) ,...(options.headers||{})}});
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(data.error || '请求失败');
  return data;
}
function syncRoleUI(){const admin=Boolean(state.adminToken);document.body.classList.toggle('is-admin-session',admin);const button=$('#review-toggle');if(button)button.hidden=!admin;if(!admin&&state.review)toggleReview(false)}
async function protectedDownload(path,filename){try{const response=await fetch(path,{headers:{'Authorization':`Bearer ${state.adminToken}`}});if(!response.ok)throw new Error('没有权限导出该文件');const blob=await response.blob(),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=filename;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return true}catch(err){toast(err.message);return false}}
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
          <div class="pseudo3d-features" aria-label="产品功能位置">${guide.map(h=>{const position=positions[h.hotspot_key]||[Number(h.position?.x)||50,Number(h.position?.y)||50];return `<button type="button" style="--hotspot-x:${position[0]}%;--hotspot-y:${position[1]}%" data-hotspot="${escapeHtml(h.hotspot_key)}" data-label="${escapeHtml(h.label)}" data-description="${escapeHtml(h.description)}" aria-expanded="false"><i aria-hidden="true"></i><span>${escapeHtml(h.label)}</span></button>`}).join('')}</div>
        </div>
      </div>
      <div class="hotspot-detail"><b></b><br><span></span></div>
    </div>`;
  }
  return `<div class="device-stage ${large?'interactive-viewer':''}" ${large?'data-product-viewer tabindex="0"':''} data-review-id="product.${product.slug}.model" data-review-image="product-model:${product.slug}">
    <div class="product-object-layer" data-product-object>${displayImageUrl?`<img class="uploaded-product-image" src="${escapeHtml(displayImageUrl)}" alt="${escapeHtml(product.name)}" draggable="false">`:`<div class="device-card"><span class="device-label">${escapeHtml(product.model)}</span><div class="dip-row">${[1,2,3,4,5,6,7].map(i=>`<i></i>`).join('')}</div></div>`}</div>
    ${large?`<div class="viewer-status"><span data-viewer-angle>0°</span><span data-viewer-zoom>100%</span></div><div class="viewer-controls" aria-label="产品视图控制"><button type="button" data-viewer-action="rotate-left" title="向左旋转" aria-label="向左旋转">↶</button><button type="button" data-viewer-action="zoom-out" title="缩小" aria-label="缩小">−</button><button type="button" data-viewer-action="reset" title="复位视图">复位</button><button type="button" data-viewer-action="zoom-in" title="放大" aria-label="放大">＋</button><button type="button" data-viewer-action="rotate-right" title="向右旋转" aria-label="向右旋转">↷</button></div><span class="viewer-help">左右拖动旋转 · 按钮缩放</span>`:''}
    ${modelAsset?`<a class="model-asset-link" href="${escapeHtml(modelAsset.asset_url)}" download>3D模型 ${escapeHtml(modelAsset.version)} ⇩</a>`:''}
    ${hotspots.length ? hotspots.map(h=>`<button class="model-hotspot" style="left:${Number(h.position.x)||50}%;top:${Number(h.position.y)||50}%" data-hotspot="${escapeHtml(h.hotspot_key)}" data-label="${escapeHtml(h.label)}" data-description="${escapeHtml(h.description)}">${escapeHtml(h.label.slice(0,2))}</button>`).join('') : '<div class="float-tag a"><b>RF IN</b><br>输入端口</div><div class="float-tag b"><b>RF OUT</b><br>输出端口</div>'}
    <div class="hotspot-detail"><b></b><br><span></span></div>
  </d…28586 tokens truncated…ompany} ${item.phone} ${item.email} ${item.shipping_carrier} ${item.tracking_no} ${(item.items||[]).map(x=>`${x.material_code} ${x.product_name}`).join(' ')}`.toLowerCase();const show=(!q||haystack.includes(q))&&(!status||item.status===status);tr.hidden=!show;if(show)visible++});const count=$('#admin-order-count');if(count)count.textContent=`${visible} 个订单`};
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
  const hotspot=e.target.closest('[data-hotspot]'); if(hotspot){const stage=hotspot.closest('.device-stage'),detail=$('.hotspot-detail',stage);$$('[data-hotspot]',stage).forEach(item=>{const active=item===hotspot;item.classList.toggle('active',active);item.setAttribute('aria-expanded',String(active))});$('b',detail).textContent=hotspot.dataset.label;$('span',detail).textContent=hotspot.dataset.description;detail.classList.add('open');}
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

