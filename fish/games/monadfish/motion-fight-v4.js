(() => {
  'use strict';

  const PROFILES = [
    {id:'steady',label:'持续发力',speed:1.15,base:39,amp:18,shake:1.2,dart:0},
    {id:'burst',label:'短促冲刺',speed:2.35,base:49,amp:25,shake:2.2,dart:1},
    {id:'serpentine',label:'蛇形摆动',speed:1.85,base:44,amp:22,shake:1.8,dart:0},
    {id:'heavy',label:'沉底重拉',speed:.82,base:64,amp:17,shake:2.8,dart:0},
    {id:'sprint',label:'高速横冲',speed:3.1,base:56,amp:31,shake:3.6,dart:1}
  ];
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sensorCapable=typeof window.DeviceOrientationEvent!=='undefined'||typeof window.DeviceMotionEvent!=='undefined';
  let fighting=false, profile=null, startedAt=0, raf=0, previous=false;
  let motionEnabled=false, motionSeen=false, zeroLateral=null, lateral=0, touchForce=0, pointerDown=false;
  let lastBuzz=0;

  const style=document.createElement('style');
  style.textContent=`
  #zxyh-motion-toggle{position:fixed;left:12px;top:max(12px,env(safe-area-inset-top));z-index:2147482999;min-height:38px;padding:0 12px;border:1px solid rgba(103,232,249,.42);border-radius:999px;background:rgba(3,7,18,.78);color:#cffafe;font:800 12px/1 "Noto Sans SC","Microsoft YaHei","PingFang SC",system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.32);backdrop-filter:blur(10px)}
  #zxyh-motion-toggle[data-state="on"]{border-color:rgba(134,239,172,.58);color:#dcfce7;background:rgba(5,46,22,.76)}
  #zxyh-motion-toggle[data-state="error"]{border-color:rgba(251,191,36,.5);color:#fef3c7}
  #zxyh-fight-hud-v4{position:fixed;left:50%;top:max(58px,calc(env(safe-area-inset-top) + 52px));transform:translateX(-50%) translateY(-8px);z-index:999998;width:min(318px,calc(100vw - 28px));padding:10px 12px 9px;border:1px solid rgba(125,211,252,.34);border-radius:16px;background:linear-gradient(180deg,rgba(4,15,29,.9),rgba(2,8,18,.8));box-shadow:0 12px 36px rgba(0,0,0,.38),inset 0 0 0 1px rgba(255,255,255,.04);backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:opacity .16s ease,transform .16s ease;font-family:"Noto Sans SC","Microsoft YaHei","PingFang SC",system-ui,sans-serif;color:#e6fbff}
  #zxyh-fight-hud-v4.on{opacity:1;transform:translateX(-50%) translateY(0)}
  .zxyh-v4-row{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12px;font-weight:800}.zxyh-v4-name{color:#a5f3fc}.zxyh-v4-dir{font-size:14px;color:#fff}.zxyh-v4-track{height:9px;margin-top:7px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.09)}.zxyh-v4-fill{height:100%;width:40%;border-radius:inherit;background:linear-gradient(90deg,#22d3ee 0%,#facc15 62%,#fb7185 100%);transition:width .06s linear}.zxyh-v4-sub{display:flex;justify-content:space-between;gap:8px;margin-top:5px;color:#9fc2d3;font-size:10px;font-weight:700}.zxyh-v4-control{color:#d9f99d}.zxyh-v4-control.bad{color:#fecaca}.zxyh-v4-sensor{color:#86efac}
  body.zxyh-fight-v4:after{content:"";position:fixed;inset:0;z-index:999990;pointer-events:none;box-shadow:inset 0 0 36px rgba(34,211,238,.10);animation:zxyh-v4-vignette .7s ease-in-out infinite alternate}@keyframes zxyh-v4-vignette{to{box-shadow:inset 0 0 58px rgba(251,191,36,.13)}}
  @media(pointer:fine){#zxyh-motion-toggle{display:none}}
  `;
  document.head.appendChild(style);

  const hud=document.createElement('div');
  hud.id='zxyh-fight-hud-v4';
  hud.setAttribute('aria-live','polite');
  hud.innerHTML='<div class="zxyh-v4-row"><span class="zxyh-v4-name">鱼已上钩</span><span class="zxyh-v4-dir">拉向右 →</span></div><div class="zxyh-v4-track"><div class="zxyh-v4-fill"></div></div><div class="zxyh-v4-sub"><span class="zxyh-v4-control">向左回杆</span><span class="zxyh-v4-pct">40% 张力</span><span class="zxyh-v4-sensor">触控</span></div>';
  document.body.appendChild(hud);
  const nameEl=hud.querySelector('.zxyh-v4-name'),dirEl=hud.querySelector('.zxyh-v4-dir'),fillEl=hud.querySelector('.zxyh-v4-fill'),controlEl=hud.querySelector('.zxyh-v4-control'),pctEl=hud.querySelector('.zxyh-v4-pct'),sensorEl=hud.querySelector('.zxyh-v4-sensor');

  const toggle=document.createElement('button');
  toggle.id='zxyh-motion-toggle';
  toggle.type='button';
  toggle.textContent=sensorCapable?'📱 开启体感':'触控搏鱼';
  toggle.dataset.state='off';
  if(sensorCapable)document.body.appendChild(toggle);

  function screenAngle(){return Number(screen.orientation?.angle??window.orientation??0)||0;}
  function readLateral(beta,gamma){
    const angle=((screenAngle()%360)+360)%360;
    if(angle===90)return Number(beta||0);
    if(angle===270)return -Number(beta||0);
    return Number(gamma||0);
  }
  function onOrientation(e){
    const raw=readLateral(e.beta,e.gamma);
    if(!Number.isFinite(raw))return;
    if(zeroLateral===null)zeroLateral=raw;
    lateral=clamp((raw-zeroLateral)/24,-1,1);
    motionSeen=true;
  }
  function onMotion(e){
    if(motionSeen)return;
    const g=e.accelerationIncludingGravity;
    if(!g)return;
    let raw=Number(g.x||0);
    const angle=((screenAngle()%360)+360)%360;
    if(angle===90||angle===270)raw=Number(g.y||0)*(angle===90?1:-1);
    lateral=clamp(raw/5.5,-1,1);
  }
  async function requestPermissionFor(ctor){
    if(!ctor||typeof ctor.requestPermission!=='function')return true;
    try{return await ctor.requestPermission()==='granted';}catch{return false;}
  }
  async function enableMotion(){
    toggle.disabled=true;
    toggle.textContent='正在请求体感…';
    const orientationOk=await requestPermissionFor(window.DeviceOrientationEvent);
    const motionOk=await requestPermissionFor(window.DeviceMotionEvent);
    toggle.disabled=false;
    if(!orientationOk&&!motionOk){toggle.dataset.state='error';toggle.textContent='体感未授权';return;}
    zeroLateral=null;motionSeen=false;
    window.addEventListener('deviceorientation',onOrientation,true);
    window.addEventListener('devicemotion',onMotion,true);
    motionEnabled=true;toggle.dataset.state='on';toggle.textContent='📱 体感已开启';
    try{navigator.vibrate?.(25);}catch{}
  }
  toggle.addEventListener('click',()=>{if(!motionEnabled)void enableMotion();else{zeroLateral=null;toggle.textContent='📱 体感已校准';setTimeout(()=>{if(motionEnabled)toggle.textContent='📱 体感已开启';},900);}});

  window.addEventListener('pointerdown',e=>{if(!fighting)return;pointerDown=true;touchForce=clamp((e.clientX/innerWidth-.5)*2,-1,1);},{passive:true});
  window.addEventListener('pointermove',e=>{if(!fighting||!pointerDown)return;touchForce=clamp((e.clientX/innerWidth-.5)*2,-1,1);},{passive:true});
  const releasePointer=()=>{pointerDown=false;touchForce*=.35;};
  window.addEventListener('pointerup',releasePointer,{passive:true});window.addEventListener('pointercancel',releasePointer,{passive:true});

  function pickProfile(){const r=Math.random();return r<.30?PROFILES[0]:r<.53?PROFILES[1]:r<.72?PROFILES[2]:r<.90?PROFILES[3]:PROFILES[4];}
  function rawTension(t){let wave=Math.sin(t*profile.speed*4.2)*profile.amp;if(profile.id==='serpentine')wave+=Math.sin(t*8.3)*7;if(profile.dart){const phase=t*profile.speed%1;if(phase>.76)wave+=24*Math.sin((phase-.76)/.24*Math.PI);}if(profile.id==='heavy')wave+=Math.sin(t*1.7)*7;return clamp(profile.base+wave,16,96);}
  function frame(now){
    if(!fighting||!profile)return;
    const t=(now-startedAt)/1000;
    const dir=Math.sin(t*profile.speed*(profile.id==='serpentine'?5.7:3.8));
    const fishRight=dir>=0;
    const input=motionEnabled?lateral:touchForce;
    const counter=clamp(-dir*input,-1,1);
    const good=Math.max(0,counter),bad=Math.max(0,-counter);
    const tension=clamp(rawTension(t)-good*20+bad*13,12,99);
    const urgent=tension>80;
    fillEl.style.width=tension.toFixed(0)+'%';pctEl.textContent=tension.toFixed(0)+'% 张力';
    dirEl.textContent=fishRight?'拉向右 →':'← 拉向左';nameEl.textContent='鱼已上钩 · '+profile.label;
    controlEl.textContent=fishRight?'← 向左回杆':'向右回杆 →';controlEl.classList.toggle('bad',bad>.22);
    sensorEl.textContent=motionEnabled?(motionSeen?'体感 ✓':'等待传感器'):(pointerDown?'触控 ✓':'触控辅助');
    if(urgent&&Date.now()-lastBuzz>650){lastBuzz=Date.now();try{navigator.vibrate?.(35);}catch{}}
    const canvas=document.querySelector('canvas');
    if(canvas&&!reduceMotion){const tug=dir*profile.shake*(.34+tension/130)-input*1.1;const lift=Math.sin(t*profile.speed*6.1)*Math.min(1.6,profile.shake*.32);canvas.style.transformOrigin='50% 35%';canvas.style.transform=`translate3d(${tug.toFixed(2)}px,${lift.toFixed(2)}px,0)`;}
    raf=requestAnimationFrame(frame);
  }
  function startFight(){fighting=true;profile=pickProfile();startedAt=performance.now();touchForce=0;window.__MONADFISH_FIGHT_PROFILE__=profile.id;document.body.classList.add('zxyh-fight-v4');hud.classList.add('on');cancelAnimationFrame(raf);raf=requestAnimationFrame(frame);}
  function stopFight(){fighting=false;pointerDown=false;touchForce=0;cancelAnimationFrame(raf);document.body.classList.remove('zxyh-fight-v4');const canvas=document.querySelector('canvas');if(canvas)canvas.style.transform='';setTimeout(()=>hud.classList.remove('on'),160);}
  setInterval(()=>{const active=window.__MONADFISH_HOOK_FIGHT__===true;if(active&&!previous)startFight();if(!active&&previous)stopFight();previous=active;},40);
  window.__MONADFISH_MOTION_FIGHT_V4__=true;
})();