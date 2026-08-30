(() => {
  'use strict';
  const nativeFetch = window.fetch.bind(window);
  const PLAYER_KEY = 'zxyh_monadfish_lite_player_v1';
  const SESSION_KEY = 'zxyh_monadfish_lite_session_v1';
  const CAST_KEY = 'zxyh_monadfish_lite_casts_v1';
  const LEADERBOARD_KEY = 'zxyh_monadfish_lite_leaderboard_v1';
  const SMOKE = new URLSearchParams(location.search).get('smoke') === '1';
            if (SMOKE) Math.random = () => 0.01;
  const fish = [
    {id:'carp',chance:45.14,price:4,xp:5},
    {id:'perch',chance:28,price:8,xp:10},
    {id:'bream',chance:15,price:18,xp:18},
    {id:'catfish',chance:8,price:38,xp:25},
    {id:'goldfish',chance:3,price:100,xp:50},
    {id:'mutant',chance:.8,price:400,xp:100},
    {id:'pike',chance:.05,price:5000,xp:500},
    {id:'leviathan',chance:.01,price:25000,xp:5000},
  ];
  const rodCosts = {1:1500,2:6000,3:12000,4:18000};
  const recipes = {
    lake_skewer:{ingredients:{carp:2},score:30},
    crispy_perch_plate:{ingredients:{perch:2},score:60},
    rare_bream_steak:{ingredients:{bream:2},score:120},
    deepwater_platter:{ingredients:{catfish:1,goldfish:1},score:260},
    cosmic_grill:{ingredients:{mutant:1},score:650},
  };
  const iso = () => new Date().toISOString();
  const today = () => new Date().toISOString().slice(0,10);
  const nextReset = () => new Date(Date.UTC(new Date().getUTCFullYear(),new Date().getUTCMonth(),new Date().getUTCDate()+1)).toISOString();
  const clone = v => JSON.parse(JSON.stringify(v));
  const safeJSON = (s,fallback) => { try { return JSON.parse(s); } catch { return fallback; } };
  const initialProgress = () => ({
    date:today(), tasks:{check_in:{progress:1,claimed:false},catch_10:{progress:0,claimed:false},rare_1:{progress:0,claimed:false},grill_1:{progress:0,claimed:false},spend_1000:{progress:0,claimed:false}},
    specialTasks:{invite_friend:{progress:0,claimed:false},wallet_check_in:{progress:0,claimed:false}},
    weeklyMissions:{catch_60_fish:{progress:0,claimed:false},catch_6_rare:{progress:0,claimed:false},cook_5_dishes:{progress:0,claimed:false},sell_3_dishes:{progress:0,claimed:false},cube_3_days:{progress:0,claimed:false},complete_1_premium_session:{progress:0,claimed:false}},
    wheelSpun:false,wheelPrize:null,dailyWheelRolls:0,dailyRollRewardGranted:false,paidWheelRolls:0,grillScore:0,dishesToday:0,
    collectionBook:null,rodMastery:null,premiumSession:null,fishingNet:null
  });
  const initialPlayer = () => ({
    wallet_address:'guest:monadfish-lite', coins:100, bait:0, daily_free_bait:15, daily_free_bait_reset_at:nextReset(), bonus_bait_granted_total:0,
    level:1,xp:0,xp_to_next:100,rod_level:0,equipped_rod:0,inventory:[],cooked_dishes:[],game_progress:initialProgress(),total_catches:0,login_streak:1,nft_rods:[],nickname:null,avatar_url:null,
    referrer_wallet_address:null,rewarded_referral_count:0,today_referral_attach_count:0,updated_at:iso()
  });
  const resetDaily = p => {
    if(!p.daily_free_bait_reset_at || Date.now() >= Date.parse(p.daily_free_bait_reset_at)){
      p.daily_free_bait = 15; p.daily_free_bait_reset_at = nextReset();
      p.game_progress = initialProgress();
    }
    return p;
  };
  const loadPlayer = () => {
    let p = safeJSON(localStorage.getItem(PLAYER_KEY), null) || initialPlayer();
    p = Object.assign(initialPlayer(), p);
    p.game_progress = Object.assign(initialProgress(), p.game_progress || {});
    resetDaily(p); savePlayer(p); return p;
  };
  const savePlayer = p => { p.updated_at=iso(); localStorage.setItem(PLAYER_KEY, JSON.stringify(p)); return p; };
  const getSession = () => {
    let s=safeJSON(localStorage.getItem(SESSION_KEY),null);
    if(!s){s={guest_id:'guest:monadfish-lite',session_token:'local-'+crypto.getRandomValues(new Uint32Array(2)).join('-')};localStorage.setItem(SESSION_KEY,JSON.stringify(s));}
    return s;
  };
  const json = (data,status=200) => Promise.resolve(new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}}));
  const bodyOf = init => { if(!init?.body) return {}; if(typeof init.body==='string') return safeJSON(init.body,{}); return {}; };
  const weightedFish = () => {
    let r=Math.random()*fish.reduce((s,f)=>s+f.chance,0),c=0;
    for(const f of fish){c+=f.chance;if(r<=c)return f;} return fish[0];
  };
  const addXp = (p,amount) => {
    let levelUp=null; p.xp += amount;
    while(p.xp >= p.xp_to_next){p.xp-=p.xp_to_next;p.level+=1;p.xp_to_next=p.level*100;const reward=50*p.level;p.coins+=reward;levelUp={newLevel:p.level,coinsReward:reward};}
    return levelUp;
  };
  const addInventory = (p,id) => {
    const item=p.inventory.find(x=>x.fishId===id); if(item){item.quantity+=1;item.caughtAt=iso();} else p.inventory.push({fishId:id,quantity:1,caughtAt:iso()});
  };
  const markCatchProgress = (p,f) => {
    const gp=p.game_progress||initialProgress();
    if(gp.tasks?.catch_10) gp.tasks.catch_10.progress=Math.min(10,(gp.tasks.catch_10.progress||0)+1);
    if(['bream','catfish','goldfish','mutant','pike','leviathan'].includes(f.id) && gp.tasks?.rare_1) gp.tasks.rare_1.progress=1;
    if(gp.weeklyMissions?.catch_60_fish) gp.weeklyMissions.catch_60_fish.progress=(gp.weeklyMissions.catch_60_fish.progress||0)+1;
    if(['bream','catfish','goldfish','mutant','pike','leviathan'].includes(f.id) && gp.weeklyMissions?.catch_6_rare) gp.weeklyMissions.catch_6_rare.progress=(gp.weeklyMissions.catch_6_rare.progress||0)+1;
    p.game_progress=gp;
  };
  const getCasts = () => safeJSON(sessionStorage.getItem(CAST_KEY),'{}') || {};
  const saveCasts = c => sessionStorage.setItem(CAST_KEY,JSON.stringify(c));
  const playerAction = body => {
    const action=String(body.action||''); let p=loadPlayer();
    if(action==='start_fishing_cast'){
      if((p.daily_free_bait||0)>0)p.daily_free_bait-=1; else if((p.bait||0)>0)p.bait-=1; else return json({error:'No bait left. Come back after the daily refill or buy bait.'},400);
      const id='cast-'+Date.now()+'-'+Math.random().toString(36).slice(2,7), casts=getCasts();
      casts[id]={startedAt:Date.now()};saveCasts(casts);savePlayer(p);
      return json({player:p,fishing_cast:{id,waitMs:SMOKE?80:900+Math.floor(Math.random()*1100),biteWindowMs:SMOKE?3000:2200,startedAt:iso(),consumedBucket:'daily_free_bait',resolveToken:'local'}});
    }
    if(action==='resolve_fishing_cast'){
      const success=body.resolution==='reel' && (SMOKE || Math.random()<0.72); let chosen=null,levelUp=null,xpGain=3;
      if(success){chosen=weightedFish();xpGain=chosen.xp+3;addInventory(p,chosen.id);p.total_catches+=1;markCatchProgress(p,chosen);} levelUp=addXp(p,xpGain);savePlayer(p);
      return json({player:p,fishing_result:{success,fishId:chosen?.id||null,xpGain,firstCatchBonus:0,levelUp,albumReward:null,monReward:null,specialReward:null,occurredAt:iso()}});
    }
    if(action==='sell_fish'){
      const id=String(body.fish_id||''), f=fish.find(x=>x.id===id), item=p.inventory.find(x=>x.fishId===id);
      if(!f||!item||item.quantity<1)return json({error:'Fish not available.'},400);item.quantity-=1;p.inventory=p.inventory.filter(x=>x.quantity>0);p.coins+=f.price;savePlayer(p);return json({player:p,sell_price:f.price});
    }
    if(action==='buy_bait'){
      const amount=Math.max(1,Number(body.amount||1)),cost=amount*80;if(p.coins<cost)return json({error:'Not enough gold.'},400);p.coins-=cost;p.bait+=amount;savePlayer(p);return json({player:p});
    }
    if(action==='buy_rod'){
      const level=Number(body.level||0),cost=rodCosts[level]||0;if(!cost||p.coins<cost)return json({error:'Not enough gold for this rod.'},400);p.coins-=cost;p.rod_level=Math.max(p.rod_level,level);p.equipped_rod=level;savePlayer(p);return json({player:p});
    }
    if(action==='equip_rod'){
      const level=Number(body.level||0);if(level>p.rod_level && !p.nft_rods.includes(level))return json({error:'Rod not owned.'},400);p.equipped_rod=level;savePlayer(p);return json({player:p});
    }
    if(action==='cook_recipe'){
      const id=String(body.recipe_id||''),r=recipes[id];if(!r)return json({error:'Recipe unavailable in Lite mode.'},400);
      for(const [fid,q] of Object.entries(r.ingredients)){const it=p.inventory.find(x=>x.fishId===fid);if(!it||it.quantity<q)return json({error:'Not enough fish.'},400);}
      for(const [fid,q] of Object.entries(r.ingredients)){const it=p.inventory.find(x=>x.fishId===fid);it.quantity-=q;}p.inventory=p.inventory.filter(x=>x.quantity>0);
      const dish=p.cooked_dishes.find(x=>x.recipeId===id);if(dish)dish.quantity+=1;else p.cooked_dishes.push({recipeId:id,quantity:1,createdAt:iso()});p.game_progress.dishesToday=(p.game_progress.dishesToday||0)+1;p.game_progress.grillScore=(p.game_progress.grillScore||0)+r.score;savePlayer(p);
      return json({player:p,leaderboard_entry:{id:'local',name:p.nickname||'Local angler',score:p.game_progress.grillScore,dishes:p.game_progress.dishesToday,updated_at:iso()}});
    }
    if(action==='sell_cooked_dish'){
      const id=String(body.recipe_id||''),r=recipes[id],dish=p.cooked_dishes.find(x=>x.recipeId===id);if(!r||!dish||dish.quantity<1)return json({error:'Dish not available.'},400);dish.quantity-=1;p.cooked_dishes=p.cooked_dishes.filter(x=>x.quantity>0);p.coins+=r.score;savePlayer(p);return json({player:p});
    }
    if(action==='claim_task_reward'){
      p.coins+=50;savePlayer(p);return json({player:p});
    }
    if(action==='get_mon_summary') return json({mon_summary:{totalEarnedMon:0,pendingHoldMon:0,withdrawableMon:0,pendingRequestMon:0,minWithdrawMon:1,holdDays:7}});
    if(action==='get_wallet_check_in_summary') return json({wallet_check_in_summary:{todayCheckedIn:false,streakDays:0,lastCheckInAt:null,lastCheckInDate:null,lastCheckInTxHash:null,receiverAddress:'',amountMon:'0',source:'local'}});
    if(action==='get_premium_session_state') return json({player:p,premium_session:null});
    if(action==='list_social_tasks') return json({verifications:[]});
    if(action==='submit_social_task_verification') return json({verification:{task_id:String(body.task_id||''),status:'verified',proof_url:body.proof_url||null,updated_at:iso(),verified_by_wallet:null}});
    if(action==='claim_social_task_reward') return json({player:p,verification:{task_id:String(body.task_id||''),status:'claimed',proof_url:null,updated_at:iso(),verified_by_wallet:null}});
    if(action==='update_grill_leaderboard'){
      const entry={id:'local',name:String(body.name||p.nickname||'Local angler').slice(0,24),score:p.game_progress.grillScore||0,dishes:p.game_progress.dishesToday||0,updated_at:iso()};localStorage.setItem(LEADERBOARD_KEY,JSON.stringify([entry]));return json({leaderboard_entry:entry});
    }
    if(action==='roll_cube'){
      const roll={id:'local-roll-'+Date.now(),cube_faces:[[{id:'coin_60',label:'60 coins',type:'coins',coins:60}]],target_face_index:0,target_tile_index:0,prize:{id:'coin_60',label:'60 coins',type:'coins',coins:60}};return json({player:p,roll});
    }
    if(action==='apply_cube_reward'){p.coins+=60;savePlayer(p);return json({player:p,prize:{id:'coin_60',label:'60 coins',type:'coins',coins:60}});}
    if(['buy_fishing_net','claim_fishing_net','mark_fishing_net_notified','buy_cube_rolls'].includes(action)){savePlayer(p);return json({player:p,claimed_catch:[],rolls:Number(body.rolls||0)});}
    return json({player:p,success:true});
  };
  window.fetch = function(input,init={}){
    let url; try{url=new URL(typeof input==='string'?input:input.url,location.href);}catch{return nativeFetch(input,init);}
    if(url.origin!==location.origin) return nativeFetch(input,init);
    const path=url.pathname;
    if(path==='/api/edge/guest-session'){
      const s=getSession(),p=loadPlayer();return json({guest_id:s.guest_id,session_token:s.session_token,player:p});
    }
    if(path==='/api/edge/player-actions') return playerAction(bodyOf(init));
    if(path==='/api/leaderboard/grill'){
      if(String(init.method||'GET').toUpperCase()==='DELETE') return Promise.resolve(new Response('',{status:204}));
      return json({entries:safeJSON(localStorage.getItem(LEADERBOARD_KEY),'[]')||[]});
    }
    if(path==='/api/player/avatar') return json({publicUrl:''});
    if(path.startsWith('/api/edge/')){
      const name=path.split('/').pop();
      if(name==='player-messages') return json({messages:[]});
      return json({success:true,player:loadPlayer(),messages:[]});
    }
    return nativeFetch(input,init);
  };
  window.__MONADFISH_LITE_READY__ = true;
  window.__MONADFISH_LITE_RESET__ = () => {localStorage.removeItem(PLAYER_KEY);localStorage.removeItem(SESSION_KEY);localStorage.removeItem(LEADERBOARD_KEY);location.reload();};
  const addBadge=()=>{
    if(document.getElementById('zxyh-lite-badge'))return;
    const d=document.createElement('div');d.id='zxyh-lite-badge';d.textContent='MonadFish Lite · 本地存档';
    d.style.cssText='position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:99999;background:rgba(0,0,0,.68);color:#bffcff;border:1px solid rgba(103,232,249,.35);border-radius:999px;padding:5px 10px;font:700 11px/1 system-ui;pointer-events:none;backdrop-filter:blur(8px)';document.body.appendChild(d);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addBadge);else addBadge();
})();
