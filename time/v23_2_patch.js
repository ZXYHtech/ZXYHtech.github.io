/* My OS V23.2 · Pages-compatible background timer keepalive */
(function(){
'use strict';
if(window.__MY_OS_V23_2__) return;
window.__MY_OS_V23_2__=true;

const KEY='my_os_background_timer_v23_2';
const POMO_KEYS=['eao_pomodoro_v11','eao_pomodoro_v1'];
const q=s=>document.querySelector(s);
const sg=k=>{try{return typeof storageGet==='function'?storageGet(k):localStorage.getItem(k)}catch(e){return null}};
const ss=(k,v)=>{try{if(typeof storageSet==='function')storageSet(k,v);else localStorage.setItem(k,v)}catch(e){}};
const isAndroid=/Android/i.test(navigator.userAgent||'');
const supportsMedia='mediaSession' in navigator && typeof Audio!=='undefined';
let prefs={enabled:isAndroid, tested:false};
try{prefs=Object.assign(prefs,JSON.parse(sg(KEY)||'{}'))}catch(e){}
const savePrefs=()=>ss(KEY,JSON.stringify(prefs));

let keeper=null, keeperUrl='', keeperMode='', trackedEnd=null, trackedPhase='work', lastPomo=null, stopTimer=null;
let testTimer=null, testEnd=0;

function readPomo(){
 const d={running:false,phase:'work',remaining:0,endAt:null,workMin:25,breakMin:5,task:''},found=[];
 for(const k of POMO_KEYS){try{const x=JSON.parse(sg(k)||'null');if(x&&typeof x==='object')found.push(Object.assign({},d,x))}catch(e){}}
 if(!found.length)return d;
 return found.find(x=>x.running)||found.find(x=>x.endAt)||found[0];
}
function secs(p=readPomo()){return p.running&&p.endAt?Math.max(0,Math.ceil((p.endAt-Date.now())/1000)):Math.max(0,+p.remaining||0)}
function fmt(s){s=Math.max(0,Math.round(s||0));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`}
function toast2(s){try{if(typeof toast==='function')toast(s);else console.log('[My OS]',s)}catch(e){}}

function makeKeepaliveWav(){
 const rate=8000,dur=1,samples=rate*dur,bytes=44+samples*2,b=new ArrayBuffer(bytes),v=new DataView(b);
 const w=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};
 w(0,'RIFF');v.setUint32(4,36+samples*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,samples*2,true);
 // ±1 LSB: effectively inaudible, but not a mathematically empty stream.
 for(let i=0;i<samples;i++)v.setInt16(44+i*2,(i%160<80?1:-1),true);
 return URL.createObjectURL(new Blob([b],{type:'audio/wav'}));
}
function makeBeepWav(){
 const rate=12000,dur=2.2,samples=Math.floor(rate*dur),bytes=44+samples*2,b=new ArrayBuffer(bytes),v=new DataView(b);
 const w=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};
 w(0,'RIFF');v.setUint32(4,36+samples*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,samples*2,true);
 for(let i=0;i<samples;i++){
   const t=i/rate,slot=Math.floor(t/.42),inside=(t%0.42)<.23,amp=inside&&slot<5?0.22:0,f=[880,660,880,1040,880][Math.min(slot,4)],env=inside*Math.min(1,(t%0.42)/.025)*Math.min(1,(.23-(t%0.42))/.04);
   v.setInt16(44+i*2,Math.max(-32767,Math.min(32767,Math.round(Math.sin(2*Math.PI*f*t)*amp*env*32767))),true);
 }
 return URL.createObjectURL(new Blob([b],{type:'audio/wav'}));
}

function ensureKeeper(){
 if(keeper)return keeper;
 keeperUrl=makeKeepaliveWav();
 keeper=new Audio(keeperUrl);keeper.loop=true;keeper.preload='auto';keeper.playsInline=true;keeper.volume=1;
 return keeper;
}
function updateMedia(p,mode=keeperMode){
 if(!supportsMedia||!navigator.mediaSession)return;
 let title='My OS · 后台提醒',artist='';
 if(mode==='test'){title='My OS · 锁屏提醒测试';artist=`还剩 ${fmt(Math.max(0,(testEnd-Date.now())/1000))}`}
 else if(p){title=p.phase==='break'?'My OS · 休息中':'My OS · 专注中';artist=`还剩 ${fmt(secs(p))}${p.task?' · '+String(p.task).slice(0,26):''}`}
 try{navigator.mediaSession.metadata=new MediaMetadata({title,artist,album:'My OS'});navigator.mediaSession.playbackState='playing'}catch(e){}
}
async function startKeeper(mode='pomo'){
 if(!prefs.enabled||!supportsMedia)return false;
 clearTimeout(stopTimer);stopTimer=null;keeperMode=mode;
 const a=ensureKeeper();
 try{await a.play();updateMedia(readPomo(),mode);renderStatus();return true}catch(e){console.warn('[V23.2 keepalive]',e);renderStatus('blocked');return false}
}
function stopKeeper(delay=0){
 clearTimeout(stopTimer);
 if(delay>0){stopTimer=setTimeout(()=>stopKeeper(0),delay);return}
 try{keeper?.pause();if(keeper)keeper.currentTime=0}catch(e){}
 keeperMode='';trackedEnd=null;
 try{if(navigator.mediaSession){navigator.mediaSession.playbackState='none';navigator.mediaSession.metadata=null}}catch(e){}
 renderStatus();
}
function playTestAlarm(){
 try{const u=makeBeepWav(),a=new Audio(u);a.volume=1;a.play().catch(()=>{});a.addEventListener('ended',()=>URL.revokeObjectURL(u),{once:true})}catch(e){}
 try{navigator.vibrate?.([300,120,300,120,500])}catch(e){}
}
function soundAllowed(){try{const p=JSON.parse(sg('my_os_pomo_alert_v13')||'null');return !p||p.sound!==false}catch(e){return true}}
function backgroundEscalation(){if(document.visibilityState==='hidden'&&soundAllowed())setTimeout(()=>{if(document.visibilityState==='hidden')playTestAlarm()},1300)}

function installMediaActions(){
 if(!supportsMedia)return;
 try{
   navigator.mediaSession.setActionHandler('pause',()=>{const p=readPomo();if(p.running)q('#pomoStartPause')?.click();else stopKeeper()});
   navigator.mediaSession.setActionHandler('play',()=>{const p=readPomo();if(!p.running&&keeperMode==='pomo')q('#pomoStartPause')?.click()});
   navigator.mediaSession.setActionHandler('stop',()=>{const p=readPomo();if(p.running)q('#pomoStartPause')?.click();stopKeeper()});
 }catch(e){}
}

function renderStatus(force=''){
 const s=q('#v232BgStatus');if(!s)return;
 const p=readPomo();
 if(!isAndroid){s.innerHTML='<b>当前：普通网页提醒</b><small>后台保活主要针对 Android；其他平台仍使用网页声音/通知。</small>';return}
 if(!supportsMedia){s.innerHTML='<b>当前浏览器不支持媒体后台模式</b><small>仍保留原有网页提醒；真正可靠的后台推送需要服务器。</small>';return}
 if(force==='blocked'){s.innerHTML='<b>后台保活没有启动</b><small>浏览器阻止了媒体播放。请再点一次“开始专注”或运行 30 秒测试。</small>';return}
 if(keeper&&!keeper.paused){s.innerHTML=`<b>后台保活正在运行${keeperMode==='test'?' · 测试中':''}</b><small>${keeperMode==='test'?'现在可锁屏等待提醒。':'锁屏/切到其他 App 后，My OS 会尽量保持计时活动；结束后自动停止媒体会话。'}</small>`;return}
 if(p.running&&prefs.enabled){s.innerHTML='<b>计时正在运行，但后台保活未恢复</b><small>网页刷新后浏览器不能自动播放媒体；点“恢复后台提醒”再锁屏。</small>';return}
 s.innerHTML=`<b>${prefs.enabled?'后台保活提醒已开启':'后台保活提醒已关闭'}</b><small>${prefs.enabled?'开始专注时会自动建立媒体会话。建议先做一次 30 秒锁屏测试。':'后台时可能被系统暂停；前台提醒仍正常。'}</small>`;
}

function installUI(){
 const panel=q('#pomodoroPanel');if(!panel||q('#v232BgReminder'))return;
 const host=q('#pomoAlertSettings')||panel.querySelector('.pomo-foot')||panel;
 const box=document.createElement('div');box.id='v232BgReminder';box.className='v232-bg-reminder';
 box.innerHTML=`<div class="v232-bg-head"><div><b>📱 后台锁屏提醒</b><small>Pages 兼容方案 · Android 媒体保活</small></div><label class="v232-switch"><input id="v232BgEnabled" type="checkbox" ${prefs.enabled?'checked':''}><span>启用</span></label></div><div id="v232BgStatus" class="v232-bg-status"></div><div class="v232-bg-actions"><button type="button" class="mini-btn" id="v232BgTest">30 秒锁屏测试</button><button type="button" class="mini-btn" id="v232BgResume">恢复后台提醒</button></div><details class="v232-bg-note"><summary>这个方案能做到什么？</summary><p>它不会创建永久闹钟。番茄运行时创建一个媒体会话，让 Android 更愿意在后台保留页面；计时结束后媒体会话自动停止，系统媒体通知随之消失。若你强制结束浏览器、系统彻底回收进程或极端省电限制，仍可能失效。</p></details>`;
 host.insertAdjacentElement('afterend',box);
 q('#v232BgEnabled')?.addEventListener('change',e=>{prefs.enabled=!!e.target.checked;savePrefs();if(!prefs.enabled)stopKeeper();renderStatus()});
 q('#v232BgResume')?.addEventListener('click',()=>{const p=readPomo();if(!p.running)return toast2('当前没有正在运行的番茄钟');startKeeper('pomo').then(ok=>ok&&toast2('后台提醒已恢复'))});
 q('#v232BgTest')?.addEventListener('click',async()=>{
   if(!supportsMedia)return toast2('当前浏览器不支持后台媒体会话');
   prefs.enabled=true;prefs.tested=true;savePrefs();const cb=q('#v232BgEnabled');if(cb)cb.checked=true;
   clearTimeout(testTimer);testEnd=Date.now()+30000;
   const ok=await startKeeper('test');if(!ok)return;
   toast2('30 秒测试已开始，现在可以锁屏或切到其他 App');
   testTimer=setTimeout(()=>{playTestAlarm();setTimeout(()=>stopKeeper(),2800);toast2('后台提醒测试完成')},30000);
 });
 renderStatus();
}

function bindTimer(){
 const start=q('#pomoStartPause'),finish=q('#pomoFinish'),reset=q('#pomoReset'),clear=q('#pomoClearToday');
 if(!start||start.dataset.v232Bound)return;
 start.dataset.v232Bound='1';
 start.addEventListener('click',()=>{
   const before=readPomo();
   if(before.running){stopKeeper();return}
   // play() must originate from the user gesture. Start immediately, then the V11 handler updates timer state.
   startKeeper('pomo');
   setTimeout(()=>{const after=readPomo();if(!after.running)stopKeeper();else{trackedEnd=after.endAt;trackedPhase=after.phase;updateMedia(after)}renderStatus()},60);
 },true);
 [finish,reset,clear].forEach(b=>b?.addEventListener('click',()=>stopKeeper(),true));
}

lastPomo=readPomo();
setInterval(()=>{
 const p=readPomo();
 if(p.running){trackedEnd=p.endAt||trackedEnd;trackedPhase=p.phase||trackedPhase;if(keeper&&!keeper.paused&&keeperMode==='pomo')updateMedia(p,'pomo')}
 if(lastPomo?.running&&!p.running&&trackedEnd&&Date.now()>=trackedEnd-1200){
   // V13 plays the normal alarm. If the page is actually hidden, add a delayed fallback beep so a throttled WebAudio callback does not leave the user with silence.
   backgroundEscalation();
   stopKeeper(4600);
 }
 if(lastPomo?.running&&!p.running&&(!trackedEnd||Date.now()<trackedEnd-1200))stopKeeper();
 lastPomo=p;renderStatus();
},1500);

const mo=new MutationObserver(()=>{installUI();bindTimer()});mo.observe(document.body,{childList:true,subtree:true});
installUI();bindTimer();installMediaActions();

const small=q('.brand small'),rt=q('#runtimeBadge span');if(small)small.textContent='V23.2 · Stable · 后台提醒';if(rt)rt.textContent='V23.2 · My OS';
})();
