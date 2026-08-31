(()=>{
'use strict';
const RELEASE='V13-PERSON';
window.__MONADFISH_RELEASE__=RELEASE;
window.__MONADFISH_V13_PERSON__=true;

const BASE='/fish/games/monadfish/assets/v8-1249/';
const ANGLER_ATLAS=BASE+'angler-boy-v8-1249.webp?release='+RELEASE;
const FISH_ATLAS=BASE+'fish-atlas-v8-1249.webp?release='+RELEASE;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const oldCharacterPattern=/pepe_boat|pepe.*boat|pepe.?vessel|fisherman\.png|pepe_final|pepe_sheet/i;
const fishSheetPattern=/fish_sheet/i;
const individualFishMap=[[/fish_carp/i,0],[/fish_perch/i,1],[/fish_tilapia/i,2],[/fish_trout/i,3],[/fish_bream/i,4],[/fish_bass/i,5],[/fish_eel/i,6],[/fish_pike/i,7],[/fish_catfish/i,8],[/fish_goldfish/i,9],[/fish_koi/i,10],[/fish_tuna/i,11],[/fish_mutant/i,14],[/fish_leviathan/i,15]];
const oldIndexToNew=[0,1,5,10,7,11,13,15];

const style=document.createElement('style');
style.textContent=`
#mf-v8-character,#mf-v9-angler,#mf-v10-angler,#mf-v10-boat,#mf-v10-help,#mf-v10-control,#mf-v10-drag,#mf-v10-step,#mf-v10-modal,#mf-v11-angler,#mf-v11-fight-hint,#mf-v12-angler,#mf-v12-fight-hint{display:none!important;opacity:0!important}
.mf-v8-swimmer{display:none!important}
#mf-v13-angler{position:fixed!important;left:2.5vw!important;top:12vh!important;width:clamp(190px,38vw,292px)!important;aspect-ratio:3/4!important;z-index:2147482000!important;pointer-events:none!important;background-repeat:no-repeat!important;background-size:400% 200%!important;background-position:0% 0%;opacity:1!important;visibility:visible!important;filter:drop-shadow(0 14px 16px rgba(0,0,0,.48));transform-origin:48% 91%;will-change:transform;isolation:isolate}
body.mf-v8-fighting #mf-v13-angler{width:clamp(215px,43vw,326px)!important;top:10vh!important}
#mf-v13-hint{position:fixed;left:50%;top:max(58px,calc(env(safe-area-inset-top) + 48px));transform:translateX(-50%);z-index:2147483200;display:none;max-width:min(390px,calc(100vw - 24px));padding:8px 13px;border:1px solid rgba(190,242,100,.65);border-radius:14px;background:rgba(3,20,32,.93);color:#ecfccb;font:900 12px/1.35 system-ui;text-align:center;pointer-events:none;box-shadow:0 8px 28px rgba(0,0,0,.38)}
body.mf-v8-fighting #mf-v13-hint{display:block}
.mf-v13-localized{position:relative!important;overflow:visible!important}
.mf-v13-mask{position:absolute!important;z-index:2147483000!important;display:flex!important;align-items:center!important;justify-content:center!important;pointer-events:none!important;box-sizing:border-box!important;font-family:"Noto Sans SC","Microsoft YaHei","PingFang SC",system-ui,sans-serif!important;font-weight:1000!important;color:#fff!important;text-shadow:0 2px 3px #000,0 0 7px #000!important}
.mf-v13-mask.main{left:20%!important;right:10%!important;top:24%!important;bottom:17%!important;border-radius:999px!important;background:linear-gradient(180deg,rgba(4,46,96,.995),rgba(3,17,47,.998))!important;font-size:clamp(22px,5vw,34px)!important;color:#fff7c2!important;box-shadow:inset 0 0 0 2px rgba(96,165,250,.32)!important}
.mf-v13-mask.nav{left:-1%!important;right:-1%!important;bottom:-1px!important;height:43%!important;min-height:32px!important;border-radius:4px 4px 10px 10px!important;background:linear-gradient(180deg,rgba(2,12,31,.99),rgba(1,7,20,1))!important;font-size:clamp(12px,3.2vw,17px)!important;line-height:1!important}
.mf-v13-mask.side{left:4%!important;right:4%!important;top:25%!important;height:52%!important;border-radius:13px!important;background:linear-gradient(180deg,rgba(4,20,39,.995),rgba(2,9,23,1))!important;font-size:clamp(16px,4vw,25px)!important;color:#fff6b8!important;box-shadow:inset 0 0 0 1px rgba(250,204,21,.28)!important}
button[aria-label="抛竿"],button[aria-label="提竿"],button[aria-label="Cast line"],button[aria-label="Hook fish"]{position:relative!important;z-index:2147482500!important}
@media(max-width:430px){#mf-v13-angler{left:0!important;top:10.5vh!important;width:clamp(178px,39vw,210px)!important}body.mf-v8-fighting #mf-v13-angler{width:225px!important;top:9vh!important}.mf-v13-mask.nav{height:45%!important;font-size:11px!important}#mf-v13-hint{font-size:11px!important;max-width:310px!important}}
`;
document.head.appendChild(style);

const angler=document.createElement('div');
angler.id='mf-v13-angler';
angler.setAttribute('aria-hidden','true');
angler.style.backgroundImage=`url("${ANGLER_ATLAS}")`;
document.body.appendChild(angler);
const hint=document.createElement('div');hint.id='mf-v13-hint';hint.textContent='鱼往左冲 → 向右倾手机或向右滑；鱼往右冲则反过来';document.body.appendChild(hint);

let pose=-1,flip=false,side=0,zeroSide=null,touchSide=0,touchActive=false,touchStartX=0,fightStart=0,wasFighting=false,celebrateUntil=0;
function setPose(index,mirror=false){index=clamp(index|0,0,7);if(index===pose&&mirror===flip)return;pose=index;flip=mirror;const col=index%4,row=Math.floor(index/4);angler.style.backgroundPosition=`${col*33.333333}% ${row*100}%`;}
function screenAngle(){return Number(screen.orientation?.angle??window.orientation??0)||0}
function lateral(beta,gamma){const a=((screenAngle()%360)+360)%360;if(a===90)return Number(beta||0);if(a===270)return-Number(beta||0);return Number(gamma||0)}
addEventListener('deviceorientation',e=>{const s=lateral(e.beta,e.gamma);if(!Number.isFinite(s))return;if(zeroSide===null)zeroSide=s;side=clamp((s-zeroSide)/13,-1,1)},true);
addEventListener('orientationchange',()=>{zeroSide=null});screen.orientation?.addEventListener?.('change',()=>{zeroSide=null});
addEventListener('pointerdown',e=>{if(!document.body.classList.contains('mf-v8-fighting'))return;touchActive=true;touchStartX=e.clientX;touchSide=0},true);
addEventListener('pointermove',e=>{if(!touchActive)return;touchSide=clamp((e.clientX-touchStartX)/(innerWidth*.25),-1,1)},true);
addEventListener('pointerup',()=>{touchActive=false;touchSide=0},true);addEventListener('pointercancel',()=>{touchActive=false;touchSide=0},true);

function selectedTabLabel(){const a=document.querySelector('nav button[aria-current="page"],button[aria-current="page"],[role="tab"][aria-selected="true"]');return String(a?.getAttribute('aria-label')||a?.textContent||'').trim()}
function visible(el){if(!el)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>12&&r.height>12&&s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0'}
function hasCastControl(){return [...document.querySelectorAll('button,[role="button"]')].some(b=>{if(!visible(b))return false;const s=String(b.getAttribute('aria-label')||b.textContent||'')+' '+[...b.querySelectorAll('img')].map(i=>i.src+' '+(i.alt||'')).join(' ');return /CAST\s*LINE|HOOK\s*IT|Cast line|Hook fish|抛竿|提竿|cast_button_(?:blue|green)/i.test(s)})}
function fishSceneActive(){
  if(document.body.classList.contains('mf-v8-fighting'))return true;
  if(hasCastControl())return true;
  const label=selectedTabLabel();
  if(/任务|Tasks?|商店|Shop|烧烤|Grill|魔方|Cube|排行|Board|Leaderboard|背包|Inventory/i.test(label))return false;
  if(/钓鱼|Fish|Fishing/i.test(label))return true;
  return location.pathname.includes('/monadfish/');
}
function dirText(){return String(document.getElementById('mf-v8-dir')?.textContent||'')}

const fishAtlas=new Image();fishAtlas.decoding='async';fishAtlas.src=FISH_ATLAS;
const proto=window.CanvasRenderingContext2D?.prototype;
if(proto&&!proto.__mfV13Patched){
  const previous=proto.drawImage;Object.defineProperty(proto,'__mfV13Patched',{value:true});
  proto.drawImage=function(image,...args){
    const src=String(image?.currentSrc||image?.src||'');
    if(oldCharacterPattern.test(src))return;
    let replacement=-1;
    if(fishSheetPattern.test(src)&&args.length===8){
      const [sx,sy,sw,sh,dx,dy,dw,dh]=args.map(Number);
      if([sx,sy,sw,sh,dx,dy,dw,dh].every(Number.isFinite)&&sw>0&&sh>0){
        const cols=Math.max(1,Math.round((image.naturalWidth||image.width||sw)/sw));
        const oldIdx=Math.max(0,Math.round(sy/sh)*cols+Math.round(sx/sw));replacement=oldIndexToNew[oldIdx%oldIndexToNew.length];
        if(fishAtlas.complete&&fishAtlas.naturalWidth){const fw=fishAtlas.naturalWidth/4,fh=fishAtlas.naturalHeight/4,ci=replacement%16,scale=.43,nw=dw*scale,nh=dh*scale;let ndx=dx+(dw-nw)/2,ndy=dy+(dh-nh)/2;const h=this.canvas?.height||0;if(h&&ndy+nh>h*.75)ndy=Math.max(h*.46,ndy-h*.11);this.save();this.imageSmoothingEnabled=true;this.imageSmoothingQuality='high';previous.call(this,fishAtlas,(ci%4)*fw,Math.floor(ci/4)*fh,fw,fh,ndx,ndy,nw,nh);this.restore();return;}return;
      }
    }
    if(src){for(const [re,idx] of individualFishMap){if(re.test(src)){replacement=idx;break}}}
    if(replacement>=0&&fishAtlas.complete&&fishAtlas.naturalWidth){const fw=fishAtlas.naturalWidth/4,fh=fishAtlas.naturalHeight/4,ci=replacement%16;if(args.length===2||args.length===4){const dx=+args[0],dy=+args[1],dw=args.length===4?+args[2]:+(image.naturalWidth||image.width),dh=args.length===4?+args[3]:+(image.naturalHeight||image.height);if([dx,dy,dw,dh].every(Number.isFinite))return previous.call(this,fishAtlas,(ci%4)*fw,Math.floor(ci/4)*fh,fw,fh,dx,dy,dw,dh)}if(args.length===8){const a=args.map(Number);if(a.every(Number.isFinite))return previous.call(this,fishAtlas,(ci%4)*fw,Math.floor(ci/4)*fh,fw,fh,a[4],a[5],a[6],a[7])}}
    return previous.call(this,image,...args);
  };
}

const navLabels=['钓鱼','任务','商店','烧烤','魔方','排行'];
function setAria(el,label){if(el.getAttribute('aria-label')!==label)el.setAttribute('aria-label',label)}
function addMask(btn,label,role){if(!btn)return;for(const x of btn.querySelectorAll(':scope > .mf-v13-mask'))x.remove();btn.classList.add('mf-v13-localized');const span=document.createElement('span');span.className=`mf-v13-mask ${role}`;span.dataset.mfLabel=label;span.textContent=label;btn.appendChild(span)}
function localize(){
  ['mf-v10-help','mf-v10-modal','mf-v10-step','mf-v10-control','mf-v10-drag','mf-v10-boat','mf-v10-angler','mf-v11-angler','mf-v11-fight-hint','mf-v12-angler','mf-v12-fight-hint'].forEach(id=>document.getElementById(id)?.remove());
  for(const b of document.querySelectorAll('button,[role="button"]')){
    const bg=[b,...b.querySelectorAll('*')].slice(0,12).map(el=>{try{return getComputedStyle(el).backgroundImage||''}catch{return''}}).join(' ');
    const hay=[b.getAttribute('aria-label'),b.getAttribute('title'),b.textContent,b.className,b.id,bg,...[...b.querySelectorAll('img')].map(i=>`${i.src} ${i.alt||''}`)].filter(Boolean).join(' ');
    if(/提竿|HOOK\s*IT|Hook fish|cast_button_green/i.test(hay)){setAria(b,'提竿');addMask(b,'提竿','main')}
    else if(/抛竿|CAST\s*LINE|Cast line|cast_button_blue/i.test(hay)){setAria(b,'抛竿');addMask(b,'抛竿','main')}
    if(/BOOST|加速|boost_icon/i.test(hay)){setAria(b,'加速');addMask(b,'加速','side')}
    if(/Inventory|背包|inventory_(?:button|shortcut|icon)/i.test(hay)){setAria(b,'背包');addMask(b,'背包','side')}
    if(/TRAVEL|Travel|出行|map_travel|travel_board/i.test(hay)){setAria(b,'出行');addMask(b,'出行','side')}
  }
  let navButtons=[];const nav=document.querySelector('nav');if(nav)navButtons=[...nav.querySelectorAll('button,[role="button"]')].filter(visible);
  if(navButtons.length<6)navButtons=[...document.querySelectorAll('button,[role="button"]')].filter(b=>{if(!visible(b))return false;const r=b.getBoundingClientRect();return r.top>innerHeight*.77&&r.width>38&&r.width<180}).sort((a,b)=>a.getBoundingClientRect().left-b.getBoundingClientRect().left);
  if(navButtons.length>=6)navButtons.slice(-6).forEach((b,i)=>{setAria(b,navLabels[i]);addMask(b,navLabels[i],'nav')});
}
let scheduled=false;function scheduleLocalize(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;localize()})}
new MutationObserver(scheduleLocalize).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['aria-label','title','src','class']});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',localize,{once:true});else localize();

