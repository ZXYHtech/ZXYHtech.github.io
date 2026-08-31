(()=>{
'use strict';
const RELEASE='V11-ZXYH';
window.__MONADFISH_RELEASE__=RELEASE;
window.__MONADFISH_V11_ZXYH__=true;

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const ANGLER='/fish/games/monadfish/assets/v8-1249/angler-boy-v8-1249.webp?release='+RELEASE;
const oldCharacterPattern=/pepe_boat|pepe.*boat|fisherman|pepe.?vessel/i;
const fishIds=['carp','perch','tilapia','trout','bass','bream','koi','eel','catfish','goldfish','tuna','mutant','pike','leviathan'];
const fishPattern=new RegExp('fish_(?:'+fishIds.join('|')+')|/(?:'+fishIds.join('|')+')(?:\\.|[-_])','i');

const style=document.createElement('style');
style.textContent=`
#mf-v8-character,#mf-v9-angler,#mf-v10-angler,#mf-v10-boat,#mf-v10-help,#mf-v10-control,#mf-v10-drag,#mf-v10-step{display:none!important;opacity:0!important}
.mf-v8-swimmer{display:none!important}
#mf-v11-angler{position:fixed;left:10px;top:max(108px,calc(env(safe-area-inset-top) + 96px));width:clamp(230px,46vw,330px);height:auto;aspect-ratio:3/4;z-index:36;pointer-events:none;filter:drop-shadow(0 13px 14px rgba(0,0,0,.46));transform-origin:50% 88%;will-change:transform}
body.mf-v8-fighting #mf-v11-angler{width:clamp(250px,50vw,356px);top:max(96px,calc(env(safe-area-inset-top) + 84px))}
#mf-v11-fight-hint{position:fixed;left:50%;top:max(70px,calc(env(safe-area-inset-top) + 58px));transform:translateX(-50%);z-index:999997;display:none;max-width:min(350px,calc(100vw - 230px));padding:7px 11px;border:1px solid rgba(190,242,100,.65);border-radius:12px;background:rgba(3,20,32,.88);color:#ecfccb;font:900 12px/1.35 system-ui;text-align:center;pointer-events:none;box-shadow:0 8px 26px rgba(0,0,0,.32)}
body.mf-v8-fighting #mf-v11-fight-hint{display:block}
.mf-v11-localized{position:relative!important}
.mf-v11-cn{position:absolute;z-index:9999;left:50%;transform:translateX(-50%);pointer-events:none;white-space:nowrap;font-family:"Noto Sans SC","Microsoft YaHei","PingFang SC",system-ui,sans-serif;font-weight:1000;color:#fff;text-shadow:0 2px 3px #000,0 0 8px #000;line-height:1;border-radius:999px;background:rgba(3,12,25,.78);box-shadow:0 1px 0 rgba(255,255,255,.12) inset}
.mf-v11-cn.main{top:44%;font-size:clamp(20px,5vw,32px);padding:7px 18px;color:#fff7c2;background:rgba(5,26,52,.80)}
.mf-v11-cn.tile{bottom:4px;font-size:12px;padding:3px 8px}
.mf-v11-cn.side{bottom:7px;font-size:15px;padding:5px 12px;color:#fff6b8}
.mf-v11-cn.status{top:50%;font-size:14px;padding:4px 10px}
button[aria-label="抛竿"],button[aria-label="提竿"],button[aria-label="Cast line"],button[aria-label="Hook fish"]{position:relative!important;z-index:999990!important}
@media(max-width:430px){#mf-v11-angler{width:215px;top:max(100px,calc(env(safe-area-inset-top) + 88px))}body.mf-v8-fighting #mf-v11-angler{width:235px}#mf-v11-fight-hint{max-width:190px;font-size:10px;top:max(66px,calc(env(safe-area-inset-top) + 54px))}}
`;
document.head.appendChild(style);

const charCanvas=document.createElement('canvas');
charCanvas.id='mf-v11-angler';charCanvas.width=576;charCanvas.height=768;charCanvas.dataset.mfV11='1';document.body.appendChild(charCanvas);
const charCtx=charCanvas.getContext('2d');
const angler=new Image();angler.decoding='async';angler.src=ANGLER;
let pose=0,flip=false,side=0,zeroSide=null,touchSide=0,touchActive=false,fightStart=0,wasFighting=false,celebrateUntil=0;

function drawPose(){
  charCtx.clearRect(0,0,charCanvas.width,charCanvas.height);
  if(!angler.complete||!angler.naturalWidth)return;
  const cols=4,rows=2,cw=angler.naturalWidth/cols,ch=angler.naturalHeight/rows;
  const idx=clamp(pose,0,7);
  charCtx.save();
  if(flip){charCtx.translate(charCanvas.width,0);charCtx.scale(-1,1)}
  charCtx.drawImage(angler,(idx%4)*cw,Math.floor(idx/4)*ch,cw,ch,0,0,charCanvas.width,charCanvas.height);
  charCtx.restore();
}
angler.onload=drawPose;

function screenAngle(){return Number(screen.orientation?.angle??window.orientation??0)||0}
function lateral(beta,gamma){const a=((screenAngle()%360)+360)%360;if(a===90)return Number(beta||0);if(a===270)return-Number(beta||0);return Number(gamma||0)}
addEventListener('deviceorientation',e=>{const s=lateral(e.beta,e.gamma);if(!Number.isFinite(s))return;if(zeroSide===null)zeroSide=s;side=clamp((s-zeroSide)/13,-1,1)},true);
addEventListener('orientationchange',()=>{zeroSide=null});screen.orientation?.addEventListener?.('change',()=>{zeroSide=null});
addEventListener('pointerdown',e=>{if(!document.body.classList.contains('mf-v8-fighting'))return;touchActive=true;touchSide=0;charCanvas.dataset.touchX=String(e.clientX)},true);
addEventListener('pointermove',e=>{if(!touchActive)return;const sx=Number(charCanvas.dataset.touchX||e.clientX);touchSide=clamp((e.clientX-sx)/(innerWidth*.25),-1,1)},true);
addEventListener('pointerup',()=>{touchActive=false;touchSide=0},true);addEventListener('pointercancel',()=>{touchActive=false;touchSide=0},true);

const fightHint=document.createElement('div');fightHint.id='mf-v11-fight-hint';fightHint.textContent='鱼往哪冲，就向反方向倾手机或滑动';document.body.appendChild(fightHint);
function fishTabActive(){const a=document.querySelector('nav button[aria-current="page"],button[aria-current="page"]');if(!a)return true;return /Fish|Fishing|钓鱼/i.test(String(a.getAttribute('aria-label')||a.textContent||''))}
function dir(){return String(document.getElementById('mf-v8-dir')?.textContent||'')}

const proto=window.CanvasRenderingContext2D?.prototype;
const cleanFish=new Map();
function requestClean(src){
  if(!src||cleanFish.has(src))return;
  cleanFish.set(src,null);
  fetch(src,{cache:'force-cache'}).then(r=>r.ok?r.blob():Promise.reject()).then(blob=>{
    const im=new Image();const url=URL.createObjectURL(blob);im.onload=()=>{cleanFish.set(src,im);setTimeout(()=>URL.revokeObjectURL(url),30000)};im.onerror=()=>cleanFish.delete(src);im.src=url;
  }).catch(()=>cleanFish.delete(src));
}
function parsedDrawArgs(image,args){
  if(args.length===2)return {kind:2,dx:+args[0],dy:+args[1],dw:+(image.naturalWidth||image.width||1),dh:+(image.naturalHeight||image.height||1)};
  if(args.length===4)return {kind:4,dx:+args[0],dy:+args[1],dw:+args[2],dh:+args[3]};
  if(args.length===8)return {kind:8,sx:+args[0],sy:+args[1],sw:+args[2],sh:+args[3],dx:+args[4],dy:+args[5],dw:+args[6],dh:+args[7]};
  return null;
}
function shrunkenArgs(p,scale=.68){
  if(!p||![p.dx,p.dy,p.dw,p.dh].every(Number.isFinite))return null;
  const nw=p.dw*scale,nh=p.dh*scale,dx=p.dx+(p.dw-nw)/2,dy=p.dy+(p.dh-nh)/2;
  return p.kind===8?[p.sx,p.sy,p.sw,p.sh,dx,dy,nw,nh]:[dx,dy,nw,nh];
}
if(proto&&!proto.__mfV11ZxyhPatched){
  const previous=proto.drawImage;
  Object.defineProperty(proto,'__mfV11ZxyhPatched',{value:true});
  proto.drawImage=function(image,...args){
    if(this.canvas===charCanvas)return previous.call(this,image,...args);
    const src=String(image?.currentSrc||image?.src||'');
    if(oldCharacterPattern.test(src))return;
    if(fishPattern.test(src)){
      requestClean(src);
      const clean=cleanFish.get(src);
      const p=parsedDrawArgs(image,args);
      const main=this.canvas?.isConnected&&this.canvas.clientWidth>300&&this.canvas.clientHeight>420;
      const next=main&&p&&Math.max(p.dw,p.dh)>95?shrunkenArgs(p,.66):null;
      if(clean?.complete){
        if(next)return previous.call(this,clean,...next);
        return previous.call(this,clean,...args);
      }
    }
    return previous.call(this,image,...args);
  };
}

const exact=new Map([
 ['CAST LINE','抛竿'],['HOOK IT!','提竿'],['HOOK IT','提竿'],['FISH ON THE LINE','鱼儿上钩'],['BOOST','加速'],['Inventory','背包'],['INVENTORY','背包'],['TRAVEL','出行'],['Travel','出行'],
 ['Fish','钓鱼'],['Tasks','任务'],['Shop','商店'],['Grill','烧烤'],['Cube','魔方'],['Board','排行'],['Leaderboard','排行'],['Cast line','抛竿'],['Hook fish','提竿']
]);
const rules=[
 [/CAST\s*LINE|cast[_ -]?line/i,'抛竿','main'],[/HOOK\s*IT|hook[_ -]?fish/i,'提竿','main'],[/FISH\s+ON\s+THE\s+LINE/i,'鱼儿上钩','status'],[/\bBOOST\b|boost/i,'加速','side'],[/\bINVENTORY\b|inventory/i,'背包','side'],[/\bTRAVEL\b|travel/i,'出行','side'],
 [/^Fish$/i,'钓鱼','tile'],[/^Tasks?$/i,'任务','tile'],[/^Shop$/i,'商店','tile'],[/^Grill$/i,'烧烤','tile'],[/^Cube$/i,'魔方','tile'],[/^(Board|Leaderboard)$/i,'排行','tile']
];
function translateText(root=document.body){
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const n of nodes){if(!n.parentElement||/SCRIPT|STYLE|CODE|PRE|TEXTAREA/.test(n.parentElement.tagName))continue;const t=n.nodeValue||'',core=t.trim();if(exact.has(core))n.nodeValue=t.replace(core,exact.get(core));else{let s=t;s=s.replace(/FISH ON THE LINE/gi,'鱼儿上钩').replace(/CAST LINE/gi,'抛竿').replace(/HOOK IT!?/gi,'提竿').replace(/\bBOOST\b/gi,'加速').replace(/\bTRAVEL\b/gi,'出行').replace(/\bInventory\b/gi,'背包');if(s!==t)n.nodeValue=s}}
}
function addCnLabel(btn,label,role){
  if(!btn||btn.querySelector(':scope > .mf-v11-cn[data-label="'+label+'"]'))return;
  btn.classList.add('mf-v11-localized');
  const s=document.createElement('span');s.className='mf-v11-cn '+role;s.dataset.label=label;s.textContent=label;btn.appendChild(s);
}
function localizeButtons(){
  for(const btn of document.querySelectorAll('button,[role="button"]')){
    if(btn.id==='zxyh-game-guide-link')continue;
    const txt=String(btn.textContent||'').trim();const aria=String(btn.getAttribute('aria-label')||'');const title=String(btn.getAttribute('title')||'');const imgs=[...btn.querySelectorAll('img')].map(i=>[i.src,i.alt].join(' ')).join(' ');
    let match=null;
    for(const [re,label,role] of rules){if(re.test(txt)||re.test(aria)||re.test(title)||re.test(imgs)){match={label,role};break}}
    if(match){addCnLabel(btn,match.label,match.role);if(aria&&/Cast line|Hook fish|Fish|Tasks|Shop|Grill|Cube|Board|Inventory|Travel|Boost/i.test(aria))btn.setAttribute('aria-label',match.label)}
  }
}
function cleanV10(){['mf-v10-help','mf-v10-boat','mf-v10-angler','mf-v10-control','mf-v10-drag','mf-v10-step','mf-v10-modal'].forEach(id=>document.getElementById(id)?.remove())}
function localize(){cleanV10();translateText(document.body);localizeButtons()}
let scheduled=false;function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;localize()})}
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','src','class']});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',localize,{once:true});else localize();

