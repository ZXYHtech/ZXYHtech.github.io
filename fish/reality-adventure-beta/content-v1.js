window.REALITY_FISH_CONTENT={
  version:'CONTENT_V1',
  waterbodies:{
    willow:{
      name:'柳岸水库',
      zones:{
        reed:{name:'岸边草线',tags:['shallow','cover'],hint:'近岸遮蔽、浅层与边缘变化'},
        drop:{name:'深浅交界',tags:['break','depth'],hint:'水位变化时值得复查的过渡带'},
        flow:{name:'缓流口',tags:['current','food'],hint:'食物输送、流速边界与活动鱼讯'}
      }
    }
  },
  targets:{
    chub:{name:'翘嘴',icon:'🐟',waterbody:'willow',mysteries:[
      {id:'chub_layer',title:'浅层还值得守吗？',context:['水位比上次低','傍晚窗口缩短'],hypotheses:[
        {id:'shallow',label:'鱼还在浅层',why:'上次浅区出现过追口',quest:'守原浅区，只改变到达水层'},
        {id:'drop',label:'鱼退到深浅交界',why:'水位变化可能改变活动空间',quest:'转到深浅交界，其他主要条件尽量不动'},
        {id:'response',label:'鱼在，但不太肯追',why:'位置可能没大变，问题在响应',quest:'位置不动，只改变呈现方式'}]},
      {id:'chub_response',title:'有追随却不攻击，卡在哪？',context:['已出现 Follow','尚无稳定 Bite'],hypotheses:[
        {id:'speed',label:'速度不合适',why:'已经有 Presence 证据',quest:'位置和水层不动，只改变速度'},
        {id:'presentation',label:'轮廓/动作不合适',why:'鱼愿意跟但不攻击',quest:'位置不动，只改变呈现方式'},
        {id:'window',label:'有效窗口很短',why:'活动可能集中在短时段',quest:'冻结其他条件，观察 2 个相邻时间段'}]}
    ]},
    crucian:{name:'鲫鱼',icon:'🐠',waterbody:'willow',mysteries:[
      {id:'crucian_presence',title:'近岸没口，是没鱼还是没碰上？',context:['近岸结构仍在','鱼讯不明显'],hypotheses:[
        {id:'structure',label:'鱼不在当前结构',why:'连续无反馈可能是位置问题',quest:'保持钓组，比较两个结构点'},
        {id:'layer',label:'鱼层偏离当前钓层',why:'Presence 未确认',quest:'位置不动，只改变水层'},
        {id:'activity',label:'鱼在但活性低',why:'环境变化可能影响响应',quest:'位置和水层不动，延长有效 effort 再判断'}]},
      {id:'crucian_repeat',title:'一次中鱼能不能复现？',context:['刚有一次真实上鱼','单次结果还不是规律'],hypotheses:[
        {id:'repeat',label:'这是可复现模式',why:'位置和呈现刚得到支持',quest:'保持主要条件，重复一轮'},
        {id:'chance',label:'只是偶发个体',why:'一次事件证据仍弱',quest:'保持条件，要求第二次独立证据'},
        {id:'microspot',label:'只有很小的有效区域',why:'近距离差异可能很大',quest:'只改变落点位置，其他冻结'}]}
    ]},
    carp:{name:'鲤鱼',icon:'🐡',waterbody:'willow',mysteries:[
      {id:'carp_location',title:'守点还是换结构？',context:['已经投入一段时间','仍缺有效鱼讯'],hypotheses:[
        {id:'stay',label:'鱼会进入当前点',why:'结构本身合理但窗口可能没到',quest:'不换位置，再完成一个固定 effort 段'},
        {id:'move',label:'主要问题是位置',why:'当前缺少 Presence 证据',quest:'换一个结构点，饵和钓组尽量不变'},
        {id:'presentation',label:'鱼在但呈现不对',why:'位置并非唯一解释',quest:'位置不动，只改变呈现方式'}]},
      {id:'carp_conversion',title:'有口却不中，问题在哪？',context:['已经有 Bite','Hook-up 转化不足'],hypotheses:[
        {id:'timing',label:'时机问题',why:'Bite 已确认',quest:'保持其他条件，专注同一提竿策略'},
        {id:'rig',label:'钓组转化问题',why:'Bite 到 Hook-up 断层',quest:'只改变一个终端钓组变量'},
        {id:'falsebite',label:'部分信号不是有效 Bite',why:'需要先区分事件质量',quest:'下一轮只记录高置信 Bite'}]}
    ]}
  },
  evidenceEvents:[
    {id:'follow',label:'追随',icon:'👀',effect:'presence_up'},
    {id:'bite',label:'咬口',icon:'🎣',effect:'response_up'},
    {id:'hookup',label:'中钩',icon:'🔗',effect:'conversion_up'},
    {id:'landed',label:'上鱼',icon:'🐟',effect:'chain_support'},
    {id:'lost',label:'跑鱼',icon:'💨',effect:'conversion_gap'},
    {id:'zero',label:'本轮无鱼讯',icon:'○',effect:'selected_hypothesis_cooldown'}
  ],
  clueTypes:[
    {id:'water',label:'水变了',icon:'🌊'},{id:'structure',label:'结构变了',icon:'🌿'},{id:'biology',label:'看到生物迹象',icon:'🐟'},{id:'newspot',label:'发现新位置',icon:'📍'},{id:'windflow',label:'风/流变了',icon:'💨'},{id:'uncertain',label:'说不上来',icon:'❓'}
  ],
  safety:{hardStops:['雷暴/明显危险天气','禁止进入区域','危险涉水条件','当地法规明确禁止的行为'],uiRule:'Safety Gate 默认后台检查；只有触发风险才打断玩家。'}
};