function loop(now){
  const fighting=document.body.classList.contains('mf-v8-fighting');
  const show=fishSceneActive()&&!document.hidden;
  angler.style.setProperty('display',show?'block':'none','important');angler.style.setProperty('opacity','1','important');angler.style.setProperty('visibility','visible','important');
  hint.style.display=show&&fighting?'block':'none';
  if(fighting&&!wasFighting)fightStart=now;if(!fighting&&wasFighting)celebrateUntil=now+1200;wasFighting=fighting;
  const input=touchActive?touchSide:side;let nextPose=0,nextFlip=false;
  if(now<celebrateUntil)nextPose=7;
  else if(fighting){const d=dirText(),age=(now-fightStart)/1000;if(age<.45)nextPose=1;else if(/左/.test(d)){nextPose=4;nextFlip=false;hint.textContent='鱼向左冲 → 向右倾手机 / 向右滑'}else if(/右/.test(d)){nextPose=4;nextFlip=true;hint.textContent='鱼向右冲 → 向左倾手机 / 向左滑'}else if(Math.abs(input)>.28){nextPose=5;nextFlip=input>0}else nextPose=Math.sin(age*4.1)>.45?2:6}else nextPose=0;
  setPose(nextPose,nextFlip);
  const sway=fighting?(input*8+Math.sin((now-fightStart)/190)*1.5):Math.sin(now/1200)*.45;angler.style.transform=`translate3d(${fighting?input*9:0}px,0,0) rotate(${sway}deg) scaleX(${nextFlip?-1:1})`;
  requestAnimationFrame(loop);
}
setPose(0,false);requestAnimationFrame(loop);
window.__MONADFISH_V13_CHECK__=()=>({release:RELEASE,person:!!document.getElementById('mf-v13-angler'),personVisible:visible(angler),fishScene:fishSceneActive(),castControl:hasCastControl()});
})();