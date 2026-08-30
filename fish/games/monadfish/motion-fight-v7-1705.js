(() => {
  'use strict';
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sensorCapable=typeof DeviceOrientationEvent!=='undefined'||typeof DeviceMotionEvent!=='undefined';
  let enabled=false,seen=false,zeroSide=null,zeroPitch=null,side=0,pitch=0,pose=0,poseVel=0,pitchPose=0;
  let fighting=false,prevFight=false,pull=0,permissionAttempted=false;

  const screenAngle=()=>Number(screen.orientation?.angle??window.orientation??0)||0;
  function sideFrom(beta,gamma){const a=((screenAngle()%360)+360)%360;if(a===90)return Number(beta||0);if(a===270)return-Number(beta||0);return Number(gamma||0);}
  function onOrientation(e){
    const s=sideFrom(e.beta,e.gamma),p=Number(e.beta||0);if(!Number.isFinite(s))return;
    if(zeroSide===null)zeroSide=s;if(zeroPitch===null)zeroPitch=p;
    side=clamp((s-zeroSide)/14,-1,1);pitch=clamp((p-zeroPitch)/18,-1,1);seen=true;
  }
  function onMotion(e){
    if(seen)return;const g=e.accelerationIncludingGravity;if(!g)return;let raw=Number(g.x||0),a=((screenAngle()%360)+360)%360;
    if(a===90||a===270)raw=Number(g.y||0)*(a===90?1:-1);side=clamp(raw/3.7,-1,1);
  }
  function install(){if(enabled)return;zeroSide=zeroPitch=null;window.addEventListener('deviceorientation',onOrientation,true);window.addEventListener('devicemotion',onMotion,true);enabled=true;window.__MONADFISH_MOTION_ACTIVE__=true;}
  async function ask(ctor){if(!ctor||typeof ctor.requestPermission!=='function')return true;try{return await ctor.requestPermission()==='granted';}catch{return false;}}
  async function enableFromGesture(){if(enabled||permissionAttempted||!sensorCapable)return;permissionAttempted=true;const a=await ask(window.DeviceOrientationEvent),b=await ask(window.DeviceMotionEvent);if(a||b)install();}
  function autoEnable(){if(!sensorCapable)return;const gesture=typeof window.DeviceOrientationEvent?.requestPermission==='function'||typeof window.DeviceMotionEvent?.requestPermission==='function';if(!gesture)return install();const once=()=>{void enableFromGesture();document.removeEventListener('pointerdown',once,true);document.removeEventListener('touchend',once,true);};document.addEventListener('pointerdown',once,true);document.addEventListener('touchend',once,true);}
  autoEnable();
  window.addEventListener('orientationchange',()=>{zeroSide=zeroPitch=null;});screen.orientation?.addEventListener?.('change',()=>{zeroSide=zeroPitch=null;});

  function animatePose(){
    const target=clamp(side*(fighting?1:.34)+pull,-1.25,1.25);
    poseVel+=(target-pose)*(fighting?.19:.09);poseVel*=fighting?.70:.82;pose=clamp(pose+poseVel,-1.25,1.25);
    pitchPose+=(pitch-pitchPose)*(fighting?.12:.06);
    requestAnimationFrame(animatePose);
  }
  if(!reduceMotion)requestAnimationFrame(animatePose);

  const proto=window.CanvasRenderingContext2D?.prototype;
  if(proto&&!proto.__monadfishMotionV7){
    const native=proto.drawImage;Object.defineProperty(proto,'__monadfishMotionV7',{value:true});
    proto.drawImage=function(image,...args){
      const src=String(image?.currentSrc||image?.src||'');
      const boat=/pepe_boat|pepe.*boat|character.*boat/i.test(src),rod=/rod_(basic|bamboo|carbon|pro|legendary)/i.test(src);
      if(reduceMotion||(!boat&&!rod))return native.call(this,image,...args);
      let dx=0,dy=0,dw=Number(image?.naturalWidth||image?.width||1),dh=Number(image?.naturalHeight||image?.height||1);
      if(args.length===4){[dx,dy,dw,dh]=args.map(Number);}else if(args.length===8){dx=Number(args[4]);dy=Number(args[5]);dw=Number(args[6]);dh=Number(args[7]);}else if(args.length===2){dx=Number(args[0]);dy=Number(args[1]);}
      if(![dx,dy,dw,dh].every(Number.isFinite))return native.call(this,image,...args);
      if(boat&&dw>80&&dh>60){
        const p=clamp(pose,-1,1),ang=p*(fighting?.16:.075),sx=p*(fighting?11:4),sy=-Math.abs(p)*(fighting?3.5:1.2)+pitchPose*(fighting?3:1),cx=dx+dw*.53,cy=dy+dh*.74;
        this.save();this.translate(sx,sy);this.translate(cx,cy);this.rotate(ang);this.translate(-cx,-cy);native.call(this,image,...args);this.restore();return;
      }
      if(rod&&fighting&&dw>20&&dh>20){
        const p=clamp(pose,-1,1),cx=dx+dw*.30,cy=dy+dh*.82;
        this.save();this.translate(cx,cy);this.rotate(p*.22-pitchPose*.06);this.translate(-cx,-cy);native.call(this,image,...args);this.restore();return;
      }
      return native.call(this,image,...args);
    };
  }

  const hud=document.createElement('div');hud.id='zxyh-fight-hud-v7';hud.style.cssText='position:fixed;left:50%;top:max(54px,calc(env(safe-area-inset-top) + 48px));transform:translateX(-50%) translateY(-8px);z-index:999998;width:min(320px,calc(100vw - 28px));padding:9px 12px;border:1px solid #7dd3fc55;border-radius:15px;background:#04101de8;color:#e6fbff;font:800 12px system-ui;backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:.16s';hud.innerHTML='<div style="display:flex;justify-content:space-between"><span>鱼已上钩</span><span id="zxyh-v7-dir">对抗中</span></div><div style="margin-top:5px;color:#a7f3d0;font-size:10px" id="zxyh-v7-sensor">人物随手机摆动</div>';document.body.appendChild(hud);
  const dirEl=hud.querySelector('#zxyh-v7-dir'),sensorEl=hud.querySelector('#zxyh-v7-sensor');
  let t0=0;
  function fightFrame(now){if(!fighting)return;const t=(now-t0)/1000,d=Math.sin(t*4.5)+Math.sin(t*2.1)*.4;pull=clamp(d*.15,-.22,.22);dirEl.textContent=d>=0?'鱼向右冲 →':'← 鱼向左冲';sensorEl.textContent=enabled?(seen?'人物/鱼竿体感联动 ✓':'体感准备中'):(sensorCapable?'首次操作自动授权':'触控模式');requestAnimationFrame(fightFrame);}
  function start(){fighting=true;t0=performance.now();hud.style.opacity='1';hud.style.transform='translateX(-50%) translateY(0)';requestAnimationFrame(fightFrame);}
  function stop(){fighting=false;pull=0;hud.style.opacity='0';hud.style.transform='translateX(-50%) translateY(-8px)';}
  setInterval(()=>{const a=window.__MONADFISH_HOOK_FIGHT__===true;if(a&&!prevFight)start();if(!a&&prevFight)stop();prevFight=a;},40);
  window.__MONADFISH_MOTION_FIGHT_V7__=true;
})();