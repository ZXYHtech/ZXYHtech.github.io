const openGames={
  dockpull:{title:'Dock & Pull',icon:'🎣',url:'/fish/games/dock-pull/',license:'MIT',repo:'DollarAlchemy/Fish1',note:'触屏抛竿→等咬口→连点收线；鱼获、商店、鱼竿和本地存档。',health:(w,d)=>({ready:w.__DOCK_PULL_READY__===true,ui:!!d.querySelector('#water-canvas'),state:d.querySelector('#water-status')?.textContent?.includes('TAP')})},
  ikutan:{title:'Fishing Game',icon:'🐟',url:'/fish/games/ikutan-fishing/',license:'MIT',repo:'ikutan7/ikutan7.github.io',note:'选饵→抛竿→等鱼口→点完收线按钮；多鱼种、昼夜和鱼获记录。',health:(w,d)=>({ready:w.__IKUTAN_FISH_READY__===true,ui:!!d.querySelector('#castBtn'),state:d.querySelector('#log')?.textContent?.includes('准备好')})}
};
function games(){
  if(openGames[S.gameScreen])return externalGame(S.gameScreen);
  S.gameScreen='hub';setGameChrome(false);
  shell(`<div class="hero"><span class="eyebrow">开源小游戏 · 同源镜像</span><h1>只上经过实玩检查的游戏。</h1><div class="lead">两款都已放到本站目录，不再依赖第三方游戏页面。每款都必须通过手机尺寸 Chromium 自动点击测试才保留。</div></div>
  <div class="gamegrid">${Object.entries(openGames).map(([id,g])=>`<button class="gamecard" data-game="${id}"><span class="gicon">${g.icon}</span><b>${g.title}</b><small>${g.note}</small><span class="badge">${g.license} · 本站镜像</span></button>`).join('')}</div>
  <section class="card"><span class="eyebrow">验收规则</span><div class="sub">许可证→同源资源→脚本初始化→手机触控→实际完成核心玩法。Pages 只显示构建成功不算验收。</div></section>`,'小游戏');
  app.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{S.gameScreen=b.dataset.game;games()});
}
function gameBack(){S.gameScreen='hub';setGameChrome(false);games()}
function externalGame(id){
  const g=openGames[id];stopCam();setGameChrome(true);
  app.innerHTML=`<div class="game-stage"><div class="game-topbar"><button id="gameBack" class="game-back">← 换游戏</button><div class="game-name"><b>${g.icon} ${g.title}</b><small>${g.license} · ${g.repo}</small></div><button id="gameReload" class="game-reload">↻</button></div><div class="game-viewport"><div id="gameLoading" class="game-loading">正在载入并检查 ${g.title}…</div><iframe id="gameFrame" class="gameframe-full" src="${g.url}?hostbuild=PLAYFIX3" title="${g.title}" allow="fullscreen; autoplay; gamepad" loading="eager"></iframe></div><div id="gameHint" class="game-hint">等待运行检查…</div></div>`;
  const frame=document.querySelector('#gameFrame'),loading=document.querySelector('#gameLoading'),hint=document.querySelector('#gameHint');
  document.querySelector('#gameBack').onclick=gameBack;
  document.querySelector('#gameReload').onclick=()=>{loading.style.display='grid';hint.textContent='重新载入并检查…';hint.className='game-hint';frame.src=g.url+'?reload='+Date.now()};
  frame.onload=()=>{
    try{
      const w=frame.contentWindow,d=frame.contentDocument,okOrigin=w.location.origin===location.origin,h=g.health(w,d),ok=okOrigin&&h.ready&&h.ui&&h.state;
      loading.style.display='none';
      if(ok){hint.textContent='✅ 运行检查通过。可以开始玩。';hint.classList.add('loaded','pass')}
      else{hint.textContent=`⚠️ 运行检查未通过：origin ${okOrigin?'✓':'×'} / script ${h.ready?'✓':'×'} / ui ${h.ui?'✓':'×'} / state ${h.state?'✓':'×'}`;hint.classList.add('warn')}
    }catch(err){loading.style.display='none';hint.textContent='⚠️ 无法完成运行检查：'+err.message;hint.classList.add('warn')}
  };
  setTimeout(()=>{if(loading.style.display!=='none'){hint.textContent='⚠️ 10秒内未完成加载，请返回游戏中心。';hint.classList.add('warn')}},10000);
}
