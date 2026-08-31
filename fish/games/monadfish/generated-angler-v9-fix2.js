(()=>{
'use strict';
const RELEASE='V9-GENERATED2';
window.__MONADFISH_GENERATED_ANGLER_V9__=RELEASE;
window.__MONADFISH_GENERATED_ANGLER_FIX2__=true;
const ASSET='/fish/games/monadfish/assets/v8-1249/angler-boy-v8-1249.webp?release='+RELEASE;
const angler=new Image();angler.decoding='async';angler.src=ASSET;
let boatDraw=null,gameCanvas=null,wasFighting=false,fightStart=0,celebrateUntil=0,side=0,pitch=0,zeroSide=null,zeroPitch=null,lastVisibleCanvasAt=0;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

const style=document.createElement('style');
style.textContent=`
#mf-v8-character{display:none!important;opacity:0!important}
#mf-v9-angler{position:fixed;z-index:34;pointer-events:none;display:none;transform-origin:50% 88%;filter:drop-shadow(0 10px 11px rgba(0,0,0,.42))}
#mf-v9-status{position:fixed;z-index:999997;right:10px;top:max(10px,env(safe-area-inset-top));padding:5px 8px;border-radius:999px;background:rgba(3,18,30,.74);color:#d9f99d;font:800 10px system-ui;pointer-events:none;opacity:0;transition:.2s}
body.mf-v8-fighting #mf-v9-status{opacity:.95}
`;
document.head.appendChild(style);
const cv=document.createElement('canvas');cv.id='mf-v9-angler';cv.dataset.mfV9='1';cv.width=620;cv.height=760;document.body.appendChild(cv);
const ctx=cv.getContext('2d');
const status=document.createElement('div');status.id='mf-v9-status';status.textContent='🎣 生成角色 · 站立遛鱼';document.body.appendChild(status);

function screenAngle(){return Number(screen.orientation?.angle??window.orientation??0)||0}
function lateral(beta,gamma){const a=((screenAngle()%360)+360)%360;if(a===90)return Number(beta||0);if(a===270)return-Number(beta||0);return Number(gamma||0)}
addEventListener('deviceorientation',e=>{const s=lateral(e.beta,e.gamma),p=Number(e.beta||0);if(!Number.isFinite(s))return;if(zeroSide===null)zeroSide=s;if(zeroPitch===null)zeroPitch=p;side=clamp((s-zeroSide)/13,-1,1);pitch=clamp((p-zeroPitch)/18,-1,1)},true);
addEventListener('orientationchange',()=>{zeroSide=zeroPitch=null});
screen.orientation?.addEventListener?.('change',()=>{zeroSide=zeroPitch=null});

function visibleCanvas(c){
  if(!c||c===cv||c.dataset?.mfV8==='1'||c.dataset?.mfV9==='1'||!c.isConnected)return false;
  const r=c.getBoundingClientRect();
  const st=getComputedStyle(c);
  return r.width>120&&r.height>120&&st.display!=='none'&&st.visibility!=='hidden'&&Number(st.opacity||1)>.02;
}
function findMainCanvas(){
  const all=[...document.querySelectorAll('canvas')].filter(visibleCanvas);
  all.sort((a,b)=>{const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect();return br.width*br.height-ar.width*ar.height});
  return all[0]||null;
}
function refreshMainCanvas(now){
  if(gameCanvas&&visibleCanvas(gameCanvas))return gameCanvas;
  if(now-lastVisibleCanvasAt<250)return gameCanvas;
  lastVisibleCanvasAt=now;
  gameCanvas=findMainCanvas();
  return gameCanvas;
}

const proto=window.CanvasRenderingContext2D?.prototype;
if(proto&&!proto.__mfV9GeneratedFix2Patched){
  const previous=proto.drawImage;
  Object.defineProperty(proto,'__mfV9GeneratedFix2Patched',{value:true});
  proto.drawImage=function(image,...args){
    const src=String(image?.currentSrc||image?.src||'');
    if(this.canvas===cv)return previous.call(this,image,...args);
    if(/pepe_boat|pepe.*boat|fisherman/i.test(src)){
      let dx=0,dy=0,dw=Number(image?.naturalWidth||image?.width||1),dh=Number(image?.naturalHeight||image?.height||1);
      if(args.length===4){[dx,dy,dw,dh]=args.map(Number)}
      else if(args.length===8){dx=Number(args[4]);dy=Number(args[5]);dw=Number(args[6]);dh=Number(args[7])}
      else if(args.length===2){dx=Number(args[0]);dy=Number(args[1])}
      const c=this.canvas;
      const good=[dx,dy,dw,dh].every(Number.isFinite);
      if(good&&visibleCanvas(c)){
        boatDraw={dx,dy,dw,dh,canvas:c};gameCanvas=c;
        return;
      }
      return previous.call(this,image,...args);
    }
    return previous.call(this,image,...args);
  };
}

function poseFor(now,fighting){
  if(!fighting){if(now<celebrateUntil)return 7;return 0}
  const age=(now-fightStart)/1000;
  const dir=String(document.getElementById('mf-v8-dir')?.textContent||'');
  const title=String(document.getElementById('mf-v8-title')?.textContent||'');
  if(age<.42)return 1;
  if(/传奇|巨物|站稳|拉住/.test(title)&&Math.sin(age*2.25)>.3)return 5;
  if(/左/.test(dir)||side<-.28)return 2;
  if(/右/.test(dir)||side>.28)return 3;
  if(Math.sin(age*4.0)>.62)return 4;
  return 5;
}
function drawBoat(){
  ctx.save();ctx.translate(310,702);
  ctx.fillStyle='rgba(0,0,0,.20)';ctx.beginPath();ctx.ellipse(0,20,145,24,0,0,Math.PI*2);ctx.fill();
  const g=ctx.createLinearGradient(0,-44,0,28);g.addColorStop(0,'#8b5a2b');g.addColorStop(1,'#402514');ctx.fillStyle=g;
  ctx.beginPath();ctx.moveTo(-164,-30);ctx.quadraticCurveTo(-128,34,0,42);ctx.quadraticCurveTo(128,34,164,-30);ctx.lineTo(112,2);ctx.quadraticCurveTo(0,28,-112,2);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#d7a86e';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-145,-25);ctx.quadraticCurveTo(0,8,145,-25);ctx.stroke();
  ctx.restore();
}
function drawPose(pose){
  ctx.clearRect(0,0,cv.width,cv.height);drawBoat();
  if(!angler.complete||!angler.naturalWidth)return;
  const cols=4,cw=angler.naturalWidth/cols,ch=angler.naturalHeight/2;
  const idx=clamp(pose,0,7),seated=idx===0;
  const w=seated?430:455,h=seated?535:580,x=(cv.width-w)/2,y=seated?128:72;
  ctx.drawImage(angler,(idx%4)*cw,Math.floor(idx/4)*ch,cw,ch,x,y,w,h);
}
function positionFromBoat(fighting){
  if(!boatDraw?.canvas||!visibleCanvas(boatDraw.canvas))return false;
  const r=boatDraw.canvas.getBoundingClientRect();
  const sx=r.width/boatDraw.canvas.width,sy=r.height/boatDraw.canvas.height;
  const cx=r.left+(boatDraw.dx+boatDraw.dw/2)*sx;
  const bottom=r.top+(boatDraw.dy+boatDraw.dh)*sy;
  let width=Math.max(205,boatDraw.dw*sx*1.42),height=width*1.225;
  if(fighting){width*=1.12;height*=1.12}
  cv.style.width=width+'px';cv.style.height=height+'px';cv.style.left=(cx-width/2)+'px';cv.style.top=(bottom-height*.89)+'px';
  return true;
}
function positionFallback(fighting,now){
  const c=refreshMainCanvas(now);if(!c||!visibleCanvas(c))return false;
  const r=c.getBoundingClientRect();
  let width=clamp(r.width*.38,205,330);if(fighting)width*=1.1;
  const height=width*1.225;
  const cx=r.left+r.width*.63;
  const bottom=r.top+r.height*.83;
  cv.style.width=width+'px';cv.style.height=height+'px';cv.style.left=(cx-width/2)+'px';cv.style.top=(bottom-height*.88)+'px';
  return true;
}
function fishTabActive(){
  const b=document.querySelector('button[aria-current="page"],nav button[aria-current="page"]');
  if(!b)return true;
  const t=String(b.getAttribute('aria-label')||b.textContent||'');
  return /Fish|Fishing|钓鱼/i.test(t);
}
function loop(now){
  const fighting=document.body.classList.contains('mf-v8-fighting');
  if(fighting&&!wasFighting){fightStart=now;status.textContent='⚡ 起身遛鱼 · 手机摆动控制身体'}
  if(!fighting&&wasFighting){celebrateUntil=now+1350;status.textContent='🏆 上鱼！'}
  wasFighting=fighting;
  const show=!document.hidden&&fishTabActive();
  const positioned=show&&(positionFromBoat(fighting)||positionFallback(fighting,now));
  if(positioned){
    cv.style.display='block';drawPose(poseFor(now,fighting));
    const age=(now-fightStart)/1000;
    const sway=fighting?(side*10+Math.sin(age*3.1)*2.1):Math.sin(now/900)*.8;
    const lift=fighting?(-pitch*10):0;
    cv.style.transform=`translate3d(${fighting?side*15:0}px,${lift}px,0) rotate(${sway}deg)`;
  }else cv.style.display='none';
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
