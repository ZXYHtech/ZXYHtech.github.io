(() => {
  'use strict';

  const PROFILES=[
    {id:'steady',label:'持续发力',speed:1.15,base:39,amp:18,shake:1.2,dart:0},
    {id:'burst',label:'短促冲刺',speed:2.35,base:49,amp:25,shake:2.2,dart:1},
    {id:'serpentine',label:'蛇形摆动',speed:1.85,base:44,amp:22,shake:1.8,dart:0},
    {id:'heavy',label:'沉底重拉',speed:.82,base:64,amp:17,shake:2.8,dart:0},
    {id:'sprint',label:'高速横冲',speed:3.1,base:56,amp:31,shake:3.6,dart:1}
  ];
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sensorCapable=typeof window.DeviceOrientationEvent!=='undefined'||typeof window.DeviceMotionEvent!=='undefined';
  let fighting=false,profile=null,startedAt=0,raf=0,previous=false;
  let motionEnabled=false,motionSeen=false,zeroLateral=null,lateral=0,touchForce=0,pointerDown=false;
  let visualTilt=0,visualVelocity=0,fightPullVisual=0,lastBuzz=0,permissionAttempted=false;

  function screenAngle(){return Number(screen.orientation?.angle??window.orientation??0)||0;}
  function readLateral(beta,gamma){const a=((screenAngle()%360)+360)%360;if(a===90)return Number(beta||0);if(a===270)return-Number(beta||0);return Number(gamma||0);}
  function onOrientation(e){const raw=readLateral(e.beta,e.gamma);if(!Number.isFinite(raw))return;if(zeroLateral===null)zeroLateral=raw;lateral=clamp((raw-zeroLateral)/18,-1,1);motionSeen=true;}
  function onMotion(e){if(motionSeen)return;const g=e.accelerationIncludingGravity;if(!g)return;let raw=Number(g.x||0),a=((screenAngle()%360)+360)%360;if(a===90||a===270)raw=Number(g.y||0)*(a===90?1:-1);lateral=clamp(raw/4.2,-1,1);}
  function installSensorListeners(){if(motionEnabled)return;zeroLateral=null;motionSeen=false;window.addEventListener('deviceorientation',onOrientation,true);window.addEventListener('devicemotion',onMotion,true);motionEnabled=true;window.__MONADFISH_MOTION_ACTIVE__=true;}
  async function requestPermissionFor(ctor){if(!ctor||typeof ctor.requestPermission!=='function')return true;try{return await ctor.requestPermission()==='granted';}catch{return false;}}
  async function enableFromGesture(){if(motionEnabled||permissionAttempted||!sensorCapable)return;permissionAttempted=true;const a=await requestPermissionFor(window.DeviceOrientationEvent),b=await requestPermissionFor(window.DeviceMotionEvent);if(a||b)installSensorListeners();}
  function autoEnable(){if(!sensorCapable)return;const needsGesture=typeof window.DeviceOrientationEvent?.requestPermission==='function'||typeof window.DeviceMotionEvent?.requestPermission==='function';if(!needsGesture){installSensorListeners();return;}const firstGesture=()=>{void enableFromGesture();document.removeEventListener('pointerdown',firstGesture,true);document.removeEventListener('touchend',firstGesture,true);};document.addEventListener('pointerdown',firstGesture,true);document.addEventListener('touchend',firstGesture,true);}
  autoEnable();
  window.addEventListener('orientationchange',()=>{zeroLateral=null;});screen.orientation?.addEventListener?.('change',()=>{zeroLateral=null;});

  function updateVisualPose(){const input=motionEnabled?lateral:(fighting?touchForce:0),scale=fighting?1:.28,target=clamp(input*scale+fightPullVisual,-1.15,1.15);visualVelocity+=(target-visualTilt)*(fighting?.16:.08);visualVelocity*=fighting?.72:.80;visualTilt=clamp(visualTilt+visualVelocity,-1.18,1.18);requestAnimationFrame(updateVisualPose);}
  if(!reduceMotion)requestAnimationFrame(updateVisualPose);

  const ctxProto=window.CanvasRenderingContext2D?.prototype;
  if(ctxProto&&!ctxProto.__zxyhBoatMotionPatchedV6){
    const nativeDrawImage=ctxProto.drawImage;Object.defineProperty(ctxProto,'__zxyhBoatMotionPatchedV6',{value:true,configurable:true});
    ctxProto.drawImage=function(image,...args){
      const src=String(image?.currentSrc||image?.src||''),boat=/pepe_boat|pepe.*boat|character.*boat/i.test(src);
      if(!boat||reduceMotion||Math.abs(visualTilt)<.008)return nativeDrawImage.call(this,image,...args);
      let dx=0,dy=0,dw=Number(image?.naturalWidth||image?.width||1),dh=Number(image?.naturalHeight||image?.height||1);
      if(args.length===4){[dx,dy,dw,dh]=args.map(Number);}else if(args.length===8){dx=Number(args[4]);dy=Number(args[5]);dw=Number(args[6]);dh=Number(args[7]);}else if(args.length===2){dx=Number(args[0]);dy=Number(args[1]);}
      if(![dx,dy,dw,dh].every(Number.isFinite)||dh<60||dw<80)return nativeDrawImage.call(this,image,...args);
      const pose=clamp(visualTilt,-1,1),angle=pose*(fighting?.125:.07),shiftX=pose*(fighting?8:3.5),lift=Math.abs(pose)*(fighting?2.8:1.1),cx=dx+dw*.53,cy=dy+dh*.73;
      this.save();this.translate(shiftX,-lift);this.translate(cx,cy);this.rotate(angle);this.translate(-cx,-cy);nativeDrawImage.call(this,image,...args);this.restore();
    };
  }

  const style=document.createElement('style');style.textContent=`#zxyh-fight-hud-v6{position:fixed;left:50%;top:max(54px,calc(env(safe-area-inset-top) + 48px));transform:translateX(-50%) translateY(-8px);z-index:999998;width:min(324px,calc(100vw - 28px));padding:10px 12px 9px;border:1px solid rgba(125,211,252,.34);border-radius:16px;background:linear-gradient(180deg,rgba(4,15,29,.9),rgba(2,8,18,.8));box-shadow:0 12px 36px rgba(0,0,0,.38),inset 0 0 0 1px rgba(255,255,255,.04);backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:opacity .16s ease,transform .16s ease;font-family:"Noto Sans SC","Microsoft YaHei","PingFang SC",system-ui,sans-serif;color:#e6fbff}#zxyh-fight-hud-v6.on{opacity:1;transform:translateX(-50%) translateY(0)}.zxyh-v6-row{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12px;font-weight:800}.zxyh-v6-name{color:#a5f3fc}.zxyh-v6-dir{font-size:14px;color:#fff}.zxyh-v6-track{height:9px;margin-top:7px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.09)}.zxyh-v6-fill{height:100%;width:40%;border-radius:inherit;background:linear-gradient(90deg,#22d3ee 0%,#facc15 62%,#fb7185 100%);transition:width .06s linear}.zxyh-v6-sub{display:flex;justify-content:space-between;gap:8px;margin-top:5px;color:#9fc2d3;font-size:10px;font-weight:700}.zxyh-v6-control{color:#d9f99d}.zxyh-v6-control.bad{color:#fecaca}.zxyh-v6-sensor{color:#86efac}body.zxyh-fight-v6:after{content:"";position:fixed;inset:0;z-index:999990;pointer-events:none;box-shadow:inset 0 0 34px rgba(34,211,238,.08);animation:zxyh-v6-vignette .7s ease-in-out infinite alternate}@keyframes zxyh-v6-vignette{to{box-shadow:inset 0 0 54px rgba(251,191,36,.11)}}`;document.head.appendChild(style);

  const hud=document.createElement('div');hud.id='zxyh-fight-hud-v6';hud.setAttribute('aria-live','polite');hud.innerHTML='<div class="zxyh-v6-row"><span class="zxyh-v6-name">鱼已上钩</span><span class="zxyh-v6-dir">拉向右 →</span></div><div class="zxyh-v6-track"><div class="zxyh-v6-fill"></div></div><div class="zxyh-v6-sub"><span class="zxyh-v6-control">← 向左回杆</span><span class="zxyh-v6-pct">40% 张力</span><span class="zxyh-v6-sensor">体感联动人物</span></div>';document.body.appendChild(hud);
  const nameEl=hud.querySelector('.zxyh-v6-name'),dirEl=hud.querySelector('.zxyh-v6-dir'),fillEl=hud.querySelector('.zxyh-v6-fill'),controlEl=hud.querySelector('.zxyh-v6-control'),pctEl=hud.querySelector('.zxyh-v6-pct'),sensorEl=hud.querySelector('.zxyh-v6-sensor');
  window.addEventListener('pointerdown',e=>{if(!fighting)return;pointerDown=true;touchForce=clamp((e.clientX/innerWidth-.5)*2,-1,1);},{passive:true});window.addEventListener('pointermove',e=>{if(!fighting||!pointerDown)return;touchForce=clamp((e.clientX/innerWidth-.5)*2,-1,1);},{passive:true});const releasePointer=()=>{pointerDown=false;touchForce*=.35;};window.addEventListener('pointerup',releasePointer,{passive:true});window.addEventListener('pointercancel',releasePointer,{passive:true});

  function pickProfile(){const r=Math.random();return r<.30?PROFILES[0]:r<.53?PROFILES[1]:r<.72?PROFILES[2]:r<.90?PROFILES[3]:PROFILES[4];}
  function rawTension(t){let wave=Math.sin(t*profile.speed*4.2)*profile.amp;if(profile.id==='serpentine')wave+=Math.sin(t*8.3)*7;if(profile.dart){const phase=t*profile.speed%1;if(phase>.76)wave+=24*Math.sin((phase-.76)/.24*Math.PI);}if(profile.id==='heavy')wave+=Math.sin(t*1.7)*7;return clamp(profile.base+wave,16,96);}
  function frame(now){
    if(!fighting||!profile)return;
    const t=(now-startedAt)/1000,dir=Math.sin(t*profile.speed*(profile.id==='serpentine'?5.7:3.8)),fishRight=dir>=0,input=motionEnabled?lateral:touchForce,counter=clamp(-dir*input,-1,1),good=Math.max(0,counter),bad=Math.max(0,-counter),tension=clamp(rawTension(t)-good*22+bad*15,12,99),urgent=tension>80;
    fightPullVisual=clamp(dir*(.10+tension/520),-.26,.26);fillEl.style.width=tension.toFixed(0)+'%';pctEl.textContent=tension.toFixed(0)+'% 张力';dirEl.textContent=fishRight?'拉向右 →':'← 拉向左';nameEl.textContent='鱼已上钩 · '+profile.label;controlEl.textContent=fishRight?'← 向左回杆':'向右回杆 →';controlEl.classList.toggle('bad',bad>.22);sensorEl.textContent=motionEnabled?(motionSeen?'人物随手机摆动 ✓':'体感准备中'):(sensorCapable?'首次操作自动授权':'触控联动人物');
    if(urgent&&Date.now()-lastBuzz>600){lastBuzz=Date.now();try{navigator.vibrate?.(45);}catch{}}
    const canvas=document.querySelector('canvas');if(canvas&&!reduceMotion){const tug=dir*profile.shake*(.10+tension/360)-input*.18,lift=Math.sin(t*profile.speed*6.1)*Math.min(.55,profile.shake*.10);canvas.style.transformOrigin='22% 28%';canvas.style.transform=`translate3d(${tug.toFixed(2)}px,${lift.toFixed(2)}px,0)`;}
    raf=requestAnimationFrame(frame);
  }
  function startFight(){fighting=true;profile=pickProfile();startedAt=performance.now();touchForce=0;fightPullVisual=0;window.__MONADFISH_FIGHT_PROFILE__=profile.id;document.body.classList.add('zxyh-fight-v6');hud.classList.add('on');cancelAnimationFrame(raf);raf=requestAnimationFrame(frame);}
  function stopFight(){fighting=false;pointerDown=false;touchForce=0;fightPullVisual=0;cancelAnimationFrame(raf);document.body.classList.remove('zxyh-fight-v6');const canvas=document.querySelector('canvas');if(canvas)canvas.style.transform='';setTimeout(()=>hud.classList.remove('on'),160);}
  setInterval(()=>{const active=window.__MONADFISH_HOOK_FIGHT__===true;if(active&&!previous)startFight();if(!active&&previous)stopFight();previous=active;},40);
  window.__MONADFISH_MOTION_FIGHT_V6__=true;
})();