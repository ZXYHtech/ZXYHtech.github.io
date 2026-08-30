const openGames={
  dockpull:{title:'Dock & Pull',icon:'🎣',url:'/fish/games/dock-pull/',license:'MIT',repo:'DollarAlchemy/Fish1',note:'手机触控钓鱼：点水面抛竿 → 等咬口 → 连点收线；还有鱼获、商店、鱼竿和本地存档。'}
};
function games(){
  if(openGames[S.gameScreen])return externalGame(S.gameScreen);
  S.gameScreen='hub';setGameChrome(false);
  shell(`<div class="hero"><span class="eyebrow">开源小游戏 · 同源镜像</span><h1>先放一款真正稳定的。</h1><div class="lead">已把外链游戏全部下架。现在只显示已经镜像到本站、无需第三方 API/CDN 的游戏；第二款通过相同验收后再加入。</div></div>
  <div class="gamegrid">${Object.entries(openGames).map(([id,g])=>`<button class="gamecard" data-game="${id}"><span class="gicon">${g.icon}</span><b>${g.title}</b><small>${g.note}</small><span class="badge">${g.license} · 本站镜像</span></button>`).join('')}</div>
  <section class="card"><span class="eyebrow">来源与验收</span><div class="sub">保留原项目许可证与作者信息。进入游戏后会自动检查：同源页面、Canvas、主脚本是否真正初始化；不是只看 iframe 有没有加载。</div></section>`,'小游戏');
  app.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{S.gameScreen=b.dataset.game;games()});
}
function gameBack(){S.gameScreen='hub';setGameChrome(false);games()}
function externalGame(id){
  const g=openGames[id];stopCam();setGameChrome(true);
  app.innerHTML=`<div class="game-stage"><div class="game-topbar"><button id="gameBack" class="game-back">← 换游戏</button><div class="game-name"><b>${g.icon} ${g.title}</b><small>${g.license} · ${g.repo}</small></div><button id="gameReload" class="game-reload">↻</button></div><div class="game-viewport"><div id="gameLoading" class="game-loading">正在载入并检查 ${g.title}…</div><iframe id="gameFrame" class="gameframe-full" src="${g.url}?hostbuild=PLAYFIX2" title="${g.title}" allow="fullscreen; autoplay; gamepad" loading="eager"></iframe></div><div id="gameHint" class="game-hint">等待运行检查…</div></div>`;
  const frame=document.querySelector('#gameFrame'),loading=document.querySelector('#gameLoading'),hint=document.querySelector('#gameHint');
  document.querySelector('#gameBack').onclick=gameBack;
  document.querySelector('#gameReload').onclick=()=>{loading.style.display='grid';hint.textContent='重新载入并检查…';hint.className='game-hint';frame.src=g.url+'?reload='+Date.now()};
  frame.onload=()=>{
    try{
      const w=frame.contentWindow,d=frame.contentDocument;
      const okOrigin=w.location.origin===location.origin;
      const okCanvas=!!d.querySelector('#water-canvas');
      const okReady=w.__DOCK_PULL_READY__===true;
      const okStatus=d.querySelector('#water-status')?.textContent?.includes('TAP');
      loading.style.display='none';
      if(okOrigin&&okCanvas&&okReady&&okStatus){hint.textContent='✅ 运行检查通过：画布、触控主循环和初始化状态均已就绪。点水面即可抛竿。';hint.classList.add('loaded','pass');}
      else{hint.textContent=`⚠️ 运行检查未通过：origin ${okOrigin?'✓':'×'} / canvas ${okCanvas?'✓':'×'} / script ${okReady?'✓':'×'} / state ${okStatus?'✓':'×'}`;hint.classList.add('warn');}
    }catch(err){loading.style.display='none';hint.textContent='⚠️ 无法完成运行检查：'+err.message;hint.classList.add('warn');}
  };
  setTimeout(()=>{if(loading.style.display!=='none'){hint.textContent='⚠️ 10秒内未完成加载，请返回游戏中心。';hint.classList.add('warn')}},10000);
}
