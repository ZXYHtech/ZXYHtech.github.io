(() => {
  'use strict';
  const HISTORY_KEY='zxyh_monadfish_feature_rewards_v5';
  const PENDING_KEY='zxyh_monadfish_pending_rewards_v5';
  const day=()=>new Date().toISOString().slice(0,10);
  const safe=(s,f)=>{try{return JSON.parse(s)}catch{return f}};
  const definitions=[
    {id:'inventory',re:/open inventory|鱼篓|inventory/i,coins:60,rolls:0,label:'查看鱼篓'},
    {id:'tasks',re:/^任务$|daily tasks|weekly missions/i,coins:50,rolls:0,label:'体验任务'},
    {id:'shop',re:/^商店$|^shop$/i,coins:50,rolls:0,label:'查看商店'},
    {id:'grill',re:/^烧烤$|^grill$/i,coins:70,rolls:0,label:'体验烧烤'},
    {id:'cube',re:/^魔方$|^cube$|幸运魔方/i,coins:60,rolls:1,label:'体验幸运魔方'},
    {id:'leaderboard',re:/排行|leaderboard|board/i,coins:50,rolls:0,label:'查看排行榜'},
    {id:'map',re:/地图|航海|travel map|map/i,coins:60,rolls:0,label:'探索地图'},
    {id:'guide',re:/游戏说明|how to play|guide/i,coins:40,rolls:0,label:'阅读游戏说明'}
  ];
  function toast(text){
    const old=document.getElementById('zxyh-explore-reward-toast');old?.remove();
    const el=document.createElement('div');el.id='zxyh-explore-reward-toast';el.textContent=text;
    el.style.cssText='position:fixed;left:50%;top:max(64px,calc(env(safe-area-inset-top) + 54px));transform:translateX(-50%);z-index:2147483646;max-width:calc(100vw - 28px);padding:9px 14px;border-radius:999px;background:rgba(5,46,22,.94);border:1px solid rgba(134,239,172,.55);color:#dcfce7;font:800 12px/1.3 "Noto Sans SC","Microsoft YaHei",system-ui,sans-serif;box-shadow:0 12px 32px rgba(0,0,0,.35);pointer-events:none;text-align:center';
    document.body.appendChild(el);setTimeout(()=>el.remove(),1600);
  }
  function grant(id,coins=0,rolls=0,label='探索奖励'){
    const d=day(),history=safe(localStorage.getItem(HISTORY_KEY),'{}')||{};
    if(history.date!==d){history.date=d;history.claimed=[];}
    history.claimed=Array.isArray(history.claimed)?history.claimed:[];
    if(history.claimed.includes(id))return false;
    history.claimed.push(id);localStorage.setItem(HISTORY_KEY,JSON.stringify(history));
    const pending=safe(localStorage.getItem(PENDING_KEY),'{}')||{};
    pending.coins=Math.max(0,Number(pending.coins||0))+Math.max(0,Number(coins||0));
    pending.rolls=Math.max(0,Number(pending.rolls||0))+Math.max(0,Number(rolls||0));
    pending.bait=Math.max(0,Number(pending.bait||0));
    localStorage.setItem(PENDING_KEY,JSON.stringify(pending));
    const extra=rolls?` · +${rolls} 次抽奖`:'';toast(`${label}奖励 +${coins} 金币${extra}`);
    return true;
  }
  document.addEventListener('click',e=>{
    const el=e.target?.closest?.('button,a,[role="button"],[role="tab"],[aria-label]');if(!el)return;
    const text=[el.textContent||'',el.getAttribute('aria-label')||'',el.getAttribute('title')||''].join(' ').trim();
    for(const item of definitions){if(item.re.test(text)){grant(item.id,item.coins,item.rolls,item.label);break;}}
  },true);
  if(/\/fish\/app-v\d+|\/fish\/?/i.test(document.referrer||''))grant('fish_hub',100,0,'从钓鱼首页进入');
  setTimeout(()=>grant('stay_90s',80,0,'持续体验'),90000);
  window.__MONADFISH_EXPLORATION_REWARDS_V5__=true;
})();
