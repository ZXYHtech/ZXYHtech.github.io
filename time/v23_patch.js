/* My OS V23 · Product Quality Refactor */
(function(){
'use strict';
if(window.__MY_OS_V23__) return;
window.__MY_OS_V23__=true;

const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
const sget=k=>{try{return typeof storageGet==='function'?storageGet(k):localStorage.getItem(k)}catch(e){return null}};
const go2=p=>{try{if(typeof go==='function')go(p)}catch(e){console.warn('[V23 go]',e)}};
function readProfile(){try{return Object.assign({guide:'options',contexts:[],envs:[],onboarded:false},JSON.parse(sget('my_os_profile_v12')||'{}'))}catch(e){return {guide:'options',contexts:[],envs:[],onboarded:false}}}
function byText(pattern,root=document){const els=[...root.querySelectorAll('button,a,[role="button"],summary')];return els.find(el=>pattern.test((el.textContent||'').replace(/\s+/g,' ').trim()))}
function sectionByText(pattern,root=document){const candidates=[...root.querySelectorAll('.panel,.card,section,article,[class*="card"],[class*="panel"]')];return candidates.find(el=>pattern.test((el.textContent||'').replace(/\s+/g,' ').trim()))}
function showModal(el){if(!el)return false;el.classList.add('show');el.style.display='';el.setAttribute('aria-hidden','false');el.querySelector('input,button,select,textarea')?.focus?.({preventScroll:true});return true}
function revealTool(type){
 const manual=q('#page-manual');
 const cfg={route:{modal:'#v18RouteModal',text:/生活路线|当前路线|生成.*路线|调整.*路线/},domains:{text:/生活领域|领域与目标/},review:{text:/周期复盘|重新规划/},methods:{text:/我的方法|个人方法|方法生成/},map:{text:/生活地图|长期生活地图/}}[type];
 if(!cfg)return;
 if(cfg.modal&&showModal(q(cfg.modal)))return;
 const target=sectionByText(cfg.text,manual||document);
 if(target){target.scrollIntoView({behavior:'smooth',block:'start'});target.classList.add('v23-pulse');setTimeout(()=>target.classList.remove('v23-pulse'),1400);return}
 const btn=byText(cfg.text,document);if(btn){btn.click();return}
 go2('manual');setTimeout(()=>{const t=sectionByText(cfg.text,q('#page-manual')||document);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})},180)
}

const small=q('.brand small'),rt=q('#runtimeBadge span');if(small)small.textContent='V23 · Stable · 更少入口，更清楚';if(rt)rt.textContent='V23 · My OS';document.title='My OS · 今天';
if(typeof titles==='object')Object.assign(titles,{dashboard:'今天',today:'计划与专注',discoveries:'发现与学习',manual:'我的系统',book:'知识学习',experiments:'试一试',calibration:'计划得准吗',projects:'正在做的事',method:'方法速查'});

function installNav(){
 const nav=q('#sideNav');if(nav)nav.innerHTML=`<button data-page="dashboard" class="active"><i>⌂</i><span>今天</span></button><button data-page="today"><i>✓</i><span>计划与专注</span></button><button data-page="discoveries"><i>✨</i><span>发现与学习</span></button><button data-page="manual"><i>◉</i><span>我的系统</span></button><details class="nav-more v23-more"><summary>深入使用 <small>按需</small></summary><button data-page="experiments"><i>↻</i><span>验证一个方法</span></button><button data-page="calibration"><i>⌁</i><span>计划得准吗</span></button><button data-page="projects"><i>▤</i><span>正在做的事</span></button><button data-page="book"><i>▦</i><span>完整知识库</span></button><button data-page="method"><i>◎</i><span>方法速查</span></button></details>`;
 const mn=q('#mobileNav');if(mn)mn.innerHTML=`<button data-page="dashboard" class="active"><i>⌂</i><span>今天</span></button><button data-page="today"><i>✓</i><span>计划</span></button><button data-page="discoveries"><i>✨</i><span>发现</span></button><button data-page="manual"><i>◉</i><span>我的</span></button>`
}
installNav();

