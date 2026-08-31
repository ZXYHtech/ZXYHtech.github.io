const openGames={
  monadfish:{title:'MonadFish 中文版',icon:'🌌',url:'/fish/games/monadfish/play-v15-unified.html',license:'MIT',repo:'KaimiEwl/fishing-game',note:'V15 统一场景版：人物、船、鱼竿、鱼线与浮漂进入同一 Canvas 链；咬钩后人物起身搏鱼，鱼线实时连接当前可见竿尖。',health:(w,d)=>{const v=w.__MONADFISH_V15_CHECK__?.();return{ready:w.__MONADFISH_LITE_READY__===true&&w.__MONADFISH_RELEASE__==='V15-UNIFIED'&&w.__MONADFISH_V15_UNIFIED__===true&&!!w.__MONADFISH_GAMEPLAY_V8__,ui:!!d.querySelector('button[aria-label="Cast line"],button[aria-label="Hook fish"],button[aria-label="抛竿"],button[aria-label="提竿"]'),state:!!v&&v.assetsReady===true&&v.canvasHooked===true&&v.oldOverlayHidden===true}}},
  dockpull:{title:'Dock & Pull',icon:'🎣',url:'/fish/games/dock-pull/',license:'MIT',repo:'DollarAlchemy/Fish1',note:'触屏抛竿→等咬口→连点收线；鱼获、商店、鱼竿和本地存档。',health:(w,d)=>({ready:w.__DOCK_PULL_READY__===true,ui:!!d.querySelector('#water-canvas'),state:d.querySelector('#water-status')?.textContent?.includes('TAP')})},
  ikutan:{title:'Fishing Game',icon:'🐟',url:'/fish/games/ikutan-fishing/',license:'MIT',repo:'ikutan7/ikutan7.github.io',note:'选饵→抛竿→等鱼口→点完收线按钮；多鱼种、昼夜和鱼获记录。',health:(w,d)=>({ready:w.__IKUTAN_FISH_READY__===true,ui:!!d.querySelector('#castBtn'),state:d.querySelector('#log')?.textContent?.includes('准备好')})}
};
function games(){
  if(openGames[S.gameScreen])return externalGame(S.gameScreen);
  S.gameScreen='hub';setGameChrome(false);
  shell(`<div class="hero"><span class="eyebrow">开源小游戏 · 同源镜像</span><h1>只上经过实玩检查的游戏。</h1><div class="lead">MonadFish V15 不再外挂一个与原鱼线无关的人物：人物动作直接替换主 Canvas 中的旧人物/船图，并把原鱼线起点实时改到当前可见鱼竿尖端。</div></div>
  <div class="gamegrid">${Object.entries(openGames).map(([id,g])=>`<button class="gamecard" data-game="${id}"><span class="gicon">${g.icon}</span><b>${g.title}</b><small>${g.note}</small><span class="badge">${g.license} · 本站镜像</span></button>`).join('')}</div>
  <section class="card"><span class="eyebrow">验收规则</span><div class="sub">许可证→同源资源→脚本初始化→手机触控→实际完成核心玩法。Pages 只显示构建成功不算验收。</div></section>`,'小游戏');
  app.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{S.gameScreen=b.dataset.game;games()});
}
function gameBack(){S.gameScreen='hub';setGameChrome(false);games()}
function externalGame(id){
  const g=openGames[id];stopCam();setGameChrome(true);
  const release=id==='monadfish'?'MFV15-UNIFIED':'PLAYFIX4';
  app.innerHTML=`<div class="game-stage"><div class="game-topbar"><button id="gameBack" class="game-back">← 换游戏</button><div class="game-name"><b>${g.icon} ${g.title}</b><small>${g.license} · ${g.repo}</small></div><button id="gameReload" class="game-reload">↻</button></div><div class="game-viewport"><div id="gameLoading" class="game-loading">正在载入并检查 ${g.title}…</div><iframe id="gameFrame" class="gameframe-full" src="${g.url}?hostbuild=${release}" title="${g.title}" allow="fullscreen; autoplay; gamepad; accelerometer; gyroscope" loading="eager"></iframe></div><div id="gameHint" class="game-hint">等待运行检查…</div></div>`;
  const frame=document.querySelector('#gameFrame'),loading=document.querySelector('#gameLoading'),hint=document.querySelector('#gameHint');
  document.querySelector('#gameBack').onclick=gameBack;
  const resetHint=()=>{loading.style.display='grid';hint.textContent='重新载入并检查…';hint.className='game-hint'};
  document.querySelector('#gameReload').onclick=()=>{resetHint();frame.src=g.url+'?reload='+Date.now()+'&hostbuild='+release};
  const checkRuntime=(attempt=0)=>{
    try{
      const w=frame.contentWindow,d=frame.contentDocument,okOrigin=w.location.origin===location.origin,h=g.health(w,d),ok=okOrigin&&h.ready&&h.ui&&h.state;
      if(ok){loading.style.display='none';hint.textContent='✅ V15 运行检查通过：统一人物已在主 Canvas 绘制，旧人物层已关闭。';hint.className='game-hint loaded pass';return}
      if(attempt<80){setTimeout(()=>checkRuntime(attempt+1),250);return}
      loading.style.display='none';hint.textContent=`⚠️ 运行检查未通过：origin ${okOrigin?'✓':'×'} / script ${h.ready?'✓':'×'} / ui ${h.ui?'✓':'×'} / unified-canvas ${h.state?'✓':'×'}`;hint.className='game-hint warn';
    }catch(err){
      if(attempt<80){setTimeout(()=>checkRuntime(attempt+1),250);return}
      loading.style.display='none';hint.textContent='⚠️ 无法完成运行检查：'+err.message;hint.className='game-hint warn';
    }
  };
  frame.onload=()=>checkRuntime(0);
}