function loop(now){
  const fighting=document.body.classList.contains('mf-v8-fighting');
  const show=fishTabActive()&&!document.hidden;
  charCanvas.style.display=show?'block':'none';fightHint.style.display=show&&fighting?'block':'none';
  if(fighting&&!wasFighting)fightStart=now;
  if(!fighting&&wasFighting)celebrateUntil=now+1200;
  wasFighting=fighting;
  const input=touchActive?touchSide:side;
  let nextPose=0,nextFlip=false;
  if(now<celebrateUntil){nextPose=7}
  else if(fighting){
    const d=dir();const age=(now-fightStart)/1000;
    if(age<.45){nextPose=1;fightHint.textContent='已提竿！站起来准备遛鱼'}
    else if(/左/.test(d)){nextPose=4;nextFlip=false;fightHint.textContent='鱼向左冲 → 向右倾手机 / 向右滑'}
    else if(/右/.test(d)){nextPose=4;nextFlip=true;fightHint.textContent='鱼向右冲 → 向左倾手机 / 向左滑'}
    else if(Math.abs(input)>.28){nextPose=5;nextFlip=input>0;fightHint.textContent='保持反向控竿，别让鱼线绷得太紧'}
    else{nextPose=Math.sin(age*4.1)>.45?2:6;fightHint.textContent='左右倾手机或滑动，跟着鱼的冲刺反向控竿'}
  } else nextPose=0;
  if(nextPose!==pose||nextFlip!==flip){pose=nextPose;flip=nextFlip;drawPose()}
  const sway=fighting?(input*8+Math.sin((now-fightStart)/190)*1.5):Math.sin(now/1100)*.55;
  charCanvas.style.transform=`translate3d(${fighting?input*10:0}px,0,0) rotate(${sway}deg)`;
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop);
})();