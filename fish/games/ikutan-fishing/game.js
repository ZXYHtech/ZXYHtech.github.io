// Mobile adaptation of ikutan7/ikutan7.github.io Fishing Game (MIT).
// Core concepts retained: bait choice, simulated time, species activity windows,
// cast/wait/bite, tap-to-reel challenge, catch log + localStorage.
const SAVE='ikutan_fishing_mobile_v1';
const fishPool=[
 {name:'Bluegill',rarity:'common',weightRange:[0.1,0.9],activeWindows:[[4,18]]},
 {name:'Trout',rarity:'common',weightRange:[0.5,2.0],activeWindows:[[0,6],[18,23]]},
 {name:'Bass',rarity:'common',weightRange:[0.8,3.0],activeWindows:[[1,6],[18,23]]},
 {name:'Yellow Perch',rarity:'common',weightRange:[1.1,1.9],activeWindows:[[0,6],[18,22]]},
 {name:'Roach',rarity:'common',weightRange:[0.05,1.0],activeWindows:[[0,20]]},
 {name:'Crappie',rarity:'common',weightRange:[0.11,1.5],activeWindows:[[1,20]]},
 {name:'Walleye',rarity:'uncommon',weightRange:[1.4,3.2],activeWindows:[[0,6],[19,23]]},
 {name:'Catfish',rarity:'uncommon',weightRange:[1.0,5.0],activeWindows:[[0,24]]},
 {name:'Salmon',rarity:'uncommon',weightRange:[2.0,6.0],activeWindows:[[5,7],[18,20]]},
 {name:'Carp',rarity:'uncommon',weightRange:[2.0,14.0],activeWindows:[[19,24],[1,5]]},
 {name:'Snook',rarity:'uncommon',weightRange:[1.5,6.5],activeWindows:[[0,6],[19,24]]},
 {name:'Bullhead',rarity:'rare',weightRange:[0.45,4.5],activeWindows:[[11,19]]},
 {name:'Largemouth Bass',rarity:'rare',weightRange:[0.5,10.0],activeWindows:[[3,24]]},
 {name:'Pike',rarity:'rare',weightRange:[2.3,4.5],activeWindows:[[3,6],[19,23]]},
 {name:'Goldfish',rarity:'rare',weightRange:[0.1,0.5],activeWindows:[[5,19]]},
 {name:'Eel',rarity:'rare',weightRange:[0.1,8.0],activeWindows:[[19,24],[0,4]]},
 {name:'Muskie',rarity:'legendary',weightRange:[6.8,16.0],activeWindows:[[2,5],[19,24]]},
 {name:'Koi',rarity:'legendary',weightRange:[7.0,14.0],activeWindows:[[8,22]]},
 {name:'Shark',rarity:'legendary',weightRange:[8.0,25.0],activeWindows:[[3,6],[19,23]]}
];
const baitConfigs={
 Worm:{minWait:3,maxWait:8,rarityWeights:{common:90,uncommon:10,rare:2,legendary:1}},
 Shrimp:{minWait:4,maxWait:10,rarityWeights:{common:35,uncommon:55,rare:12,legendary:2}},
 Jig:{minWait:5,maxWait:12,rarityWeights:{common:35,uncommon:35,rare:28,legendary:5}}
};
const raritySettings={common:{buttons:4,time:4500},uncommon:{buttons:6,time:5500},rare:{buttons:8,time:6500},legendary:{buttons:12,time:8000}};
let state=(()=>{try{return Object.assign({catchHistory:[],gameTime:360},JSON.parse(localStorage.getItem(SAVE)||'{}'))}catch{return{catchHistory:[],gameTime:360}}})();
let selectedBait='Worm',currentFish=null,isCasting=false,reelTimer=null,biteTimer=null;
const $=s=>document.querySelector(s);
function save(){localStorage.setItem(SAVE,JSON.stringify(state))}
function hour(){return Math.floor(state.gameTime/60)}
function updateTimeVisual(){const h=hour(),m=state.gameTime%60,isDay=h>=6&&h<18;document.body.classList.toggle('day',isDay);document.body.classList.toggle('night',!isDay);$('#clockDisplay').textContent=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`}
updateTimeVisual();setInterval(()=>{state.gameTime=(state.gameTime+10)%1440;updateTimeVisual();save()},10000);
function updateBait(){selectedBait=$('#baitSelect').value}
function logText(msg){$('#log').innerHTML=`<p>${msg}</p>`}
function randomRange(min,max){return Math.floor(Math.random()*(max-min)+min)}
function isActiveNow(f,h){return !f.activeWindows||f.activeWindows.some(([a,b])=>a<=b?(h>=a&&h<b):(h>=a||h<b))}
function getRandomFish(){const weights=baitConfigs[selectedBait].rarityWeights,pool=fishPool.filter(f=>isActiveNow(f,hour())).flatMap(f=>Array(weights[f.rarity]||0).fill(f)),base=pool.length?pool:fishPool,pick=base[Math.floor(Math.random()*base.length)],[lo,hi]=pick.weightRange;return {...pick,weight:(Math.random()*(hi-lo)+lo).toFixed(2)}}
function clearTimers(){clearTimeout(biteTimer);clearInterval(reelTimer)}
function castLine(){if(isCasting)return;clearTimers();isCasting=true;$('#castBtn').disabled=true;$('#summary').style.display='none';$('#baitSelect').disabled=true;$('#reelChallenge').style.display='none';$('#timerBar').style.display='none';logText('🎣 Casting your line... / 正在抛竿');setTimeout(startWaiting,700)}
function startWaiting(){logText('🌊 Waiting for bite... / 等鱼口');const c=baitConfigs[selectedBait],ms=randomRange(c.minWait,c.maxWait)*1000;biteTimer=setTimeout(onBite,ms);if(selectedBait==='Jig')spawnShake()}
function spawnShake(){const area=$('#shakeArea');area.innerHTML='';const b=document.createElement('button');b.className='action-btn shake-btn';b.textContent='Shake / 抽一下';b.style.position='absolute';b.style.top='40%';b.style.left='50%';b.style.transform='translate(-50%,-50%)';b.onclick=()=>{b.textContent='⚡ 鱼口提前';clearTimeout(biteTimer);biteTimer=setTimeout(onBite,900)};area.appendChild(b)}
function onBite(){clearTimeout(biteTimer);$('#shakeArea').innerHTML='';currentFish=getRandomFish();logText(`❗ A fish is on! ${currentFish.rarity.toUpperCase()} / 有鱼！`);startReelChallenge()}
function startReelChallenge(){const box=$('#reelChallenge'),bar=$('#timerBar'),fill=$('#timerFill'),cfg=raritySettings[currentFish.rarity];box.innerHTML='';box.style.display='block';bar.style.display='block';fill.style.width='100%';let left=cfg.buttons,time=cfg.time;for(let i=0;i<cfg.buttons;i++){const b=document.createElement('button');b.className='action-btn reel-btn';b.textContent='Reel!';b.style.position='absolute';b.style.top=`${10+Math.random()*70}%`;b.style.left=`${5+Math.random()*78}%`;b.onclick=()=>{b.remove();left--;if(left===0)successReel()};box.appendChild(b)}reelTimer=setInterval(()=>{time-=100;fill.style.width=`${Math.max(0,time/cfg.time*100)}%`;if(time<=0){clearInterval(reelTimer);if(left>0)failReel()}},100)}
function successReel(){clearInterval(reelTimer);state.catchHistory.push({...currentFish,bait:selectedBait,at:Date.now()});save();logText(`🎉 Caught ${currentFish.name} · ${currentFish.weight} kg · ${currentFish.rarity}`);cleanupChallenge();jumpRandomFish()}
function failReel(){clearInterval(reelTimer);logText('💨 The fish got away! / 跑鱼了');cleanupChallenge()}
function cleanupChallenge(){currentFish=null;isCasting=false;$('#reelChallenge').style.display='none';$('#timerBar').style.display='none';$('#baitSelect').disabled=false;$('#castBtn').disabled=false}
function showSummary(){const d=$('#summary');if(d.style.display==='block'){d.style.display='none';return}d.innerHTML='<h3>🎒 Catch Log / 鱼获</h3>';if(!state.catchHistory.length)d.innerHTML+='<p>还没有鱼获。</p>';else{const stats={};state.catchHistory.forEach(f=>{stats[f.name]??={count:0,best:0};stats[f.name].count++;stats[f.name].best=Math.max(stats[f.name].best,+f.weight)});Object.entries(stats).forEach(([name,x])=>d.innerHTML+=`<p><b>${name}</b> ×${x.count} · best ${x.best.toFixed(2)} kg</p>`)}d.style.display='block'}
const activeFish=new Set();function jumpFish(id){const f=document.getElementById(id);if(!f)return;f.style.left=`${10+Math.random()*80}%`;f.style.animation='none';void f.offsetHeight;f.style.animation='jump 1s ease-out';f.style.opacity='1';f.addEventListener('animationend',()=>{f.style.animation='';f.style.opacity='0';activeFish.delete(id)},{once:true})}function jumpRandomFish(){const ids=['fish1','fish2','fish3'].filter(x=>!activeFish.has(x));if(!ids.length)return;const id=ids[Math.floor(Math.random()*ids.length)];activeFish.add(id);jumpFish(id)}setInterval(()=>{if(Math.random()<.55)jumpRandomFish()},2500);
window.__IKUTAN_FISH_READY__=true;
