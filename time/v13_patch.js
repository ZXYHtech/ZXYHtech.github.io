/* My OS V13 · First-use guide + Contextual Learning + Pomodoro alerts */
(function(){
'use strict';
if(window.__MY_OS_V13__)return;window.__MY_OS_V13__=true;
const GUIDE_KEY='my_os_v13_guide_seen';
const ALERT_KEY='my_os_pomo_alert_v13';
const PROFILE_KEY='my_os_profile_v12';
const POMO_KEY='eao_pomodoro_v11';
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
const readJSON=(k,d)=>{try{return Object.assign({},d,JSON.parse(storageGet(k)||'{}'))}catch(e){return Object.assign({},d)}};
const readProfile=()=>readJSON(PROFILE_KEY,{guide:'options',contexts:[],envs:[],note:'',need:'',onboarded:false});
let prefs=readJSON(ALERT_KEY,{sound:true,vibration:true,notification:false});
const savePrefs=()=>storageSet(ALERT_KEY,JSON.stringify(prefs));

/* ---------- Brand & navigation ---------- */
const small=q('.brand small'),rt=q('#runtimeBadge span');if(small)small.textContent='V13 · Adaptive Life · 引导更清楚';if(rt)rt.textContent='V13 · My OS';
if(typeof titles==='object')titles.book='知识学习';
qa('[data-page="book"]').forEach(b=>{b.classList.add('book-nav-promote');const i=b.querySelector('i');b.innerHTML=(i?i.outerHTML:'<i>▦</i>')+'知识学习'});

/* ---------- Persistent how-to card ---------- */
const dash=q('#page-dashboard'),dh=dash?.querySelector('.page-head');
if(dash&&dh&&!q('#v13HowCard')){
 const card=document.createElement('div');card.id='v13HowCard';card.className='v13-how-card';
 card.innerHTML=`<div class="how-head"><div><div class="kicker">第一次使用先看这里</div><h2>My OS 怎么用？其实每天只需要 3 步</h2><p class="muted">你不需要把所有栏目都填完，也不需要每天做计划。只在需要时用对应工具。</p></div><button class="btn ghost" id="reopenV13Guide">重新看完整引导</button></div><div class="v13-flow"><div class="step"><b>1 · 先说现在需要什么</b><small>乱、累、想推进、想计划、想轻松都可以。系统先从当前状态开始。</small></div><div class="step"><b>2 · 需要做事时再计划/专注</b><small>只选今天最值得的一件事；需要保护注意力时再开“专注一会儿”。</small></div><div class="step"><b>3 · 做完后留一点证据</b><small>记录实际投入、感受和结果，保存今天。不是为了打卡，是为了让系统慢慢理解你。</small></div><div class="step"><b>知识学习 · 解释为什么</b><small>想理解拖延、计划、恢复、习惯、家庭与工作冲突等问题时，进入知识学习。系统会按你的处境推荐路线。</small></div></div>`;
 dh.insertAdjacentElement('afterend',card);
}

/* ---------- First-use explanation inside onboarding ---------- */
function installFirstGuide(){
 const modal=q('#onboardingModal .universal-modal');if(!modal||q('#v13FirstGuide'))return;
 const steps=qa('#onboardingModal .u-step'),save=q('#saveProfileBtn');
 const intro=document.createElement('div');intro.id='v13FirstGuide';intro.className='v13-first-guide';
 intro.innerHTML=`<h3>先弄清楚这套系统怎么用</h3><p><b>My OS 不是一张固定时间表。</b>它先帮你处理今天，再根据你真实的生活、执行结果和学习需求逐渐调整方法。</p><div class="first-steps"><div class="first-step"><span class="n">1</span><div><b>首页：告诉它“我现在需要什么”</b><br><small>不用先分类、建目标或学术语。</small></div></div><div class="first-step"><span class="n">2</span><div><b>计划与专注：只在需要推进事情时用</b><br><small>选一件最值得的事，必要时用计时器；不需要每天开番茄钟。</small></div></div><div class="first-step"><span class="n">3</span><div><b>保存今天：让系统获得真实证据</b><br><small>计划和实际不一样很正常，偏差本身就是以后调整方法的依据。</small></div></div><div class="first-step"><span class="n">4</span><div><b>知识学习：这是核心栏目，不是附属说明书</b><br><small>基础知识所有人都能学；专题路线会根据你的身份、责任、作息和环境变化。</small></div></div></div><div class="onboarding-why">最重要的一条：<b>你不需要适应系统，系统要逐渐适应你。</b></div><button class="btn primary v13-understood" id="v13UnderstandBtn">我明白怎么用了，继续设置我的方式</button>`;
 const head=modal.querySelector('.modal-head');head?.insertAdjacentElement('afterend',intro);
 const seen=storageGet(GUIDE_KEY)==='1';
 if(!seen){steps.forEach(x=>x.classList.add('v13-config-hidden'));save?.classList.add('v13-config-hidden')}
 q('#v13UnderstandBtn')?.addEventListener('click',()=>{storageSet(GUIDE_KEY,'1');steps.forEach(x=>x.classList.remove('v13-config-hidden'));save?.classList.remove('v13-config-hidden');intro.querySelector('#v13UnderstandBtn')?.remove();intro.insertAdjacentHTML('beforeend','<p class="learning-note"><b>接下来只是在告诉系统你更喜欢哪种帮助方式。</b>这些设置以后随时能改。</p>');modal.scrollTo({top:intro.offsetHeight-20,behavior:'smooth'})});
}
installFirstGuide();
q('#reopenV13Guide')?.addEventListener('click',()=>{storageSet(GUIDE_KEY,'0');const m=q('#onboardingModal');if(m){qa('#onboardingModal .u-step').forEach(x=>x.classList.add('v13-config-hidden'));q('#saveProfileBtn')?.classList.add('v13-config-hidden');m.classList.add('show');m.querySelector('.modal')?.scrollTo({top:0,behavior:'smooth'})}});

/* ---------- Today guidance ---------- */
const td=q('#page-today'),th=td?.querySelector('.page-head');
if(td&&th&&!q('#todayFlowGuide')){const g=document.createElement('div');g.id='todayFlowGuide';g.className='today-flow-guide';g.innerHTML='<div class="flow-title"><b>今天怎么用</b><span class="muted" id="todayFlowHint"></span></div><div class="flow-steps"><div class="flow-step" data-flow="choose"><b>① 选一件最值得的事</b><small>没必要列满清单</small></div><div class="flow-step" data-flow="focus"><b>② 需要时专注一会儿</b><small>计时器是工具，不是考核</small></div><div class="flow-step" data-flow="save"><b>③ 回顾并保存今天</b><small>留下实际结果与感受</small></div></div>';th.insertAdjacentElement('afterend',g)}
function readPomo(){try{return JSON.parse(storageGet(POMO_KEY)||'null')||{completed:0,running:false}}catch(e){return{completed:0,running:false}}}
function renderTodayFlow(){const box=q('#todayFlowGuide');if(!box)return;const anchor=q('#anchor')?.value.trim()||'',actual=+(q('#actualMinutes')?.value||0),review=q('#review')?.value.trim()||'',p=readPomo();let active='choose',hint='先选今天最值得的一件事。';if(anchor){active='focus';hint=p.running?'正在专注，先把这一轮做完。':p.completed>0||actual>0?'已经有执行证据，可以回顾并保存。':'需要推进时，开一段专注即可。'}if(anchor&&(p.completed>0||actual>0||review)){active='save';hint='补一两句回顾，然后在填写区底部保存今天。'}qa('#todayFlowGuide [data-flow]').forEach(el=>{const order={choose:0,focus:1,save:2},n=order[el.dataset.flow],a=order[active];el.classList.toggle('active',el.dataset.flow===active);el.classList.toggle('done',n<a)});const h=q('#todayFlowHint');if(h)h.textContent=hint}
['anchor','actualMinutes','review'].forEach(id=>q('#'+id)?.addEventListener('input',renderTodayFlow));renderTodayFlow();setInterval(renderTodayFlow,2500);

/* ---------- Pomodoro audible/vibration alert ---------- */
let audioCtx=null;
function unlockAudio(){try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;audioCtx=audioCtx||new AC();if(audioCtx.state==='suspended')audioCtx.resume()}catch(e){}}
function ring(){if(!prefs.sound)return;try{unlockAudio();if(!audioCtx)return;const t=audioCtx.currentTime;[[0,880],[.22,660],[.44,880],[.72,1040]].forEach(([d,f])=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t+d);g.gain.exponentialRampToValueAtTime(.18,t+d+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d+.18);o.connect(g).connect(audioCtx.destination);o.start(t+d);o.stop(t+d+.2)})}catch(e){}}
function vibrate(){if(!prefs.vibration)return;try{navigator.vibrate?.([300,120,300,120,500])}catch(e){}}
function visualAlarm(phase){let p=q('#pomoAlarmPop');if(!p){p=document.createElement('div');p.id='pomoAlarmPop';p.className='pomo-alarm-pop';p.innerHTML='<h3 id="pomoAlarmTitle"></h3><p id="pomoAlarmText"></p><button class="btn primary" id="dismissPomoAlarm">知道了</button>';document.body.appendChild(p);q('#dismissPomoAlarm')?.addEventListener('click',()=>p.classList.remove('show'))}q('#pomoAlarmTitle').textContent=phase==='work'?'🍅 专注时间到':'🌿 休息时间到';q('#pomoAlarmText').textContent=phase==='work'?'先停一下。可以休息，也可以根据当前状态决定是否继续下一轮。':'休息结束了。下一轮不是必须，按需要再开始。';p.classList.add('show');setTimeout(()=>p.classList.remove('show'),12000)}
function notifyEnd(phase){ring();vibrate();visualAlarm(phase);try{if(prefs.notification&&Notification.permission==='granted')new Notification(phase==='work'?'专注时间到':'休息时间到',{body:phase==='work'?'My OS：这一轮已经完成，先停一下。':'My OS：休息结束，按需要决定是否开始下一轮。'})}catch(e){}}
const panel=q('#pomodoroPanel');if(panel&&!q('#pomoAlertSettings')){const s=document.createElement('div');s.id='pomoAlertSettings';s.className='pomo-alert-settings';s.innerHTML=`<label class="pomo-alert-toggle"><input type="checkbox" id="pomoSound" ${prefs.sound?'checked':''}> 🔊 到时响铃</label><label class="pomo-alert-toggle"><input type="checkbox" id="pomoVibrate" ${prefs.vibration?'checked':''}> 📳 到时震动</label><label class="pomo-alert-toggle"><input type="checkbox" id="pomoNotify" ${prefs.notification?'checked':''}> 🔔 系统通知</label><button class="pomo-test-btn" id="pomoTestAlert">测试提醒</button>`;(q('#pomoClearToday')?.closest('.pomo-foot')||panel).appendChild(s)}
q('#pomoSound')?.addEventListener('change',e=>{prefs.sound=e.target.checked;savePrefs();unlockAudio()});q('#pomoVibrate')?.addEventListener('change',e=>{prefs.vibration=e.target.checked;savePrefs()});q('#pomoNotify')?.addEventListener('change',async e=>{if(e.target.checked&&'Notification'in window&&Notification.permission!=='granted'){try{const r=await Notification.requestPermission();prefs.notification=r==='granted';e.target.checked=prefs.notification}catch(_){prefs.notification=false;e.target.checked=false}}else prefs.notification=e.target.checked;savePrefs()});q('#pomoTestAlert')?.addEventListener('click',()=>{unlockAudio();ring();vibrate();visualAlarm('work')});q('#pomoStartPause')?.addEventListener('click',unlockAudio,{capture:true});
let lastP=readPomo(),trackedEnd=lastP.endAt||null,lastPhase=lastP.phase||'work';
setInterval(()=>{const cur=readPomo();if(cur.running&&cur.endAt){trackedEnd=cur.endAt;lastPhase=cur.phase||'work'}if(lastP.running&&!cur.running&&trackedEnd&&Date.now()>=trackedEnd-700){notifyEnd(lastPhase);trackedEnd=null}lastP=cur},400);

