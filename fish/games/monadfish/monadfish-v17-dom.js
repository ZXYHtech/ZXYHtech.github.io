(()=>{
'use strict';
const RELEASE='V17-DOM';
window.__MONADFISH_RELEASE__=RELEASE;
window.__MONADFISH_V17_DOM__=true;
const ATLAS='/fish/games/monadfish/assets/v8-1249/angler-boy-v8-1249.webp?release='+RELEASE;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

const style=document.createElement('style');
style.textContent=`
#mf-v8-character,#mf-v9-angler,#mf-v10-angler,#mf-v10-boat,#mf-v11-angler,#mf-v12-angler,#mf-v13-angler,#mf-v14-angler,#mf-v15-status,#mf-v16-status{display:none!important;opacity:0!important;visibility:hidden!important}
#mf-v17-anchor{position:fixed!important;left:50%!important;top:10.5vh!important;width:clamp(190px,37vw,270px)!important;aspect-ratio:3/4!important;transform:translateX(-50%)!important;z-index:2147482100!important;pointer-events:none!important;filter:drop-shadow(0 12px 13px rgba(0,0,0,.38));will-change:transform}
#mf-v17-angler{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;background-repeat:no-repeat!important;background-size:400% 200%!important;background-position:0% 0%;opacity:1!important;visibility:visible!important;display:block!important;z-index:2!important;transform-origin:50% 86%;will-change:transform}
#mf-v17-boat{position:absolute;left:50%;top:66%;width:78%;height:20%;transform:translateX(-50%);z-index:1;border:2px solid rgba(255,216,150,.55);border-radius:16% 16% 42% 42%/24% 24% 76% 76%;background:linear-gradient(180deg,#d68a47 0%,#8f4929 48%,#4e261a 100%);box-shadow:inset 0 -8px 12px rgba(28,9,3,.35),0 8px 18px rgba(0,0,0,.28);clip-path:polygon(7% 8%,93% 8%,82% 87%,50% 100%,18% 87%)}
#mf-v17-boat:before{content:'';position:absolute;left:8%;right:8%;top:16%;height:20%;border-radius:999px;background:rgba(255,205,126,.34);box-shadow:0 1px 0 rgba(255,255,255,.25)}
body.mf-v8-fighting #mf-v17-anchor{top:7.5vh!important;width:clamp(220px,43vw,310px)!important}
@media(max-width:430px){#mf-v17-anchor{top:9vh!important;width:clamp(176px,46vw,218px)!important}body.mf-v8-fighting #mf-v17-anchor{top:6.5vh!important;width:clamp(205px,52vw,248px)!important}}
`;
document.head.appendChild(style);

const anchor=document.createElement('div');anchor.id='mf-v17-anchor';anchor.setAttribute('aria-hidden','true');
const boat=document.createElement('div');boat.id='mf-v17-boat';
const angler=document.createElement('div');angler.id='mf-v17-angler';angler.style.backgroundImage=`url("${ATLAS}")`;
anchor.append(boat,angler);document.body.appendChild(anchor);

let atlasLoaded=false,pose=0,flip=false,side=0,zeroSide=null,touchSide=0,touchActive=false,touchStartX=0;
let fightStart=0,wasFight=false,celebrateUntil=0,state='idle',stateSince=performance.now();
const pre=new Image();pre.decoding='async';pre.onload=()=>{atlasLoaded=true};pre.onerror=()=>{atlasLoaded=false};pre.src=ATLAS;

function setPose(index,mirror=false){index=clamp(index|0,0,7);if(index===pose&&mirror===flip)return;pose=index;flip=mirror;const col=index%4,row=Math.floor(index/4);angler.style.backgroundPosition=`${col*33.333333}% ${row*100}%`;}
function visible(el){if(!el)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>8&&r.height>8&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>0}
function findAction(re){for(const b of document.querySelectorAll('button,[role="button"]')){if(!visible(b))continue;const hay=String(b.getAttribute('aria-label')||'')+' '+String(b.textContent||'')+' '+[...b.querySelectorAll('img')].map(i=>i.src+' '+(i.alt||'')).join(' ');if(re.test(hay))return b}return null}
function setState(s){if(s!==state){state=s;stateSince=performance.now()}}
function screenAngle(){return Number(screen.orientation?.angle??window.orientation??0)||0}
function lateral(beta,gamma){const a=((screenAngle()%360)+360)%360;if(a===90)return Number(beta||0);if(a===270)return-Number(beta||0);return Number(gamma||0)}
addEventListener('deviceorientation',e=>{const s=lateral(e.beta,e.gamma);if(!Number.isFinite(s))return;if(zeroSide===null)zeroSide=s;side=clamp((s-zeroSide)/13,-1,1)},true);
addEventListener('orientationchange',()=>{zeroSide=null});screen.orientation?.addEventListener?.('change',()=>{zeroSide=null});
addEventListener('pointerdown',e=>{if(!document.body.classList.contains('mf-v8-fighting')&&window.__MONADFISH_HOOK_FIGHT__!==true)return;touchActive=true;touchStartX=e.clientX;touchSide=0},true);
addEventListener('pointermove',e=>{if(!touchActive)return;touchSide=clamp((e.clientX-touchStartX)/(innerWidth*.25),-1,1)},true);
addEventListener('pointerup',()=>{touchActive=false;touchSide=0},true);addEventListener('pointercancel',()=>{touchActive=false;touchSide=0},true);

document.addEventListener('click',e=>{const b=e.target?.closest?.('button,[role="button"]');if(!b)return;const hay=String(b.getAttribute('aria-label')||'')+' '+String(b.textContent||'')+' '+[...b.querySelectorAll('img')].map(i=>i.src+' '+(i.alt||'')).join(' ');if(/抛竿|Cast line|cast_button_blue/i.test(hay)){setState('casting');setTimeout(()=>{if(state==='casting')setState('waiting')},850)}if(/提竿|Hook fish|cast_button_green/i.test(hay))setState('biting')},true);

setInterval(()=>{const fight=window.__MONADFISH_HOOK_FIGHT__===true||document.body.classList.contains('mf-v8-fighting');if(fight){if(!wasFight){fightStart=performance.now();setState('catching')}wasFight=true;return}if(wasFight){wasFight=false;celebrateUntil=performance.now()+1300;setState('result');return}if(findAction(/提竿|Hook fish|cast_button_green/i)){setState('biting');return}if(findAction(/抛竿|Cast line|cast_button_blue/i)){if(!['casting','waiting','result'].includes(state))setState('idle');return}if(state==='result'&&performance.now()-stateSince>2200)setState('idle')},70);

function dirText(){return String(document.getElementById('mf-v8-dir')?.textContent||'')}
function loop(now){
 const fight=window.__MONADFISH_HOOK_FIGHT__===true||document.body.classList.contains('mf-v8-fighting');
 const input=touchActive?touchSide:side;let next=0,mirror=false;
 if(now<celebrateUntil){next=7}
 else if(fight){const d=dirText(),age=(now-fightStart)/1000;if(age<.38)next=1;else if(/左/.test(d)){next=4;mirror=false}else if(/右/.test(d)){next=4;mirror=true}else if(Math.abs(input)>.28){next=5;mirror=input>0}else next=Math.sin(age*4.6)>.35?6:4}
 else if(state==='casting')next=2;
 else if(state==='biting')next=1;
 else next=0;
 setPose(next,mirror);
 const sway=fight?(input*8+Math.sin((now-fightStart)/170)*1.8):Math.sin(now/1350)*.35;
 angler.style.transform=`translate3d(${fight?input*8:0}px,0,0) rotate(${sway}deg) scaleX(${mirror?-1:1})`;
 anchor.style.display=document.hidden?'none':'block';
 requestAnimationFrame(loop);
}
setPose(0,false);requestAnimationFrame(loop);

window.__MONADFISH_V17_CHECK__=()=>{const r=angler.getBoundingClientRect(),s=getComputedStyle(angler);return{release:RELEASE,atlasLoaded,person:true,personVisible:r.width>120&&r.height>150&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.5,rect:{left:Math.round(r.left),top:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height)},pose,state,fighting:window.__MONADFISH_HOOK_FIGHT__===true||document.body.classList.contains('mf-v8-fighting')}};
})();