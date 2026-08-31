(() => {
  'use strict';
  const RELEASE='V8-1249';
  const BASE='/fish/games/monadfish/assets/v8-1249/';
  window.__MONADFISH_RELEASE__=RELEASE;

  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loadImage=(name)=>new Promise(resolve=>{
    const im=new Image(); im.decoding='async'; im.onload=()=>resolve(im); im.onerror=()=>resolve(null); im.src=BASE+name+'?r='+RELEASE;
  });
  const assets={boy:null,fish:null,legend:null};
  Promise.all([
    loadImage('angler-boy-v8-1249.webp'),
    loadImage('fish-atlas-v8-1249.webp'),loadImage('legendary-atlas-v8-1249.webp')
  ]).then(([boy,fish,legend])=>{
    Object.assign(assets,{boy,fish,legend});
    redrawSchool(); scanFishImages();
    window.__MONADFISH_V8_ASSETS_READY__=!!(boy&&fish&&legend);
  });

  const fishMap={carp:0,perch:1,tilapia:2,trout:3,bass:4,bream:5,eel:6,catfish:7,koi:8,tuna:9,pike:10,goldfish:11,mutant:13,leviathan:15};
  const findFishId=(src)=>{
    src=String(src||'').toLowerCase();
    for(const id of Object.keys(fishMap)) if(src.includes('fish_'+id)||src.includes('/'+id+'.')) return id;
    return null;
  };
  function atlasSource(index,cols=4,rows=4,im=assets.fish){
    if(!im)return null; const cw=im.naturalWidth/cols,ch=im.naturalHeight/rows;
    return {im,sx:(index%cols)*cw,sy:Math.floor(index/cols)*ch,sw:cw,sh:ch};
  }
  const cropCache=new Map();
  function fishDataUrl(index){
    if(cropCache.has(index))return cropCache.get(index); if(!assets.fish)return null;
    const c=document.createElement('canvas'); c.width=400;c.height=300;c.dataset.mfV8='1';
    const x=c.getContext('2d'),s=atlasSource(index);if(!s)return null;
    x.drawImage(s.im,s.sx,s.sy,s.sw,s.sh,0,0,c.width,c.height);
    const url=c.toDataURL('image/webp',.86);cropCache.set(index,url);return url;
  }
  function scanFishImages(root=document){
    if(!assets.fish)return;
    root.querySelectorAll?.('img').forEach(img=>{
      if(img.dataset.mfV8Fish==='1')return;
      const original=img.dataset.mfV8Original||img.currentSrc||img.src||'',id=findFishId(original);if(!id)return;
      const url=fishDataUrl(fishMap[id]);if(!url)return;
      img.dataset.mfV8Original=original;img.dataset.mfV8Fish='1';img.src=url;
    });
  }
  new MutationObserver(muts=>{for(const m of muts){for(const n of m.addedNodes||[])if(n.nodeType===1)scanFishImages(n)}}).observe(document.documentElement,{subtree:true,childList:true});

  const sensorCapable=typeof DeviceOrientationEvent!=='undefined'||typeof DeviceMotionEvent!=='undefined';
  let motionEnabled=false,motionSeen=false,zeroSide=null,zeroPitch=null,side=0,pitch=0,permissionAttempted=false;
  const screenAngle=()=>Number(screen.orientation?.angle??window.orientation??0)||0;
  function sideFrom(beta,gamma){const a=((screenAngle()%360)+360)%360;if(a===90)return Number(beta||0);if(a===270)return-Number(beta||0);return Number(gamma||0)}
  function onOrientation(e){const s=sideFrom(e.beta,e.gamma),p=Number(e.beta||0);if(!Number.isFinite(s))return;if(zeroSide===null)zeroSide=s;if(zeroPitch===null)zeroPitch=p;side=clamp((s-zeroSide)/13,-1,1);pitch=clamp((p-zeroPitch)/17,-1,1);motionSeen=true}
  function onMotion(e){if(motionSeen)return;const g=e.accelerationIncludingGravity;if(!g)return;let raw=Number(g.x||0),a=((screenAngle()%360)+360)%360;if(a===90||a===270)raw=Number(g.y||0)*(a===90?1:-1);side=clamp(raw/3.5,-1,1)}
  function installMotion(){if(motionEnabled)return;zeroSide=zeroPitch=null;addEventListener('deviceorientation',onOrientation,true);addEventListener('devicemotion',onMotion,true);motionEnabled=true;window.__MONADFISH_MOTION_ACTIVE__=true}
  async function ask(ctor){if(!ctor||typeof ctor.requestPermission!=='function')return true;try{return await ctor.requestPermission()==='granted'}catch{return false}}
  async function enableMotion(){if(motionEnabled||permissionAttempted||!sensorCapable)return;permissionAttempted=true;const a=await ask(window.DeviceOrientationEvent),b=await ask(window.DeviceMotionEvent);if(a||b)installMotion()}
  if(sensorCapable){const needsGesture=typeof window.DeviceOrientationEvent?.requestPermission==='function'||typeof window.DeviceMotionEvent?.requestPermission==='function';if(!needsGesture)installMotion();else{const once=()=>{void enableMotion();removeEventListener('pointerdown',once,true);removeEventListener('touchend',once,true)};addEventListener('pointerdown',once,true);addEventListener('touchend',once,true)}}
  addEventListener('orientationchange',()=>{zeroSide=zeroPitch=null});screen.orientation?.addEventListener?.('change',()=>{zeroSide=zeroPitch=null});

  const style=document.createElement('style');
  style.textContent=`
  #mf-v8-stage{position:fixed;pointer-events:none;overflow:hidden;z-index:18;display:none}
  #mf-v8-character{position:fixed;pointer-events:none;z-index:32;display:none;filter:drop-shadow(0 15px 14px rgba(0,0,0,.46));transform-origin:50% 88%}
  #mf-v8-fightfish{position:absolute;pointer-events:none;z-index:4;display:none;filter:drop-shadow(0 14px 14px rgba(0,0,0,.42)) drop-shadow(0 0 18px rgba(56,189,248,.28));transform-origin:50% 50%}
  #mf-v8-splash{position:absolute;z-index:3;width:190px;height:80px;border-radius:50%;border:5px solid rgba(224,242,254,.72);box-shadow:0 0 28px rgba(125,211,252,.72),inset 0 0 24px rgba(255,255,255,.42);display:none;transform:translate(-50%,-50%) scale(.65);opacity:.9}
  #mf-v8-splash.on{display:block;animation:mfV8Splash .55s ease-out infinite alternate}@keyframes mfV8Splash{to{transform:translate(-50%,-50%) scale(1.1);opacity:.35}}
  .mf-v8-swimmer{position:absolute;z-index:1;will-change:transform;filter:drop-shadow(0 6px 7px rgba(0,0,0,.28));opacity:.82}
  body.mf-v8-fighting #mf-v8-stage{filter:saturate(1.15) contrast(1.03)}
  #mf-v8-hud{position:fixed;left:50%;top:max(52px,calc(env(safe-area-inset-top) + 46px));transform:translateX(-50%) translateY(-10px);z-index:999998;width:min(342px,calc(100vw - 24px));padding:10px 12px;border:1px solid rgba(125,211,252,.45);border-radius:16px;background:linear-gradient(180deg,rgba(3,13,26,.94),rgba(4,18,30,.88));color:#e6fbff;font:800 12px system-ui;box-shadow:0 14px 38px rgba(0,0,0,.45),0 0 26px rgba(56,189,248,.13);backdrop-filter:blur(10px);opacity:0;pointer-events:none;transition:.15s}
  #mf-v8-hud.on{opacity:1;transform:translateX(-50%) translateY(0)} .mf-v8-row{display:flex;justify-content:space-between;gap:10px}.mf-v8-bar{height:11px;margin-top:7px;border-radius:999px;overflow:hidden;background:#ffffff17}.mf-v8-fill{height:100%;width:50%;border-radius:inherit;background:linear-gradient(90deg,#22c55e 0%,#facc15 58%,#fb7185 100%);transition:width .05s linear}.mf-v8-sub{display:flex;justify-content:space-between;gap:8px;margin-top:5px;color:#a5d8e8;font-size:10px}.mf-v8-control{color:#d9f99d}
  #mf-v8-flash{position:fixed;inset:0;z-index:999989;pointer-events:none;opacity:0;background:radial-gradient(circle at 62% 60%,rgba(255,255,255,.20),transparent 25%),linear-gradient(90deg,rgba(56,189,248,.10),transparent 45%,rgba(251,191,36,.08));transition:opacity .18s}#mf-v8-flash.on{opacity:1}
  @media (prefers-reduced-motion:reduce){#mf-v8-splash.on{animation:none}.mf-v8-swimmer{transition:none!important}}`;
  document.head.appendChild(style);

  const stage=document.createElement('div');stage.id='mf-v8-stage';document.body.appendChild(stage);
  const character=document.createElement('canvas');character.id='mf-v8-character';character.dataset.mfV8='1';character.width=576;character.height=768;document.body.appendChild(character);
  const fightFish=document.createElement('canvas');fightFish.id='mf-v8-fightfish';fightFish.dataset.mfV8='1';fightFish.width=400;fightFish.height=400;stage.appendChild(fightFish);
  const splash=document.createElement('div');splash.id='mf-v8-splash';stage.appendChild(splash);
  const flash=document.createElement('div');flash.id='mf-v8-flash';document.body.appendChild(flash);
  const hud=document.createElement('div');hud.id='mf-v8-hud';hud.innerHTML='<div class="mf-v8-row"><span id="mf-v8-title">⚡ 大鱼上钩！站起来遛鱼</span><span id="mf-v8-dir">对抗中</span></div><div class="mf-v8-bar"><div class="mf-v8-fill" id="mf-v8-fill"></div></div><div class="mf-v8-sub"><span class="mf-v8-control" id="mf-v8-control">跟着鱼的方向回杆</span><span id="mf-v8-tension">50% 张力</span><span id="mf-v8-sensor">体感</span></div>';document.body.appendChild(hud);
  const hudDir=hud.querySelector('#mf-v8-dir'),hudFill=hud.querySelector('#mf-v8-fill'),hudControl=hud.querySelector('#mf-v8-control'),hudTension=hud.querySelector('#mf-v8-tension'),hudSensor=hud.querySelector('#mf-v8-sensor'),hudTitle=hud.querySelector('#mf-v8-title');

  const charChoice='boy';
  const swimmers=Array.from({length:6},(_,i)=>{
    const c=document.createElement('canvas');c.className='mf-v8-swimmer';c.dataset.mfV8='1';c.width=300;c.height=225;stage.appendChild(c);
    return {el:c,index:[0,1,3,5,6,7,8,9,10,11,12,13,14,15][(i*2+Math.floor(Math.random()*5))%14],speed:.035+Math.random()*.035,offset:Math.random(),top:.56+Math.random()*.28,size:78+Math.random()*58,flip:Math.random()<.5?-1:1};
  });
  function redrawSchool(){if(!assets.fish)return;swimmers.forEach(s=>{const x=s.el.getContext('2d');x.clearRect(0,0,300,225);const a=atlasSource(s.index);if(a)x.drawImage(a.im,a.sx,a.sy,a.sw,a.sh,0,0,300,225)})}

  let lastGameCanvas=null,boatRect=null,fighting=false,prevFight=false,fightStart=0,endingUntil=0,endingSuccess=false,fightIndex=4,isLegend=false,lastBurst=0,visualSide=0,visualVel=0;
  function findGameCanvas(){const list=[...document.querySelectorAll('canvas:not([data-mf-v8])')].filter(c=>c.clientWidth*c.clientHeight>25000);list.sort((a,b)=>b.clientWidth*b.clientHeight-a.clientWidth*a.clientHeight);return list[0]||lastGameCanvas}
  function isFishTab(){const a=document.querySelector('nav button[aria-current="page"],button[aria-current="page"]');if(a){const t=(a.getAttribute('aria-label')||a.textContent||'').trim();return /^(Fish|Fishing|钓鱼)$/i.test(t)}return !!findGameCanvas()}

  const proto=window.CanvasRenderingContext2D?.prototype;
  if(proto&&!proto.__mfV8Patched){
    const native=proto.drawImage;Object.defineProperty(proto,'__mfV8Patched',{value:true});
    proto.drawImage=function(image,...args){
      const src=String(image?.currentSrc||image?.src||'');let dx=0,dy=0,dw=Number(image?.naturalWidth||image?.width||1),dh=Number(image?.naturalHeight||image?.height||1);
      if(args.length===4){[dx,dy,dw,dh]=args.map(Number)}else if(args.length===8){dx=Number(args[4]);dy=Number(args[5]);dw=Number(args[6]);dh=Number(args[7])}else if(args.length===2){dx=Number(args[0]);dy=Number(args[1])}
      const valid=[dx,dy,dw,dh].every(Number.isFinite),boat=/pepe_boat|pepe.*boat|fisherman/i.test(src);
      if(boat&&valid&&this.canvas?.dataset?.mfV8!=='1'){lastGameCanvas=this.canvas;boatRect={dx,dy,dw,dh,canvas:this.canvas};if(fighting){this.save();this.globalAlpha*=.20;const r=native.call(this,image,...args);this.restore();return r}}
      const id=findFishId(src);if(id&&assets.fish&&valid){const s=atlasSource(fishMap[id]);if(s)return native.call(this,s.im,s.sx,s.sy,s.sw,s.sh,dx,dy,dw,dh)}
      return native.call(this,image,...args);
    };
  }

  function drawCharacter(pose){const im=assets.boy;if(!im)return;const ctx=character.getContext('2d'),cw=im.naturalWidth/4,ch=im.naturalHeight/2,index=clamp(pose,0,7);ctx.clearRect(0,0,576,768);ctx.drawImage(im,(index%4)*cw,Math.floor(index/4)*ch,cw,ch,0,0,576,768)}
  function chooseFightFish(){const pending=String(window.__MONADFISH_PENDING_FISH__?.id||window.__MONADFISH_PENDING_FISH__||'').toLowerCase();if(pending&&fishMap[pending]!=null){fightIndex=fishMap[pending];isLegend=/mutant|leviathan/.test(pending)&&Math.random()<.55;return}isLegend=Math.random()<.13;fightIndex=isLegend?Math.floor(Math.random()*7):Math.floor(Math.random()*16)}
  function drawFightFish(){const ctx=fightFish.getContext('2d');ctx.clearRect(0,0,400,400);if(isLegend&&assets.legend){const cw=assets.legend.naturalWidth/4,ch=assets.legend.naturalHeight/2,idx=fightIndex%7;ctx.drawImage(assets.legend,(idx%4)*cw,Math.floor(idx/4)*ch,cw,ch,16,8,368,384)}else if(assets.fish){const s=atlasSource(fightIndex);if(s)ctx.drawImage(s.im,s.sx,s.sy,s.sw,s.sh,15,65,370,278)}}
  function pulseFlash(ms=180){flash.classList.add('on');setTimeout(()=>flash.classList.remove('on'),ms)}
  function startFight(){fighting=true;endingUntil=0;fightStart=performance.now();chooseFightFish();drawFightFish();document.body.classList.add('mf-v8-fighting');hud.classList.add('on');fightFish.style.display='block';character.style.display='block';splash.classList.add('on');hudTitle.textContent=isLegend?'🔥 传奇巨物上钩！站稳拉住！':'⚡ 大鱼上钩！站起来遛鱼';pulseFlash(250);try{navigator.vibrate?.([45,35,70])}catch{}}
  function stopFight(){fighting=false;document.body.classList.remove('mf-v8-fighting');hud.classList.remove('on');splash.classList.remove('on');setTimeout(()=>{const text=String(document.body?.innerText||''),failed=/跑鱼|鱼儿跑|got away|missed|失败/i.test(text);endingSuccess=!failed;endingUntil=performance.now()+(endingSuccess?1450:420);if(endingSuccess){pulseFlash(320);try{navigator.vibrate?.([35,30,35,30,90])}catch{}}},170)}
  setInterval(()=>{const a=window.__MONADFISH_HOOK_FIGHT__===true;if(a&&!prevFight)startFight();if(!a&&prevFight)stopFight();prevFight=a},40);

  function updateStageRect(canvas){if(!canvas)return;const r=canvas.getBoundingClientRect();stage.style.left=r.left+'px';stage.style.top=r.top+'px';stage.style.width=r.width+'px';stage.style.height=r.height+'px';stage.style.display=isFishTab()?'block':'none'}
  function updateCharacterPosition(canvas){if(!canvas)return;const cr=canvas.getBoundingClientRect();let x=cr.left+cr.width*.15,y=cr.top+cr.height*.31,w=clamp(cr.width*.34,170,365);if(boatRect?.canvas===canvas&&canvas.width&&canvas.height){const sx=cr.width/canvas.width,sy=cr.height/canvas.height,bx=cr.left+boatRect.dx*sx,bw=boatRect.dw*sx,by=cr.top+boatRect.dy*sy,bh=boatRect.dh*sy;w=clamp(Math.max(bw*.82,cr.width*.28),175,390);x=bx+bw*.47-w*.5;y=by+bh*.92-w*1.333*.89}const h=w*1.333;character.style.left=x+'px';character.style.top=y+'px';character.style.width=w+'px';character.style.height=h+'px'}
  function render(now){
    const canvas=findGameCanvas();if(canvas){lastGameCanvas=canvas;updateStageRect(canvas)}const fishTab=isFishTab();if(!fishTab){stage.style.display='none';character.style.display='none';hud.classList.remove('on')}
    const stageW=stage.clientWidth||1,stageH=stage.clientHeight||1,t=now/1000;
    swimmers.forEach((s,i)=>{const x=((t*s.speed+s.offset)%1)*(stageW+s.size*2)-s.size*1.2,y=stageH*(s.top+Math.sin(t*(.6+i*.08)+i)*.018);s.el.style.width=s.size+'px';s.el.style.height=(s.size*.75)+'px';s.el.style.left=x+'px';s.el.style.top=y+'px';s.el.style.opacity=fighting?'.16':String(.50+(i%3)*.12);s.el.style.transform=`scaleX(${s.flip}) rotate(${Math.sin(t+i)*2.2}deg)`});
    if(fighting&&fishTab){
      const ft=(now-fightStart)/1000,dir=Math.sin(ft*4.8)+Math.sin(ft*2.05)*.52,input=motionEnabled?side:0,counter=clamp(-dir*input,-1,1),good=Math.max(0,counter),bad=Math.max(0,-counter),raw=55+Math.sin(ft*5.4)*21+Math.sin(ft*2.1)*12+(isLegend?8:0),tension=clamp(raw-good*21+bad*15,14,98);
      visualVel+=(clamp(input+dir*.15,-1.2,1.2)-visualSide)*.17;visualVel*=.72;visualSide=clamp(visualSide+visualVel,-1.15,1.15);
      const pose=ft<.34?1:(tension>83?4:(Math.abs(input)>.58||pitch<-.45?5:(dir>=0?2:3)));drawCharacter(pose);updateCharacterPosition(canvas);character.style.transform=`rotate(${(visualSide*7+dir*1.4).toFixed(1)}deg) translate3d(${(visualSide*6).toFixed(1)}px,${(-Math.abs(pitch)*3).toFixed(1)}px,0)`;
      const fw=clamp(stageW*(isLegend?.32:.25),150,isLegend?310:255),fx=stageW*(.62+.17*Math.sin(ft*2.5)),fy=stageH*(.56+.07*Math.sin(ft*5.2));fightFish.style.width=fw+'px';fightFish.style.height=fw+'px';fightFish.style.left=(fx-fw*.5)+'px';fightFish.style.top=(fy-fw*.45)+'px';fightFish.style.transform=`scaleX(${dir>=0?-1:1}) rotate(${(dir*5).toFixed(1)}deg) translateY(${Math.sin(ft*9)*5}px)`;splash.style.left=fx+'px';splash.style.top=(fy+fw*.28)+'px';
      hudDir.textContent=dir>=0?'鱼向右冲 →':'← 鱼向左冲';hudControl.textContent=dir>=0?'← 身体向左压，稳住鱼竿':'身体向右压，稳住鱼竿 →';hudFill.style.width=tension.toFixed(0)+'%';hudTension.textContent=tension.toFixed(0)+'% 张力';hudSensor.textContent=motionEnabled?(motionSeen?'体感联动 ✓':'体感准备中'):(sensorCapable?'首次操作授权':'视觉对抗');if(tension>86&&now-lastBurst>720){lastBurst=now;pulseFlash(100);try{navigator.vibrate?.(30)}catch{}}
    }else if(endingUntil>now&&fishTab){updateCharacterPosition(canvas);character.style.display='block';fightFish.style.display=endingSuccess?'block':'none';const left=endingUntil-now;drawCharacter(endingSuccess?(left>650?6:7):4);character.style.transform=endingSuccess?`translateY(${Math.sin(now/90)*3}px) scale(1.04)`:'rotate(-4deg)';if(endingSuccess){fightFish.style.left=(stageW*.58)+'px';fightFish.style.top=(stageH*.47)+'px';fightFish.style.width=clamp(stageW*.20,120,220)+'px';fightFish.style.height=clamp(stageW*.20,120,220)+'px'}}else if(!fighting){character.style.display='none';fightFish.style.display='none';splash.classList.remove('on')}
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  window.__MONADFISH_GAMEPLAY_V8__={release:RELEASE,character:charChoice,fishLooks:16,legendaryLooks:7,get motion(){return{enabled:motionEnabled,seen:motionSeen,side,pitch}},get fighting(){return fighting}};
})();