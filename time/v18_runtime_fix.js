/* My OS V18 · Flexible Life Route Planner */
(function(){
'use strict';
if(window.__MY_OS_V18_ROUTE__ && document.querySelector('#v18RouteModal')) return; window.__MY_OS_V18__=true;

const ROUTE_KEY='my_os_route_v18';
const FEEDBACK_KEY='my_os_route_feedback_v18';
const PROFILE_KEY='my_os_profile_v12';
const CORE_KEY='eao_v4_data';
const TODAY_CHOICE_KEY='my_os_route_today_v18';
const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
const sg=k=>{try{return typeof storageGet==='function'?storageGet(k):localStorage.getItem(k)}catch(e){return null}};
const ss=(k,v)=>{try{if(typeof storageSet==='function')storageSet(k,v);else localStorage.setItem(k,v);return true}catch(e){return false}};
const jr=(k,d)=>{try{const x=JSON.parse(sg(k)||'null');return x==null?d:x}catch(e){return d}};
const esc=s=>typeof escapeHtml==='function'?escapeHtml(String(s??'')):String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const iso=()=>typeof todayISO==='function'?todayISO():new Date().toISOString().slice(0,10);
const toast2=s=>{if(typeof toast==='function')toast(s);else console.log('[My OS]',s)};
const go2=p=>{if(typeof go==='function')go(p)};

const STAGES={
 work:{icon:'💼',label:'工作冲刺 / 项目推进',knowledge:[['book-ch-20','计划与现实'],['book-ch-35','高压力下的认知负荷']]},
 study:{icon:'🎓',label:'学习 / 考试',knowledge:[['book-ch-23','学习启动与拖延'],['book-ch-25','长期动力']]},
 care:{icon:'👶',label:'照护 / 家庭高打断期',knowledge:[['book-ch-15','家庭、责任与自己的时间'],['book-ch-20','高打断环境的弹性计划']]},
 travel:{icon:'🧳',label:'出差 / 旅行 / 环境变化',knowledge:[['book-ch-14','不规律生活的弹性结构'],['book-ch-29','恢复与休息']]},
 recovery:{icon:'🌿',label:'恢复 / 降负荷阶段',knowledge:[['book-ch-29','恢复不是奖励'],['book-ch-35','降低认知负荷']]},
 habit:{icon:'🌱',label:'培养习惯 / 建立节奏',knowledge:[['book-ch-25','动力与持续'],['book-ch-23','降低启动摩擦']]},
 create:{icon:'🎨',label:'创作 / 兴趣 / 自主项目',knowledge:[['book-ch-25','自主项目的长期动力'],['book-ch-23','如何更容易开始']]},
 admin:{icon:'🧹',label:'生活事务 / 清理积压',knowledge:[['book-ch-13','事情太多时如何减负'],['book-ch-20','计划与现实']]},
 balance:{icon:'⚖️',label:'工作、家庭与自己重新平衡',knowledge:[['book-ch-15','生活角色与边界'],['book-ch-29','恢复与长期节奏']]},
 custom:{icon:'✨',label:'其他阶段',knowledge:[['book-ch-20','弹性计划'],['book-ch-23','启动与拖延']]}
};
const AVAIL={tiny:'每天通常不到30分钟',short:'每天约30–60分钟',medium:'每天约1–2小时',long:'每天通常2小时以上',unknown:'时间很难预估'};
const VOL={stable:'相对稳定',variable:'每天会变化',interrupted:'经常被打断 / 临时有事'};
const STYLE={gentle:'温和：先保住生活与恢复',balanced:'平衡：推进与留白并重',sprint:'冲刺：短期提高投入，但保留停止规则'};
const VARIANT={low:'低精力版',normal:'正常版',high:'状态好再加一点'};

function profile(){return Object.assign({guide:'options',contexts:[],envs:[],note:'',onboarded:false},jr(PROFILE_KEY,{}))}
function core(){return Object.assign({entries:[]},jr(CORE_KEY,{}))}
function route(){return jr(ROUTE_KEY,null)}
function feedback(){return Array.isArray(jr(FEEDBACK_KEY,[]))?jr(FEEDBACK_KEY,[]):[]}
function saveRoute(r){ss(ROUTE_KEY,JSON.stringify(r));renderAll()}
function recentEntries(n=10){return (core().entries||[]).slice().sort((a,b)=>String(a.date).localeCompare(String(b.date))).slice(-n)}
function avg(arr,k){const xs=arr.map(x=>+x[k]).filter(Number.isFinite).filter(x=>x>0);return xs.length?xs.reduce((a,b)=>a+b,0)/xs.length:null}
function mode(arr,k){const c={};arr.forEach(x=>{const v=x[k];if(v)c[v]=(c[v]||0)+1});return Object.entries(c).sort((a,b)=>b[1]-a[1])[0]?.[0]||''}
function findTodayContext(){
 const direct=['my_os_v15_context','my_os_context_v15','my_os_today_context_v15','my_os_situation_v15'];
 for(const k of direct){const x=jr(k,null);if(x&&typeof x==='object'&&(x.date===iso()||!x.date))return x}
 try{
   for(let i=0;i<localStorage.length;i++){
     const k=localStorage.key(i)||'';if(!/context|situation/i.test(k))continue;
     const x=jr(k,null);if(!x||typeof x!=='object')continue;
     if(x.date&&x.date!==iso())continue;
     if('environment'in x||'env'in x||'autonomy'in x||'interruptions'in x||'interruption'in x)return x;
   }
 }catch(e){}
 return {};
}
function evidenceSummary(){
 const e=recentEntries(10), ctx=findTodayContext(), p=profile();
 const energy=avg(e,'energy'), stress=avg(e,'stress'), focus=avg(e,'focus'), align=avg(e,'alignment');
 const best=mode(e,'bestPeriod')||mode(e,'best_period')||'';
 const ratios=e.map(x=>{const a=+x.actualMinutes||0,b=+x.plannedMinutes||0;return a>0&&b>0?a/b:null}).filter(Boolean);
 const ratio=ratios.length?ratios.reduce((a,b)=>a+b,0)/ratios.length:null;
 const items=[];
 if(e.length)items.push(`最近 ${e.length} 条记录`);
 if(energy)items.push(`平均精力 ${energy.toFixed(1)}/5`);
 if(stress)items.push(`平均压力 ${stress.toFixed(1)}/5`);
 if(focus)items.push(`平均专注 ${focus.toFixed(1)}/5`);
 if(best)items.push(`较常记录的顺畅时段：${best}`);
 if(ratio&&ratios.length>=3)items.push(`实际/计划时间约 ${ratio.toFixed(2)}×`);
 const interruption=ctx.interruptions??ctx.interruption??ctx.disruption;
 const autonomy=ctx.autonomy??ctx.control;
 if(interruption)items.push(`今天打断程度：${interruption}`);
 if(autonomy)items.push(`今天时间自主度：${autonomy}`);
 if(!items.length&&p.contexts.length)items.push(`当前生活背景：${p.contexts.slice(0,3).join('、')}`);
 return {entries:e,energy,stress,focus,align,best,ratio,ctx,items};
}
function inferStage(){
 const p=profile(), c=p.contexts||[];
 if(c.includes('study'))return 'study';
 if(c.includes('care')||c.includes('family'))return 'care';
 if(c.includes('travel')||c.includes('shift')||c.includes('irregular'))return 'travel';
 if(c.includes('health')||c.includes('retired'))return 'recovery';
 if(c.includes('create')||c.includes('freelance'))return 'create';
 if(c.includes('work'))return 'work';
 return 'custom';
}
function defaultAvailability(){const es=evidenceSummary();if(es.ratio&&es.ratio>1.35)return 'short';return 'unknown'}
function defaultVolatility(){const p=profile();if(p.contexts.includes('care')||p.contexts.includes('irregular')||p.contexts.includes('shift')||p.contexts.includes('travel'))return 'interrupted';return 'variable'}

function stageActions(stage,outcome){
 const O=outcome||'当前最重要的事情';
 const map={
  work:{low:[`把“${O}”缩成一个 15–25 分钟可完成的下一步`,`只处理真正会阻塞后续的一件事`,`结束前留一句“下次从哪里继续”`],normal:[`给“${O}”安排 1 个主要推进块`,`把消息、沟通或杂务合并处理一次`,`收尾时记录结果与下一步，不追求清空所有事项`],high:[`先完成正常版，再增加 1 个额外推进块`,`把今天形成的结论、文档或交付物整理成可复用成果`,`状态开始下降就停止，不把“状态好”变成透支`]},
  study:{low:[`只打开“${O}”相关材料，做 10–20 分钟主动回忆或例题`,`只要求“开始一次”，不要求学完整章`,`结束时写下下次第一道题/第一小节`],normal:[`完成 1 个 30–50 分钟学习块`,`至少一次闭卷回忆、练习或自测，而不是只阅读`,`标记最不确定的一个知识点作为下一次入口`],high:[`正常版之后再加 1 个独立学习块`,`第二块优先练习/输出，不重复被动阅读`,`保留休息，不用一次把所有欠缺补完`]},
  care:{low:[`给自己保留一个 5–15 分钟可中断的小窗口`,`“${O}”只做不会因中断而全部作废的一步`,`任何被打断的任务都先留下一句恢复点`],normal:[`准备 10 / 30 / 60 分钟三个版本的“${O}”`,`时间出现时按窗口大小直接选，不等完美空档`,`把恢复、家庭与个人事项都算进正式计划`],high:[`如果出现稳定空档，再做一次较长推进`,`额外时间优先用于重要但平时被挤压的个人事项`,`不把偶然空档当成以后每天都能做到的基准`]},
  travel:{low:[`今天只保住“${O}”的最小版本和必要事项`,`把复杂任务换成整理、确认、准备、阅读等便携动作`,`优先恢复睡眠、饮食与基本节奏`],normal:[`把“${O}”绑定到一个确定事件之后，而不是固定钟点`,`只安排 1 个需要完整注意力的核心块`,`准备一个网络差、地点变化时也能做的离线版本`],high:[`稳定环境出现时再追加一个深度块`,`额外精力优先清理跨地点切换产生的杂务`,`不要用一次高投入抵消连续几天的恢复需求`]},
  recovery:{low:[`删掉今天所有非必要要求，只保留基本照护和真正必须事项`,`“${O}”如果不是必须，可以明确暂停`,`安排一种真正能降低负荷的恢复活动`],normal:[`只保留 1 个轻量推进动作`,`把睡眠、饮食、活动、关系或安静时间作为正式计划的一部分`,`晚上观察恢复后精力有没有回升`],high:[`即使状态不错，也只恢复到中等负荷`,`可以做 1 个有意义的任务，但不补偿前几天“没做够”`,`把“状态变好”视为恢复有效的证据，而不是加码许可`]},
  habit:{low:[`把“${O}”缩到 2–5 分钟也能完成的最小动作`,`只要求出现一次，不追求完整剂量`,`把启动线索放到最容易发生的位置`],normal:[`完成一次标准剂量，并记录启动是否顺`,`固定触发条件，而不是一定固定钟点`,`结束后让下一次入口保持可见`],high:[`可以增加剂量，但不改变明天的最低标准`,`用额外状态做一次学习或复盘，不强行连胜`,`确认“更长”是否真的比“更稳定”更有价值`]},
  create:{low:[`打开“${O}”并留下 10–20 分钟粗糙版本`,`允许不完整、不好看，只要求产生素材`,`结束前保留一个明显的下一步入口`],normal:[`完成 1 个 40–60 分钟无打断创作块`,`先创作后评判，避免边做边过度修正`,`收尾时留下 Resume Point`],high:[`正常版后追加第二块，但第二块换成整理/编辑/验证`,`把灵感转成可复用草稿或素材库`,`状态下降就停，避免把兴趣变成透支`]},
  admin:{low:[`只处理最紧急的一件生活事务`,`把“${O}”拆成一个能在 10–20 分钟关闭的小事项`,`完成后停止扩散到其他杂事`],normal:[`把同类事务集中处理 30–45 分钟`,`先处理有截止期/会阻塞别人的事项`,`设置停止条件：时间到或清掉前三项就结束`],high:[`正常版结束后再处理一组积压`,`趁状态好建立模板、清单或自动化，减少以后重复劳动`,`不要把所有空白时间都变成清理时间`]},
  balance:{low:[`今天只保住一个工作/学习重点和一个生活重点`,`“${O}”选择最小可接受结果`,`至少留一个不以生产力为目的的恢复/关系窗口`],normal:[`把今天分成“必须 / 想推进 / 想保留的生活”三类`,`每类最多一个重点，不追求全部覆盖`,`结束时看哪一类总被挤掉，而不是只看完成量`],high:[`状态好时只给最重要的一类追加投入`,`额外时间优先补长期被忽视的生活领域`,`不要用高状态日重新建立过高的长期基线`]},
  custom:{low:[`把“${O}”缩成 10–20 分钟可完成的一步`,`只保留真正必须的结果`,`结束前写下下一步`],normal:[`推进“${O}”一个清楚的阶段`,`同时保留恢复或生活缓冲`,`收尾记录现实和偏差`],high:[`正常版后再加一个可选推进块`,`额外时间用于巩固成果或学习`,`不改变明天的最低标准`]}
 };
 return map[stage]||map.custom;
}
function routePhases(horizon,stage){
 const h=+horizon||7;
 if(h<=1)return [['现在','确定最小可接受结果'],['推进','只做一个主要块'],['收尾','记录现实，给明天留入口']];
 if(h<=3)return [['第1阶段','先跑一个最小版本，不追求完美'],['第2阶段','根据现实增加或缩小投入'],['最后阶段','收尾、复盘，决定继续还是结束']];
 if(h<=7)return [['开局','前1–2天先校准真实可用时间'],['推进','中段只守住1个主要方向'],['留白','主动保留至少一个缓冲窗口'],['收尾','最后1–2天完成交付/总结，不临时无限加码']];
 if(h<=14)return [['试运行','前3天观察什么节奏真的可行'],['稳定推进','中段重复有效结构，不频繁换方法'],['调整','出现连续高压/低精力就自动降一级'],['总结','比较计划与现实，决定下一阶段方法']];
 return [['观察','先用3–5天建立现实基线'],['建立节奏','只稳定1–2个关键结构'],['中段复盘','检查生活代价、恢复与真实进展'],['第二轮','保留有效方法，删掉高摩擦做法'],['收尾','总结什么值得带到下一个月']];
}
function guardrails(stage,vol,style,ev){
 const g=[];
 if(vol==='interrupted')g.push('不绑定死时间：用“出现一个可控窗口时”作为触发；所有长任务都准备短版本。');
 else if(vol==='variable')g.push('只固定顺序和触发条件，不要求每天同一时间发生。');
 else g.push('即使时间稳定，也保留至少一个空白窗口，防止计划把现实挤满。');
 if(ev.energy&&ev.energy<2.8)g.push('最近精力偏低：默认从低精力版开始，状态好再升级，而不是反过来。');
 if(ev.stress&&ev.stress>3.7)g.push('最近压力偏高：减少并行事项和切换次数，不用“更忙”证明路线有效。');
 if(ev.ratio&&ev.ratio>1.3)g.push(`最近实际时间常高于计划（约 ${ev.ratio.toFixed(2)}×）：重要事项主动留出额外缓冲。`);
 if(style==='sprint')g.push('冲刺必须有结束点：到路线周期结束时重新判断，不自动延长高负荷。');
 if(stage==='recovery')g.push('恢复期不设置“补回损失”的任务；状态变好后也只逐级恢复负荷。');
 if(stage==='care')g.push('家庭/照护不是“异常打断”：路线本身必须允许随时中断和恢复。');
 return g;
}
function defaultVariantFromHistory(ev){
 const fs=feedback().slice(-5);
 const tooMuch=fs.filter(x=>x.fit==='too_much').length, tooLittle=fs.filter(x=>x.fit==='too_little').length;
 if(tooMuch>=2)return 'low'; if(tooLittle>=2&&ev.energy&&ev.energy>=3.5)return 'high';
 if(ev.energy&&ev.energy<2.7)return 'low'; if(ev.stress&&ev.stress>3.7)return 'low'; return 'normal';
}
function buildRoute(input){
 const stage=input.stage||'custom', ev=evidenceSummary(), actions=stageActions(stage,input.outcome), def=defaultVariantFromHistory(ev), knowledge=STAGES[stage]?.knowledge||STAGES.custom.knowledge;
 return {
  id:'route_'+Date.now(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),status:'active',
  stage,horizon:+input.horizon||7,outcome:input.outcome||'把这段时间过得更清楚一点',obligations:input.obligations||'',availability:input.availability||'unknown',volatility:input.volatility||'variable',style:input.style||'balanced',
  defaultVariant:def,selectedToday:def,
  versions:{low:actions.low,normal:actions.normal,high:actions.high},
  phases:routePhases(input.horizon,stage),guardrails:guardrails(stage,input.volatility,input.style,ev),
  evidence:ev.items,knowledge,
  rationale:[`这是一条 ${input.horizon||7} 天左右的弹性路线，不是固定日程。`,`${AVAIL[input.availability]||AVAIL.unknown}；生活节奏：${VOL[input.volatility]||VOL.variable}。`,`默认从“${VARIANT[def]}”开始，之后根据每天真实状态升级或降级。`]
 };
}

function installUI(){
 const small=q('.brand small'), rt=q('#runtimeBadge span');if(small)small.textContent='V18 · Adaptive Life · 弹性路线';if(rt)rt.textContent='V18 · My OS';
 const dash=q('#page-dashboard'); if(dash&&!q('#v18RouteCard')){
   const anchor=q('#v14GuideEngine')||q('#v13HowCard')||dash.querySelector('.page-head');
   const box=document.createElement('section');box.id='v18RouteCard';box.className='panel pad v18-route-card';
   anchor?.insertAdjacentElement('afterend',box);
 }
 const manual=q('#page-manual');if(manual&&!q('#v18PlannerHome')){
   const h=manual.querySelector('.page-head');const box=document.createElement('section');box.id='v18PlannerHome';box.className='panel pad v18-planner-home';h?.insertAdjacentElement('afterend',box);
 }
 if(!q('#v18RouteModal'))document.body.insertAdjacentHTML('beforeend',`<div class="modal-bg" id="v18RouteModal"><div class="modal universal-modal v18-modal"><div class="modal-head"><div><div class="kicker">FLEXIBLE ROUTE · 不是固定时间表</div><h2>为这段生活做一条弹性路线</h2><p class="muted">只需要说明“这段时间面对什么、想得到什么、现实有多不稳定”。系统会给低精力 / 正常 / 高状态三个版本。</p></div><button class="icon-btn" data-v18-close>×</button></div><div class="v18-form"><label><b>1 · 这段时间主要面对什么？</b><select id="v18Stage">${Object.entries(STAGES).map(([k,v])=>`<option value="${k}">${v.icon} ${v.label}</option>`).join('')}</select></label><label><b>2 · 最希望得到什么结果？</b><textarea id="v18Outcome" placeholder="例如：一周后能完成考试第一轮复习；出差期间保住工作交付和睡眠；这两周少一点透支，同时推进一个项目……"></textarea></label><div class="v18-grid"><label><b>观察周期</b><select id="v18Horizon"><option value="1">今天</option><option value="3">3天</option><option value="7" selected>7天</option><option value="14">2周</option><option value="30">1个月</option></select></label><label><b>通常可用时间</b><select id="v18Availability"><option value="tiny">不到30分钟/天</option><option value="short">30–60分钟/天</option><option value="medium">1–2小时/天</option><option value="long">2小时以上/天</option><option value="unknown" selected>很难预估</option></select></label><label><b>现实稳定程度</b><select id="v18Volatility"><option value="stable">相对稳定</option><option value="variable" selected>每天会变化</option><option value="interrupted">经常被打断/临时有事</option></select></label><label><b>路线风格</b><select id="v18Style"><option value="gentle">温和</option><option value="balanced" selected>平衡</option><option value="sprint">短期冲刺</option></select></label></div><label><b>固定责任 / 不能忽略的现实（可选）</b><textarea id="v18Obligations" placeholder="例如：每天接送孩子；周三出差；这周有3场会议；睡眠必须优先恢复……"></textarea></label><div class="v18-evidence-preview" id="v18EvidencePreview"></div><button class="btn primary full" id="v18Generate">生成我的弹性路线</button></div></div></div>`);
 q('[data-v18-close]')?.addEventListener('click',()=>q('#v18RouteModal')?.classList.remove('show'));
 q('#v18RouteModal')?.addEventListener('click',e=>{if(e.target.id==='v18RouteModal')e.currentTarget.classList.remove('show')});
 q('#v18Generate')?.addEventListener('click',()=>{
   const input={stage:q('#v18Stage').value,outcome:q('#v18Outcome').value.trim(),horizon:q('#v18Horizon').value,availability:q('#v18Availability').value,volatility:q('#v18Volatility').value,style:q('#v18Style').value,obligations:q('#v18Obligations').value.trim()};
   if(!input.outcome){toast2('先写一句这段时间最希望得到什么结果');q('#v18Outcome').focus();return}
   saveRoute(buildRoute(input));q('#v18RouteModal').classList.remove('show');toast2('已生成弹性路线，可以每天按状态选择版本');
 });
 document.addEventListener('click',handleClick);
 renderAll();
}
function openPlanner(prefill=false){
 const r=route(), p=profile();q('#v18Stage').value=prefill&&r?.stage?r.stage:inferStage();q('#v18Horizon').value=String(prefill&&r?.horizon?r.horizon:7);q('#v18Availability').value=prefill&&r?.availability?r.availability:defaultAvailability();q('#v18Volatility').value=prefill&&r?.volatility?r.volatility:defaultVolatility();q('#v18Style').value=prefill&&r?.style?r.style:'balanced';q('#v18Outcome').value=prefill&&r?.outcome?r.outcome:'';q('#v18Obligations').value=prefill&&r?.obligations?r.obligations:'';
 const ev=evidenceSummary();q('#v18EvidencePreview').innerHTML=`<b>系统会参考这些已有证据</b><div>${ev.items.length?ev.items.map(x=>`<span>${esc(x)}</span>`).join(''):'目前历史还不多，因此路线会更保守，后续再根据真实使用调整。'}</div>`;
 q('#v18RouteModal')?.classList.add('show');
}
function variantHTML(r,key){return `<div class="v18-variant ${r.selectedToday===key?'selected':''}" data-v18-variant="${key}"><div class="v18-variant-head"><b>${VARIANT[key]}</b>${r.defaultVariant===key?'<span>默认建议</span>':''}</div><ol>${(r.versions?.[key]||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ol><button class="btn ${r.selectedToday===key?'primary':'ghost'}" data-v18-choose="${key}">${r.selectedToday===key?'今天按这个版本走 ✓':'今天用这个版本'}</button></div>`}
function renderRouteCard(){
 const box=q('#v18RouteCard');if(!box)return;const r=route();
 if(!r||r.status!=='active'){
   box.innerHTML=`<div class="v18-empty"><div><div class="kicker">THIS PHASE · 生活不是每天都一样</div><h2>最近正处在一个特殊阶段吗？</h2><p>考试、工作冲刺、带孩子、出差、恢复、培养习惯……可以为这段时间生成一条<strong>弹性路线</strong>，不需要把每天排满。</p></div><button class="btn primary" data-v18-open>做一条路线</button></div>`;return;
 }
 const s=STAGES[r.stage]||STAGES.custom, key=r.selectedToday||r.defaultVariant||'normal', actions=r.versions?.[key]||[];
 box.innerHTML=`<div class="v18-active-head"><div><div class="kicker">CURRENT ROUTE · ${s.icon} ${esc(s.label)}</div><h2>${esc(r.outcome)}</h2><p>${r.horizon}天路线 · ${esc(AVAIL[r.availability]||'')} · ${esc(VOL[r.volatility]||'')}</p></div><div class="v18-route-actions"><button class="btn ghost" data-v18-open-edit>调整路线</button><button class="btn ghost" data-v18-complete>结束这段路线</button></div></div><div class="v18-today-version"><div><b>今天建议：${VARIANT[key]}</b><small>每天都可以换版本，不算偏离计划。</small></div><div class="v18-version-switch">${['low','normal','high'].map(k=>`<button class="${key===k?'active':''}" data-v18-choose="${k}">${VARIANT[k]}</button>`).join('')}</div></div><div class="v18-today-actions">${actions.map((x,i)=>`<div><span>${i+1}</span><p>${esc(x)}</p>${i===0?`<button class="mini-btn" data-v18-use-anchor="${esc(x)}">放进今天</button>`:''}</div>`).join('')}</div><div class="v18-route-footer"><button class="btn primary" data-v18-feedback>今天这个版本合适吗？</button><button class="btn ghost" data-v18-details>查看完整路线</button></div>`;
}
function renderPlannerHome(){
 const box=q('#v18PlannerHome');if(!box)return;const r=route();
 if(!r){box.innerHTML=`<div class="section-title"><div><div class="kicker">LIFE ROUTE</div><h2>生活路线规划</h2><p>规划“这一阶段怎样走”，而不是规定“每天几点做什么”。</p></div><button class="btn primary" data-v18-open>新建路线</button></div><div class="v18-principles"><span>低精力也能继续</span><span>现实打断时能降级</span><span>知识与个人证据一起用</span><span>停止或改路线不算失败</span></div>`;return}
 const s=STAGES[r.stage]||STAGES.custom;
 box.innerHTML=`<div class="section-title"><div><div class="kicker">LIFE ROUTE · ${r.status==='active'?'进行中':'已结束'}</div><h2>${s.icon} ${esc(r.outcome)}</h2><p>${r.horizon}天 · ${esc(STYLE[r.style]||'')} · 创建于 ${new Date(r.createdAt).toLocaleDateString()}</p></div><button class="btn ghost" data-v18-open-edit>重新规划</button></div><div class="v18-variants">${['low','normal','high'].map(k=>variantHTML(r,k)).join('')}</div><div class="v18-route-section"><h3>这段路线怎么推进</h3><div class="v18-phases">${(r.phases||[]).map((x,i)=>`<div><span>${i+1}</span><b>${esc(x[0])}</b><p>${esc(x[1])}</p></div>`).join('')}</div></div><div class="v18-route-section"><h3>现实变化时的护栏</h3><ul>${(r.guardrails||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><details class="v18-why"><summary>为什么生成这条路线？</summary><ul>${(r.rationale||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${(r.evidence||[]).length?`<div class="v18-evidence"><b>参考的个人证据</b>${r.evidence.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:'<p>目前个人数据较少，因此这里主要采用保守的通用原则，后续会用真实反馈调整。</p>'}</details><div class="v18-route-section"><h3>这段阶段值得学的知识</h3><div class="v18-knowledge">${(r.knowledge||[]).map(x=>`<button data-v18-learn="${x[0]}"><b>${esc(x[1])}</b><small>打开知识学习</small></button>`).join('')}</div></div><div class="v18-feedback-summary">${feedbackSummary(r)}</div>`;
}
function feedbackSummary(r){const fs=feedback().filter(x=>x.routeId===r.id);if(!fs.length)return '<b>路线还在等待真实反馈</b><p>不用额外打卡。某天觉得“太满 / 正好 / 太轻”时点一次就够了。</p>';const fit=fs.filter(x=>x.fit==='fit').length, much=fs.filter(x=>x.fit==='too_much').length, little=fs.filter(x=>x.fit==='too_little').length;return `<b>已收到 ${fs.length} 次路线反馈</b><p>正好 ${fit} · 太满 ${much} · 太轻 ${little}。这些反馈会影响下一次路线的默认版本。</p>`}
function showDetails(){go2('manual');setTimeout(()=>q('#v18PlannerHome')?.scrollIntoView({behavior:'smooth',block:'start'}),120)}
function openFeedback(){const r=route();if(!r)return;let m=q('#v18FeedbackModal');if(!m){document.body.insertAdjacentHTML('beforeend',`<div class="modal-bg" id="v18FeedbackModal"><div class="modal universal-modal v18-feedback-modal"><div class="modal-head"><div><div class="kicker">10 秒反馈</div><h2>今天这个路线版本合适吗？</h2></div><button class="icon-btn" data-v18-feedback-close>×</button></div><div class="v18-feedback-choices"><button data-v18-fit="too_much">😣 太满了<small>今天更适合再轻一点</small></button><button data-v18-fit="fit">🙂 正好<small>这个负荷比较适合</small></button><button data-v18-fit="too_little">⚡ 太轻了<small>今天其实还能多一点</small></button><button data-v18-fit="unclear">🤷 不好判断<small>今天情况特殊</small></button></div><textarea id="v18FeedbackNote" placeholder="可选：今天发生了什么？"></textarea></div></div>`);m=q('#v18FeedbackModal');q('[data-v18-feedback-close]')?.addEventListener('click',()=>m?.classList.remove('show'));m?.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show')});}
 qa('[data-v18-fit]').forEach(b=>{b.onclick=()=>{const fs=feedback();fs.push({routeId:r.id,date:iso(),variant:r.selectedToday||r.defaultVariant,fit:b.dataset.v18Fit,note:q('#v18FeedbackNote')?.value.trim()||'',createdAt:new Date().toISOString()});ss(FEEDBACK_KEY,JSON.stringify(fs));m?.classList.remove('show');toast2('已记录。下次路线会参考这次真实感受');renderAll();}});m?.classList.add('show')}
function chooseVariant(k){const r=route();if(!r)return;r.selectedToday=k;r.lastChoiceDate=iso();r.updatedAt=new Date().toISOString();saveRoute(r);ss(TODAY_CHOICE_KEY,JSON.stringify({date:iso(),routeId:r.id,variant:k}));toast2(`今天切到“${VARIANT[k]}”`)}
function useAnchor(text){go2('today');setTimeout(()=>{const a=q('#anchor');if(a){a.value=text;a.dispatchEvent(new Event('input',{bubbles:true}));a.focus();toast2('已放进今天，可以按需要再改短一些')}} ,120)}
function handleClick(e){const b=e.target.closest('[data-v18-open],[data-v18-open-edit],[data-v18-choose],[data-v18-details],[data-v18-feedback],[data-v18-complete],[data-v18-use-anchor],[data-v18-learn]');if(!b)return;
 if(b.hasAttribute('data-v18-open'))openPlanner(false);
 else if(b.hasAttribute('data-v18-open-edit'))openPlanner(true);
 else if(b.dataset.v18Choose)chooseVariant(b.dataset.v18Choose);
 else if(b.hasAttribute('data-v18-details'))showDetails();
 else if(b.hasAttribute('data-v18-feedback'))openFeedback();
 else if(b.hasAttribute('data-v18-complete')){const r=route();if(r){r.status='completed';r.completedAt=new Date().toISOString();saveRoute(r);toast2('这段路线已结束。结束不是失败，只表示阶段变了。')}}
 else if(b.dataset.v18UseAnchor)useAnchor(b.dataset.v18UseAnchor);
 else if(b.dataset.v18Learn){go2('book');setTimeout(()=>window.__eaoOpenReader?.(b.dataset.v18Learn),120)}
}
function restoreTodayChoice(){const x=jr(TODAY_CHOICE_KEY,null),r=route();if(!r)return;const today=iso();if(x&&x.date===today&&x.routeId===r.id&&x.variant){if(r.selectedToday!==x.variant||r.lastChoiceDate!==today){r.selectedToday=x.variant;r.lastChoiceDate=today;ss(ROUTE_KEY,JSON.stringify(r))}}else if(r.lastChoiceDate!==today){r.selectedToday=r.defaultVariant||'normal';r.lastChoiceDate=today;ss(ROUTE_KEY,JSON.stringify(r))}}
function addGuideNote(){const card=q('#v13HowCard .v13-flow');if(card&&!q('#v18HowStep')){const d=document.createElement('div');d.className='step';d.id='v18HowStep';d.innerHTML='<b>特殊阶段 · 用生活路线</b><small>考试、出差、带孩子、冲刺或恢复时，不必硬套平常节奏。做一条低/中/高三个版本的弹性路线。</small>';card.appendChild(d)}}
function renderAll(){restoreTodayChoice();renderRouteCard();renderPlannerHome()}

installUI();addGuideNote();
window.__MY_OS_V18_ROUTE__={get:route,open:openPlanner,render:renderAll};
setInterval(()=>{if(q('#v18RouteCard')||q('#v18PlannerHome'))renderAll()},15000);
})();
