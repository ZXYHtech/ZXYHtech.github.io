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
addEventListener('load',()=>navigator.serviceWorker.register(sitePath('service-worker.js?v=1.30.9'),{updateViaCache:'none'}).catch(()=>{}));
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
  if(announce)toast(`å·²åˆ‡æ¢ä¸º ${{'rf-dark':'å°„é¢‘æ·±è‰²',cosy:'Cosy çµæ„Ÿ','lab-light':'å·¥ç¨‹æµ…è‰²',contrast:'é«˜å¯¹æ¯”'}[state.theme]} é£æ ¼`);
}
applyTheme(state.theme,{announce:false});

const zyaBridge = (()=>{
  const pending=new Map();
  const controlChannel='BroadcastChannel' in window?new BroadcastChannel('zya1000-control'):null;
  const browserAcks=new Map();controlChannel?.addEventListener('message',event=>{const id=event.data?.request_id,task=browserAcks.get(id);if(event.data?.type==='zya1000-control-ack'&&task){browserAcks.delete(id);task(event.data)}});
  const mode=window.chrome?.webview?'webview2':window.ZYA1000Bridge?.invoke?'native-object':'browser-demo';
  if(window.chrome?.webview){window.chrome.webview.addEventListener('message',event=>{const message=typeof event.data==='string'?JSON.parse(event.data):event.data;const task=pending.get(message.requestId);if(task){pending.delete(message.requestId);message.ok===false?task.reject(new Error(message.error||'ZYA1000 æ“ä½œå¤±è´¥')):task.resolve(message)}})}
  async function send(action,payload={}){
    const requestId=`zya-${Date.now()}-${Math.random().toString(16).slice(2)}`;const message={protocol:'zya1000.web/v1',requestId,action,payload,context:{model:launchParams.get('model')||'',serial:launchParams.get('serial')||'',hardware:launchParams.get('hardware')||'',firmware:launchParams.get('firmware')||''}};
    if(mode==='webview2')return new Promise((resolve,reject)=>{pending.set(requestId,{resolve,reject});window.chrome.webview.postMessage(message);setTimeout(()=>{if(pending.delete(requestId))reject(new Error('ZYA1000 å“åº”è¶…æ—¶'))},8000)});
    if(mode==='native-object'){const result=await window.ZYA1000Bridge.invoke(JSON.stringify(message));return typeof result==='string'?JSON.parse(result):result}
    if(action==='set-attenuation'){
      const command={action,value_db:Number(payload.value_db),mode:payload.mode||'parallel',request_id:requestId,created_at:Date.now(),expires_at:Date.now()+10*60*1000};
      localStorage.setItem('zya1000.pending-command',JSON.stringify(command));controlChannel?.postMessage(command);
      if(controlChannel)return new Promise(resolve=>{browserAcks.set(requestId,result=>resolve({ok:true,mode:'web-console-live',requestId,action,payload,queued:false,...result}));setTimeout(()=>{if(browserAcks.delete(requestId))resolve({ok:true,mode:'web-console-queue',requestId,action,payload,queued:true,message:'é…ç½®å·²è¿›å…¥ç½‘é¡µä¸Šä½æœºå¾…å‘é€é˜Ÿåˆ—'})},450)});
      return {ok:true,mode:'web-console-queue',requestId,action,payload,queued:true,message:'é…ç½®å·²è¿›å…¥ç½‘é¡µä¸Šä½æœºå¾…å‘é€é˜Ÿåˆ—'};
    }
    return {ok:true,mode:'browser-demo',requestId,action,payload,message:'æµè§ˆå™¨æ¼”ç¤ºå·²å®Œæˆï¼Œæœªè°ƒç”¨çœŸå®è®¾å¤‡'};
  }
  return {mode,send};
})();

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function money(value) { return `Â¥${Number(value || 0).toLocaleString('zh-CN', {minimumFractionDigits: 0, maximumFractionDigits: 2})}`; }
function priceLabel(value){return Number(value)>0?money(value):'è”ç³»è¯¢ä»·'}
function formatBytes(value) { const bytes=Number(value||0);if(!bytes)return String(value||'å¤§å°å¾…è¡¥å……');if(bytes<1024)return `${bytes} B`;if(bytes<1024*1024)return `${(bytes/1024).toFixed(1)} KB`;return `${(bytes/1024/1024).toFixed(1)} MB`; }
const resourceLabels={datasheet:'æ•°æ®æ‰‹å†Œ',drawing:'å°ºå¯¸å›¾',report:'æµ‹è¯•æŠ¥å‘Š',software:'è½¯ä»¶',firmware:'å›ºä»¶',document:'æ–‡æ¡£',model:'3D æ¨¡å‹',video:'è§†é¢‘',image:'äº§å“å›¾ç‰‡'};
const resourceIcons={datasheet:'DS',drawing:'DWG',report:'RPT',software:'ZIP',firmware:'FW',document:'DOC',model:'3D',video:'â–¶',image:'IMG'};
function resourceCard(resource,{showProduct=true}={}) {
  const type=resource.resource_type||resource.doc_type||resource.asset_type||'document',available=resource.available!==false&&Boolean(resource.url||resource.asset_url||resource.file_url),rawUrl=resource.url||resource.asset_url||resource.file_url||'',url=resolveContentUrl(rawUrl),mime=resource.mime_type||'',previewable=mime.startsWith('image/')||mime.startsWith('video/')||mime==='application/pdf'||/\.(html?|pdf|png|jpe?g|webp|mp4|webm)$/i.test(rawUrl),size=resource.source==='asset'?formatBytes(resource.file_size):String(resource.file_size||'å¤§å°å¾…è¡¥å……');
  if(!available)return '';
  return `<article class="resource-card" data-resource-type="${escapeHtml(type)}" data-review-id="resource.${escapeHtml(resource.resource_id||`${type}-${resource.id}`)}">
    <div class="resource-icon">${escapeHtml(resourceIcons[type]||'FILE')}</div><div class="resource-info">${showProduct?`<span class="eyebrow">${escapeHtml(resource.model||'')} Â· ${escapeHtml(resourceLabels[type]||type)}</span>`:`<span class="eyebrow">${escapeHtml(resourceLabels[type]||type)}</span>`}<h3>${escapeHtml(resource.title||resource.original_name||'äº§å“èµ„æº')}</h3><p>ç‰ˆæœ¬ ${escapeHtml(resource.version||'1.0')} Â· ${escapeHtml(resource.language||'é€šç”¨')} Â· ${escapeHtml(size)}</p>${resource.original_name?`<small>${escapeHtml(resource.original_name)}</small>`:''}</div>
    <div class="resource-actions">${(previewable?`<a class="button ghost compact" href="${escapeHtml(url)}" target="_blank" rel="noopener">é¢„è§ˆ</a>`:'')+`<a class="button secondary compact" href="${escapeHtml(url)}" download="${escapeHtml(resource.original_name||'')}">ä¸‹è½½ â‡©</a>`}</div></article>`;
}
let staticCatalogPromise=null;
async function loadStaticCatalog(){
  if(!staticCatalogPromise)staticCatalogPromise=fetch(sitePath(runtime.catalogUrl||'data/catalog.json'),{cache:'no-cache'}).then(response=>{if(!response.ok)throw new Error('é™æ€äº§å“æ•°æ®åŒ…ä¸å¯ç”¨');return response.json()});
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
  if(runtime.mode==='hybrid'&&!runtime.apiBaseUrl&&path.startsWith('/api/'))throw new Error('ä¸‹å•æœåŠ¡å°šæœªé…ç½®ï¼Œè¯·è”ç³»ç½‘ç«™ç®¡ç†å‘˜');
  try{
    const response = await fetch(apiPath(path), {...options,headers:{'Content-Type':'application/json',...(state.adminToken?{'Authorization':`Bearer ${state.adminToken}`}:{}) ,...(options.headers||{})}});
    const text = await response.text();
    let data={};try{data=text?JSON.parse(text):{}}catch(error){if(staticFallback)return staticFallback;throw new Error('æ•°æ®æœåŠ¡è¿”å›äº†æ— æ³•è¯†åˆ«çš„å†…å®¹')}
    if (!response.ok){if(staticFallback&&[404,408,429,500,502,503,504].includes(response.status))return staticFallback;throw new Error(data.error || 'è¯·æ±‚å¤±è´¥')}
    return data;
  }catch(error){if(staticFallback)return staticFallback;throw error}
}
function syncRoleUI(){const admin=Boolean(state.adminToken);document.body.classList.toggle('is-admin-session',admin);const button=$('#review-toggle');if(button)button.hidden=!admin;if(!admin&&state.review)toggleReview(false)}
async function protectedDownload(path,filename){try{const response=await fetch(apiPath(path),{headers:{'Authorization':`Bearer ${state.adminToken}`}});if(!response.ok)throw new Error('æ²¡æœ‰æƒé™å¯¼å‡ºè¯¥æ–‡ä»¶');const blob=await response.blob(),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=filename;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return true}catch(err){toast(err.message);return false}}
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
  $$(`[data-favorite="${productId}"]`).forEach(button=>{const active=!saved;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));button.setAttribute('aria-label',active?'å–æ¶ˆæ”¶è—':'åŠ å…¥æ”¶è—');const label=$('[data-favorite-label]',button);if(label)label.textContent=active?'å·²æ”¶è—':'æ”¶è—'});
  toast(saved?'å·²å–æ¶ˆæ”¶è—':'å·²åŠ å…¥æˆ‘çš„æ”¶è—');
}
function toggleCompare(productId) {
  productId = Number(productId);
  if (state.compare.includes(productId)) {
    state.compare = state.compare.filter(id => id !== productId);
    toast('å·²ç§»å‡ºäº§å“å¯¹æ¯”');
  } else {
    if (state.compare.length >= 3) return toast('æœ€å¤šåŒæ—¶å¯¹æ¯” 3 æ¬¾äº§å“');
    state.compare.push(productId); toast('å·²åŠ å…¥äº§å“å¯¹æ¯”');
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
  saveCart(); toast(`${product.model} å·²åŠ å…¥è´­ä¹°æ¸…å•`);
}
function renderCart() {
  const body = $('#cart-body'); if (!body) return;
  if (!state.cart.length) { body.innerHTML = '<div class="empty">è´­ä¹°æ¸…å•è¿˜æ˜¯ç©ºçš„<br><small>ä»äº§å“é¡µæ·»åŠ ä½ éœ€è¦çš„æ¨¡å—</small></div>'; return; }
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  body.innerHTML = state.cart.map(item => {const stock=state.availability[item.product_id],quantity=Number(stock?.quantity||0),enough=stock&&quantity>=item.quantity,status=!stock?'åº“å­˜å¾…æ ¸å¯¹':enough?`ç°è´§å¯æ»¡è¶³ Â· ${quantity} ä»¶`:quantity>0?`ç°è´§ ${quantity} ä»¶ Â· å…¶ä½™éœ€ç¡®è®¤`:'éœ€ç¡®è®¤åº“å­˜ä¸äº¤æœŸ';return `<div class="cart-item ${stock&&!enough?'stock-warning':''}">
    <div><b>${escapeHtml(item.model)}</b><p>${escapeHtml(item.name)}</p><strong>${money(item.price)}</strong><small class="cart-stock">${escapeHtml(status)}</small></div>
    <div class="quantity"><button data-cart-minus="${item.product_id}">âˆ’</button><span>${item.quantity}</span><button data-cart-plus="${item.product_id}">ï¼‹</button></div>
  </div>`}).join('') + `<div class="cartç}âÚ$z{-®éÜj×7F–öâæFF6WBæ7F–öåG—RÇF&vWCÖ†÷G7÷D7F–öâæFF6WBæ7F–öåF&vWC¶–b‡G—SÓÓÒvÆ–æ²r—·v–æF÷ræ÷Vâ‡F&vWBÂuö&Ææ²rÂvæö÷VæW"Ææ÷&VfW'&W"r“·&WGW&çÖ–b‡G—SÓÓÒv6öç6öÆRr—¶Æö6F–öâæ‡&Vc×6—FUF‚‚w§–Ö6öç6öÆRæ‡FÖÂr“·&WGW&çÖ6öç7B6VÆV7F÷#×¶wV–FS¢r7GWF÷&–Â×6V7F–öârÆ6Æ7VÆF÷#¢ræ6Æ7VÆF÷"rÆFö7VÖVçG3¢r6Fö7VÖVçB×6V7F–öâwÕ·G—UÒÇ6V7F–öã×6VÆV7F÷#òB‡6VÆV7F÷"“¦çVÆÃ¶–b‡6V7F–öâ—6V7F–öâç67&öÆÄ–çFõf–Wr‡¶&V†f–÷#¢w6Öö÷F‚rÆ&Æö6³¢w7F'BwÒ“¶VÇ6RFö7B‚~[Ù>X˜ŞYXnY8‹ùk*iÈXúşh™>[Èy¨NZû[©NXh^Zë’r“·&WGW&çĞ¢6öç7B†÷G7÷CÖRçF&vWBæ6Æ÷6W7B‚u¶FFÖ†÷G7÷EÒr“²–b††÷G7÷B—¶6öç7B7FvSÖ†÷G7÷Bæ6Æ÷6W7B‚ræFWf–6R×7FvRr’ÆFWF–ÃÒB‚ræ†÷G7÷BÖFWF–ÂrÇ7FvR’Æ7F–öä'WGFöãÒB‚u¶FFÖ†÷G7÷BÖ7F–öåÒrÆFWF–Â’ÇG—SÖ†÷G7÷BæFF6WBæ7F–öåG—WÇÂrrÆFVfVÇDÆ&VÇ3×¶wV–FS¢~iú^yÈ¾[ú¾˜	şKÛşyJhÈ~ZûÂrÆ6Æ7VÆF÷#¢~h™>[ÈŠXxşŠêzé~Yš‚rÆFö7VÖVçG3¢~iú^yÈ¾Kª~Y8‹XNii’rÆ6öç6öÆS¢~h™>[È{Ùš^x˜Kˆ®KØŞiË¢rÆÆ–æ³¢~h™>[ÈZIn˜:™;îhêRwÓ²BB‚u¶FFÖ†÷G7÷EÒrÇ7FvR’æf÷$V6‚†—FVÓÓç¶6öç7B7F—fSÖ—FVÓÓÓÖ†÷G7÷C¶—FVÒæ6Æ74Æ—7BçFövvÆR‚v7F—fRrÆ7F—fR“¶—FVÒç6WDGG&–'WFR‚v&–ÖW‡æFVBrÅ7G&–ær†7F—fR’—Ò“²B‚v"rÆFWF–Â’çFW‡D6öçFVçCÖ†÷G7÷BæFF6WBæÆ&VÃ²B‚w7ârÆFWF–Â’çFW‡D6öçFVçCÖ†÷G7÷BæFF6WBæFW67&—F–öã¶7F–öä'WGFöâæ†–FFVãÒFVfVÇDÆ&VÇ5·G—UÓ¶7F–öä'WGFöâçFW‡D6öçFVçCÖ†÷G7÷BæFF6WBæ7F–öäÆ&VÇÇÆFVfVÇDÆ&VÇ5·G—U×ÇÂrs¶7F–öä'WGFöâæFF6WBæ7F–öåG—S×G—S¶7F–öä'WGFöâæFF6WBæ7F–öåF&vWCÖ†÷G7÷BæFF6WBæ7F–öåF&vWGÇÂrs¶FWF–Âæ6Æ74Æ—7BæFB‚v÷Vâr“·Ğ¢6öç7B6÷”÷&FW#ÖRçF&vWBæ6Æ÷6W7B‚u¶FFÖ6÷’Ö÷&FW%Òr“¶–b†6÷”÷&FW"—¶æf–vF÷"æ6Æ—&ö&Còçw&—FUFW‡B†6÷”÷&FW"æFF6WBæ6÷”÷&FW"“·Fö7B‚~Šê.XÙ^Xû~[{.ZHŞX‹br—Ğ¢6öç7B6÷•G&6¶–æsÖRçF&vWBæ6Æ÷6W7B‚u¶FFÖ6÷’×G&6¶–æuÒr“¶–b†6÷•G&6¶–ær—¶æf–vF÷"æ6Æ—&ö&Còçw&—FUFW‡B†6÷•G&6¶–æræFF6WBæ6÷•G&6¶–ær“·Fö7B‚~xškXXÙ^Xû~[{.ZHŞX‹br—Ğ¢–b†RçF&vWBæ6Æ÷6W7B‚u¶FF×&WVBÖ÷&FW%Òr’bg7FFRæ7W'&VçD÷&FW"—·7FFRæ6'C×7FFRæ7W'&VçD÷&FW"æ—FV×2æÖ†—FVÓÓâ‡·&öGV7Eö–C¦—FVÒç&öGV7Eö–BÆÖFW&–Åö6öFS¦—FVÒæÖFW&–Åö6öFRÆÖöFVÃ¦—FVÒæÖöFVÇÇÆ—FVÒæÖFW&–Åö6öFRÆæÖS¦—FVÒç&öGV7EöæÖRÇ&–6S¦—FVÒçVæ—E÷&–6RÇVçF—G“¦—FVÒçVçF—G—Ò’“·6fT6'B‚“¶÷Vä6'B‚“·Fö7B‚~YXnY8[{.˜xŞikXªXZ^‹JŞK›kˆ^XÙRr—Ğ¢6öç7B7F–öãÖRçF&vWBæ6Æ÷6W7B‚u¶FF×§–Ö7F–öåÒr“²–b†7F–öâ—'Vå§–7F–öâ†7F–öâæFF6WBç§–7F–öâ“°¢–b†RçF&vWBæÖF6†W2‚u¶FFÖ6'BÖÖ–çW5Òr’—¶6öç7B—FVÓ×7FFRæ6'Bæf–æB‡ƒÓç‚ç&öGV7Eö–CÓÓÔçVÖ&W"†RçF&vWBæFF6WBæ6'DÖ–çW2’“¶–b†—FVÒ—¶—FVÒçVçF—G’ÒÓ¶–b†—FVÒçVçF—G“ÃÓ—7FFRæ6'C×7FFRæ6'Bæf–ÇFW"‡ƒÓç‚ÓÖ—FVÒ“·6fT6'B‚—×Ğ¢–b†RçF&vWBæÖF6†W2‚u¶FFÖ6'B×ÇW5Òr’—¶6öç7B—FVÓ×7FFRæ6'Bæf–æB‡ƒÓç‚ç&öGV7Eö–CÓÓÔçVÖ&W"†RçF&vWBæFF6WBæ6'EÇW2’“¶–b†—FVÒ—¶—FVÒçVçF—G’²³·6fT6'B‚—×Ğ¢–b†RçF&vWBæ–CÓÓÒv6†V6¶÷WBÖ'WGFöâr—¶6öç7B'WGFöãÖRçF&vWC¶'WGFöâæF—6&ÆVC×G'VS¶'WGFöâçFW‡D6öçFVçCÒ~jÚ>YÊjZû[©>ZÙ(
bs¶ÆöDf–Æ&–Æ—G’‡G'VR’æf–æÆÇ’‚‚“Óç¶6Æ÷6T6'B‚“²B‚r66†V6¶÷WBÖW'&÷"r’çFW‡D6öçFVçCÒrs·&VæFW$6†V6¶÷WE7VÖÖ'’‚“²B‚r66†V6¶÷WBÖF–Æörr’ç6†÷tÖöFÂ‚“¶'WGFöâæF—6&ÆVCÖfÇ6S¶'WGFöâçFW‡D6öçFVçCÒ~jZû[›nhùKªN™Èk"wÒ—Ğ§Ò“° ¢B‚r66†V6¶÷WBÖf÷&Òr’æFDWfVçDÆ—7FVæW"‚w7V&Ö—BrÂ7–æ2RÓâ°¢Rç&WfVçDFVfVÇB‚“¶6öç7B'WGFöãÒB‚r77V&Ö—BÖ÷&FW"r’ÆW'&÷#ÒB‚r66†V6¶÷WBÖW'&÷"r’Æf–VÆG3Ôö&¦V7Bæg&öÔVçG&–W2†æWrf÷&ÔFF†RçF&vWB’“¶W'&÷"çFW‡D6öçFVçCÒrs°¢–b‚7G&–ær†f–VÆG2ç†öæWÇÂrr’çG&–Ò‚’bb7G&–ær†f–VÆG2æVÖ–ÇÇÂrr’çG&–Ò‚’—¶W'&÷"çFW‡D6öçFVçCÒ~Šû~ˆ{>[	Z¾XiˆN{;¾yK^ŠùŞh‰n˜*îzëûÈÎikKëşzîŠêN™Èk.Y(Îiú^Šú.‹ù¾[ªbs·&WGW&çĞ¢–b‚7FFRæ6'BæÆVæwF‚—¶W'&÷"çFW‡D6öçFVçCÒ~‹JŞK›kˆ^XÙ^K‹®z›®ûÈÎŠû~˜xŞik˜hºYXnY8s·&WGW&çĞ¢'WGFöâæF—6&ÆVC×G'VS¶'WGFöâçFW‡D6öçFVçCÒ~jÚ>YÊhùKªN(
bs°¢G'—¶v—BÆöDf–Æ&–Æ—G’‡G'VR“·&VæFW$6†V6¶÷WE7VÖÖ'’‚“¶6öç7B–ÆöC×²ââæf–VÆG2Æ—FV×3§7FFRæ6'GÓ¶6öç7B&W7VÇCÖv—B’‚rö’ö÷&FW'2rÇ¶ÖWF†öC¢uõ5BrÆ&öG“¤¥4ôâç7G&–æv–g’‡–ÆöB—Ò“·7FFRæ6'CÕµÓ·6fT6'B‚“²B‚r66†V6¶÷WBÖF–Æörr’æ6Æ÷6R‚“¶RçF&vWBç&W6WB‚“¶Æö6Å7F÷&vRç6WD—FVÒ‚w§–ÖÆ7BÖ÷&FW"rÄ¥4ôâç7G&–æv–g’‡¶÷&FW%öæó§&W7VÇBæ÷&FW%öæòÆ66W75÷Fö¶Vã§&W7VÇBæ66W75÷Fö¶VçÒ’“¶Æö6F–öâæ†6ƒÖ÷&FW$66W74†6‚‡&W7VÇBæ÷&FW%öæòÇ&W7VÇBæ66W75÷Fö¶Vâ“·Ğ¢6F6‚†W'"—¶W'&÷"çFW‡D6öçFVçCÖW'"æÖW76vWÒf–æÆÇ—¶'WGFöâæF—6&ÆVCÖfÇ6S¶'WGFöâçFW‡D6öçFVçCÒ~hùKªN‹JŞK›™Èk"wĞ§Ò“°¢BB‚u¶FFÖ6æ6VÂÖ6†V6¶÷WEÒr’æf÷$V6‚†'WGFöãÓæ'WGFöâæöæ6Æ–6³Ò‚“Óç²B‚r66†V6¶÷WBÖW'&÷"r’çFW‡D6öçFVçCÒrs²B‚r66†V6¶÷WBÖF–Æörr’æ6Æ÷6R‚—Ò“°¢B‚r66'B×FövvÆRr’æöæ6Æ–6³Ö÷Vä6'C²B‚r6&6¶G&÷r’æöæ6Æ–6³Ö6Æ÷6T6'C²B‚u¶FFÖ6Æ÷6RÖG&vW%Òr’æöæ6Æ–6³Ö6Æ÷6T6'C°¢B‚r6ÖVçR×FövvÆRr’æöæ6Æ–6³Ò‚“ÓâB‚r6Öö&–ÆRÖæbr’æ6Æ74Æ—7BçFövvÆR‚v÷Vâr“°¢B‚r7F†VÖR×FövvÆRr’æöæ6Æ–6³ÖSÓç¶Rç7F÷&÷vF–öâ‚“¶6öç7BæVÃÒB‚r7F†VÖR×æVÂr’Æ÷VãÒæVÂæ6Æ74Æ—7Bæ6öçF–ç2‚v÷Vâr“·æVÂæ6Æ74Æ—7BçFövvÆR‚v÷VârÆ÷Vâ“·æVÂç6WDGG&–'WFR‚v&–Ö†–FFVârÅ7G&–ær‚÷Vâ’“¶Ræ7W'&VçEF&vWBç6WDGG&–'WFR‚v&–ÖW‡æFVBrÅ7G&–ær†÷Vâ’“·WFFUF†VÖT6öçG&öÇ2‚—Ó°¢B‚rçF†VÖR×æVÂÖ6Æ÷6Rr’æöæ6Æ–6³Ö6Æ÷6UF†VÖUæVÃ°¢BB‚u¶FF×F†VÖRÖ6†ö–6UÒr’æf÷$V6‚†'WGFöãÓæ'WGFöâæöæ6Æ–6³Ò‚“Óç¶Ç•F†VÖR†'WGFöâæFF6WBçF†VÖT6†ö–6R“¶6Æ÷6UF†VÖUæVÂ‚—Ò“°¢B‚r7F†VÖR×æVÂr’æöæ6Æ–6³ÖSÓæRç7F÷&÷vF–öâ‚“°¦Fö7VÖVçBæFDWfVçDÆ—7FVæW"‚v6Æ–6²rÆ6Æ÷6UF†VÖUæVÂ“°¦Fö7VÖVçBæFDWfVçDÆ—7FVæW"‚v¶W–F÷vârÆSÓç¶–b†Ræ¶W“ÓÓÒtW66Rr–6Æ÷6UF†VÖUæVÂ‚—Ò“° ¢òò&Wf–WrÖöFS¢G&r&V7FævÆRÂFW67&–&R—Böæ6RÂW‡÷'BÆÂæ÷FW2gFW"f–æ—6†VB×&öGV7B&Wf–Wrà¦6öç7B6GW&SÒB‚r7&Wf–WrÖ6GW&Rr“²ÆWBG&sÖçVÆÂÂ&Wf–Wt&÷ƒÖçVÆÃ°¦gVæ7F–öâ6ÆV%&Wf–Wt–çFW&7F–öâ‚—°¢G&sÖçVÆÃ¶–b‡&Wf–Wt&÷‚—·&Wf–Wt&÷‚ç&VÖ÷fR‚“·&Wf–Wt&÷ƒÖçVÆÇĞ¢6GW&Ræ6Æ74Æ—7Bç&VÖ÷fR‚v7F—fRr“¶6GW&Rç7G–ÆRç&VÖ÷fU&÷W'G’‚vF—7Æ’r“¶6GW&Rç7G–ÆRç&VÖ÷fU&÷W'G’‚wö–çFW"ÖWfVçG2r“°¢Fö7VÖVçBæ&öG’æ6Æ74Æ—7Bç&VÖ÷fR‚w&Wf–Wr×FW‡BÖÖöFRrÂw&Wf–WrÖ–ÖvRÖÖöFRr“°¢6öç7B6VÆV7F–öãÖvWE6VÆV7F–öâ‚“¶–b‡6VÆV7F–öâ—6VÆV7F–öâç&VÖ÷fTÆÅ&ævW2‚“°§Ğ¦7–æ2gVæ7F–öâFövvÆU&Wf–Wr†f÷&6R’°¢–b‚7FFRæFÖ–åFö¶Vâbff÷&6RÓÖfÇ6R—·7–æ5&öÆUT’‚“·&WGW&âFö7B‚~h›k:š¨ÎiKnK¸^zêynYy›¾[Ù^YîXúşyJ‚r—Ğ¢7FFRç&Wf–Ws×G—Vöbf÷&6SÓÓÒv&ööÆVâsöf÷&6S¢7FFRç&Wf–Ws°¢B‚r7&Wf–Wr×FööÆ&"r’æ6Æ74Æ—7BçFövvÆR‚v7F—fRrÇ7FFRç&Wf–Wr“²B‚r7&Wf–Wr×FööÆ&"r’ç6WDGG&–'WFR‚v&–Ö†–FFVârÅ7G&–ær‚7FFRç&Wf–Wr’“°¢–b‡7FFRç&Wf–Wr—·6WE&Wf–WtÖöFR‡7FFRç&Wf–WtÖöFR“¶v—BÆöDææ÷FF–öç2‚“·Fö7B‚~h›k:jŠ[Èş[{.[ÈY
şûÈÎXúşjn˜XË®Yùş8˜hºih~ZÙ~h‰nx+X{¾Y»îx˜~8"r—ÖVÇ6W¶6ÆV%&Wf–Wt–çFW&7F–öâ‚“²B‚r6ææ÷FF–öâÖÖ&·2r’æ–ææW$…DÔÃÒrwĞ§Ğ¦gVæ7F–öâ6WE&Wf–WtÖöFR†ÖöFR’°¢7FFRç&Wf–WtÖöFSÖÖöFS°¢BB‚r7&Wf–Wr×FööÆ&"¶FF×&Wf–WrÖÖöFUÒr’æf÷$V6‚†'WGFöãÓæ'WGFöâæ6Æ74Æ—7BçFövvÆR‚v7F—fRrÆ'WGFöâæFF6WBç&Wf–WtÖöFSÓÓÖÖöFR’“°¢Fö7VÖVçBæ&öG’æ6Æ74Æ—7BçFövvÆR‚w&Wf–Wr×FW‡BÖÖöFRrÇ7FFRç&Wf–WrbfÖöFSÓÓÒwFW‡Br“°¢Fö7VÖVçBæ&öG’æ6Æ74Æ—7BçFövvÆR‚w&Wf–WrÖ–ÖvRÖÖöFRrÇ7FFRç&Wf–WrbfÖöFSÓÓÒv–ÖvRr“°¢6GW&Ræ6Æ74Æ—7BçFövvÆR‚v7F—fRrÇ7FFRç&Wf–Wrbb†ÖöFSÓÓÒv&VwÇÆÖöFSÓÓÒv–ÖvRr’“°¢6öç7BÖW76vW3×¶&V¢~h¹nXªYÈ˜iÈ™zîš)y¨NKØŞ{ÚârÇFW‡C¢~yJ›Êj~˜hºš^™Ú.ih~ZÙ~ûÈÎiÛî[ÈYîk{¾Xªh›k:‚rÆ–ÖvS¢~x+X{¾Kª~Y8Y»î8jŠYè¾XË®Yùşh‰nš^™Ú.Y»îx˜rwÓ°¢B‚r7&Wf–WrÖ†VÇr’çFW‡D6öçFVçCÖÖW76vW5¶ÖöFUÓ°§Ğ¦7–æ2gVæ7F–öâÆöDææ÷FF–öç2‚—¶6öç7B&W7VÇCÖv—B’‚rö’öææ÷FF–öç2r“·7FFRæææ÷FF–öç3×&W7VÇBç&÷w3²B‚r6ææ÷FF–öâÖ6÷VçBr’çFW‡D6öçFVçC×7FFRæææ÷FF–öç2æf–ÇFW"‡ƒÓç‚ç7FGW3ÓÓÒv÷Vâr’æÆVæwFƒ¶G&tææ÷FF–öäÖ&·2‚—Ğ¦gVæ7F–öâ&tVÆVÖVçDB‡‚Ç’—¶6öç7B&Wf–÷W3Ö6GW&Rç7G–ÆRæF—7Æ“¶6GW&Rç7G–ÆRæF—7Æ“ÒvæöæRs¶6öç7BVÃÖFö7VÖVçBæVÆVÖVçDg&öÕö–çB‡‚Ç’“¶6GW&Rç7G–ÆRæF—7Æ“×&Wf–÷W3·&WGW&âVÃ·Ğ¦gVæ7F–öâVÆVÖVçDB‡‚Ç’—·&WGW&â&tVÆVÖVçDB‡‚Ç’“òæ6Æ÷6W7B‚u¶FF×&Wf–WrÖ–EÒr—ÇÆ·Ğ¦gVæ7F–öâæ÷&ÖÆ—¦VE&V7B†æ6†÷"Ç&V7B—¶6öç7B&6SÖæ6†÷"ævWD&÷VæF–æt6Æ–VçE&V7B‚“·&WGW&ç·ƒ¢²‚‡&V7BæÆVgBÖ&6RæÆVgB’ö&6Rçv–GF‚’çFôf—†VBƒR’Ç“¢²‚‡&V7BçF÷Ö&6RçF÷’ö&6Ræ†V–v‡B’çFôf—†VBƒR’Çv–GFƒ¢²‡&V7Bçv–GF‚ö&6Rçv–GF‚’çFôf—†VBƒR’Æ†V–v‡C¢²‡&V7Bæ†V–v‡Bö&6Ræ†V–v‡B’çFôf—†VBƒR—×Ğ¦gVæ7F–öâ÷Väææ÷FF–öå6VÆV7F–öâ‡¶ææ÷FF–öå÷G—SÒv&VrÆæ6†÷"Ç&V7BÇ6VÆV7FVE÷FW‡CÒrrÇ6VÆV7FVEö–ÖvSÒrwÒ—°¢7FFRç6VÆV7F–öã×¶ææ÷FF–öå÷G—RÇvU÷&÷WFS§7FFRç&÷WFRÆÖöGVÆUö¶W“¦æ6†÷"æ6Æ÷6W7B‚u¶FFÖÖöGVÆUÒr“òæFF6WBæÖöGVÆWÇÂrrÆVÆVÖVçEö¶W“¦æ6†÷"æFF6WBç&Wf–Wt–GÇÂwvRç&ö÷BrÇ6VÆV7FVE÷FW‡BÇ6VÆV7FVEö–ÖvRÇ&V7C¦æ÷&ÖÆ—¦VE&V7B†æ6†÷"Ç&V7B’Çf–Ww÷'C§·v–GFƒ¦–ææW%v–GF‚Æ†V–v‡C¦–ææW$†V–v‡BÆFWf–6U—†VÅ&F–÷×Ó°¢6öç7BÆ&VÇ3×¶&V¢~jn˜XË®YùòrÇFW‡C¢~˜hºih~ZÙrrÆ–ÖvS¢~˜hºY»îx˜rwÓ°¢B‚r76VÆV7F–öâ×F‚r’çFW‡D6öçFVçCÖG¶Æ&VÇ5¶ææ÷FF–öå÷G—U×Ò+rG·7FFRç6VÆV7F–öâçvU÷&÷WFWÒ(¢G·7FFRç6VÆV7F–öâæVÆVÖVçEö¶W—Ö°¢6öç7B&Wf–WsÒB‚r76VÆV7F–öâ×&Wf–Wrr“¶6öç7B&Wf–WuFW‡C×6VÆV7FVE÷FW‡Cö(	ÂG·6VÆV7FVE÷FW‡GŞ(	Ö§6VÆV7FVEö–ÖvSöY»îx˜~ûÉ¢G·6VÆV7FVEö–ÖvWÖ¢rs·&Wf–WrçFW‡D6öçFVçC×&Wf–WuFW‡C·&Wf–Wræ6Æ74Æ—7BçFövvÆR‚wf—6–&ÆRrÄ&ööÆVâ‡&Wf–WuFW‡B’“°¢6GW&Ræ6Æ74Æ—7Bç&VÖ÷fR‚v7F—fRr“²B‚r6ææ÷FF–öâÖF–Æörr’ç6†÷tÖöFÂ‚“°§Ğ¦6GW&RæFDWfVçDÆ—7FVæW"‚wö–çFW&F÷vârÆSÓç°¢–b‡7FFRç&Wf–WtÖöFSÓÓÒv–ÖvRr—°¢6öç7B&s×&tVÆVÖVçDB†Ræ6Æ–VçE‚ÆRæ6Æ–VçE’“¶6öç7B–ÖvUF&vWC×&sòæ6Æ÷6W7B‚v–ÖrÅ¶FF×&Wf–WrÖ–ÖvUÒr“°¢–b‚–ÖvUF&vWB—·Fö7B‚~‹ù˜xÎKˆŞiŠşXúş˜hºy¨NY»îx˜~h‰nKª~Y8jŠYè¾XË®Yùòr“·&WGW&ã·Ğ¢G&s×¶–ÖvUF&vWGÓ¶6GW&Rç6WEö–çFW$6GW&R†Rçö–çFW$–B“·&WGW&ã°¢Ğ¢6öç7BF&vWCÖVÆVÖVçDB†Ræ6Æ–VçE‚ÆRæ6Æ–VçE’“¶G&s×·7ƒ¦Ræ6Æ–VçE‚Ç7“¦Ræ6Æ–VçE’ÇF&vWBÇF&vWE&V7C§F&vWBævWD&÷VæF–æt6Æ–VçE&V7B‚—Ó·&Wf–Wt&÷ƒÖFö7VÖVçBæ7&VFTVÆVÖVçB‚vF—br“·&Wf–Wt&÷‚æ6Æ74æÖSÒw&Wf–WrÖ&÷‚s¶Fö7VÖVçBæ&öG’æVæD6†–ÆB‡&Wf–Wt&÷‚“¶6GW&Rç6WEö–çFW$6GW&R†Rçö–çFW$–B§Ò“°¦6GW&RæFDWfVçDÆ—7FVæW"‚wö–çFW&Ö÷fRrÆSÓç¶–b‚G&wÇÇ7FFRç&Wf–WtÖöFRÓÒv&Vr—&WGW&ã¶6öç7BÆVgCÔÖF‚æÖ–â†G&rç7‚ÆRæ6Æ–VçE‚’ÇF÷ÔÖF‚æÖ–â†G&rç7’ÆRæ6Æ–VçE’’Çv–GFƒÔÖF‚æ'2†Ræ6Æ–VçE‚ÖG&rç7‚’Æ†V–v‡CÔÖF‚æ'2†Ræ6Æ–VçE’ÖG&rç7’“´ö&¦V7Bæ76–vâ‡&Wf–Wt&÷‚ç7G–ÆRÇ¶ÆVgC¦ÆVgB²w‚rÇF÷§F÷²w‚rÇv–GFƒ§v–GF‚²w‚rÆ†V–v‡C¦†V–v‡B²w‚wÒ—Ò“°¦6GW&RæFDWfVçDÆ—7FVæW"‚wö–çFW'WrÆSÓç°¢–b‚G&r—&WGW&ã°¢–b‡7FFRç&Wf–WtÖöFSÓÓÒv–ÖvRr—°¢6öç7B–ÖvUF&vWCÖG&ræ–ÖvUF&vWC¶G&sÖçVÆÃ¶6öç7Bæ6†÷#Ö–ÖvUF&vWBæ6Æ÷6W7B‚u¶FF×&Wf–WrÖ–EÒr—ÇÆ¶6öç7B–ÖvU&VcÖ–ÖvUF&vWBæ7W'&VçE7&7ÇÆ–ÖvUF&vWBævWDGG&–'WFSòâ‚w7&2r—ÇÆ–ÖvUF&vWBæFF6WBç&Wf–Wt–ÖvWÇÆæ6†÷"æFF6WBç&Wf–Wt–GÇÂwvRÖ–ÖvRs¶÷Väææ÷FF–öå6VÆV7F–öâ‡¶ææ÷FF–öå÷G—S¢v–ÖvRrÆæ6†÷"Ç&V7C¦–ÖvUF&vWBævWD&÷VæF–æt6Æ–VçE&V7B‚’Ç6VÆV7FVEö–ÖvS¦–ÖvU&VgÒ“·&WGW&ã°¢Ğ¢6öç7BÆVgCÔÖF‚æÖ–â†G&rç7‚ÆRæ6Æ–VçE‚’ÇF÷ÔÖF‚æÖ–â†G&rç7’ÆRæ6Æ–VçE’’Çv–GFƒÔÖF‚æ'2†Ræ6Æ–VçE‚ÖG&rç7‚’Æ†V–v‡CÔÖF‚æ'2†Ræ6Æ–VçE’ÖG&rç7’“·&Wf–Wt&÷‚ç&VÖ÷fR‚“·&Wf–Wt&÷ƒÖçVÆÃ¶–b‡v–GFƒÃ‡ÇÆ†V–v‡CÃ‚—¶G&sÖçVÆÃ·&WGW&âFö7B‚~Šû~h¹nXªYÈX{®KˆKŠ®ˆÈ>Y»Br“·Ö6öç7Bæ6†÷#ÖG&rçF&vWC¶G&sÖçVÆÃ¶÷Väææ÷FF–öå6VÆV7F–öâ‡¶ææ÷FF–öå÷G—S¢v&VrÆæ6†÷"Ç&V7C§¶ÆVgBÇF÷Çv–GF‚Æ†V–v‡G×Ò§Ò“°¢B‚r6ææ÷FF–öâÖF–Æörr’æFDWfVçDÆ—7FVæW"‚v6Æ÷6RrÂ‚“Óç·7FFRç6VÆV7F–öãÖçVÆÃ¶–b‡7FFRç&Wf–Wr—6WE&Wf–WtÖöFR‡7FFRç&Wf–WtÖöFR—Ò“°¦Fö7VÖVçBæFDWfVçDÆ—7FVæW"‚vÖ÷W6WWrÆSÓç°¢–b‚7FFRç&Wf–WwÇÇ7FFRç&Wf–WtÖöFRÓÒwFW‡BwÇÂB‚r6ææ÷FF–öâÖF–Æörr’æ÷VçÇÆRçF&vWBæ6Æ÷6W7Còâ‚r7&Wf–Wr×FööÆ&"ÂæÖöFÂr’—&WGW&ã°¢6WEF–ÖV÷WB‚‚“Óç¶6öç7B6VÆV7F–öãÖvWE6VÆV7F–öâ‚“¶–b‚6VÆV7F–öçÇÇ6VÆV7F–öâæ—46öÆÆ6VGÇÂ6VÆV7F–öâç&ævT6÷VçB—&WGW&ã¶6öç7BFW‡C×6VÆV7F–öâçFõ7G&–ær‚’çG&–Ò‚“¶–b‚FW‡B—&WGW&ã¶6öç7B&ævS×6VÆV7F–öâævWE&ævTBƒ“¶6öç7BæöFS×&ævRæ6öÖÖöäæ6W7F÷$6öçF–æW#¶6öç7BVÆVÖVçCÖæöFRææöFUG—SÓÓÔæöFRäTÄTÔTåEôäôDSöæöFS¦æöFRç&VçDVÆVÖVçC¶–b‚VÆVÖVçGÇÂæ6öçF–ç2†VÆVÖVçB’—&WGW&ã¶6öç7Bæ6†÷#ÖVÆVÖVçBæ6Æ÷6W7B‚u¶FF×&Wf–WrÖ–EÒr—ÇÆ¶6öç7B&V7C×&ævRævWD&÷VæF–æt6Æ–VçE&V7B‚“¶–b‡&V7Bçv–GFƒÃÓÇÇ&V7Bæ†V–v‡CÃÓ—&WGW&ã¶÷Väææ÷FF–öå6VÆV7F–öâ‡¶ææ÷FF–öå÷G—S¢wFW‡BrÆæ6†÷"Ç&V7BÇ6VÆV7FVE÷FW‡C§FW‡Bç6Æ–6RƒÃ#—Ò“·6VÆV7F–öâç&VÖ÷fTÆÅ&ævW2‚—ÒÃ§Ò“°¢BB‚u¶FFÖ6æ6VÂÖææ÷FF–öåÒr’æf÷$V6‚†'WGFöãÓæ'WGFöâæöæ6Æ–6³Ò‚“Óç²B‚r6ææ÷FF–öâÖf÷&Òr’ç&W6WB‚“²B‚r6ææ÷FF–öâÖF–Æörr’æ6Æ÷6R‚—Ò“°¢B‚r6ææ÷FF–öâÖf÷&Òr’æFDWfVçDÆ—7FVæW"‚w7V&Ö—BrÆ7–æ2SÓç¶Rç&WfVçDFVfVÇB‚“¶–b‚7FFRç6VÆV7F–öâ—&WGW&ã¶6öç7Bf–VÆG3Ôö&¦V7Bæg&öÔVçG&–W2†æWrf÷&ÔFF†RçF&vWB’“·G'—¶v—B’‚rö’öææ÷FF–öç2rÇ¶ÖWF†öC¢uõ5BrÆ&öG“¤¥4ôâç7G&–æv–g’‡²ââç7FFRç6VÆV7F–öâÆæ÷FS¦f–VÆG2ææ÷FRÆW‡V7FVC¦f–VÆG2æW‡V7FVBÇ6WfW&—G“¦f–VÆG2ç6WfW&—G’ÇF&vWC§VæFVf–æVGÒ—Ò“¶RçF&vWBç&W6WB‚“²B‚r6ææ÷FF–öâÖF–Æörr’æ6Æ÷6R‚“¶v—BÆöDææ÷FF–öç2‚“·Fö7B‚~™zîš)[{.KùŞZÙûÈÎXúş{º~{ºŞYÈ˜h‰nZûÎX{®{¹’vVçN8"r—Ö6F6‚†W'"—·Fö7B†W'"æÖW76vR—×Ò“°¦gVæ7F–öâG&tææ÷FF–öäÖ&·2‚—¶6öç7B&ö÷CÒB‚r6ææ÷FF–öâÖÖ&·2r“·&ö÷Bæ–ææW$…DÔÃÒrs¶–b‚7FFRç&Wf–Wr—&WGW&ã·7FFRæææ÷FF–öç2æf–ÇFW"†Óæç7FGW3ÓÓÒv÷VârbfçvU÷&÷WFSÓÓ×7FFRç&÷WFR’æf÷$V6‚†Óç¶6öç7BF&vWCÖFö7VÖVçBçVW'•6VÆV7F÷"†¶FF×&Wf–WrÖ–CÒ"G´552æW66R†æVÆVÖVçEö¶W’—Ò%Ö—ÇÆ¶6öç7B#×F&vWBævWD&÷VæF–æt6Æ–VçE&V7B‚“¶6öç7BÖ&³ÖFö7VÖVçBæ7&VFTVÆVÖVçB‚vF—br“¶Ö&²æ6Æ74æÖSÖææ÷FF–öâÖÖ&²ææ÷FF–öâÒG¶æææ÷FF–öå÷G—WÇÂv&VwÖ¶6öç7B–6öã×¶&V¢~)jrÇFW‡C¢uBrÆ–ÖvS¢~)jrwÕ¶æææ÷FF–öå÷G—U×ÇÂ~)js¶Ö&²æ–ææW$…DÔÃÖÆ#âG¶–6öçÒ2G¶æ–GÓÂö#æ´ö&¦V7Bæ76–vâ†Ö&²ç7G–ÆRÇ¶ÆVgC¢‡67&öÆÅ‚·"æÆVgB¶ç&V7Bç‚§"çv–GF‚’²w‚rÇF÷¢‡67&öÆÅ’·"çF÷¶ç&V7Bç’§"æ†V–v‡B’²w‚rÇv–GFƒ¢†ç&V7Bçv–GF‚§"çv–GF‚’²w‚rÆ†V–v‡C¢†ç&V7Bæ†V–v‡B§"æ†V–v‡B’²w‚wÒ“·&ö÷BæVæD6†–ÆB†Ö&²—Ò—Ğ¦7–æ2gVæ7F–öâ6†÷tææ÷FF–öäÆ—7B‚—¶v—BÆöDææ÷FF–öç2‚“¶6öç7B&ö÷CÒB‚r6ææ÷FF–öâÖÆ—7Br“·&ö÷Bæ–ææW$…DÔÃ×7FFRæææ÷FF–öç2æÆVæwFƒ÷7FFRæææ÷FF–öç2æÖ†ÓæÆ'F–6ÆR6Æ73Ò&ææ÷FF–öâÖ6&B#ãÆ†VFW#ãÆ#â2G¶æ–GÒ+rG·¶&V¢~jn˜’rÇFW‡C¢~ih~ZÙrrÆ–ÖvS¢~Y»îx˜rwÕ¶æææ÷FF–öå÷G—U×ÇÆæææ÷FF–öå÷G—WÒ+rÇ7â6Æ73Ò'6WfW&—G’ÒG¶ç6WfW&—G—Ò#âG¶ç6WfW&—G—ÓÂ÷7ããÂö#ãÇ6ÖÆÃâG¶W66T‡FÖÂ†ç7FGW2—ÓÂ÷6ÖÆÃãÂö†VFW#âG¶ç6VÆV7FVE÷FW‡CöÆ&Æö6·V÷FSî(	ÂG¶W66T‡FÖÂ†ç6VÆV7FVE÷FW‡B—Ş(	ÓÂö&Æö6·V÷FSæ¢rwÒG¶ç6VÆV7FVEö–ÖvSöÇ6ÖÆÃîY»îx˜~ûÉ¢G¶W66T‡FÖÂ†ç6VÆV7FVEö–ÖvR—ÓÂ÷6ÖÆÃæ¢rwÓÇâG¶W66T‡FÖÂ†ææ÷FR—ÓÂ÷ãÇ6ÖÆÃâG¶W66T‡FÖÂ†çvU÷&÷WFR—Ò(¢G¶W66T‡FÖÂ†æVÆVÖVçEö¶W’—ÓÂ÷6ÖÆÃãÆF—b7G–ÆSÒ&Ö&v–â×F÷£‚#ãÆ'WGFöâ6Æ73Ò&'WGFöâv†÷7B"FF×&W6öÇfRÖææ÷FF–öãÒ"G¶æ–GÒ#îj~Šë[{.Šz>Xk3Âö'WGFöããÆ'WGFöâ6Æ73Ò&'WGFöâv†÷7B"FFÖFVÆWFRÖææ÷FF–öãÒ"G¶æ–GÒ#îXŠ™šCÂö'WGFöããÂöF—cãÂö'F–6ÆSæ’æ¦ö–â‚rr“¢sÆF—b6Æ73Ò&V×G’#î‹ùk*iÈh›k:ƒÂöF—câs²B‚r6ææ÷FF–öâÖÆ—7BÖF–Æörr’ç6†÷tÖöFÂ‚—Ğ¢B‚r6ææ÷FF–öâÖÆ—7Br’æöæ6Æ–6³Ö7–æ2SÓç¶6öç7B&W6öÇfSÖRçF&vWBæ6Æ÷6W7B‚u¶FF×&W6öÇfRÖææ÷FF–öåÒr’ÆFVÃÖRçF&vWBæ6Æ÷6W7B‚u¶FFÖFVÆWFRÖææ÷FF–öåÒr“¶–b‡&W6öÇfR—¶v—B’†ö’öææ÷FF–öç2òG·&W6öÇfRæFF6WBç&W6öÇfTææ÷FF–öçÖÇ¶ÖWF†öC¢uD4‚rÆ&öG“¤¥4ôâç7G&–æv–g’‡·7FGW3¢w&W6öÇfVBwÒ—Ò“·6†÷tææ÷FF–öäÆ—7B‚—Ö–b†FVÂ—¶v—B’†ö’öææ÷FF–öç2òG¶FVÂæFF6WBæFVÆWFTææ÷FF–öçÖÇ¶ÖWF†öC¢tDTÄUDRwÒ“·6†÷tææ÷FF–öäÆ—7B‚—×Ó°¢B‚r7&Wf–Wr×FövvÆRr’æöæ6Æ–6³Ò‚“ÓçFövvÆU&Wf–Wr‚“²B‚r7&Wf–WrÖW†—Br’æöæ6Æ–6³Ò‚“ÓçFövvÆU&Wf–Wr†fÇ6R“²B‚r7&Wf–WrÖÆ—7BÖ'WGFöâr’æöæ6Æ–6³×6†÷tææ÷FF–öäÆ—7C²B‚u¶FFÖ6Æ÷6RÖÆ—7EÒr’æöæ6Æ–6³Ò‚“ÓâB‚r6ææ÷FF–öâÖÆ—7BÖF–Æörr’æ6Æ÷6R‚“²BB‚r7&Wf–Wr×FööÆ&"¶FF×&Wf–WrÖÖöFUÒr’æf÷$V6‚†'WGFöãÓæ'WGFöâæöæ6Æ–6³Ò‚“Óç6WE&Wf–WtÖöFR†'WGFöâæFF6WBç&Wf–WtÖöFR’“°¢BB‚u¶FF×&Wf–WrÖW‡÷'EÒr’æf÷$V6‚†'WGFöãÓæ'WGFöâæöæ6Æ–6³Ò‚“Óç&÷FV7FVDF÷væÆöB†ö’öææ÷FF–öç2öW‡÷'BâG¶'WGFöâæFF6WBç&Wf–WtW‡÷'GÖÆvVçBÖ6†ævR×&WVW7BâG¶'WGFöâæFF6WBç&Wf–WtW‡÷'GÖ’“°¦FDWfVçDÆ—7FVæW"‚w&W6—¦RrÂ‚“Óç7FFRç&Wf–WrbfG&tææ÷FF–öäÖ&·2‚’“¶FDWfVçDÆ—7FVæW"‚w67&öÆÂrÂ‚“Óç7FFRç&Wf–WrbfG&tææ÷FF–öäÖ&·2‚’Ç·76—fS§G'VWÒ“°¦FDWfVçDÆ—7FVæW"‚v†6†6†ævRrÇ&÷WFR“·7–æ5&öÆUT’‚“·6fT6'B‚“²&÷WFR‚“°¦FDWfVçDÆ—7FVæW"‚vÖW76vRrÆWfVçCÓç¶–b†WfVçBæ÷&–v–âÓÖÆö6F–öâæ÷&–v–çÇÆWfVçBæFFòçG—RÓÒw§–Ö6ö×7BÖ†V–v‡Br—&WGW&ã¶6öç7Bg&ÖSÒB‚v–g&ÖU¶FF×§–Ö6ö×7EÒr“¶–b†g&ÖR–g&ÖRç7G–ÆRæ†V–v‡CÖG´ÖF‚æÖ‚ƒ#SÄÖF‚æÖ–âƒscÄçVÖ&W"†WfVçBæFFæ†V–v‡B—ÇÃ3#’—×†Ò“°