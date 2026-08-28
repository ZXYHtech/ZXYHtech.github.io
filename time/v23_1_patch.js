/* My OS V23.1 · Whole-site quality pass */
(function(){
'use strict';
if(window.__MY_OS_V23_1__)return;window.__MY_OS_V23_1__=true;
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
const sg=k=>{try{return typeof storageGet==='function'?storageGet(k):localStorage.getItem(k)}catch(e){return null}};
const profile=()=>{try{return Object.assign({onboarded:false},JSON.parse(sg('my_os_profile_v12')||'{}'))}catch(e){return{onboarded:false}}};
const go2=p=>{try{if(typeof go==='function')go(p)}catch(e){console.warn('[V23.1 go]',e)}};

/* ---------- plain-language cleanup ---------- */
const repl=[
 ['ADAPTIVE DASHBOARD','从今天开始'],['DISCOVER · LEARN · ADJUST','发现 · 学习 · 调整'],['MY SYSTEM · 只在需要时深入','我的长期系统 · 需要时再深入'],
 ['CHECK · CHOOSE · NOTICE · ADJUST','看看自己 · 选择 · 行动 · 调整'],['PLAN · FOCUS · EVIDENCE','计划 · 专注 · 留下证据'],
 ['LOCAL REFLECTION ENGINE','今天的复盘提示'],['ONE ADJUSTMENT','只改一个地方'],['MIRROR','先描述事实'],['EVIDENCE','已有证据'],['QUESTION','问自己'],['OPTIONS','可选做法'],
 ['PATTERN · OBSERVATION','可能规律 · 观察'],['PATTERN','规律'],['OBSERVATION','观察'],['HYPOTHESIS','待验证猜测'],['EXPERIMENT','验证'],['EVENT','一次事件'],
 ['Observation ≠ Causation · Pattern ≠ Identity · Correlation ≠ Rule · AI suggestion ≠ Truth','观察不等于因果 · 规律不等于人格 · 相关不等于规则 · 系统建议不等于事实'],
 ['THIS PHASE','当前阶段'],['CURRENT ROUTE','当前路线'],['LIFE ROUTE','生活路线'],['PERIODIC REVIEW','周期复盘'],['NEXT PHASE','下一阶段'],['LIFE DOMAINS','生活领域'],['LONG-TERM VIEW','长期视角'],
 ['14-DAY SIGNAL','近14天趋势'],['WEEKLY MIRROR','近期回顾'],['DECISION SUPPORT','辅助判断'],['WEEKLY REPORT','近期文字回顾'],['Calibration & Context Cost','计划校准与中断成本'],
 ['FOCUS · 专注','专注中'],['ROI','取舍'],['Anchor 结果','今天这件事的结果'],['Anchor，可空','可空'],['计划番茄','计划轮数'],['专注 min','专注分钟'],['休息 min','休息分钟']
];
function translateTree(root){
 const start=root&&root.nodeType===1?root:document.body;if(!start)return;
 const w=document.createTreeWalker(start,NodeFilter.SHOW_TEXT);let n;const arr=[];while(n=w.nextNode())arr.push(n);
 arr.forEach(t=>{const p=t.parentElement;if(!p||p.closest('script,style,#page-book'))return;const ui=p.closest('.kicker,.hero-loop,.notice,.console-kicker,.tag,.pomo-phase,.page-head,.section-title,.v18-active-head,.v18-empty,.v19-life-summary,.v20-dash-review,#page-discoveries');if(!ui)return;let s=t.nodeValue;for(const [a,b] of repl)s=s.split(a).join(b);if(s!==t.nodeValue)t.nodeValue=s});
}
function normalizeFormLabels(){
 const set=(sel,txt)=>{const e=q(sel);if(e&&e.textContent!==txt)e.textContent=txt};
 const fieldLabel=id=>q('#'+id)?.closest('.field')?.querySelector('label');
 let e=fieldLabel('outcome');if(e&&e.textContent!=='今天这件事的结果')e.textContent='今天这件事的结果';
 e=fieldLabel('anchor');if(e&&(e.textContent||'').replace(/\s+/g,' ').trim()!=='今天最值得推进什么？ 可空')e.innerHTML='今天最值得推进什么？ <span class="muted small">可空</span>';
 e=fieldLabel('pomoPlanned');if(e&&e.textContent!=='计划轮数')e.textContent='计划轮数';
 e=fieldLabel('pomoWorkMin');if(e&&e.textContent!=='专注分钟')e.textContent='专注分钟';
 e=fieldLabel('pomoBreakMin');if(e&&e.textContent!=='休息分钟')e.textContent='休息分钟';
 set('#pomoPhase','专注中');set('#pomoUseAnchor','用今天这件事');set('#pomoClearToday','清零今天');
}

/* ---------- dashboard: one primary path, old analytics on demand ---------- */
function compactDashboard(){
 const dash=q('#page-dashboard');if(!dash)return;dash.classList.add('v231-clean');
 const head=dash.querySelector('.page-head'),engine=q('#v14Engine');
 if(head){const k=head.querySelector('.kicker'),h=head.querySelector('h1'),p=head.querySelector('p');if(k)k.textContent='从现在开始';if(h)h.textContent='今天';if(p)p.textContent='先看当前最值得的下一步。需要时再展开知识、路线或更多观察。';const acts=head.querySelectorAll('.page-actions button');acts.forEach(b=>{const keep=/记录今天|记录/.test(b.textContent||'');b.classList.toggle('v231-hidden',!keep)});}
 if(head&&engine&&head.nextElementSibling!==engine)head.insertAdjacentElement('afterend',engine);
 const oldHero=[...dash.children].find(e=>e.classList?.contains('hero'));if(oldHero)oldHero.classList.add('v231-legacy-hero');
 const p=profile();const ctx=q('#v15ContextCard');if(ctx)ctx.classList.toggle('v231-hidden',!p.onboarded);
 const emptyChecks=[
  ['#v18RouteCard',/最近正处在一个特殊阶段吗/],['#v20DashboardReview',/先正常使用几天|有足够记录后/],['#v19LifeSummary',/先积累一点真实生活记录/],['#v17MapCue',/再正常记录几天|先不要急着总结/],['#v15StrategyCue',/还在学习你的方法/],['#v16ExperimentCue',/个人方法还可以被验证/]
 ];
 emptyChecks.forEach(([s,r])=>{const e=q(s);if(e)e.classList.toggle('v231-empty-signal',r.test(e.textContent||''))});
 const knowledge=q('#v21DashboardLearn')||q('.v22-dash-learn');
 let cursor=engine||head;
 const ordered=[q('#v18RouteCard'),ctx,knowledge,q('#v20DashboardReview'),q('#v19LifeSummary')].filter(Boolean).filter(e=>!e.classList.contains('v231-empty-signal')&&!e.classList.contains('v231-hidden'));
 ordered.forEach(e=>{cursor.insertAdjacentElement('afterend',e);cursor=e});
 if(q('#v231DashboardMore'))return;
 const details=document.createElement('details');details.id='v231DashboardMore';details.className='v231-dashboard-more';details.innerHTML='<summary><span>更多观察与历史</span><small>趋势、近期回顾、历史记录</small></summary><div class="v231-dashboard-more-body"></div>';
 (cursor||head)?.insertAdjacentElement('afterend',details);const body=details.querySelector('.v231-dashboard-more-body');
 const direct=[...dash.children];
 direct.forEach(el=>{
  if([head,engine,details,...ordered].includes(el))return;
  const txt=(el.textContent||'').replace(/\s+/g,' ').trim();
  const move=el.id==='dailyConsole'||el.id==='decisionCoach'||el.id==='learningBridge'||el.id==='metricGrid'||/14-DAY SIGNAL|近14天趋势|WEEKLY MIRROR|近期回顾/.test(txt)||el.classList?.contains('section-title')&&/最近记录/.test(txt)||el.querySelector?.('#recentEntries');
  if(move)body.appendChild(el);
 });
}

/* ---------- discoveries: technical lifecycle stays available, not dominant ---------- */
function compactDiscoveries(){
 const page=q('#page-discoveries');if(!page)return;page.classList.add('v231-clean');
 if(q('#v231DiscoveryExtra'))return;
 const panel=[...page.querySelectorAll(':scope > .panel,:scope > section.panel')].find(e=>/模式生命周期/.test(e.textContent||''));if(!panel)return;
 const d=document.createElement('details');d.id='v231DiscoveryExtra';d.className='v231-discovery-extra';d.innerHTML='<summary><span>系统怎样判断“规律”？</span><small>想了解证据标准时再看</small></summary><div class="v231-discovery-extra-body"></div>';
 panel.parentNode.insertBefore(d,panel);d.querySelector('.v231-discovery-extra-body').appendChild(panel);
}

/* ---------- manual: click one long-term tool, show one ---------- */
const toolSel={route:'#v18PlannerHome',domains:'#v19DomainsPanel',review:'#v20ReviewSection',methods:'#v15StrategyPanel'};
let selectedTool='';
function managedPanels(){return Object.values(toolSel).map(q).filter(Boolean)}
function ensureToolBar(){
 let bar=q('#v231ToolBar');if(bar)return bar;const hub=q('#v23MyHub');if(!hub)return null;
 bar=document.createElement('div');bar.id='v231ToolBar';bar.className='v231-tool-bar v231-hidden';bar.innerHTML='<b id="v231ToolTitle">长期工具</b><button class="btn ghost" id="v231ToolClose">收起</button>';hub.insertAdjacentElement('afterend',bar);q('#v231ToolClose')?.addEventListener('click',()=>showTool(''));return bar;
}
function showTool(type){
 const page=q('#page-manual');if(!page)return;selectedTool=type||'';managedPanels().forEach(e=>{e.classList.add('v231-tool-section');e.classList.toggle('v231-open',!!type&&e.matches(toolSel[type]||'___'))});
 const bar=ensureToolBar();if(bar){bar.classList.toggle('v231-hidden',!type);const title=q('#v231ToolTitle');if(title)title.textContent={route:'生活路线',domains:'生活领域',review:'周期复盘',methods:'我的方法'}[type]||'长期工具'}
 qa('#v23MyHub [data-v23-tool]').forEach(b=>b.classList.toggle('active',b.dataset.v23Tool===type));
 const panel=toolSel[type]?q(toolSel[type]):null;if(panel)setTimeout(()=>panel.scrollIntoView({behavior:'smooth',block:'start'}),40);
}
function compactManual(){
 const page=q('#page-manual');if(!page)return;page.classList.add('v231-clean');
 const hub=q('#v23MyHub');if(!hub)return;ensureToolBar();managedPanels().forEach(e=>e.classList.add('v231-tool-section'));
 q('#v17MapEntry')?.classList.add('v231-hidden');
 if(!q('#v231ManualExtra')){
  const d=document.createElement('details');d.id='v231ManualExtra';d.className='v231-manual-extra';d.innerHTML='<summary><span>个人使用说明与设置</span><small>可选 · 需要时再维护</small></summary><div class="v231-manual-extra-body"></div>';
  hub.insertAdjacentElement('afterend',d);const body=d.querySelector('.v231-manual-extra-body');
  const actions=page.querySelector('.page-head .page-actions');if(actions)body.appendChild(actions);
  const nodes=[q('#contextProfile'),page.querySelector('.manual-tabs')?.closest('.panel'),page.querySelector('.manual-grid')?.closest('.panel'),page.querySelector('.envelope-grid')?.closest('.panel'),page.querySelector('.manual-version-list')?.closest('.panel')].filter(Boolean);
  nodes.forEach(n=>body.appendChild(n));
 }
}
function handleHub(e){const b=e.target.closest?.('#v23MyHub [data-v23-tool]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const t=b.dataset.v23Tool;if(t==='map'){go2('life-map');return}showTool(t)}
document.addEventListener('click',handleHub,true);

/* ---------- Today: detailed reflection becomes optional on mobile ---------- */
function compactTodayMoreFields(page){
 if(q('#v231TodayMoreFields'))return;const save=q('#saveEntry')?.closest('.form-save-zone');if(!save)return;
 const d=document.createElement('details');d.id='v231TodayMoreFields';d.className='v231-today-more';d.innerHTML='<summary><span>更多记录（可选）</span><small>任务类型、估时、恢复、场景</small></summary><div class="v231-today-more-body"></div>';save.parentNode.insertBefore(d,save);const body=d.querySelector('.v231-today-more-body');
 const nodes=[q('#bestPeriod')?.closest('.field'),q('#taskType')?.closest('.grid-2'),q('#plannedMinutes')?.closest('.grid-2'),q('#recoveryQuality')?.closest('.field'),q('#tagChips')?.closest('.field'),q('#v19TodayDomains')].filter(Boolean);
 [...new Set(nodes)].forEach(n=>body.appendChild(n));if(innerWidth>760)d.open=true;
}
function compactToday(){
 const page=q('#page-today');if(!page)return;page.classList.add('v231-clean');normalizeFormLabels();const ks=page.querySelectorAll('.kicker');if(ks[0])ks[0].textContent='看看自己 · 选择 · 行动 · 调整';if(ks[1])ks[1].textContent='计划 · 专注 · 留下证据';compactTodayMoreFields(page);if(q('#v231TodayReflection'))return;
 const stack=q('#smartReflection')?.closest('.stack');if(!stack)return;
 const d=document.createElement('details');d.id='v231TodayReflection';d.className='v231-today-reflection';d.innerHTML='<summary><span>复盘提示（可选）</span><small>需要分析时再展开</small></summary><div class="v231-today-reflection-body"></div>';
 stack.parentNode.insertBefore(d,stack);d.querySelector('.v231-today-reflection-body').appendChild(stack);if(innerWidth>760)d.open=true;compactTodayMoreFields(page);
}

/* ---------- Knowledge: V22 is the front door; old V8 intro no longer competes ---------- */
function compactBook(){const page=q('#page-book');if(page)page.classList.add('v231-clean')}

/* ---------- navigation state for programmatic page changes ---------- */
function currentPage(){return qa('.page').find(e=>e.classList.contains('active'))||qa('.page').find(e=>e.offsetParent!==null)}
function syncNav(){const p=currentPage();if(!p)return;let id=p.id.replace(/^page-/,'');const root=id==='dashboard'?'dashboard':id==='today'?'today':(['discoveries','book'].includes(id)?'discoveries':'manual');qa('#mobileNav [data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===root));qa('#sideNav [data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===id||b.dataset.page===root&&['life-map'].includes(id)));const top=q('#topTitle'),tt={dashboard:'今天',today:'计划与专注',discoveries:'发现与学习',book:'知识学习',manual:'我的系统','life-map':'生活地图',experiments:'验证方法',calibration:'计划校准',projects:'正在做的事',method:'方法速查'}[id]||'My OS';if(top&&top.textContent!==tt)top.textContent=tt}
document.addEventListener('click',e=>{const b=e.target.closest?.('#mobileNav [data-page],#sideNav [data-page]');if(b)setTimeout(()=>{syncNav();try{window.scrollTo({top:0,behavior:'auto'})}catch(_){}},0)});

function install(){
 const brand=q('.brand b'),small=q('.brand small'),rt=q('#runtimeBadge span'),crumb=q('.crumb');if(brand)brand.textContent='My OS';if(small)small.textContent='V23.1 · 稳定版 · 更少、更清楚';if(rt)rt.textContent='V23.1 · My OS';if(crumb)crumb.textContent=' · 观察现实，做自己的选择';
 const privacy=q('.sidebar-foot .privacy');if(privacy)privacy.textContent='🔒 数据默认只保存在当前浏览器。记录、方法、实验和学习进度不会自动上传。';const foot=q('.sidebar-foot');if(foot&&foot.children[1])foot.children[1].innerHTML='计划不是命令<br>偏离不是失败';const badge=q('#runtimeBadge');if(badge)badge.title='当前 My OS 版本与运行状态';
 compactDashboard();compactDiscoveries();compactManual();compactToday();compactBook();translateTree(document.body);normalizeFormLabels();syncNav();
}
install();
const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')translateTree(m.target.parentElement);else for(const n of m.addedNodes)if(n.nodeType===1)translateTree(n)}syncNav()});mo.observe(document.body,{subtree:true,childList:true,characterData:true});
})();
