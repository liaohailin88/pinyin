// Original, grade-four practice. Ancient poems are public-domain works.
const YIMI_WORDS = `
观察|仔细查看事物，发现特点和变化。|小薏米连续观察绿豆，记录每天的变化。
思考|认真想一想，寻找原因或办法。|遇到难题，小薏米先独立思考。
探索|寻找还不知道的事情。|小薏米想探索月亮圆缺的秘密。
想象|在头脑中描绘没有直接看见的事物。|小薏米想象自己和精卫一起飞过大海。
辽阔|广阔而宽大。|小薏米从照片里看见辽阔的草原。
清澈|水清而透明。|小薏米在清澈的小溪里看见了石子。
宁静|安静、平静。|清晨，小薏米在宁静的阳台上读书。
灿烂|光彩鲜明耀眼。|小薏米露出了灿烂的笑容。
茂盛|植物长得繁密旺盛。|小薏米发现树叶比上个月更茂盛了。
蜿蜒|弯弯曲曲地延伸。|小薏米沿着蜿蜒的小路走到山脚。
柔和|温和，不强烈。|柔和的灯光照着小薏米的书桌。
敏锐|反应灵敏，察觉事物快。|小薏米用敏锐的目光发现叶片上的小虫。
耐心|不急躁，能坚持等待或做事。|小薏米耐心地教廖八一读句子。
勇气|面对困难时敢于行动的精神。|小薏米鼓起勇气，在全班面前讲故事。
责任|应当承担的任务和义务。|小薏米认真完成值日，这是她的责任。
谦虚|不自满，愿意听取意见。|小薏米谦虚地向同学请教写作方法。
诚实|说真话，不欺骗。|小薏米诚实地承认自己忘了带本子。
珍惜|重视并爱护。|小薏米珍惜和家人一起读书的时光。
坚持|持续做一件事，不轻易放弃。|小薏米坚持每天朗读十分钟。
合作|为了共同目标一起做事。|小薏米和伙伴合作完成了一张海报。
鼓励|让人更有信心和勇气。|小薏米鼓励廖八一再试一次。
欣赏|感受美好，发现长处。|小薏米认真欣赏弟弟画的小花。
疑惑|心里不明白，有疑问。|小薏米疑惑地问，影子为什么会变长？
恍然|忽然明白的样子。|听完解释，小薏米恍然一笑，终于懂了。
沸腾|液体达到沸点时剧烈汽化；也可形容情绪热烈。|比赛获胜后，欢呼声让小薏米觉得操场沸腾了。
寂静|没有明显声音，非常安静。|小薏米轻轻走过寂静的走廊。
舒适|舒服、自在。|小薏米为小猫准备了一个舒适的小窝。
慎重|认真谨慎，不轻率。|小薏米慎重地选择观察实验的位置。
灵巧|灵活而巧妙。|小薏米用灵巧的双手折出一只纸鹤。
坚毅|坚定，有毅力。|小薏米从精卫的故事里感受到坚毅。
缘故|原因。|小薏米想弄清植物向光生长的缘故。
均匀|分布或程度比较一致。|小薏米把颜色涂得很均匀。
痕迹|事物经过后留下的印记。|小薏米在泥地上找到了小鸟的痕迹。
逐渐|一点一点地变化。|练习多了，小薏米逐渐读得更流利了。
依然|仍然，还是原来的样子。|遇到小困难，小薏米依然愿意继续尝试。
甚至|表示进一步的情况。|小薏米读得入迷，甚至忘了窗外的雨声。
仿佛|好像。|小薏米觉得白云仿佛一艘慢慢行驶的船。
格外|比平常更突出。|看到自己的进步，小薏米格外开心。
立即|马上。|小薏米看见书掉了，立即弯腰捡起。
期待|盼望。|小薏米期待和三个弟弟一起读故事。
`.trim().split('\n').map((row,i)=>{const [word,meaning,example]=row.split('|');return {id:'word-'+i,word,meaning,example}});
const YIMI_IDIOMS = `
聚精会神|集中精神，非常专心。|小薏米聚精会神地听老师讲课。
全神贯注|全部精神集中在一件事上。|小薏米全神贯注地检查实验记录。
持之以恒|长久坚持下去。|小薏米持之以恒地练习朗读。
锲而不舍|坚持努力，不轻易放弃。|小薏米锲而不舍，终于解开了难题。
恍然大悟|一下子明白过来。|看到示意图，小薏米恍然大悟。
豁然开朗|一下子明白；也可形容视野突然开阔。|走出树林，小薏米眼前豁然开朗。
一丝不苟|做事认真，连细小之处也不马虎。|小薏米一丝不苟地整理观察日记。
井井有条|整齐而有条理。|小薏米把学习用品整理得井井有条。
栩栩如生|形容描写或艺术形象非常逼真。|小薏米把画里的小鸟描绘得栩栩如生。
惟妙惟肖|模仿或描绘得十分逼真。|小薏米模仿小猫走路，惟妙惟肖。
各有所长|每个人都有自己的长处。|小薏米和弟弟们各有所长，可以互相学习。
取长补短|吸取别人的长处，弥补自己的不足。|小薏米和同学在合作中取长补短。
齐心协力|大家心往一处想，力往一处使。|小薏米和弟弟们齐心协力搭好积木桥。
集思广益|集中大家的想法，得到更好的办法。|小薏米请大家集思广益，为故事想结尾。
精卫填海|比喻意志坚定，不畏艰难。|小薏米想学习精卫填海的坚持精神。
开天辟地|神话中开辟天地；比喻前所未有的开创。|小薏米读了盘古开天辟地的神话。
画蛇添足|做多余的事，反而坏事。|作文已经说清楚了，再添无关的话可能画蛇添足。
亡羊补牢|出了问题后及时补救，防止继续受损。|小薏米改正整理习惯，亡羊补牢，为时不晚。
守株待兔|比喻不主动努力，只想侥幸得到收获。|小薏米知道学习不能守株待兔。
掩耳盗铃|自己欺骗自己，以为别人也不知道。|小薏米明白不承认错误就像掩耳盗铃。
`.trim().split('\n').map((row,i)=>{const [word,meaning,example]=row.split('|');return {id:'idiom-'+i,word,meaning,example}});
const YIMI_READINGS = [
  {id:'g4-mujiang',group:'古诗',title:'暮江吟',author:'唐 · 白居易',body:'一道残阳铺水中，半江瑟瑟半江红。\n可怜九月初三夜，露似真珠月似弓。',question:'诗人先写江面，再写露珠和月亮，观察时间发生了什么变化？',answer:'从夕阳照着江面，写到夜晚的露珠和月亮；留意时间变化，也留意不同景物。'},
  {id:'g4-xilin',group:'古诗',title:'题西林壁',author:'宋 · 苏轼',body:'横看成岭侧成峰，远近高低各不同。\n不识庐山真面目，只缘身在此山中。',question:'为什么看同一座山，会看到不同的样子？',answer:'观察的位置和角度不同。写景时可以换一个位置，再看看有什么新发现。'},
  {id:'g4-xuemei',group:'古诗',title:'雪梅',author:'宋 · 卢梅坡',body:'梅雪争春未肯降，骚人搁笔费评章。\n梅须逊雪三分白，雪却输梅一段香。',question:'梅和雪各有什么长处？这让你想到怎样与同学相处？',answer:'雪更白，梅更香。每个人各有所长，欣赏别人，也认识自己。'},
  {id:'g4-chusai',group:'古诗',title:'出塞',author:'唐 · 王昌龄',body:'秦时明月汉时关，万里长征人未还。\n但使龙城飞将在，不教胡马度阴山。',question:'诗中哪些词让你感到时间长、路途远？',answer:'“秦时”“汉时”让人想到悠久的岁月，“万里长征”写出征途遥远。'},
  {id:'g4-liangzhou',group:'古诗',title:'凉州词',author:'唐 · 王翰',body:'葡萄美酒夜光杯，欲饮琵琶马上催。\n醉卧沙场君莫笑，古来征战几人回？',question:'这首诗里有哪些能看到或听到的事物？',answer:'可以看到美酒、夜光杯，听到琵琶声；读诗时结合画面和声音来想象。'},
  {id:'g4-xiari',group:'古诗',title:'夏日绝句',author:'宋 · 李清照',body:'生当作人杰，死亦为鬼雄。\n至今思项羽，不肯过江东。',question:'前两句表现了怎样的精神？',answer:'表现出刚强、有担当的精神。历史人物的复杂经历，还可以和家长一起了解。'},
  {id:'g4-seed',group:'原创阅读',title:'绿豆的三天',author:'原创观察短文',body:'第一天，小薏米把几粒绿豆放在湿润的纸巾上。绿豆圆滚滚的，像几颗绿色的小珠子。她在本子上画下它们的样子，提醒自己每天在差不多的时间观察。\n第二天，绿豆的外皮鼓了起来。有一粒裂开了一道细缝，露出白白的小尖儿。廖八一凑过来问：“这是它的小尾巴吗？”小薏米没有马上下结论，而是把疑问记在旁边。\n第三天，白色的小芽伸长了，方向也不完全一样。小薏米量了量、画了画，还写下和昨天相比的新变化。原来，观察不只是说“它长大了”，还要把看见的细节说清楚。',question:'找出三个表示时间的词，再找出两个观察细节。',answer:'时间词是第一天、第二天、第三天。细节如外皮鼓起、裂开细缝、小芽伸长。观察日记可以按时间顺序写变化。'},
  {id:'g4-bridge',group:'原创阅读',title:'积木桥的第四根柱子',author:'原创家庭故事',body:'小薏米和三个弟弟搭积木桥。廖八一想让桥面长一些，两个小弟弟想把桥墩垒高一些。大家都急着加积木，桥却晃来晃去。\n小薏米先请大家停一下。她轻轻碰了碰桥面，发现一端只有一根柱子。“先想办法让它站稳，再比谁搭得高，好不好？”她问。廖八一找来一块宽积木，弟弟们把散开的积木递过来。\n第四根柱子立好后，桥面稳了。小薏米没有说这是自己一个人的功劳，而是给桥起名叫“齐心桥”。她明白，合作不一定要每个人做同一件事，但每个人的努力都应该被看见。',question:'故事中的问题、解决办法和结果分别是什么？',answer:'问题是桥不稳；办法是停下观察、增加支撑并分工合作；结果是桥稳了，大家也体会到合作的快乐。'},
  {id:'g4-corner',group:'原创阅读',title:'窗边的阅读角',author:'原创写景短文',body:'我最喜欢家里窗边的阅读角。那里没有很大的书柜，只有一个矮架子和一张小桌子，却能装下许多好奇心。\n早晨，光从窗帘的缝隙里落进来，在桌面上留下一道亮亮的线。翻书时，纸页轻轻响着。窗外偶尔传来鸟叫，我会把书签夹好，抬头看看它停在哪根树枝上。\n傍晚，桌上的小灯亮了。我把今天读到的一句话写进摘记本，再写下自己的想法。阅读角吸引我的，不只是安静和舒适，还有每天都能发现一点新东西的期待。',question:'这篇短文怎样表现“喜欢”，而不只反复说“我喜欢”？',answer:'写出了位置、光线、声音和阅读时的具体动作，也写出内心的期待。把感受放进细节，读者就更容易理解。'}
];
const YIMI_TALES = [
  {id:'myth-pangu',group:'神话',title:'盘古与最初的天空',author:'依据传统神话重新讲述，非教材原文',body:'传说很久以前，天地还没有分开。盘古在混沌中醒来，想让世界有光、有可以站立的地方。他奋力把天地分开，轻清的向上，厚重的向下。\n盘古担心天地重新合拢，便顶着天、踏着地，一天天坚持。神话用巨大的身躯和漫长的时间，表现开创世界的艰难。\n后来，人们在故事中把山川、风云与盘古联系起来，表达对大自然的想象。这是古人解释世界起源的一种文学方式，不是科学记录。',question:'找出故事中一个大胆的想象。你还想知道世界起源的什么问题？',answer:'例如用身体撑住天地。可以把文学想象和科学问题分别记下来，和家人继续探索。'},
  {id:'myth-jingwei',group:'神话',title:'精卫的一枝小木',author:'依据传统神话重新讲述，非教材原文',body:'古老的神话里，炎帝的女儿女娃在东海遇难，后来化为名叫精卫的小鸟。她衔起西山的小树枝和小石子，向东海飞去。\n海那么大，树枝那么小。一次飞行似乎改变不了什么，精卫却没有因为事情艰难就停下来。故事把小鸟与大海放在一起，让坚持的形象显得格外鲜明。\n读完故事，小薏米想：坚持不是不动脑筋。学习中遇到困难，可以保留精卫的勇气，也可以请教别人、调整办法，让每一次尝试更有效。',question:'小鸟和大海的对比有什么作用？',answer:'大小、力量的对比突出了任务的艰难，也衬托精卫坚定的意志。现实中坚持还要结合方法。'},
  {id:'myth-nvwa',group:'神话',title:'女娲补天的愿望',author:'依据传统神话重新讲述，非教材原文',body:'在女娲补天的神话里，天空破损，灾难给人们的生活带来痛苦。女娲没有躲开，而是想办法修补天空。\n故事写她寻找、熔炼五色石，用非凡的力量完成常人做不到的事情。不同的讲述会有不同细节，但关心世人、勇于担当的形象始终打动读者。\n如果让你给这位神话人物写一张卡片，你会选哪三个词？写词语之后，还要找故事中的行动作为理由。这样，人物评价就不只是一个空空的形容词了。',question:'用一个词评价女娲，并用故事中的行动说明理由。',answer:'例如“有担当”：面对灾难，她主动想办法补天。答案可以不同，但要有依据。'},
  {id:'myth-kuafu',group:'神话',title:'追日路上的夸父',author:'依据传统神话重新讲述，非教材原文',body:'夸父追日的神话，把追求光明的愿望写成了一场非凡的奔跑。夸父朝着太阳奔去，路途漫长，身体也越来越疲惫。\n他口渴，饮水，继续追赶。这个带着悲剧色彩的故事，既让人看到强烈的愿望，也让人感受到个体力量的限度。\n阅读神话时，我们可以欣赏人物的气概，也可以提出自己的疑问。一个好问题常常比一句现成的结论更能带来思考：他为什么出发？如果重走这段路，你会给他什么建议？',question:'你欣赏夸父什么？你又想给他什么建议？',answer:'可以欣赏勇气和追求；建议可以是了解路程、准备水和寻找伙伴。评价人物时允许有不同角度。'},
  {id:'fairy-uglyduck',group:'童话',title:'池塘边的新朋友',author:'依据《丑小鸭》重新讲述，非教材原文',body:'一只模样与伙伴不同的小鸟，常常因为外表受到嘲笑。它离开熟悉的地方，经历寒冷，也感到孤独，却仍然向往温暖和美好的生活。\n后来，它在水中看见自己的倒影，发现自己是一只天鹅。这个结尾让故事明亮起来，但更值得思考的是：在它还没有变成大家眼中的“美丽”之前，它就应该得到尊重。\n小薏米读到这里，在书旁写下：不拿外貌给同学排名。对一个新朋友，先听听他的想法，看看他的行动，而不是只看他和自己哪里不一样。',question:'如果遇到受嘲笑的同学，你可以怎样做？',answer:'停止跟着嘲笑，表达尊重，邀请对方参与，必要时请老师帮助。'},
  {id:'fairy-emperor',group:'童话',title:'那个说真话的孩子',author:'依据《皇帝的新装》重新讲述，非教材原文',body:'有个皇帝很在意别人怎样评价自己。骗子利用他的虚荣，声称正在制作一件奇妙的衣服。许多人明明看不见衣服，却怕被认为愚蠢，不敢说出实情。\n游行时，一个孩子说出了大家不敢说的话。故事用夸张的方式，让读者看见谎言怎样在恐惧和讨好中越滚越大。\n诚实不是随意伤害别人，而是尊重事实。读完后可以练习一种有礼貌的表达：“我看到的情况是……我想再确认一下。”把勇气和思考放在一起，说真话也可以清楚而温和。',question:'为什么许多人没有说出自己看到的情况？',answer:'他们害怕负面评价，也受到周围人的影响。故事提醒我们尊重事实，保持独立思考。'},
  {id:'fairy-library',group:'童话',title:'会发芽的书签',author:'原创童话',body:'小薏米在一本旧书里发现一张绿色书签。书签小声说：“每写下一个真正的问题，我就长出一片叶子。”\n“天空为什么是蓝的？”小薏米写。书签长出第一片叶子。“蚂蚁怎样找到家？”第二片叶子也冒了出来。廖八一拿来一张纸：“我也想种一个问题。”\n他们没有急着把书签变成一棵大树，而是挑了一个问题，一起查书、观察、请教。等找到一点线索，书签开出了一朵小花。花瓣上写着：问题是开始，寻找答案的过程也是收获。',question:'书签发芽这个想象，与故事想表达的意思有什么联系？',answer:'问题像种子，探索像照料，新的发现像花朵。想象为“主动探索”这个主题服务。'},
  {id:'fairy-lamp',group:'童话',title:'只照亮一步的小灯',author:'原创童话',body:'森林里有一盏小灯，每次只能照亮前面一步。小兔觉得它太弱，小鹿觉得它没用。直到一个起雾的夜晚，大家在岔路口停住了。\n小灯说：“我不能一下子照到终点，但可以陪你们看清脚边。”大家慢慢走，绕开石头，越过小水沟，又在路边找到熟悉的树。\n走出雾气时，小兔回头向小灯道谢。原来，有些帮助不轰轰烈烈，却能让下一步走得更稳。小薏米想，写作文也是这样：先写清一个动作、一个声音，再慢慢写完整个故事。',question:'你怎样理解“先照亮一步”？联系学习说一说。',answer:'把大任务拆成能完成的小步骤。例如先写一个具体场景，再补充前因后果。'}
];
const YIMI_WRITING = [
  {id:'place',title:'推荐一个好地方',goal:'写出地方的特点和推荐理由',steps:['在哪里？你什么时候去过？','选两三个最吸引你的特点。','用看到、听到、闻到或做过的事写细节。','结尾回应为什么值得去。'],starter:'不要只写“很美”“很好玩”，试着让读者看见一个具体画面。'},
  {id:'observation',title:'我的观察日记',goal:'按时间记录真实变化',steps:['写明日期、天气和观察对象。','先看整体，再观察颜色、形状、动作等细节。','比较这次与上次有什么不同。','把看到的事实与自己的猜想分开写。'],starter:'可以观察豆芽、月亮或窗外的一棵树；不要为了故事好看而编造观察结果。'},
  {id:'family',title:'我的家人',goal:'用一件具体的事表现人物特点',steps:['想写谁？选一个突出特点。','事情在什么时候、哪里发生？','写清人物做了什么、说了什么。','写出你的感受，少用空泛的赞美。'],starter:'可以写你怎样帮助廖八一，也可以写家人帮助你的一次经历。'},
  {id:'mythday',title:'我和神话人物过一天',goal:'让想象有顺序、有依据',steps:['选一位人物，想清楚他的本领或性格。','安排一个相遇的开头。','设计一个需要共同解决的问题。','写出解决过程和你的新发现。'],starter:'不是把所有神奇本领列一遍，而是让一个本领在具体事情中发挥作用。'},
  {id:'game',title:'记一次游戏',goal:'写清规则、经过和感受',steps:['交代参加的人、地点和规则。','按先后顺序写游戏怎样开始。','选最紧张或最有趣的一刻详细写。','用真实感受收尾，避免只写“真开心”。'],starter:'写出动作、声音和当时的想法，让没有参加的人也能看明白。'},
  {id:'letter',title:'给家人或朋友写一封信',goal:'把想说的事情说清楚',steps:['称呼顶格写，想一想你要写给谁。','正文围绕一两件事情写，不要东拉西扯。','表达感谢、分享或建议，要有具体内容。','写上祝福、署名和日期，再检查格式。'],starter:'真实的细节比套话更有力量。先想清楚：对方读完后会知道什么？'}
];
const YIMI_ENGLISH = [
  {id:'classroom',title:'教室与学习',words:'classroom|教室;window|窗户;door|门;light|灯;blackboard|黑板;desk|书桌;chair|椅子;computer|电脑',sentences:[['This is our classroom.','这是我们的教室。'],['Open the door, please.','请开门。'],['The book is on the desk.','书在书桌上。'],["Let's clean the classroom.",'我们打扫教室吧。']]},
  {id:'schoolbag',title:'书包与文具',words:'schoolbag|书包;book|书;notebook|笔记本;pencil|铅笔;pen|钢笔;eraser|橡皮;ruler|尺子;key|钥匙',sentences:[["What's in your schoolbag?",'你的书包里有什么？'],['I have a notebook.','我有一本笔记本。'],['My schoolbag is blue.','我的书包是蓝色的。'],['Here is your pencil.','这是你的铅笔。']]},
  {id:'friends',title:'朋友与特点',words:'friend|朋友;friendly|友好的;quiet|安静的;strong|强壮的;tall|高的;short|矮的；短的;hair|头发;glasses|眼镜',sentences:[['She is my friend.','她是我的朋友。'],['He is tall and strong.','他又高又壮。'],['My friend has short hair.','我的朋友留着短发。'],['She is very friendly.','她很友好。']]},
  {id:'home',title:'家与房间',words:'home|家;bedroom|卧室;kitchen|厨房;bathroom|浴室;bed|床;sofa|沙发;table|桌子;phone|电话',sentences:[["Where is my book?",'我的书在哪里？'],['It is under the chair.','它在椅子下面。'],['The keys are on the table.','钥匙在桌子上。'],['I read in my bedroom.','我在卧室里读书。']]},
  {id:'food',title:'食物与用餐',words:'rice|米饭;bread|面包;beef|牛肉;chicken|鸡肉；鸡;noodles|面条;soup|汤;vegetables|蔬菜;milk|牛奶',sentences:[['What would you like?','你想要什么？'],["I'd like some soup, please.",'我想要一些汤，谢谢。'],['Would you like some bread?','你想要一些面包吗？'],['Yes, please.','好的，谢谢。']]},
  {id:'family',title:'家人与职业',words:'family|家庭;parents|父母;sister|姐妹;brother|兄弟;teacher|教师;doctor|医生;nurse|护士;driver|司机',sentences:[['I have three younger brothers.','我有三个弟弟。'],['Bayi is my younger brother.','八一是我的弟弟。'],['My father is in the kitchen.','我爸爸在厨房里。'],['She is a teacher.','她是一名教师。']]}
].map(unit=>({...unit,words:unit.words.split(';').map(row=>{const [word,meaning]=row.split('|');return {word,meaning}})}));
const YIMI_PHONICS = [
  {pattern:'短元音 a',words:['cat','bag','map'],tip:'听单词中间的元音，比较三个词的共同声音。'},
  {pattern:'短元音 e',words:['bed','pen','red'],tip:'比较 bed 和 pen 中的元音。'},
  {pattern:'短元音 i',words:['pig','six','fish'],tip:'注意短元音 i，不要把每个字母都读成字母名称。'},
  {pattern:'短元音 o',words:['dog','box','hot'],tip:'不同英语口音的元音会有差别，以整词示范为参照。'},
  {pattern:'短元音 u',words:['duck','bus','cup'],tip:'听完一个词，再慢慢跟读。'},
  {pattern:'a_e',words:['cake','name','face'],tip:'这些词中 a 发字母名称的音，末尾 e 通常不单独发音。'},
  {pattern:'i_e',words:['bike','kite','five'],tip:'比较短元音 i 与 i_e 组合的声音。'},
  {pattern:'o_e',words:['home','nose','note'],tip:'观察字母位置，再听完整单词。'}
];
const YIMI_ENGLISH_READINGS = [
  {id:'en-family',title:'My Family',body:'My name is Yimi. I have three younger brothers. Bayi is in Grade One. I am in Grade Four. We read books together. I help Bayi read Chinese words. We learn from each other.',translation:'我叫薏米。我有三个弟弟。八一读一年级，我读四年级。我们一起读书。我帮助八一读汉字，我们互相学习。',question:'How many younger brothers does Yimi have?',options:['Two.','Three.','Four.'],answer:1},
  {id:'en-bag',title:'The Blue Schoolbag',body:'I have a blue schoolbag. A notebook, a ruler and two pens are in it. My book is not in the schoolbag. Where is it? It is on my desk. I put it in the schoolbag. Now I am ready for school.',translation:'我有一个蓝书包，里面有笔记本、尺子和两支笔。书不在书包里，它在书桌上。我把书放进书包，现在可以准备上学了。',question:'Where is the book at first?',options:['On the desk.','Under the bed.','In the schoolbag.'],answer:0},
  {id:'en-friend',title:'A Helpful Friend',body:'Amy is my friend. She is quiet and friendly. One day, I cannot find my pencil. Amy gives me a pencil. After class, I find my pencil under the chair. I say thank you to Amy.',translation:'艾米是我的朋友，她安静而友好。有一天我找不到铅笔，她借给我一支。课后我在椅子下面找到了自己的铅笔，并向艾米道谢。',question:'Where does the writer find the pencil?',options:['In the kitchen.','Under the chair.','On the bed.'],answer:1},
  {id:'en-dinner',title:'Dinner Is Ready',body:'It is dinner time. I would like some rice and vegetables. Bayi would like some noodles. We wash our hands before dinner. The soup is hot. We wait and eat slowly. We say thank you to our parents.',translation:'晚饭时间到了。我想吃米饭和蔬菜，八一想吃面条。饭前我们洗手。汤很烫，我们等一等，慢慢吃，并向父母道谢。',question:'What do they do before dinner?',options:['Read a book.','Clean a window.','Wash their hands.'],answer:2}
];
const yimiLibrary={YIMI_WORDS,YIMI_IDIOMS,YIMI_READINGS,YIMI_TALES,YIMI_WRITING,YIMI_ENGLISH,YIMI_PHONICS,YIMI_ENGLISH_READINGS};
if(typeof module!=='undefined'){require('./yimi-extra')(yimiLibrary);module.exports=yimiLibrary}else expandYimiContent(yimiLibrary);
