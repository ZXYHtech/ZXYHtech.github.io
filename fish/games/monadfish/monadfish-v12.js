(()=>{
'use strict';
const RELEASE='V12-CLEAN';
window.__MONADFISH_RELEASE__=RELEASE;
window.__MONADFISH_V12_CLEAN__=true;

const BASE='/fish/games/monadfish/assets/v8-1249/';
const ANGLER_ATLAS=BASE+'angler-boy-v8-1249.webp?release='+RELEASE;
const FISH_ATLAS=BASE+'fish-atlas-v8-1249.webp?release='+RELEASE;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const oldCharacterPattern=/pepe_boat|pepe.*boat|pepe.?vessel|fisherman\.png|pepe_final|pepe_sheet/i;
const fishSheetPattern=/fish_sheet/i;
const individualFishMap=[
  [/fish_carp/i,0],[/fish_perch/i,1],[/fish_bream/i,4],[/fish_pike/i,7],[/fish_catfish/i,8],
  [/fish_goldfish/i,9],[/fish_mutant/i,15],[/fish_leviathan/i,15]
];
const oldIndexToNew=[0,1,5,10,7,11,13,15];

const style=document.createElement('style');
style.textContent=`
#mf-v8-character,#mf-v9-angler,#mf-v10-angler,#mf-v10-boat,#mf-v10-help,#mf-v10-control,#mf-v10-drag,#mf-v10-step,#mf-v10-modal,#mf-v11-angler,#mf-v11-fight-hint{display:none!important;opacity:0!important}
.mf-v8-swimmer{display:none!important}
#mf-v12-angler{position:fixed;left:-6px;top:max(118px,calc(env(safe-area-inset-top) + 104px));width:clamp(220px,42vw,330px);aspect-ratio:384/560;z-index:36;pointer-events:none;background-repeat:no-repeat;background-size:400% 200%;background-position:0% 0%;filter:drop-shadow(0 13px 15px rgba(0,0,0,.45));transform-origin:50% 90%;will-change:transform;isolation:isolate}
body.mf-v8-fighting #mf-v12-angler{width:clamp(235px,46vw,350px);top:max(108px,calc(env(safe-area-inset-top) + 94px))}
#mf-v12-fight-hint{position:fixed;left:50%;top:max(72px,calc(env(safe-area-inset-top) + 60px));transform:translateX(-50%);z-index:999997;display:none;max-width:min(390px,calc(100vw - 220px));padding:7px 12px;border:1px solid rgba(190,242,100,.62);border-radius:13px;background:rgba(3,20,32,.91);color:#ecfccb;font:900 12px/1.35 system-ui;text-align:center;pointer-events:none;box-shadow:0 8px 26px rgba(0,0,0,.34)}
body.mf-v8-fighting #mf-v12-fight-hint{display:block}
.mf-v12-localized{position:relative!important;overflow:visible!important}
.mf-v12-mask{position:absolute!important;z-index:2147483000!important;display:flex!important;align-items:center!important;justify-content:center!important;pointer-events:none!important;box-sizing:border-box!important;font-family:"Noto Sans SC","Microsoft YaHei","PingFang SC",system-ui,sans-serif!important;font-weight:1000!important;letter-spacing:.02em!important;color:#fff!important;text-shadow:0 2px 3px #000,0 0 8px #000!important}
.mf-v12-mask.main{left:24%!important;right:14%!important;top:30%!important;bottom:22%!important;border-radius:999px!important;background:linear-gradient(180deg,rgba(4,44,91,.98),rgba(3,18,48,.99))!important;font-size:clamp(23px,5vw,34px)!important;color:#fff7c2!important;box-shadow:inset 0 0 0 2px rgba(96,165,250,.28)!important}
.mf-v12-mask.nav{left:2%!important;right:2%!important;bottom:0!important;height:27%!important;min-height:23px!important;border-radius:5px 5px 10px 10px!important;background:linear-gradient(180deg,rgba(2,11,29,.94),rgba(2,8,22,.995))!important;font-size:clamp(12px,3.1vw,17px)!important}
.mf-v12-mask.side{left:7%!important;right:7%!important;top:30%!important;height:42%!important;border-radius:13px!important;background:linear-gradient(180deg,rgba(4,20,39,.97),rgba(2,10,24,.99))!important;font-size:clamp(16px,4vw,25px)!important;color:#fff6b8!important;box-shadow:inset 0 0 0 1px rgba(250,204,21,.23)!important}
button[aria-label="抛竿"],button[aria-label="提竿"],button[aria-label="Cast line"],button[aria-label="Hook fish"]{position:relative!important;z-index:2147482500!important}
@media(max-width:430px){#mf-v12-angler{width:185px;top:max(72px,calc(env(safe-area-inset-top) + 64px));left:-8px}body.mf-v8-fighting #mf-v12-angler{width:205px;top:max(66px,calc(env(safe-area-inset-top) + 58px))}.mf-v12-mask.nav{font-size:11px!important}#mf-v12-fight-hint{max-width:190px;font-size:10px;top:max(66px,calc(env(safe-area-inset-top) + 54px))}}
`;
document.head.appendChild(style);

const angler=document.createElement('div');
angler.id='mf-v12-angler';
angler.setAttribute('aria-hidden','true');
angler.style.backgroundImage=`url("${ANGLER_ATLAS}")`;
document.body.appendChild(angler);
const fightHint=document.createElement('div');
fightHint.id='mf-v12-fight-hint';
fightHint.textContent='鱼往哪边冲，就往反方向控竿';
document.body.appendChild(fightHint);
let pose=-1,flip=false,side=0,zeroSide=null,touchSide=0,touchActive=false,touchStartX=0,fightStart=0,wasFighting=false,celebrateUntil=0;
function setPose(index,mirror=false){
  index=clamp(index|0,0,7);
  if(index===pose&&mirror===flip)return;
  pose=index;flip=mirror;
  const col=index%4,row=Math.floor(index/4);
  angler.style.backgroundPosition=`${col*33.333333}% ${row*100}%`;
}
function screenAngle(){return Number(screen.orientation?.angle??window.orientation??0)||0}
function lateral(beta,gamma){const a=((screenAngle()%360)+360)%360;if(a===90)return Number(beta||0);if(a===270)return-Number(beta||0);return Number(gamma||0)}
addEventListener('deviceorientation',e=>{const s=lateral(e.beta,e.gamma);if(!Number.isFinite(s))return;if(zeroSide===null)zeroSide=s;side=clamp((s-zeroSide)/13,-1,1)},true);
addEventListener('orientationchange',()=>{zeroSide=null});screen.orientation?.addEventListener?.('change',()=>{zeroSide=null});
addEventListener('pointerdown',e=>{if(!document.body.classList.contains('mf-v8-fighting'))return;touchActive=true;touchStartX=e.clientX;touchSide=0},true);
addEventListener('pointermove',e=>{if(!touchActive)return;touchSide=clamp((e.clientX-touchStartX)/(innerWidth*.25),-1,1)},true);
addEventListener('pointerup',()=>{touchActive=false;touchSide=0},true);addEventListener('pointercancel',()=>{touchActive=false;touchSide=0},true);
function selectedTabLabel(){const a=document.querySelector('nav button[aria-current="page"],button[aria-current="page"],[role="tab"][aria-selected="true"]');return String(a?.getAttribute('aria-label')||a?.textContent||'').trim()}
function fishTabActive(){const label=selectedTabLabel();return !label||/^(Fish|Fishing|钓鱼)$/i.test(label)||document.body.classList.contains('mf-v8-fighting')}
function hookReady(){return [...document.querySelectorAll('button')].some(b=>{const s=String(b.getAttribute('aria-label')||b.textContent||'');return /HOOK\s*IT|Hook fish|提竿/i.test(s)&&getComputedStyle(b).display!=='none'})}
function dirText(){return String(document.getElementById('mf-v8-dir')?.textContent||'')}

const fishAtlas=new Image();fishAtlas.decoding='async';fishAtlas.src=FISH_ATLAS;
const proto=window.CanvasRenderingContext2D?.prototype;
if(proto&&!proto.__mfV12CleanPatched){
  const previous=proto.drawImage;
  Object.defineProperty(proto,'__mfV12CleanPatched',{value:true});
  proto.drawImage=function(image,...args){
    const src=String(image?.currentSrc||image?.src||'');
    if(oldCharacterPattern.test(src))return;
    let replacement=-1;
    if(fishSheetPattern.test(src)&&args.length===8){
      const [sx,sy,sw,sh,dx,dy,dw,dh]=args.map(Number);
      if([sx,sy,sw,sh,dx,dy,dw,dh].every(Number.isFinite)&&sw>0&&sh>0){
        const cols=Math.max(1,Math.round((image.naturalWidth||image.width||sw)/sw));
        const oldIdx=Math.max(0,Math.round(sy/sh)*cols+Math.round(sx/sw));
        replacement=oldIndexToNew[oldIdx%oldIndexToNew.length];
        if(fishAtlas.complete&&fishAtlas.naturalWidth){
          const fw=fishAtlas.naturalWidth/4,fh=fishAtlas.naturalHeight/4,ci=replacement%16;
          const scale=.46,nw=dw*scale,nh=dh*scale;
          let ndx=dx+(dw-nw)/2,ndy=dy+(dh-nh)/2;
          const canvasH=this.canvas?.height||0;
          if(canvasH&&ndy+nh>canvasH*.78)ndy=Math.max(canvasH*.48,ndy-canvasH*.10);
          this.save();this.imageSmoothingEnabled=true;this.imageSmoothingQuality='high';
          previous.call(this,fishAtlas,(ci%4)*fw,Math.floor(ci/4)*fh,fw,fh,ndx,ndy,nw,nh);
          this.restore();return;
        }
        return;
      }
    }
    if(src){for(const [re,idx] of individualFishMap){if(re.test(src)){replacement=idx;break}}}
    if(replacement>=0&&fishAtlas.complete&&fishAtlas.naturalWidth){
      const fw=fishAtlas.naturalWidth/4,fh=fishAtlas.naturalHeight/4,ci=replacement%16;
      if(args.length===2||args.length===4){
        const dx=Number(args[0]),dy=Number(args[1]),dw=args.length===4?Number(args[2]):Number(image.naturalWidth||image.width),dh=args.length===4?Number(args[3]):Number(image.naturalHeight||image.height);
        if([dx,dy,dw,dh].every(Number.isFinite))return previous.call(this,fishAtlas,(ci%4)*fw,Math.floor(ci/4)*fh,fw,fh,dx,dy,dw,dh);
      }
      if(args.length===8){const a=args.map(Number);if(a.every(Number.isFinite))return previous.call(this,fishAtlas,(ci%4)*fw,Math.floor(ci/4)*fh,fw,fh,a[4],a[5],a[6],a[7])}
    }
    return previous.call(this,image,...args);
  };
}

const navLabels=['钓鱼','任务','商店','烧烤','魔方','排行'];
function setAria(el,label){if(el.getAttribute('aria-label')!==label)el.setAttribute('aria-label',label)}
function addMask(btn,label,role){
  if(!btn||btn.querySelector(`:scope > .mf-v12-mask[data-mf-label="${label}"]`))return;
  btn.classList.add('mf-v12-localized');
  const span=document.createElement('span');span.className=`mf-v12-mask ${role}`;span.dataset.mfLabel=label;span.textContent=label;btn.appendChild(span);
}
function visible(el){if(!el)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>12&&r.height>12&&s.display!=='none'&&s.visibility!=='hidden'}
function localize(){
  ['mf-v10-help','mf-v10-modal','mf-v10-step','mf-v10-control','mf-v10-drag','mf-v10-boat','mf-v10-angler','mf-v11-angler','mf-v11-fight-hint'].forEach(id=>document.getElementById(id)?.remove());
  for(const b of document.querySelectorAll('button,[role="button"]')){
    const bg=[b,...b.querySelectorAll('*')].slice(0,12).map(el=>{try{return getComputedStyle(el).backgroundImage||''}catch{return''}}).join(' ');
    const hay=[b.getAttribute('aria-label'),b.getAttribute('title'),b.textContent,b.className,b.id,bg,...[...b.querySelectorAll('img')].map(i=>`${i.src} ${i.alt||''}`)].filter(Boolean).join(' ');
    if(/提竿|HOOK\s*IT|Hook fish|cast_button_green/i.test(hay)){setAria(b,'提竿');addMask(b,'提竿','main')}
    else if(/抛竿|CAST\s*LINE|Cast line|cast_button_blue/i.test(hay)){setAria(b,'抛竿');addMask(b,'抛竿','main')}
    if(/BOOST|加速|boost_icon/i.test(hay)){setAria(b,'加速');addMask(b,'加速','side')}
    if(/Inventory|背包|inventory_(?:button|shortcut|icon)/i.test(hay)){setAria(b,'背包');addMask(b,'背包','side')}
    if(/TRAVEL|Travel|出行|map_travel|travel_board/i.test(hay)){setAria(b,'出行');addMask(b,'出行','side')}
  }
  const nav=document.querySelector('nav');
  let navButtons=[];
  if(nav)navButtons=[...nav.querySelectorAll('button,[role="button"]')].filter(visible);
  if(navButtons.length<6){navButtons=[...document.querySelectorAll('button,[role="button"]')].filter(b=>{if(!visible(b))return false;const r=b.getBoundingClientRect();return r.top>innerHeight*.78&&r.width>38&&r.width<180}).sort((a,b)=>a.getBoundingClientRect().left-b.getBoundingClientRect().left)}
  if(navButtons.length>=6)navButtons.slice(-6).forEach((b,i)=>{setAria(b,navLabels[i]);addMask(b,navLabels[i],'nav')});
  const map=[[/\bCAST LINE\b/gi,'抛竿'],[/\bHOOK IT!?\b/gi,'提竿'],[/FISH ON THE LINE/gi,'鱼儿上钩'],[/\bBOOST\b/gi,'加速'],[/\bInventory\b/gi,'背包'],[/\bTRAVEL\b/gi,'出行'],[/^Fish$/i,'钓鱼'],[/^Tasks?$/i,'任务'],[/^Shop$/i,'商店'],[/^Grill$/i,'烧烤'],[/^Cube$/i,'魔方'],[/^(Board|Leaderboard)$/i,'排行']];
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const n of nodes){if(!n.parentElement||/SCRIPT|STYLE|CODE|PRE|TEXTAREA/.test(n.parentElement.tagName)||n.parentElement.classList.contains('mf-v12-mask'))continue;let s=n.nodeValue||'';for(const [re,to] of map)s=s.replace(re,to);if(s!==n.nodeValue)n.nodeValue=s}
}
let localizationScheduled=false;function scheduleLocalize(){if(localizationScheduled)return;localizationScheduled=true;requestAnimationFrame(()=>{localizationScheduled=false;localize()})}
new MutationObserver(scheduleLocalize).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['aria-label','title','src','class']});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',localize,{once:true});else localize();

