(async function(){
  const target=document.getElementById('bookContent');
  const files=["./book/chunk-01.html", "./book/chunk-02.html", "./book/chunk-03.html", "./book/chunk-04.html", "./book/chunk-05.html", "./book/chunk-06.html", "./book/chunk-07.html", "./book/chunk-08.html"];
  try{
    const parts=await Promise.all(files.map(f=>fetch(f,{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error(f);return r.text()})));
    target.innerHTML=parts.join('');
  }catch(e){
    target.innerHTML='<div class="notice">系统学习手册加载失败，请检查网络后使用站内刷新。</div>';
  }
  const app=document.createElement('script'); app.src='./app.js'; app.defer=true; document.body.appendChild(app);
  if('serviceWorker' in navigator && location.protocol.startsWith('http')){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
})();