const profile=readProfile(),how=q('#v13HowCard');if(how&&profile.onboarded){how.classList.add('v23-how-compact');const kicker=how.querySelector('.kicker'),h=how.querySelector('h2'),p=how.querySelector('p');if(kicker)kicker.textContent='使用提示';if(h)h.textContent='日常不需要操作整套系统';if(p)p.textContent='看下一步 → 做一点 → 留下真实结果。需要时再打开路线、复盘和知识。';const b=q('#reopenV13Guide');if(b)b.textContent='重新看完整引导'}

const disc=q('#page-discoveries'),dh=disc?.querySelector('.page-head');if(disc&&dh&&!q('#v23DiscoveryHub')){const k=dh.querySelector('.kicker'),h=dh.querySelector('h1'),p=dh.querySelector('p');if(k)k.textContent='DISCOVER · LEARN · ADJUST';if(h)h.textContent='发现与学习';if(p)p.textContent='先看真实生活里出现了什么规律，再用知识理解“为什么”，最后决定要不要调整。';const hub=document.createElement('div');hub.id='v23DiscoveryHub';hub.className='v23-hub v23-discovery-hub';hub.innerHTML=`<button class="v23-hub-card" id="v23SeePatterns"><span class="v23-hub-icon">✨</span><span><b>看我的规律</b><small>从自己的记录出发，不急着下结论</small></span><em>继续往下看</em></button><button class="v23-hub-card" id="v23GoKnowledge"><span class="v23-hub-icon">▦</span><span><b>知识学习</b><small>理解拖延、计划、恢复、动力和不同生活情境</small></span><em>进入学习</em></button>`;dh.insertAdjacentElement('afterend',hub);q('#v23SeePatterns')?.addEventListener('click',()=>{const next=hub.nextElementSibling;next?.scrollIntoView({behavior:'smooth',block:'start'})});q('#v23GoKnowledge')?.addEventListener('click',()=>go2('book'))}

const book=q('#page-book'),bh=book?.querySelector('.page-head');if(book&&bh&&!q('#v23BackDiscovery')){const actions=bh.querySelector('.page-actions')||bh;const b=document.createElement('button');b.id='v23BackDiscovery';b.className='btn ghost v23-back-btn';b.textContent='← 回到发现';b.addEventListener('click',()=>go2('discoveries'));actions.appendChild(b)}

const man=q('#page-manual'),mh=man?.querySelector('.page-head');if(man&&mh&&!q('#v23MyHub')){const k=mh.querySelector('.kicker'),h=mh.querySelector('h1'),p=mh.querySelector('p');if(k)k.textContent='MY SYSTEM · 只在需要时深入';if(h)h.textContent='我的系统';if(p)p.textContent='这里放长期能力：路线、生活领域、复盘、个人方法和生活地图。日常不需要逐项查看。';const hub=document.createElement('div');hub.id='v23MyHub';hub.className='v23-my-hub';hub.innerHTML=`<div class="v23-my-title"><div><b>常用长期工具</b><small>它们共享同一份生活证据，不需要重复填写。</small></div></div><div class="v23-tool-grid"><button data-v23-tool="route"><span>🧭</span><b>生活路线</b><small>这段时间怎么过</small></button><button data-v23-tool="domains"><span>◌</span><b>生活领域</b><small>资源想放在哪里</small></button><button data-v23-tool="review"><span>↻</span><b>周期复盘</b><small>下一阶段要不要调整</small></button><button data-v23-tool="methods"><span>✓</span><b>我的方法</b><small>已经验证什么有效</small></button><button data-v23-tool="map"><span>⌁</span><b>生活地图</b><small>什么条件下更顺</small></button></div><p class="v23-hub-note">这些是同一套系统的不同视角，不是五套需要分别维护的任务清单。</p>`;mh.insertAdjacentElement('afterend',hub);hub.addEventListener('click',e=>{const b=e.target.closest('[data-v23-tool]');if(b)revealTool(b.dataset.v23Tool)})}

const obs=new MutationObserver(()=>{const hubs=qa('#v23DiscoveryHub');hubs.slice(1).forEach(x=>x.remove());const mys=qa('#v23MyHub');mys.slice(1).forEach(x=>x.remove())});obs.observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',e=>{const b=e.target.closest?.('[data-page]');if(!b)return;const page=b.dataset.page;setTimeout(()=>{qa('#sideNav [data-page],#mobileNav [data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page===page))},0)});
})();
