/* My OS V14 · Next Best Action Guidance Engine */
(function(){
'use strict';
if(window.__MY_OS_V14__) return; window.__MY_OS_V14__=true;

const CORE_KEY='eao_v4_data';
const PROFILE_KEY='my_os_profile_v12';
const DRAFT_KEY='eao_v6_today_draft';
const POMO_KEYS=['eao_pomodoro_v11','eao_pomodoro_v1'];
const MODE_KEY='my_os_v14_mode';
const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
const jread=(k,d)=>{try{const v=JSON.parse(storageGet(k)||'null');return v==null?d:v}catch(e){return d}};
const esc=s=>typeof escapeHtml==='function'?escapeHtml(String(s??'')):String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const iso=()=>typeof todayISO==='function'?todayISO():new Date().toISOString().slice(0,10);
const profile=()=>Object.assign({guide:'options',contexts:[],envs:[],note:'',need:'',onboarded:false},jread(PROFILE_KEY,{}));
const core=()=>Object.assign({entries:[],interruptions:[],experiments:[],projects:[]},jread(CORE_KEY,{}));
const draft=()=>jread(DRAFT_KEY,null);
function pomo(){for(const k of POMO_KEYS){const p=jread(k,null);if(p)return p}return {completed:0,planned:0,running:false,phase:'work',task:'',endAt:null,workMin:25}}
function field(id,fallback=''){const e=q('#'+id);return e?e.value:fallback}
function num(id,fallback=0){const v=+field(id,'');return Number.isFinite(v)&&field(id,'')!==''?v:fallback}
function todaySaved(){return (core().entries||[]).find(e=>e.date===iso())||null}
function currentForm(){return {anchor:String(field('anchor','')).trim(),review:String(field('review','')).trim(),adjust:String(field('adjust','')).trim(),actual:num('actualMinutes',0),planned:num('plannedMinutes',0),energy:num('energy',3),focus:num('focus',3),stress:num('stress',3),alignment:num('alignment',3)}}
function currentState(){
 const c=core(), saved=todaySaved(), d=draft(), f=currentForm(), p=pomo();
 const fromDraft=id=>d&&d[id]!=null?String(d[id]).trim():'';
 const anchor=f.anchor||saved?.anchor||fromDraft('anchor');
 const review=f.review||saved?.review||fromDraft('review');
 const actual=f.actual||saved?.actualMinutes||+(d?.actualMinutes||0)||0;
 const energy=q('#energy')?f.energy:(saved?.energy||+(d?.energy||3)||3);
 const focus=q('#focus')?f.focus:(saved?.focus||+(d?.focus||3)||3);
 const stress=q('#stress')?f.stress:(saved?.stress||+(d?.stress||3)||3);
 const entries=(c.entries||[]).slice().sort((a,b)=>a.date.localeCompare(b.date));
 return {c,saved,d,f,p,anchor,review,actual,energy,focus,stress,entries,hour:new Date().getHours(),profile:profile()};
}

const MODE_LABEL={auto:'自动判断',start:'开始一下',focus:'推进事情',close:'收尾回顾',learn:'知识学习',rest:'恢复一下'};
function getMode(){const m=jread(MODE_KEY,{date:'',mode:'auto'});return m.date===iso()?m.mode:'auto'}
function setMode(mode){storageSet(MODE_KEY,JSON.stringify({date:iso(),mode}));renderEngine(true)}

function recentStats(entries){
 const cutoff=Date.now()-7*86400000, arr=entries.filter(e=>{const t=new Date(e.date+'T12:00:00').getTime();return t>=cutoff});
 if(!arr.length)return {n:0};
 const avg=k=>arr.reduce((s,e)=>s+(+e[k]||0),0)/arr.length;
 return {n:arr.length,energy:avg('energy'),focus:avg('focus'),stress:avg('stress'),alignment:avg('alignment'),arr};
}
function learningRec(s){
 const ctx=s.profile.contexts||[], stats=recentStats(s.entries), last=s.entries[s.entries.length-1]||{}, text=[last.review,last.adjust,s.review].filter(Boolean).join(' ');
 if(stats.n>=3&&stats.energy&&stats.energy<2.6)return {id:'book-ch-29',title:'恢复不是奖励，而是系统的一部分',why:'最近几次记录的精力偏低，先理解恢复比继续加计划更有价值。'};
 if(stats.n>=3&&stats.stress&&stats.stress>3.6)return {id:'book-ch-35',title:'高压力下怎样降低认知负荷',why:'最近压力持续偏高，方法应先适配资源，而不是继续提高要求。'};
 if(/打断|临时|消息|电话|会议|孩子|中断/.test(text)||ctx.includes('care')||ctx.includes('social'))return {id:'book-ch-20',title:'计划为什么总被现实打断',why:'你的处境里存在较多中断或照护责任，更适合学习可中断计划与恢复上下文。'};
 if(ctx.includes('study'))return {id:'book-ch-23',title:'学习启动：为什么知道要学却开始不了',why:'学习场景里，“开始”常比“坚持更久”更值得先解决。'};
 if(ctx.includes('shift')||ctx.includes('irregular')||ctx.includes('travel'))return {id:'book-ch-14',title:'不规律生活怎样建立弹性结构',why:'作息或环境变化较大时，固定时间表通常不如触发式与窗口式计划。'};
 if(ctx.includes('freelance')||ctx.includes('create'))return {id:'book-ch-25',title:'没有外部约束时怎样保持长期动力',why:'自主项目更依赖启动线索、边界和反馈，而不是单靠意志力。'};
 if(ctx.includes('health')||ctx.includes('retired'))return {id:'book-ch-29',title:'怎样真正恢复，而不是“什么都没做”',why:'当前生活重点更适合从恢复、兴趣和长期节奏理解时间，而不是追求完成量。'};
 return {id:'book-ch-23',title:'启动与拖延：先解决为什么开始不了',why:'这是最常见、也最容易立刻改善日常体验的基础知识。'};
}

function phaseAuto(s){
 if(!s.profile.onboarded)return 'setup';
 if(s.p.running)return 'focus-running';
 const hasEvidence=s.actual>0||(s.p.completed||0)>0||!!s.review;
 if(!s.saved){
   if(!s.anchor){
     if(s.energy<=2||s.stress>=4)return 'recover';
     return s.hour<11?'start':'choose';
   }
   if(hasEvidence)return 'close';
   return 'focus';
 }
 if(s.hour>=18){
   if(!s.saved.review)return 'close-saved';
   return 'learn-or-end';
 }
 if(s.energy<=2||s.stress>=4)return 'recover-saved';
 return 'saved-day';
}
function phaseWithMode(s){
 const m=getMode(); if(m==='auto')return phaseAuto(s);
 if(m==='start')return s.anchor?'focus':'choose';
 if(m==='focus')return s.p.running?'focus-running':'focus';
 if(m==='close')return s.saved?'close-saved':'close';
 if(m==='learn')return 'learn';
 if(m==='rest')return 'recover';
 return phaseAuto(s);
}
function copyByGuide(base,s){
 const g=s.profile.guide||'options';
 if(g==='lead')return {...base,eyebrow:'现在只做这一件'};
 if(g==='analyze')return {...base,eyebrow:'根据当前状态判断',whyOpen:true};
 if(g==='check')return {...base,eyebrow:'你决定，我只提供下一步检查'};
 return {...base,eyebrow:'下一步建议'};
}
function recommendation(s){
 const phase=phaseWithMode(s), lr=learningRec(s), task=s.p.task||s.anchor||'这件事';
 let r;
 switch(phase){
   case 'setup': r={title:'先花 30 秒告诉系统你希望怎样被帮助',body:'不是做人格测试，只是设置“系统应该多主动、你最近处在什么生活环境”。',primary:['设置我的方式','setup'],alts:[['先看看今天','today'],['先看知识学习','learn']],why:'没有这一步也能使用，但设置后，后续语言、建议强度和学习路线会更贴合你。'};break;
   case 'recover': r={title:'先别急着加任务，先把今天缩小一点',body:`当前记录更接近“资源偏紧”的状态：精力 ${s.energy}/5 · 压力 ${s.stress}/5。`,primary:['先记录现在的状态','today-state'],alts:[['只选一个最小任务','today-anchor'],['先学“怎样真正恢复”','learn-rec']],why:'低精力或高压力时，继续增加结构往往只会提高启动成本。先确认必须做什么，再决定是否推进。'};break;
   case 'start': r={title:'先判断今天的状态，再选一件最值得的事',body:'早一点的时候不需要立刻排满日程。先知道自己有什么资源，再决定今天值得推进什么。',primary:['30 秒开始今天','today-state'],alts:[['直接选一件事','today-anchor'],['今天不计划','today-review']],why:'时间只是弱提示；真正决定建议的是你有没有计划、精力和压力。如果现在并不是“早晨状态”，可以在下面切换方向。'};break;
   case 'choose': r={title:'现在先选一件最值得推进的事',body:'不要先列长清单。写一个“今天做到什么就算有意义”的结果。',primary:['写下这一件事','today-anchor'],alts:[['脑子很乱，先倒出来','today-review'],['我现在更需要恢复','mode-rest']],why:'没有明确下一步时，增加工具不会让行动更容易。一个清楚的结果比完整计划更重要。'};break;
   case 'focus-running': {const remain=s.p.endAt?Math.max(0,Math.ceil((s.p.endAt-Date.now())/60000)):null;r={title:`先把当前这一轮做完：${task}`,body:`${s.p.phase==='break'?'正在休息':'正在专注'}${remain!=null?` · 约剩 ${remain} 分钟`:''}。现在不需要再做新的计划。`,primary:['回到专注计时器','focus-panel'],alts:[['暂停后重新判断','focus-panel'],['看为什么要保护连续注意力','learn-rec']],why:'计时器正在运行时，最有价值的动作通常不是重新规划，而是减少上下文切换。'};break;}
   case 'focus': r={title:`给“${task}”一个清楚的开始`,body:'不必先保证完成。可以只做第一步，或者开一段适合你的专注时间。',primary:['开始一段专注','focus-panel'],alts:[['把任务缩成第一步','today-anchor'],['先学“为什么迟迟开始不了”','learn-rec']],why:'已经知道要做什么，但还没有执行证据时，下一步应降低启动摩擦，而不是继续扩展计划。'};break;
   case 'close': r={title:'已经做过一些了，现在把现实留下来',body:`今天已经有执行证据${s.p.completed?`：完成 ${s.p.completed} 个专注块`:s.actual?`：实际投入 ${s.actual} 分钟`:''}。补一句发生了什么，再保存今天。`,primary:['回顾并保存今天','today-save'],alts:[['还要继续一轮','focus-panel'],['先看一个相关知识点','learn-rec']],why:'保存不是打卡，而是把“计划与现实的差异”留给未来的自己。没有这些证据，自适应只能靠猜。'};break;
   case 'close-saved': r={title:'今天已经保存，可以补一句“发生了什么”',body:'如果你现在处于收尾阶段，一句真实回顾比重新整理整天更有价值。',primary:['补充今天的回顾','today-review-save'],alts:[['今天就到这里','end'],['学一点再结束','learn-rec']],why:'已经保存过的记录可以继续修改。收尾不需要写日报，只需要留下最值得记住的一点。'};break;
   case 'recover-saved': r={title:'今天已经留下记录，现在可以把恢复放前面',body:`当前状态仍偏紧：精力 ${s.energy}/5 · 压力 ${s.stress}/5。除非还有必须事项，否则不需要为了“再完成一点”继续加任务。`,primary:['今天先到这里','end'],alts:[['还有必须事项，做最小版本','today-anchor'],['学“恢复与休息”','learn-rec']],why:'My OS 不把“继续做”默认成更好的选择。已经有足够证据时，停止也可以是合理决策。'};break;
   case 'learn': r={title:`现在适合学一个和你有关的知识点`,body:lr.title,primary:['开始这篇学习','learn-rec'],alts:[['浏览全部知识','learn'],['回到今天','today']],why:lr.why};break;
   case 'learn-or-end': r={title:'今天已经有记录，剩下的时间不必继续“管理”',body:'你可以到这里结束，也可以用 5–10 分钟理解一个和最近处境有关的知识点。',primary:['今天到这里','end'],alts:[['学一个推荐知识点','learn-rec'],['看看我最近的发现','discoveries']],why:'系统的目标不是让你一直使用它。当天闭环完成后，退出也是一个好结果。'};break;
   default: r={title:'今天已经留下足够证据',body:'如果没有新的现实需要，不必继续操作。需要推进事情时再回来。',primary:['今天先到这里','end'],alts:[['继续推进一件事','focus-panel'],['知识学习','learn-rec']],why:'好的系统不应该制造使用负担。已经完成当天闭环时，保持空白也是一种设计。'};
 }
 return copyByGuide({...r,phase,learning:lr},s);
}

function modeBar(){return `<div class="v14-modebar"><span>此刻更像：</span>${['auto','start','focus','close','learn','rest'].map(m=>`<button data-v14-mode="${m}" class="${getMode()===m?'active':''}">${MODE_LABEL[m]}</button>`).join('')}<small>“自动”只把时间当弱提示，不会强制日程。</small></div>`}
function renderEngine(scroll){
 const box=q('#v14Engine');if(!box)return;const s=currentState(),r=recommendation(s),g=s.profile.guide||'options';
 const alts=(r.alts||[]).map(([t,a])=>`<button class="v14-alt" data-v14-action="${a}">${esc(t)}</button>`).join('');
 box.innerHTML=`<div class="v14-next-head"><div><div class="kicker">${esc(r.eyebrow)}</div><h2>${esc(r.title)}</h2><p>${esc(r.body)}</p></div><span class="v14-phase">${esc(MODE_LABEL[getMode()]||'自动判断')}</span></div><div class="v14-next-actions"><button class="btn primary v14-primary" data-v14-action="${r.primary[1]}">${esc(r.primary[0])}</button>${g==='lead'?'':`<div class="v14-alts">${alts}</div>`}</div><details class="v14-why" ${r.whyOpen?'open':''}><summary>为什么现在这样建议？</summary><p>${esc(r.why)}</p>${r.learning?`<button class="v14-learning-link" data-v14-action="learn-rec">📚 相关知识：${esc(r.learning.title)}</button>`:''}</details>${modeBar()}${renderDayPath(s)}`;
 bindBox(box,r,s);if(scroll)box.scrollIntoView({behavior:'smooth',block:'start'});
 const small=q('.brand small'),rt=q('#runtimeBadge span');if(small)small.textContent='V14 · Next Best Action · 每次只给下一步';if(rt)rt.textContent='V14 · My OS';
}
function renderDayPath(s){
 const chose=!!s.anchor, acted=s.actual>0||(s.p.completed||0)>0, saved=!!s.saved;
 return `<div class="v14-daypath"><div class="${chose?'done':'active'}"><b>${chose?'✓':'1'}</b><span>选一件事</span></div><i></i><div class="${acted?'done':chose?'active':''}"><b>${acted?'✓':'2'}</b><span>做一点</span></div><i></i><div class="${saved?'done':acted?'active':''}"><b>${saved?'✓':'3'}</b><span>保存现实</span></div><small>不是连续打卡，只显示今天走到哪一步。</small></div>`;
}
function bindBox(box,r,s){
 box.querySelectorAll('[data-v14-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.v14Mode)));
 box.querySelectorAll('[data-v14-action]').forEach(b=>b.addEventListener('click',()=>doAction(b.dataset.v14Action,r,s)));
}
function goAndFocus(id){if(typeof go==='function')go('today');setTimeout(()=>{const e=q('#'+id);e?.scrollIntoView({behavior:'smooth',block:'center'});if(/^(INPUT|TEXTAREA|SELECT)$/.test(e?.tagName||''))e.focus()},100)}
function openLearn(rec){if(typeof go==='function')go('book');setTimeout(()=>{if(rec?.id&&window.__eaoOpenReader)window.__eaoOpenReader(rec.id)},160)}
function doAction(a,r,s){
 if(a==='setup'){const m=q('#onboardingModal');if(m){m.classList.add('show');m.querySelector('.modal')?.scrollTo({top:0})}else q('#openOnboarding')?.click();return}
 if(a==='today'||a==='today-state'){if(typeof go==='function')go('today');setTimeout(()=>q('#energy')?.scrollIntoView({behavior:'smooth',block:'center'}),100);return}
 if(a==='today-anchor'){goAndFocus('anchor');return}
 if(a==='today-review'){goAndFocus('review');return}
 if(a==='today-save'){if(typeof go==='function')go('today');setTimeout(()=>{const rev=q('#review');if(rev&&!rev.value.trim()){rev.scrollIntoView({behavior:'smooth',block:'center'});rev.focus()}else q('#todaySaveZone')?.scrollIntoView({behavior:'smooth',block:'center'})},100);return}
 if(a==='today-review-save'){if(typeof go==='function')go('today');setTimeout(()=>{const t=todaySaved();if(t){q('#editSavedToday')?.click()}setTimeout(()=>goAndFocus('review'),80)},100);return}
 if(a==='focus-panel'){if(typeof go==='function')go('today');setTimeout(()=>q('#pomodoroPanel')?.scrollIntoView({behavior:'smooth',block:'center'}),120);return}
 if(a==='learn-rec'){openLearn(r.learning||learningRec(s));return}
 if(a==='learn'){if(typeof go==='function')go('book');return}
 if(a==='discoveries'){if(typeof go==='function')go('discoveries');return}
 if(a==='mode-rest'){setMode('rest');return}
 if(a==='end'){if(typeof toast==='function')toast('今天可以到这里。需要时再回来。');setMode('auto');renderEngine();return}
}

const dash=q('#page-dashboard'), head=dash?.querySelector('.page-head');
if(dash&&head&&!q('#v14Engine')){
 const el=document.createElement('section');el.id='v14Engine';el.className='v14-engine';head.insertAdjacentElement('afterend',el);
}
const how=q('#v13HowCard');if(how&&storageGet('my_os_v13_guide_seen')==='1'){
 how.classList.add('v14-compact');
 if(!q('#v14HowToggle')){const b=document.createElement('button');b.id='v14HowToggle';b.className='v14-how-toggle';b.textContent='怎么用？';how.prepend(b);b.addEventListener('click',()=>how.classList.toggle('expanded'))}
}

const td=q('#page-today');
if(td&&!q('#v14TodayLearn')){const x=document.createElement('div');x.id='v14TodayLearn';x.className='v14-today-learn';x.innerHTML='<div><b>📚 做不下去时，不一定要再加计划</b><small id="v14TodayLearnText"></small></div><button class="mini-btn" id="v14TodayLearnBtn">学一个相关知识点</button>';const zone=q('#todaySaveZone');(zone?.parentElement||td).appendChild(x);q('#v14TodayLearnBtn')?.addEventListener('click',()=>{const s=currentState();openLearn(learningRec(s))})}
function renderTodayLearn(){const e=q('#v14TodayLearnText');if(!e)return;const r=learningRec(currentState());e.textContent=r.title+' · '+r.why}

['anchor','review','actualMinutes','energy','focus','stress'].forEach(id=>q('#'+id)?.addEventListener('input',()=>{renderEngine();renderTodayLearn()}));
q('#saveEntry')?.addEventListener('click',()=>setTimeout(()=>{renderEngine();renderTodayLearn()},80));
q('#pomoStartPause')?.addEventListener('click',()=>setTimeout(renderEngine,80));
q('#pomoFinish')?.addEventListener('click',()=>setTimeout(renderEngine,80));
q('#pomoReset')?.addEventListener('click',()=>setTimeout(renderEngine,80));
window.addEventListener('focus',()=>{renderEngine();renderTodayLearn()});
setInterval(()=>{const p=pomo();if(p.running)renderEngine()},15000);

renderTodayLearn();renderEngine();
})();