function loop(now){
  const fighting=document.body.classList.contains('mf-v8-fighting');
  const show=fishTabActive()&&!document.hidden;
  angler.style.display=show?'block':'none';
  if(fighting&&!wasFighting)fightStart=now;
  if(!fighting&&wasFighting)celebrateUntil=now+1300;
  wasFighting=fighting;
  const input=touchActive?touchSide:side;
  if(now<celebrateUntil){setPose(7,false)}
  else if(fighting){
    const age=(now-fightStart)/1000,d=dirText();
    if(age<.5){setPose(2,false);fightHint.textContent='已提竿！站起来准备遛鱼'}
    else if(/左/.test(d)){setPose(4,false);fightHint.textContent='鱼向左冲 → 向右倾手机 / 向右滑'}
    else if(/右/.test(d)){setPose(4,true);fightHint.textContent='鱼向右冲 → 向左倾手机 / 向左滑'}
    else if(Math.abs(input)>.3){setPose(5,input>0);fightHint.textContent='保持反向控竿，别让鱼线绷得太紧'}
    else{setPose(Math.sin(age*4.2)>.45?3:6,false);fightHint.textContent='左右倾手机或滑动，跟着鱼的冲刺反向控竿'}
  }else if(hookReady())setPose(1,false);else setPose(0,false);
  fightHint.style.display=show&&fighting?'block':'none';
  const sway=fighting?(input*7+Math.sin((now-fightStart)/190)*1.3):Math.sin(now/1200)*.45;
  angler.style.transform=`translate3d(${fighting?input*10:0}px,0,0) rotate(${sway}deg) scaleX(${flip?-1:1})`;
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop);
})();
