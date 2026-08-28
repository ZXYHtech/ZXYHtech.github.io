/* My OS V16 loader */
(function(){
'use strict';
if(window.__MY_OS_V16__||window.__MY_OS_V16_LOADING__)return;
window.__MY_OS_V16_LOADING__=true;
(async()=>{
 try{
  const r=await fetch('./v16_payload.txt?v=16',{cache:'force-cache'});
  if(!r.ok)throw new Error('V16 payload HTTP '+r.status);
  const b64=(await r.text()).trim(),bin=atob(b64),bytes=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
  const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  const code=await new Response(stream).text();
  const s=document.createElement('script');s.textContent=code+'\n//# sourceURL=my-os-v16-runtime.js';document.head.appendChild(s);s.remove();
 }catch(e){console.error('[My OS V16 loader]',e);if(typeof toast==='function')toast('策略实验模块加载失败，可刷新后重试')}
 finally{window.__MY_OS_V16_LOADING__=false}
})();
})();
