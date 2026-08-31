(()=>{
'use strict';
const RELEASE='V10-GUIDE';
window.__MONADFISH_RELEASE__=RELEASE;
window.__MONADFISH_CHARACTER_V10__=true;
window.__MONADFISH_TUTORIAL_V10__=true;
const ASSET='/fish/games/monadfish/assets/v8-1249/angler-boy-v8-1249.webp?release='+RELEASE;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let sensorSide=0,touchSide=0,touchActive=false,zeroSide=null,wasFighting=false,fightStart=0,celebrateUntil=0,lastStep='';

const style=document.createElement('style');
style.textContent=`
#mf-v8-character,#mf-v9-angler{display:none!important;opacity:0!important}
#mf-v10-angler{position:fixed;left:max(8px,env(safe-area-inset-left));top:max(102px,calc(env(safe-area-inset-top) + 88px));width:clamp(168px,31vw,228px);aspect-ratio:3/4;z-index:31;pointer-events:none;background-image:url('${ASSET}');background-repeat:no-repeat;background-size:400% 200%;background-position:0% 0%;filter:drop-shadow(0 10px 13px rgba(0,0,0,.48));transform-origin:50% 92%;transition:width .16s,top .16s,left .16s;will-change:transform}
body.mf-v8-fighting #mf-v10-angler{width:clamp(190px,35vw,255px);top:max(86px,calc(env(safe-area-inset-top) + 76px))}
#mf-v10-boat{position:fixed;left:-22px;top:max(338px,calc(env(safe-area-inset-top) + 324px));width:250px;height:58px;z-index:29;pointer-events:none;background:linear-gradient(180deg,#b57635,#5b3219 72%);border:4px solid #d9a56d;border-top-width:3px;border-radius:10px 10px 60% 60%/16px 16px 48px 48px;box-shadow:0 12px 16px rgba(0,0,0,.38);transform:rotate(-2deg)}
#mf-v10-step{position:fixed;left:50%;top:max(12px,env(safe-area-inset-top));transform:translateX(-50%);z-index:999996;max-width:min(390px,calc(100vw - 190px));min-width:170px;padding:7px 11px;border:1px solid rgba(125,211,252,.55);border-radius:13px;background:rgba(3,18,33,.88);color:#e8fbff;font:800 12px/1.35 system-ui;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.35);pointer-events:none}
#mf-v10-help{position:fixed;z-index:999999;right:12px;top:max(86px,calc(env(safe-area-inset-top) + 72px));border:1px solid #67e8f9;border-radius:999px;background:rgba(2,20,34,.86);color:#ecfeff;padding:7px 11px;font:800 12px system-ui;box-shadow:0 8px 22px rgba(0,0,0,.35)}
#mf-v10-drag{position:fixed;left:50%;bottom:max(92px,calc(env(safe-area-inset-bottom) + 78px));transform:translateX(-50%);z-index:999995;padding:7px 13px;border-radius:999px;background:rgba(3,18,33,.82);border:1px solid rgba(190,242,100,.55);color:#d9f99d;font:900 12px system-ui;display:none;pointer-events:none}
body.mf-v8-fighting #mf-v10-drag{display:block}
#mf-v10-control{position:fixed;left:0;right:0;top:40%;bottom:86px;z-index:28;display:none;touch-action:none;background:transparent}
body.mf-v8-fighting #mf-v10-control{display:block}
#mf-v10-modal{position:fixed;inset:0;z-index:1000002;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(0,5,12,.68);backdrop-filter:blur(5px)}
#mf-v10-modal.on{display:flex}
#mf-v10-card{width:min(430px,100%);padding:18px;border:1px solid rgba(103,232,249,.65);border-radius:22px;background:linear-gradient(180deg,#07182d,#081f32);color:#effcff;font:600 14px/1.55 system-ui;box-shadow:0 24px 70px rgba(0,0,0,.55)}
#mf-v10-card h3{margin:0 0 10px;font-size:20px}#mf-v10-card ol{margin:8px 0 10px;padding-left:22px}#mf-v10-card li{margin:7px 0}#mf-v10-card b{color:#bef264}#mf-v10-card .note{font-size:12px;color:#a5d8e8}#mf-v10-close{width:100%;margin-top:12px;border:0;border-radius:14px;padding:11px;background:linear-gradient(90deg,#22c55e,#84cc16);color:#052e16;font:900 15px system-ui}
@media(max-width:430px){#mf-v10-angler{width:158px;top:max(96px,calc(env(safe-area-inset-top) + 82px))}body.mf-v8-fighting #mf-v10-angler{width:184px}#mf-v10-boat{top:max(312px,calc(env(safe-area-inset-top) + 298px));width:220px}#mf-v10-step{max-width:190px;font-size:11px}}
`;
document.head.appendChild(style);

const angler=document.createElement('div');angler.id='mf-v10-angler';angler.setAttribute('aria-hidden','true');document.body.appendChild(angler);
const boat=document.createElement('div');boat.id='mf-v10-boat';boat.setAttribute('aria-hidden','true');document.body.appendChild(boat);
const step=document.createElement('div');step.id='mf-v10-step';step.textContent='① 等待鱼咬钩 · 绿色 HOOK IT 出现时点一下';document.body.appendChild(step);
const help=document.createElement('button');help.id='mf-v10-help';help.type='button';help.textContent='🎣 操作';document.body.appendChild(help);
const drag=document.createElement('div');drag.id='mf-v10-drag';drag.textContent='↔ 鱼往哪冲，就向反方向滑 / 倾手机';document.body.appendChild(drag);
const control=document.createElement('div');control.id='mf-v10-control';document.body.appendChild(control);
const modal=document.createElement('div');modal.id='mf-v10-modal';modal.innerHTML=`<div id="mf-v10-card"><h3>🎣 30 秒学会钓鱼</h3><ol><li><b>等待：</b>先等鱼靠近浮漂，不用连续点击。</li><li><b>提竿：</b>看到绿色 <b>HOOK IT!</b> 按钮时，马上点一次。</li><li><b>遛鱼：</b>出现“大鱼上钩”后，鱼向左冲就向右倾手机或向右滑；鱼向右冲就反过来。</li><li><b>看提示：</b>顶部会实时告诉你鱼的方向和张力，人物也会跟着站起、左右拉竿、后仰发力。</li><li><b>上岸：</b>结束后去 Inventory 看鱼获。</li></ol><div class="note">说明：当前版本真正的提竿判定仍是 HOOK IT；左右遛鱼用于人物动作与张力反馈，暂时不偷偷改变成功概率。</div><button id="mf-v10-close" type="button">知道了，开始钓鱼</button></div>`;document.body.appendChild(modal);
const close=modal.querySelector('#mf-v10-close');
function showGuide(){modal.classList.add('on')}
function hideGuide(){modal.classList.remove('on');localStorage.setItem('mf_v10_tutorial_seen','1')}
help.onclick=showGuide;close.onclick=hideGuide;modal.addEventListener('click',e=>{if(e.target===modal)hideGuide()});
if(localStorage.getItem('mf_v10_tutorial_seen')!=='1')setTimeout(showGuide,1100);

function screenAngle(){return Number(screen.orientation?.angle??window.orientation??0)||0}
function lateral(beta,gamma){const a=((screenAngle()%360)+360)%360;if(a===90)return Number(beta||0);if(a===270)return-Number(beta||0);return Number(gamma||0)}
addEventListener('deviceorientation',e=>{const s=lateral(e.beta,e.gamma);if(!Number.isFinite(s))return;if(zeroSide===null)zeroSide=s;sensorSide=clamp((s-zeroSide)/12,-1,1)},true);
addEventListener('orientationchange',()=>{zeroSide=null});screen.orientation?.addEventListener?.('change',()=>{zeroSide=null});

let startX=0,pointerId=null;
control.addEventListener('pointerdown',e=>{pointerId=e.pointerId;startX=e.clientX;touchSide=0;touchActive=true;control.setPointerCapture?.(e.pointerId);e.preventDefault()});
control.addEventListener('pointermove',e=>{if(!touchActive||e.pointerId!==pointerId)return;touchSide=clamp((e.clientX-startX)/(innerWidth*.24),-1,1);e.preventDefault()});
function endPointer(e){if(e.pointerId!==pointerId)return;touchActive=false;touchSide=0;pointerId=null}
control.addEventListener('pointerup',endPointer);control.addEventListener('pointercancel',endPointer);

function visible(el){if(!el)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>10&&r.height>10&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.02}
function hookButton(){return [...document.querySelectorAll('button')].find(b=>visible(b)&&/HOOK\s*IT|提竿|HOOK FISH/i.test(String(b.textContent||b.getAttribute('aria-label')||'')))||null}
function fishTabActive(){const selected=document.querySelector('button[aria-current="page"],nav button[aria-current="page"]');if(!selected)return true;return /Fish|Fishing|钓鱼/i.test(String(selected.getAttribute('aria-label')||selected.textContent||''))}
function setPose(index){const col=index%4,row=Math.floor(index/4);angler.style.backgroundPosition=`${col*33.333333}% ${row*100}%`}
function updateStep(text){if(text===lastStep)return;lastStep=text;step.textContent=text}
function directionHint(){const d=String(document.getElementById('mf-v8-dir')?.textContent||'');if(/左/.test(d))return {pose:2,text:'③ 鱼向左冲 → 向右滑 / 向右倾手机'};if(/右/.test(d))return {pose:3,text:'③ 鱼向右冲 → 向左滑 / 向左倾手机'};return null}

function loop(now){
  const fighting=document.body.classList.contains('mf-v8-fighting');
  const fishPage=fishTabActive();
  angler.style.display=fishPage?'block':'none';boat.style.display=fishPage?'block':'none';help.style.display=fishPage?'block':'none';step.style.display=fishPage?'block':'none';
  if(fighting&&!wasFighting)fightStart=now;
  if(!fighting&&wasFighting)celebrateUntil=now+1250;
  wasFighting=fighting;
  const hook=hookButton();
  let pose=0;
  const input=touchActive?touchSide:sensorSide;
  if(now<celebrateUntil){pose=6;updateStep('④ 上鱼结束 · 去 Inventory 查看鱼获')}
  else if(fighting){
    const h=directionHint();
    if((now-fightStart)<420){pose=1;updateStep('③ 已提竿！人物起身，准备遛鱼')}
    else if(h){pose=h.pose;updateStep(h.text)}
    else if(input<-.28){pose=2;updateStep('③ 正在向左发力 · 根据鱼的方向反向控制')}
    else if(input>.28){pose=3;updateStep('③ 正在向右发力 · 根据鱼的方向反向控制')}
    else{pose=Math.sin((now-fightStart)/270)>.35?4:5;updateStep('③ 左右倾手机或在水面左右滑动遛鱼')}
    const ctrl=document.getElementById('mf-v8-control');if(ctrl)ctrl.textContent=h?h.text.replace(/^③\s*/,''):'鱼往哪冲，就向反方向拉';
  }else if(hook){pose=1;updateStep('② 现在！点绿色 HOOK IT! 提竿')}
  else{pose=0;updateStep('① 等待鱼咬钩 · 绿色 HOOK IT 出现时点一下')}
  setPose(pose);
  const sway=fighting?input*10+Math.sin((now-fightStart)/180)*1.7:Math.sin(now/900)*.7;
  angler.style.transform=`translate3d(${fighting?input*13:0}px,0,0) rotate(${sway}deg)`;
  window.__MONADFISH_CONTROL_INPUT__=input;
  requestAnimationFrame(loop)
}
requestAnimationFrame(loop);
})();