/* ---------- Knowledge learning as a core area ---------- */
const book=q('#page-book'),bh=book?.querySelector('.page-head');
if(book&&bh){const k=bh.querySelector('.kicker'),h=bh.querySelector('h1'),p=bh.querySelector('p');if(k)k.textContent='KNOWLEDGE · 理解自己，也学习方法';if(h)h.textContent='知识学习';if(p)p.textContent='这是 My OS 的核心栏目。基础知识面向所有人；专题路线会根据你的生活角色、责任、作息和环境动态调整。你既可以按问题学，也可以系统学习完整知识库。'}
const CORE=[['book-ch-23','启动与拖延','为什么知道要做却迟迟开始不了'],['book-ch-20','计划与现实','为什么计划经常被打断，以及怎样留出弹性'],['book-ch-29','恢复与休息','真正的恢复和“什么都没做”有什么区别'],['book-ch-25','动力与持续','为什么三分钟热度，以及怎样减少纯意志力依赖']];
const MAP={work:[['book-ch-20','工作中的中断与切换','适合会议多、消息多或同时处理多件事']],study:[['book-ch-23','学习启动','适合“知道该学但迟迟开始”'],['book-ch-25','长期学习动力','适合考试、课程或长期技能学习']],care:[['book-ch-15','照护责任与自己的时间','适合时间经常不完全属于自己'],['book-ch-20','高打断环境','适合随时可能被叫走的生活']],family:[['book-ch-15','家庭、关系与个人空间','不是把家庭当干扰，而是一起进入生活设计']],freelance:[['book-ch-23','没有外部截止期时如何启动','适合自由职业、创作者和自主项目'],['book-ch-14','不固定节奏下的结构','不要求复制朝九晚五']],create:[['book-ch-25','兴趣怎样走得更久','降低只靠热情维持的波动']],health:[['book-ch-29','恢复优先时怎样安排生活','适合主动把恢复放在主要位置']],retired:[['book-ch-29','慢生活中的恢复与充实','不把生产力当唯一评价'],['book-ch-25','兴趣与长期投入','让学习和兴趣保持可持续']],travel:[['book-ch-14','出差与变化环境','在地点频繁变化时保持轻量结构']],shift:[['book-ch-14','倒班与不规律作息','围绕可用精力而不是固定钟点安排'],['book-ch-29','恢复窗口','把恢复作为计划的一部分']],irregular:[['book-ch-14','不规律生活的自适应计划','用条件和窗口代替死时间表']],social:[['book-ch-20','高社交与中断恢复','减少频繁切换后的重新进入成本']]};
function openChapter(id){if(window.__eaoOpenReader)window.__eaoOpenReader(id);else{go('book');setTimeout(()=>q(`[data-chapter-id="${id}"]`)?.scrollIntoView({behavior:'smooth'}),100)}}
function renderLearningHub(){if(!book)return;let hub=q('#audienceLearningHub');if(!hub){hub=document.createElement('div');hub.id='audienceLearningHub';hub.className='learning-hub panel pad';const pg=q('#problemGuide');(pg||bh).insertAdjacentElement('afterend',hub)}const pr=readProfile(),routes=[];pr.contexts.forEach(c=>(MAP[c]||[]).forEach(x=>{if(!routes.some(r=>r[0]===x[0]&&r[1]===x[1]))routes.push([x[0],x[1],x[2],c])}));hub.innerHTML=`<span class="knowledge-core-badge">📚 核心知识栏目</span><h2>先建立共同基础，再按你的处境深入</h2><p class="learning-note">不会因为“你是什么人”就只给你一种答案。下面的专题只是基于你主动选择的生活处境提高相关性，完整知识库始终保留。</p><div class="learning-core">${CORE.map(x=>`<button class="learning-card" data-v13-ch="${x[0]}"><b>${x[1]}</b><small>${x[2]}</small></button>`).join('')}</div><div class="learning-personal"><div class="kicker">更适合你当前处境的学习路线</div>${routes.length?`<div class="route-list">${routes.slice(0,6).map(x=>`<button class="route-card" data-v13-ch="${x[0]}"><em>因为你选择了：${({work:'上班',study:'上学/考试',care:'带孩子/照护',family:'伴侣/家庭',freelance:'自由职业/生意',create:'兴趣/创作',health:'健康/恢复',retired:'退休/慢生活',travel:'经常出差',shift:'倒班/夜班',irregular:'作息不固定',social:'社交很多'})[x[3]]||'当前处境'}</em><b>${x[1]}</b><small>${x[2]}</small></button>`).join('')}</div>`:'<p class="learning-note">你还没有设置生活处境。可以先学上面的基础知识，也可以到“我的 → 我的情况与偏好”补充后获得专题推荐。</p>'}</div><p class="learning-note" style="margin-top:12px"><b>完整知识库仍然在下面。</b>想系统学习时，可以按章节继续阅读，不会因为个性化推荐而隐藏其他知识。</p>`;qa('[data-v13-ch]').forEach(b=>b.addEventListener('click',()=>openChapter(b.dataset.v13Ch)))}
renderLearningHub();q('#saveProfileBtn')?.addEventListener('click',()=>setTimeout(renderLearningHub,80));

/* reinforce onboarding visibility for this release */
setTimeout(()=>{installFirstGuide();if(storageGet(GUIDE_KEY)!=='1'){const m=q('#onboardingModal');if(m){m.classList.add('show');m.querySelector('.modal')?.scrollTo({top:0})}}},320);
})();
