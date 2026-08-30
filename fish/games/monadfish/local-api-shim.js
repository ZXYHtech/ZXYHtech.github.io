(() => {
  'use strict';
  const nativeFetch = window.fetch.bind(window);
  const PLAYER_KEY = 'zxyh_monadfish_lite_player_v1';
  const SESSION_KEY = 'zxyh_monadfish_lite_session_v1';
  const CAST_KEY = 'zxyh_monadfish_lite_casts_v1';
  const ROLL_KEY = 'zxyh_monadfish_cube_rolls_v5';
  const LEADERBOARD_KEY = 'zxyh_monadfish_lite_leaderboard_v1';
  const RECENT_FISH_KEY = 'zxyh_monadfish_recent_fish_v2';
  const PENDING_REWARD_KEY = 'zxyh_monadfish_pending_rewards_v5';
  const ECONOMY_MIGRATION_KEY = 'zxyh_monadfish_economy_v5_migrated';
  const DAILY_FREE_BAIT = 30;
  const DAILY_CUBE_ROLLS = 5;
  const DAILY_COIN_STIPEND = 180;
  const BAIT_UNIT_COST = 12;
  const CATCH_CUBE_INTERVAL = 4;
  const SMOKE = new URLSearchParams(location.search).get('smoke') === '1';
  if (SMOKE) Math.random = () => 0.01;

  const fish = [
    {id:'carp',chance:26,price:24,xp:5},
    {id:'perch',chance:18,price:32,xp:10},
    {id:'tilapia',chance:12,price:26,xp:6},
    {id:'trout',chance:10,price:45,xp:12},
    {id:'bass',chance:8,price:58,xp:14},
    {id:'bream',chance:8,price:72,xp:18},
    {id:'koi',chance:6,price:110,xp:22},
    {id:'eel',chance:4,price:150,xp:28},
    {id:'catfish',chance:4,price:175,xp:25},
    {id:'goldfish',chance:2.5,price:380,xp:50},
    {id:'tuna',chance:.8,price:520,xp:45},
    {id:'mutant',chance:.55,price:1200,xp:100},
    {id:'pike',chance:.1,price:9000,xp:500},
    {id:'leviathan',chance:.05,price:35000,xp:5000},
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
  const safeJSON = (s,fallback) => { try { return JSON.parse(s); } catch { return fallback; } };
  const initialProgress = () => ({
    date:today(), tasks:{check_in:{progress:1,claimed:false},catch_10:{progress:0,claimed:false},rare_1:{progress:0,claimed:false},grill_1:{progress:0,claimed:false},spend_1000:{progress:0,claimed:false}},
    specialTasks:{invite_friend:{progress:0,claimed:false},wallet_check_in:{progress:0,claimed:false}},
    weeklyMissions:{catch_60_fish:{progress:0,claimed:false},catch_6_rare:{progress:0,claimed:false},cook_5_dishes:{progress:0,claimed:false},sell_3_dishes:{progress:0,claimed:false},cube_3_days:{progress:0,claimed:false},complete_1_premium_session:{progress:0,claimed:false}},
    wheelSpun:false,wheelPrize:null,dailyWheelRolls:DAILY_CUBE_ROLLS,dailyRollRewardGranted:false,paidWheelRolls:0,grillScore:0,dishesToday:0,
    collectionBook:null,rodMastery:null,premiumSession:null,fishingNet:null
  });
  const initialPlayer = () => ({
    wallet_address:'guest:monadfish-lite', coins:300, bait:0, daily_free_bait:DAILY_FREE_BAIT, daily_free_bait_reset_at:nextReset(), bonus_bait_granted_total:0,
    level:1,xp:0,xp_to_next:100,rod_level:0,equipped_rod:0,inventory:[],cooked_dishes:[],game_progress:initialProgress(),total_catches:0,login_streak:1,nft_rods:[],nickname:null,avatar_url:null,
    referrer_wallet_address:null,rewarded_referral_count:0,today_referral_attach_count:0,updated_at:iso()
  });
  const savePlayer = p => { p.updated_at=iso(); localStorage.setItem(PLAYER_KEY, JSON.stringify(p)); return p; };
  const applyPendingRewards = p => {
    const q=safeJSON(localStorage.getItem(PENDING_REWARD_KEY),'{}')||{};
    const coins=Math.max(0,Number(q.coins||0)),bait=Math.max(0,Number(q.bait||0)),rolls=Math.max(0,Number(q.rolls||0));
    if(coins||bait||rolls){
      p.coins=Math.max(0,Number(p.coins||0))+coins;
      p.bait=Math.max(0,Number(p.bait||0))+bait;
      p.game_progress=p.game_progress||initialProgress();
      p.game_progress.dailyWheelRolls=Math.max(0,Number(p.game_progress.dailyWheelRolls||0))+rolls;
      localStorage.removeItem(PENDING_REWARD_KEY);
    }
    return p;
  };
  const migrateEconomyV5 = p => {
    if(localStorage.getItem(ECONOMY_MIGRATION_KEY)==='1') return p;
    p.coins=Math.max(300,Number(p.coins||0));
    p.daily_free_bait=Math.max(DAILY_FREE_BAIT,Number(p.daily_free_bait||0));
    p.game_progress=p.game_progress||initialProgress();
    p.game_progress.dailyWheelRolls=Math.max(DAILY_CUBE_ROLLS,Number(p.game_progress.dailyWheelRolls||0));
    localStorage.setItem(ECONOMY_MIGRATION_KEY,'1');
    return p;
  };
  const resetDaily = p => {
    if(!p.daily_free_bait_reset_at || Date.now() >= Date.parse(p.daily_free_bait_reset_at)){
      const old=p.game_progress||{};
      p.daily_free_bait=DAILY_FREE_BAIT;
      p.daily_free_bait_reset_at=nextReset();
      p.coins=Math.max(0,Number(p.coins||0))+DAILY_COIN_STIPEND;
      p.game_progress=Object.assign(initialProgress(),{grillScore:Number(old.grillScore||0)});
    }
    return p;
  };
  const loadPlayer = () => {
    let p=safeJSON(localStorage.getItem(PLAYER_KEY),null)||initialPlayer();
    p=Object.assign(initialPlayer(),p);
    p.game_progress=Object.assign(initialProgress(),p.game_progress||{});
    resetDaily(p);migrateEconomyV5(p);applyPendingRewards(p);savePlayer(p);return p;
  };
  const getSession = () => {
    let s=safeJSON(localStorage.getItem(SESSION_KEY),null);
    if(!s){s={guest_id:'guest:monadfish-lite',session_token:'local-'+crypto.getRandomValues(new Uint32Array(2)).join('-')};localStorage.setItem(SESSION_KEY,JSON.stringify(s));}
    return s;
  };
  const json = (data,status=200) => Promise.resolve(new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}}));
  const bodyOf = init => { if(!init?.body) return {}; if(typeof init.body==='string') return safeJSON(init.body,{}); return {}; };
  const getRecentFish = () => safeJSON(sessionStorage.getItem(RECENT_FISH_KEY),'[]') || [];
  const rememberFish = id => { const recent=[id,...getRecentFish().filter(x=>x!==id)].slice(0,4);sessionStorage.setItem(RECENT_FISH_KEY,JSON.stringify(recent)); };
  const weightedFish = p => {
    const recent=getRecentFish();
    const discovered=new Set((p?.inventory||[]).filter(x=>x.quantity>0).map(x=>x.fishId));
    const weighted=fish.map(f=>{let weight=f.chance;const pos=recent.indexOf(f.id);if(pos===0)weight*=.18;else if(pos===1)weight*=.48;else if(pos>=2)weight*=.72;if(!discovered.has(f.id)&&f.chance>=.5)weight*=1.35;return {...f,weight};});
    const total=weighted.reduce((s,f)=>s+f.weight,0);let r=Math.random()*total,c=0;
    for(const f of weighted){c+=f.weight;if(r<=c){rememberFish(f.id);return f;}}rememberFish(weighted[0].id);return weighted[0];
  };
  const addXp = (p,amount) => {let levelUp=null;p.xp+=amount;while(p.xp>=p.xp_to_next){p.xp-=p.xp_to_next;p.level+=1;p.xp_to_next=p.level*100;const reward=75*p.level;p.coins+=reward;levelUp={newLevel:p.level,coinsReward:reward};}return levelUp;};
  const addInventory = (p,id) => {const item=p.inventory.find(x=>x.fishId===id);if(item){item.quantity+=1;item.caughtAt=iso();}else p.inventory.push({fishId:id,quantity:1,caughtAt:iso()});};
  const markCatchProgress = (p,f) => {
    const gp=p.game_progress||initialProgress();
    if(gp.tasks?.catch_10)gp.tasks.catch_10.progress=Math.min(10,(gp.tasks.catch_10.progress||0)+1);
    if(['bream','koi','eel','catfish','goldfish','tuna','mutant','pike','leviathan'].includes(f.id)&&gp.tasks?.rare_1)gp.tasks.rare_1.progress=1;
    if(gp.weeklyMissions?.catch_60_fish)gp.weeklyMissions.catch_60_fish.progress=(gp.weeklyMissions.catch_60_fish.progress||0)+1;
    if(['bream','koi','eel','catfish','goldfish','tuna','mutant','pike','leviathan'].includes(f.id)&&gp.weeklyMissions?.catch_6_rare)gp.weeklyMissions.catch_6_rare.progress=(gp.weeklyMissions.catch_6_rare.progress||0)+1;
    p.game_progress=gp;
  };
  const getCasts = () => safeJSON(sessionStorage.getItem(CAST_KEY),'{}') || {};
  const saveCasts = c => sessionStorage.setItem(CAST_KEY,JSON.stringify(c));
  const playerAction = body => {
    const action=String(body.action||'');let p=loadPlayer();
    if(action==='start_fishing_cast'){
      if((p.daily_free_bait||0)>0)p.daily_free_bait-=1;else if((p.bait||0)>0)p.bait-=1;else return json({error:'鱼饵不足。每天会补充 30 个免费鱼饵，也可以去商店低价补充。'},400);
      const id='cast-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),casts=getCasts();casts[id]={startedAt:Date.now()};saveCasts(casts);savePlayer(p);
      return json({player:p,fishing_cast:{id,waitMs:SMOKE?80:900+Math.floor(Math.random()*1100),biteWindowMs:SMOKE?3000:2200,startedAt:iso(),consumedBucket:'daily_free_bait',resolveToken:'local'}});
    }
    if(action==='resolve_fishing_cast'){
      const success=body.resolution==='reel'&&(SMOKE||Math.random()<.78);let chosen=null,levelUp=null,xpGain=3,landingCoins=0,cubeRollReward=0;
      if(success){
        chosen=weightedFish(p);xpGain=chosen.xp+3;addInventory(p,chosen.id);p.total_catches+=1;markCatchProgress(p,chosen);
        landingCoins=Math.max(8,Math.round(chosen.price*.25));p.coins+=landingCoins;
        if(p.total_catches%CATCH_CUBE_INTERVAL===0){p.game_progress.dailyWheelRolls=Math.max(0,Number(p.game_progress.dailyWheelRolls||0))+1;cubeRollReward=1;}
      }
      levelUp=addXp(p,xpGain);savePlayer(p);
      return json({player:p,fishing_result:{success,fishId:chosen?.id||null,xpGain,coinReward:landingCoins,cubeRollReward,firstCatchBonus:0,levelUp,albumReward:null,monReward:null,specialReward:null,occurredAt:iso()}});
    }
    if(action==='sell_fish'){
      const id=String(body.fish_id||''),f=fish.find(x=>x.id===id),item=p.inventory.find(x=>x.fishId===id);
      if(!f||!item||item.quantity<1)return json({error:'没有可出售的这条鱼。'},400);item.quantity-=1;p.inventory=p.inventory.filter(x=>x.quantity>0);p.coins+=f.price;savePlayer(p);return json({player:p,sell_price:f.price});
    }
    if(action==='buy_bait'){
      const amount=Math.max(1,Number(body.amount||1)),cost=amount*BAIT_UNIT_COST;if(p.coins<cost)return json({error:`金币不足，需要 ${cost} 金币。`},400);p.coins-=cost;p.bait+=amount;savePlayer(p);return json({player:p,cost});
    }
    if(action==='buy_rod'){
      const level=Number(body.level||0),cost=rodCosts[level]||0;if(!cost||p.coins<cost)return json({error:'金币不足，暂时买不起这根鱼竿。'},400);p.coins-=cost;p.rod_level=Math.max(p.rod_level,level);p.equipped_rod=level;savePlayer(p);return json({player:p});
    }
    if(action==='equip_rod'){
      const level=Number(body.level||0);if(level>p.rod_level&&!p.nft_rods.includes(level))return json({error:'这根鱼竿尚未拥有。'},400);p.equipped_rod=level;savePlayer(p);return json({player:p});
    }
    if(action==='cook_recipe'){
      const id=String(body.recipe_id||''),r=recipes[id];if(!r)return json({error:'当前版本暂不支持这份菜谱。'},400);
      for(const [fid,q] of Object.entries(r.ingredients)){const it=p.inventory.find(x=>x.fishId===fid);if(!it||it.quantity<q)return json({error:'鱼获数量不足，无法烹饪。'},400);}
      for(const [fid,q] of Object.entries(r.ingredients)){const it=p.inventory.find(x=>x.fishId===fid);it.quantity-=q;}p.inventory=p.inventory.filter(x=>x.quantity>0);
      const dish=p.cooked_dishes.find(x=>x.recipeId===id);if(dish)dish.quantity+=1;else p.cooked_dishes.push({recipeId:id,quantity:1,createdAt:iso()});p.game_progress.dishesToday=(p.game_progress.dishesToday||0)+1;p.game_progress.grillScore=(p.game_progress.grillScore||0)+r.score;savePlayer(p);
      return json({player:p,leaderboard_entry:{id:'local',name:p.nickname||'钓手',score:p.game_progress.grillScore,dishes:p.game_progress.dishesToday,updated_at:iso()}});
    }
    if(action==='sell_cooked_dish'){
      const id=String(body.recipe_id||''),r=recipes[id],dish=p.cooked_dishes.find(x=>x.recipeId===id);if(!r||!dish||dish.quantity<1)return json({error:'没有可出售的这份料理。'},400);dish.quantity-=1;p.cooked_dishes=p.cooked_dishes.filter(x=>x.quantity>0);p.coins+=r.score*2;savePlayer(p);return json({player:p});
    }
    if(action==='claim_task_reward'){p.coins+=80;savePlayer(p);return json({player:p});}
    if(action==='get_mon_summary')return json({mon_summary:{totalEarnedMon:0,pendingHoldMon:0,withdrawableMon:0,pendingRequestMon:0,minWithdrawMon:1,holdDays:7}});
    if(action==='get_wallet_check_in_summary')return json({wallet_check_in_summary:{todayCheckedIn:false,streakDays:0,lastCheckInAt:null,lastCheckInDate:null,lastCheckInTxHash:null,receiverAddress:'',amountMon:'0',source:'local'}});
    if(action==='get_premium_session_state')return json({player:p,premium_session:null});
    if(action==='list_social_tasks')return json({verifications:[]});
    if(action==='submit_social_task_verification')return json({verification:{task_id:String(body.task_id||''),status:'verified',proof_url:body.proof_url||null,updated_at:iso(),verified_by_wallet:null}});
    if(action==='claim_social_task_reward')return json({player:p,verification:{task_id:String(body.task_id||''),status:'claimed',proof_url:null,updated_at:iso(),verified_by_wallet:null}});
    if(action==='update_grill_leaderboard'){
      const entry={id:'local',name:String(body.name||p.nickname||'钓手').slice(0,24),score:p.game_progress.grillScore||0,dishes:p.game_progress.dishesToday||0,updated_at:iso()};localStorage.setItem(LEADERBOARD_KEY,JSON.stringify([entry]));return json({leaderboard_entry:entry});
    }
    if(action==='roll_cube'){
      const r=Math.random();
      const prize=r<.40?{id:'coin_80',label:'80 金币',type:'coins',coins:80}:r<.68?{id:'coin_150',label:'150 金币',type:'coins',coins:150}:r<.86?{id:'bait_5',label:'5 鱼饵',type:'bait',bait:5}:r<.97?{id:'coin_300',label:'300 金币',type:'coins',coins:300}:{id:'bait_12',label:'12 鱼饵',type:'bait',bait:12};
      const roll={id:'local-roll-'+Date.now(),cube_faces:[[prize]],target_face_index:0,target_tile_index:0,prize};
      const rolls=safeJSON(sessionStorage.getItem(ROLL_KEY),'{}')||{};rolls[roll.id]=prize;sessionStorage.setItem(ROLL_KEY,JSON.stringify(rolls));
      return json({player:p,roll});
    }
    if(action==='apply_cube_reward'){
      const rolls=safeJSON(sessionStorage.getItem(ROLL_KEY),'{}')||{};const rollId=String(body.roll_id||'');const prize=rolls[rollId]||{id:'coin_80',label:'80 金币',type:'coins',coins:80};
      delete rolls[rollId];sessionStorage.setItem(ROLL_KEY,JSON.stringify(rolls));
      const coins=Math.max(0,Number(prize.coins||0)),bait=Math.max(0,Number(prize.bait||0));p.coins+=coins;p.bait+=bait;savePlayer(p);return json({player:p,prize});
    }
    if(['buy_fishing_net','claim_fishing_net','mark_fishing_net_notified','buy_cube_rolls'].includes(action)){savePlayer(p);return json({player:p,claimed_catch:[],rolls:Number(body.rolls||0)});}
    return json({player:p,success:true});
  };
  window.fetch = function(input,init={}){
    let url;try{url=new URL(typeof input==='string'?input:input.url,location.href);}catch{return nativeFetch(input,init);}
    if(url.origin!==location.origin)return nativeFetch(input,init);
    const path=url.pathname;
    if(path==='/api/edge/guest-session'){const s=getSession(),p=loadPlayer();return json({guest_id:s.guest_id,session_token:s.session_token,player:p});}
    if(path==='/api/edge/player-actions')return playerAction(bodyOf(init));
    if(path==='/api/leaderboard/grill'){
      if(String(init.method||'GET').toUpperCase()==='DELETE')return Promise.resolve(new Response('',{status:204}));
      return json({entries:safeJSON(localStorage.getItem(LEADERBOARD_KEY),'[]')||[]});
    }
    if(path==='/api/player/avatar')return json({publicUrl:''});
    if(path.startsWith('/api/edge/')){const name=path.split('/').pop();if(name==='player-messages')return json({messages:[]});return json({success:true,player:loadPlayer(),messages:[]});}
    return nativeFetch(input,init);
  };
  window.__MONADFISH_LITE_READY__=true;
  window.__MONADFISH_VARIETY_V2__=true;
  window.__MONADFISH_ECONOMY_V5__={baitUnitCost:BAIT_UNIT_COST,dailyFreeBait:DAILY_FREE_BAIT,dailyCubeRolls:DAILY_CUBE_ROLLS,dailyCoinStipend:DAILY_COIN_STIPEND};
  window.__MONADFISH_LITE_RESET__=()=>{localStorage.removeItem(PLAYER_KEY);localStorage.removeItem(SESSION_KEY);localStorage.removeItem(LEADERBOARD_KEY);localStorage.removeItem(PENDING_REWARD_KEY);localStorage.removeItem(ECONOMY_MIGRATION_KEY);sessionStorage.removeItem(RECENT_FISH_KEY);sessionStorage.removeItem(ROLL_KEY);location.reload();};
})();
