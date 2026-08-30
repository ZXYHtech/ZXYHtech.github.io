(() => {
  'use strict';
  const RELEASE='V7-1705';
  window.__MONADFISH_RELEASE__=RELEASE;

  // Remove any stale app-managed caches/service workers scoped to MonadFish.
  try{
    if('caches' in window){caches.keys().then(keys=>Promise.all(keys.filter(k=>/monad|fish|hookloot/i.test(k)).map(k=>caches.delete(k)))).catch(()=>{});}
    navigator.serviceWorker?.getRegistrations?.().then(regs=>regs.filter(r=>/\/fish\/games\/monadfish\//i.test(r.scope||'')).forEach(r=>r.unregister())).catch(()=>{});
  }catch{}

  function isFishTab(){
    const active=document.querySelector('nav button[aria-current="page"],button[aria-current="page"]');
    if(active){
      const label=String(active.getAttribute('aria-label')||active.textContent||'').trim();
      return /^(Fish|Fishing|钓鱼)$/i.test(label);
    }
    return !!document.querySelector('canvas');
  }
  function syncGuide(){
    const link=document.getElementById('zxyh-game-guide-link');
    if(link)link.style.setProperty('display',isFishTab()?'inline-flex':'none','important');
  }
  document.addEventListener('click',()=>requestAnimationFrame(syncGuide),true);
  new MutationObserver(()=>requestAnimationFrame(syncGuide)).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['aria-current','aria-label','class']});
  setInterval(syncGuide,500);

  // Extra protection for stale WheelScreen builds: block duplicate long audio samples
  // started by rapid repeated cube clicks, while leaving short reveal/reward sounds alone.
  let cubeGuardUntil=0,lastLongSampleAt=-1e9;
  document.addEventListener('pointerdown',e=>{
    const b=e.target?.closest?.('button,[role="button"]');
    const text=String(b?.textContent||'');
    if(/转动魔方|魔方转动中|幸运魔方/i.test(text))cubeGuardUntil=performance.now()+3200;
  },true);
  try{
    const proto=window.AudioBufferSourceNode?.prototype;
    if(proto&&!proto.__monadfishV7Guard){
      const nativeStart=proto.start;
      Object.defineProperty(proto,'__monadfishV7Guard',{value:true});
      proto.start=function(...args){
        const now=performance.now(),duration=Number(this.buffer?.duration||0);
        if(now<cubeGuardUntil&&duration>1.1){
          if(now-lastLongSampleAt<2400)return;
          lastLongSampleAt=now;
        }
        return nativeStart.apply(this,args);
      };
    }
  }catch{}

  // Internal, non-visible self-check.
  window.__MONADFISH_RUNTIME_CHECK__=()=>({release:RELEASE,fishTab:isFishTab(),guideVisible:getComputedStyle(document.getElementById('zxyh-game-guide-link')||document.body).display!=='none',motion:!!window.__MONADFISH_MOTION_ACTIVE__});
})();