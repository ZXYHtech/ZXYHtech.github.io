(()=>{
'use strict';
const RELEASE='V14-HARDPERSON';
window.__MONADFISH_RELEASE__=RELEASE;
window.__MONADFISH_V14_HARDPERSON__=true;

const style=document.createElement('style');
style.textContent=`
#mf-v13-angler{display:none!important;opacity:0!important}
#mf-v14-angler{position:fixed;left:1.5vw;top:10.5vh;width:clamp(205px,39vw,310px);height:auto;z-index:2147483500;pointer-events:none;overflow:visible;filter:drop-shadow(0 13px 16px rgba(0,0,0,.48));transform-origin:48% 88%;opacity:1!important;visibility:visible!important;display:block}
body.mf-v8-fighting #mf-v14-angler{width:clamp(225px,43vw,335px);top:9vh}
#mf-v14-angler .boat{transform-origin:180px 386px;animation:mfV14Boat 2.8s ease-in-out infinite}
#mf-v14-angler .person{transform-origin:175px 350px;transition:transform .14s ease-out}
#mf-v14-angler .rod{transform-origin:216px 245px;transition:transform .12s ease-out}
#mf-v14-status{position:fixed;left:8px;top:8px;z-index:2147483600;padding:3px 7px;border-radius:8px;background:#052033d9;color:#86efac;font:800 9px/1.2 system-ui;pointer-events:none;opacity:.18}
@keyframes mfV14Boat{0%,100%{transform:translateY(0) rotate(-.6deg)}50%{transform:translateY(3px) rotate(.6deg)}}
@media(max-width:430px){#mf-v14-angler{left:0;top:9.5vh;width:190px}body.mf-v8-fighting #mf-v14-angler{width:218px;top:8.5vh}}
`;
document.head.appendChild(style);

const NS='http://www.w3.org/2000/svg';
const svg=document.createElementNS(NS,'svg');
svg.id='mf-v14-angler';svg.setAttribute('viewBox','0 0 360 460');svg.setAttribute('aria-hidden','true');
svg.innerHTML=`
<defs>
 <linearGradient id="boatWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b86b2d"/><stop offset="1" stop-color="#5b2b16"/></linearGradient>
 <linearGradient id="vest" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0ea5e9"/><stop offset="1" stop-color="#155e75"/></linearGradient>
 <linearGradient id="waterglow" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#67e8f9" stop-opacity="0"/><stop offset=".5" stop-color="#67e8f9" stop-opacity=".52"/><stop offset="1" stop-color="#67e8f9" stop-opacity="0"/></linearGradient>
</defs>
<g class="boat">
 <ellipse cx="180" cy="418" rx="142" ry="13" fill="url(#waterglow)"/>
 <path d="M38 355 Q180 390 322 354 L290 414 Q180 441 70 414Z" fill="url(#boatWood)" stroke="#e5a257" stroke-width="5"/>
 <path d="M55 361 Q180 389 306 360" fill="none" stroke="#3b1b10" stroke-width="9" opacity=".65"/>
 <path d="M86 383 Q181 404 276 382" fill="none" stroke="#f6c177" stroke-width="3" opacity=".45"/>
</g>
<g class="person">
 <!-- boots/legs -->
 <path d="M145 342 L139 390" stroke="#26364b" stroke-width="23" stroke-linecap="round"/>
 <path d="M190 341 L203 389" stroke="#26364b" stroke-width="23" stroke-linecap="round"/>
 <path d="M134 393 L105 399" stroke="#3b2518" stroke-width="17" stroke-linecap="round"/>
 <path d="M204 392 L232 398" stroke="#3b2518" stroke-width="17" stroke-linecap="round"/>
 <!-- torso -->
 <path d="M125 226 Q165 205 211 229 L207 347 Q168 365 126 344Z" fill="url(#vest)" stroke="#073b4c" stroke-width="5"/>
 <path d="M149 231 L153 344 M188 228 L184 345" stroke="#d7f5ff" stroke-width="5" opacity=".55"/>
 <rect x="151" y="272" width="39" height="34" rx="8" fill="#0f3e57" stroke="#67e8f9" stroke-width="3"/>
 <!-- arms -->
 <path d="M132 250 Q102 275 92 310" stroke="#ffd1ad" stroke-width="22" stroke-linecap="round"/>
 <path d="M203 250 Q223 265 227 292" stroke="#ffd1ad" stroke-width="22" stroke-linecap="round"/>
 <circle cx="92" cy="312" r="12" fill="#ffd1ad"/><circle cx="228" cy="293" r="12" fill="#ffd1ad"/>
 <!-- neck/head -->
 <rect x="154" y="201" width="30" height="31" rx="12" fill="#ffc89f"/>
 <ellipse cx="169" cy="165" rx="48" ry="52" fill="#ffd1ad" stroke="#8b5e3c" stroke-width="3"/>
 <path d="M123 157 Q130 105 174 108 Q215 112 217 151 Q193 132 130 143Z" fill="#3f2b22"/>
 <!-- cap -->
 <path d="M121 132 Q145 94 193 108 Q211 115 217 135Z" fill="#f59e0b" stroke="#7c4a03" stroke-width="4"/>
 <path d="M195 129 Q229 130 239 143 Q211 150 185 139Z" fill="#fbbf24" stroke="#7c4a03" stroke-width="4"/>
 <!-- face -->
 <ellipse cx="151" cy="166" rx="5" ry="7" fill="#172033"/><ellipse cx="186" cy="165" rx="5" ry="7" fill="#172033"/>
 <path d="M151 190 Q169 201 187 189" fill="none" stroke="#a8432b" stroke-width="5" stroke-linecap="round"/>
 <path d="M145 151 Q153 146 160 151 M179 150 Q187 145 194 150" fill="none" stroke="#4b3024" stroke-width="4" stroke-linecap="round"/>
 <!-- gloves/hands on rod -->
 <circle cx="214" cy="269" r="13" fill="#ffd1ad" stroke="#8b5e3c" stroke-width="2"/>
</g>
<g class="rod">
 <path d="M210 274 Q257 205 327 114" fill="none" stroke="#4b2a17" stroke-width="9" stroke-linecap="round"/>
 <path d="M214 272 Q264 204 329 113" fill="none" stroke="#d59645" stroke-width="4" stroke-linecap="round"/>
 <circle cx="220" cy="279" r="14" fill="#334155" stroke="#fbbf24" stroke-width="5"/>
 <path d="M329 113 Q342 198 341 300" fill="none" stroke="#e0f2fe" stroke-width="2" opacity=".9"/>
 <circle cx="341" cy="302" r="7" fill="#ef4444" stroke="#fff" stroke-width="3"/>
</g>`;
document.body.appendChild(svg);

const status=document.createElement('div');status.id='mf-v14-status';status.textContent='人物层 V14';document.body.appendChild(status);
let side=0,zero=null,touch=0,touching=false,startX=0,fightStarted=0,wasFight=false;
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function lateral(beta,gamma){const a=((Number(screen.orientation?.angle??window.orientation??0)||0)%360+360)%360;return a===90?Number(beta||0):a===270?-Number(beta||0):Number(gamma||0)}
addEventListener('deviceorientation',e=>{const v=lateral(e.beta,e.gamma);if(!Number.isFinite(v))return;if(zero===null)zero=v;side=clamp((v-zero)/13,-1,1)},true);
addEventListener('pointerdown',e=>{if(!document.body.classList.contains('mf-v8-fighting'))return;touching=true;startX=e.clientX;touch=0},true);
addEventListener('pointermove',e=>{if(touching)touch=clamp((e.clientX-startX)/(innerWidth*.25),-1,1)},true);
addEventListener('pointerup',()=>{touching=false;touch=0},true);
addEventListener('pointercancel',()=>{touching=false;touch=0},true);
function nonFishTab(){const a=document.querySelector('nav button[aria-current="page"],button[aria-current="page"],[role="tab"][aria-selected="true"]');const s=String(a?.getAttribute('aria-label')||a?.textContent||'');return /任务|Tasks?|商店|Shop|烧烤|Grill|魔方|Cube|排行|Board|Leaderboard|背包|Inventory/i.test(s)}
function loop(now){
 const fight=document.body.classList.contains('mf-v8-fighting');
 const show=!document.hidden&&!nonFishTab();
 svg.style.setProperty('display',show?'block':'none','important');
 if(fight&&!wasFight)fightStarted=now;wasFight=fight;
 const input=touching?touch:side;
 const dir=String(document.getElementById('mf-v8-dir')?.textContent||'');
 let lean=0,rod=0,lift=0;
 if(fight){
   if(/左/.test(dir)){lean=-10;rod=-8}else if(/右/.test(dir)){lean=10;rod=8}else{lean=input*9;rod=input*10}
   lift=-5-Math.abs(Math.sin((now-fightStarted)/190))*4;
 } else lean=Math.sin(now/1300)*1.2;
 svg.querySelector('.person').style.transform=`translate(${lean*0.65}px,${lift}px) rotate(${lean*.45}deg)`;
 svg.querySelector('.rod').style.transform=`rotate(${rod}deg)`;
 svg.style.transform=`translate3d(${fight?input*7:0}px,0,0) rotate(${fight?input*2.2:0}deg)`;
 status.textContent=`V14 人物 ${show?'✓':'×'}${fight?' · 搏鱼':''}`;
 requestAnimationFrame(loop)
}
requestAnimationFrame(loop);
window.__MONADFISH_V14_CHECK__=()=>{const r=svg.getBoundingClientRect(),s=getComputedStyle(svg);return{release:RELEASE,personVisible:s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity)>0&&r.width>80&&r.height>100,rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)},fighting:document.body.classList.contains('mf-v8-fighting')}};
})();