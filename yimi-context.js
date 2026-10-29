// Fictional learning contexts; no personal health profile is stored here.
function enrichYimiContent(d){
const contexts={
classroom:`classroom|Our classroom has two doors.|我们的教室有两扇门。
window|I can see a tree through the window.|透过窗户，我能看见一棵树。
door|The door is next to the blackboard.|门在黑板旁边。
light|Please turn on the light.|请开灯。
blackboard|The teacher writes a question on the blackboard.|老师在黑板上写了一个问题。
desk|My pencil is in the desk.|我的铅笔在书桌里。
chair|Please put your chair under the desk.|请把椅子放到书桌下面。
computer|We use a computer to look at the pictures.|我们用电脑看这些图片。
floor|There is a small box on the floor.|地板上有一个小盒子。
wall|Our class photo is on the wall.|我们的班级照片在墙上。
picture|I draw a picture of a garden.|我画了一幅花园的画。
fan|The fan is near the window.|风扇在窗户附近。`,
schoolbag:`schoolbag|I check my schoolbag before I go to bed.|睡觉前，我检查自己的书包。
book|This book is about birds.|这本书是关于鸟的。
notebook|I write my questions in a notebook.|我把问题写在笔记本里。
pencil|May I borrow your pencil?|我可以借用你的铅笔吗？
pen|My blue pen is in the pencil box.|我的蓝色钢笔在铅笔盒里。
eraser|This eraser is small and white.|这块橡皮又小又白。
ruler|I use a ruler to draw a straight line.|我用尺子画一条直线。
key|Please give the key to Dad.|请把钥匙交给爸爸。
candy|There is a piece of candy in the bag.|袋子里有一颗糖。
toy|Bayi puts his toy on the shelf.|八一把玩具放在架子上。
storybook|We read a storybook after dinner.|晚饭后我们读一本故事书。
crayon|Can I use the green crayon?|我可以用这支绿色蜡笔吗？`,
friends:`friend|My friend and I like different books.|我和朋友喜欢不同的书。
friendly|Our new classmate is friendly.|我们的新同学很友好。
quiet|Please be quiet when others are speaking.|别人说话时，请保持安静。
strong|The strong wind moves the tree branches.|大风吹动了树枝。
tall|A tall tree stands near the gate.|大门旁有一棵高树。
short|My little brother has short hair.|我的小弟弟留着短发。
hair|Her hair is brown.|她的头发是棕色的。
glasses|The boy with glasses is my friend.|戴眼镜的那个男孩是我的朋友。
thin|This thin book fits in my pocket.|这本薄书能放进我的口袋。
long|The cat has a long tail.|这只猫有一条长尾巴。
shoe|One shoe is under the bed.|一只鞋在床下面。
hat|My friend has a yellow hat.|我的朋友有一顶黄色的帽子。`,
home:`home|We walk home together after school.|放学后我们一起走回家。
bedroom|I put my books away in my bedroom.|我在卧室里收好书本。
kitchen|Dad is making soup in the kitchen.|爸爸正在厨房里做汤。
bathroom|Please wash your hands in the bathroom.|请到浴室洗手。
bed|I make my bed in the morning.|我早晨整理床铺。
sofa|The cat is sleeping on the sofa.|猫正在沙发上睡觉。
table|We sit around the table for dinner.|我们围着桌子吃晚饭。
phone|Mum puts her phone in her bag.|妈妈把手机放进包里。
living room|We play a board game in the living room.|我们在客厅里玩桌游。
study|There are many books in the study.|书房里有很多书。
fridge|The milk is in the fridge.|牛奶在冰箱里。
doorbell|I can hear the doorbell.|我听见门铃响了。`,
food:`rice|Would you like some rice with your fish?|吃鱼时，你想配些米饭吗？
bread|I have bread and an egg for breakfast.|我早餐吃面包和一个鸡蛋。
beef|There is some beef in the bowl.|碗里有一些牛肉。
chicken|The chicken on the plate is for lunch.|盘子里的鸡肉是午餐吃的。
noodles|These noodles smell good.|这些面条闻起来很香。
soup|The soup is hot. Please wait a moment.|汤很烫，请等一会儿。
vegetables|We wash the vegetables before cooking.|做饭前我们清洗蔬菜。
milk|I would like a cup of milk.|我想要一杯牛奶。
fork|Can you pass me a fork?|你能递给我一把餐叉吗？
knife|This knife is for cutting bread.|这把餐刀是用来切面包的。
spoon|Bayi eats his soup with a spoon.|八一用勺子喝汤。
chopsticks|She uses chopsticks to pick up the noodles.|她用筷子夹面条。`,
family:`family|My family likes walking in the park.|我们一家喜欢在公园散步。
parents|I can talk to my parents when I need help.|需要帮助时，我可以和父母聊一聊。
sister|My sister is reading beside the window.|我的姐姐正在窗边读书。
brother|My brother and I take turns choosing a game.|我和弟弟轮流选择游戏。
teacher|Our teacher gives us time to ask questions.|老师留出时间让我们提问。
doctor|The doctor listens carefully to the child.|医生仔细地听孩子说话。
nurse|The nurse shows us where to wait.|护士告诉我们在哪里等候。
driver|The driver stops the bus at the station.|司机在车站停下公交车。
cousin|My cousin is coming to visit on Sunday.|我的堂亲或表亲星期天要来做客。
uncle|My uncle tells us a funny story.|我的叔叔给我们讲了一个有趣的故事。
aunt|My aunt has a small flower shop.|我的阿姨开了一家小花店。
farmer|The farmer shows us how carrots grow.|农民向我们介绍胡萝卜怎样生长。`,
school:`school|There is a big tree in front of our school.|我们学校前面有一棵大树。
library|I return the books to the library on Friday.|我星期五去图书馆还书。
playground|We play catch on the playground.|我们在操场上玩抛接球。
garden|There are red flowers in the school garden.|学校花园里有红色的花。
office|The teacher is in the office now.|老师现在在办公室里。
class|There are forty children in our class.|我们班有四十个孩子。
first|The music room is on the first floor.|音乐教室在一楼。
second|Our art room is on the second floor.|我们的美术教室在二楼。
floor|Which floor is the library on?|图书馆在几楼？
room|This room is for reading.|这个房间是用来阅读的。
art|We have art on Tuesday.|我们星期二有美术课。
music|I like listening to music after school.|放学后我喜欢听音乐。`,
time:`time|We have time for one more question.|我们还有时间再问一个问题。
breakfast|Breakfast is ready. Let us eat together.|早餐准备好了，我们一起吃吧。
lunch|I have lunch at twelve.|我十二点吃午饭。
dinner|After dinner, we put the dishes away.|晚饭后，我们收好餐具。
clock|The clock on the wall is round.|墙上的钟是圆的。
o’clock|We go to the park at nine o’clock.|我们九点整去公园。
get up|What time do you get up?|你几点起床？
go home|Let us go home before it gets dark.|我们天黑前回家吧。
English class|We practise asking questions in English class.|我们在英语课上练习提问。
PE class|We run and play games in PE class.|我们在体育课上跑步、做游戏。
minute|Please give me one more minute.|请再给我一分钟。
late|I put my things away early so I will not be late.|我提前收好物品，这样就不会迟到。`,
weather:`weather|The weather changes in the afternoon.|下午天气变了。
sunny|It is sunny. Shall we take a walk?|天气晴朗，我们去散步好吗？
cloudy|It is cloudy, but it is not raining.|天气多云，但没有下雨。
windy|It is windy. Hold your hat.|风很大，扶好你的帽子。
rainy|On rainy days, I listen to the rain at home.|下雨天，我在家听雨声。
snowy|It is snowy in the picture.|图片里的天气是下雪天。
warm|The sun feels warm on my hands.|阳光照在手上，暖暖的。
cool|It is cool under the trees.|树荫下很凉快。
hot|The sand is hot at noon.|中午的沙子很烫。
cold|The water is too cold for swimming.|水太冷，不适合游泳。
outside|I can hear birds outside.|我能听到外面的鸟叫声。
degree|The temperature goes up by one degree.|气温上升了一度。`,
farm:`farm|We visit a farm with our teacher.|我们和老师一起参观农场。
cow|The cow is eating grass.|这头奶牛正在吃草。
horse|A brown horse is standing near the fence.|一匹棕色的马站在围栏旁。
sheep|The sheep are resting under a tree.|绵羊们正在树下休息。
hen|This hen has three little chicks.|这只母鸡有三只小鸡。
goat|The goat is on the small hill.|山羊在小山坡上。
tomato|I put a tomato in the salad.|我往沙拉里放了一个番茄。
potato|This potato is bigger than that one.|这个马铃薯比那个大。
carrot|The rabbit is eating a carrot.|兔子正在吃一根胡萝卜。
green bean|I draw a long green bean in my notebook.|我在笔记本里画了一根长长的四季豆。
these|Are these your pencils?|这些是你的铅笔吗？
those|Look at those birds in the tree.|看树上的那些鸟。`,
clothes:`clothes|I fold my clothes before putting them away.|收衣服前，我先把它们叠好。
coat|Take your coat. It is cold outside.|带上外套，外面很冷。
jacket|My jacket has two big pockets.|我的夹克有两个大口袋。
shirt|Dad wears a white shirt today.|爸爸今天穿着一件白衬衫。
skirt|This skirt is yellow with small flowers.|这条裙子是黄色的，上面有小花。
dress|She chooses a blue dress for the party.|她选了一条蓝色连衣裙参加聚会。
sweater|This sweater feels soft.|这件毛衣摸起来很柔软。
pants|My black pants are on the chair.|我的黑裤子在椅子上。
shorts|I wear shorts when I play in summer.|夏天玩耍时，我穿短裤。
socks|These socks do not match.|这两只袜子不配对。
cap|Please put your cap in the bag.|请把帽子放进包里。
yours|My bag is green. Is the blue one yours?|我的包是绿色的，蓝色那个是你的吗？`,
shopping:`shop|This shop sells books and postcards.|这家商店卖书和明信片。
scarf|The scarf keeps her neck warm.|这条围巾让她的脖子暖暖的。
gloves|I put my gloves in my coat pockets.|我把手套放进外套口袋里。
umbrella|We share an umbrella on the way home.|回家路上我们共用一把伞。
sunglasses|These sunglasses are too big for me.|这副太阳镜对我来说太大了。
pretty|The flowers on this bag are pretty.|这个包上的花很好看。
nice|That is a nice colour for a hat.|那个颜色用在帽子上很好看。
cheap|This notebook is cheap, but the paper is good.|这本笔记本便宜，但纸张很好。
expensive|The toy is too expensive, so I do not buy it.|这个玩具太贵了，所以我没买。
size|What size do you need?|你需要什么尺码？
yuan|The ruler is three yuan.|这把尺子三元。
try on|May I try on these shoes?|我可以试穿这双鞋吗？`
};
for(const unit of d.YIMI_ENGLISH){const rows=contexts[unit.id].split('\n').map(r=>r.split('|'));for(const item of unit.words){const row=rows.find(r=>r[0]===item.word);if(!row)throw Error('Missing English context: '+unit.id+'/'+item.word);item.sentence=row[1];item.translation=row[2]}}
d.YIMI_DAILY.push(...[
{id:'outside',title:'户外发现',sentences:[['Shall we go for a walk?','我们去散步好吗？'],['I can see a bird in that tree.','我看见那棵树上有一只鸟。'],['Let us look at the clouds for a while.','我们看一会儿云吧。'],['Which path would you like to take?','你想走哪条小路？'],['I would like to walk beside the lake.','我想沿着湖边走。'],['Let us tell Dad what we found.','我们把发现告诉爸爸吧。']]},
{id:'pause',title:'休息与作息',sentences:[['I need a short break.','我需要休息一会儿。'],['Let us put the book down for a while.','我们把书放下一会儿吧。'],['We can look out of the window.','我们可以看看窗外。'],['May I have some water, please?','可以给我一些水吗？'],['I will finish this part after my break.','休息后我再完成这一部分。'],['It is bedtime. We can read more tomorrow.','该睡觉了，明天我们可以继续读。']]},
{id:'help',title:'遇到难题时',sentences:[['I do not understand this part yet.','这一部分我还不明白。'],['Could you show me one example?','你能给我看一个例子吗？'],['Please say it again, slowly.','请再慢慢说一遍。'],['I want to try it by myself first.','我想先自己试一试。'],['I made a mistake, but I can try again.','我弄错了，但可以再试一次。'],['Thank you for listening to me.','谢谢你听我说。']]},
{id:'familytime',title:'家人与自己的时间',sentences:[['It is your turn to choose a game.','轮到你选游戏了。'],['I can help you after I finish my picture.','画完这幅画，我就可以帮你。'],['May I have some quiet time?','可以让我安静待一会儿吗？'],['Let us put the toys away together.','我们一起收好玩具吧。'],['I am happy with what I learned today.','我为今天学到的东西感到高兴。'],['We do not have to finish everything today.','我们不必今天就把所有事情都做完。']]}
]);
d.YIMI_READINGS.push(...[
{id:'g4-own-pace',group:'原创阅读',title:'今天先走到那棵树',author:'原创成长故事',body:'周末，一家人来到公园。廖八一跑到前面，回头喊姐姐快一点。小薏米正看着路边一只小虫，不想和他比赛。她指着前面的大树说：“我想慢慢走到那里，看看路上有什么。”\n爸爸点点头，陪她沿着树荫走。她发现一片叶子有细细的锯齿，还看见鸟儿把草茎衔进树丛。走到大树时，弟弟也跑回来，想听她讲刚才的发现。\n回家后，小薏米在本子上画了一张小地图，没有写谁走得最快。她给这次散步起名叫“发现三件小事”。原来，出门活动可以有不同的玩法，也可以有自己的节奏。',question:'小薏米给散步设定了什么目标？这个目标由谁选择？',answer:'她想慢慢走到大树，并发现路上的小事。目标由她自己提出，家人给予陪伴和尊重。'},
{id:'g4-question-card',group:'原创阅读',title:'写在便签上的“还不会”',author:'原创学习故事',body:'一道题卡住了小薏米。她擦了又写，越着急越看不清自己的步骤。妈妈过来时，没有问她为什么还没做完，而是请她说说已经明白了什么。\n她把会的两步画上小圈，把不懂的一句抄到便签上。“我知道先算什么，可是不明白为什么要这样比较。”说到这里，问题好像变小了一些。妈妈陪她换成画图的方法，又请她自己讲一遍。\n休息前，小薏米把便签夹进本子。上面不再只有“我不会”，而是一个清楚的问题。她还没有做完全部练习，却找到了下一步能做的事。求助不是让别人替自己完成，而是让自己更明白怎样继续。',question:'“我不会”怎样变成了一个更具体的问题？',answer:'她先分出已经懂的步骤，再说明不懂的是比较的理由。具体表达困难更容易得到有用帮助。'},
{id:'g4-bookmark-break',group:'原创阅读',title:'书签停下的地方',author:'原创生活故事',body:'故事正读到最精彩的地方，小薏米舍不得合上书。可是她还想去院子里看看新开的花。她问妈妈：“停在这里，明天会不会忘了？”\n妈妈递来一张空书签，请她写一句“下次从哪里开始”。小薏米写下：小狐狸还没找到回家的桥。再夹好书签，把书放回架子。她没有因为暂停阅读而少喜欢这个故事。\n院子里，风把花枝吹得轻轻摇晃。她和家人聊起书里的狐狸，又想出一个新的办法。第二天翻到书签时，她很快记起前面的情节。适时停下来，有时也能把期待好好留住。',question:'书签上的一句话有什么作用？你还可以用什么办法记录下一步？',answer:'它提醒故事停在哪里，方便下次继续。还可写页码、关键词或一个待解决的问题。'},
{id:'g4-family-turns',group:'原创阅读',title:'姐姐也有一幅没画完的画',author:'原创家庭故事',body:'廖八一拿着积木来找姐姐时，小薏米的画还差最后一片树叶。她很想陪弟弟，也想先把自己的事情做完。“等我画好这片叶子，再陪你搭桥，好吗？”她轻声问。\n弟弟起初不太愿意。爸爸请他先挑好搭桥的积木，自己陪他摆出两座桥墩。小薏米没有匆忙收起画，也没有把弟弟赶走。画完后，她按约定来到地毯边。\n这回大家轮流提出玩法。小薏米想搭弯弯的桥，弟弟想加一个高高的门。两种想法都被听见了。在家里，关心别人很温暖，自己的时间和想法也值得被尊重。',question:'家人怎样同时照顾了姐姐和弟弟的需要？',answer:'姐姐说明自己需要的时间并兑现约定；爸爸先陪弟弟准备；之后大家轮流提出玩法。照顾家庭不是姐姐一个人的责任。'}
]);
d.YIMI_WRITING.push(...[
{id:'outdoor-find',title:'一次散步，三个发现',goal:'用看见、听见的细节写一段户外经历',steps:['选择安全、熟悉的地方，和家人商量路线。','记下三个真正观察到的小发现。','选一个写具体，包括颜色、声音或动作。','写出你最想再了解的问题。'],starter:'不用走得很远，也不用和别人比较；留意一片叶子或一声鸟叫就可以开始。',model:'我们沿着湖边慢慢走。一片叶子贴着水面，风一吹，就打着转靠近岸边。我蹲下来看，发现叶脉像几条细细的路。原来，平时一眼略过的东西，停一会儿就能看见不同。'},
{id:'asking-help',title:'我把困难说清楚了',goal:'记录一次表达困难和获得帮助的经历',steps:['交代遇到了什么具体问题。','区分自己已经会的和还不懂的。','写清你怎样提出请求，对方怎样回应。','记录下一步做法，不必写成完全成功。'],starter:'可以写学习，也可以写手工、游戏或与朋友相处。求助不是丢脸的事。',model:'我把拼错的零件拿给爸爸看，没有只说“我不行”，而是指着卡口问：“这一面为什么合不上？”爸爸请我比较两边的形状。我换了一个方向，还是有点松，却知道下一次该检查哪里。'},
{id:'my-next-step',title:'给下周的自己留一张纸条',goal:'设定一个小目标，并写下需要的帮助',steps:['选一件自己愿意尝试的事。','把目标缩小到能够开始的一步。','写下什么时候尝试、可以请谁帮忙。','允许调整计划，用鼓励的话结尾。'],starter:'目标不必是分数，也可以是出门发现一件新事物，或把一个问题问清楚。',model:'下周的我：如果再遇到读不懂的一段，先别急着说自己不行。试着圈出一个关键词，再向老师提一个具体的问题。一次问不明白也没关系，我们可以换一种说法。'},
{id:'family-activity',title:'我想和家人一起做的事',goal:'表达自己的愿望，并安排可商量的家庭活动',steps:['说明想做什么，为什么喜欢。','提出地点、时间或材料等简单准备。','给家人分工，也给自己保留选择。','考虑下雨或时间变化时的替代办法。'],starter:'可以选择散步、桌游、做饭、听故事；不是每次活动都要承担照顾弟弟的任务。',model:'这个周末，我想和家人做一次“找颜色”的散步。每人选一种颜色，在路上找三样东西。爸爸负责带水，弟弟们可以自己选颜色。如果下雨，我们就在家听故事，把这次散步留到下一天。'}
]);
d.YIMI_ENGLISH_READINGS.push(...[
{id:'en-own-walk',title:'Our Walk, Our Way',body:'Yimi goes to the park with her family. Bayi wants to run. Yimi wants to look at the trees. Dad says they can choose different things to do. Yimi finds a small bird and three yellow leaves. Later, she shows them to Bayi. He tells her about his game. Both of them have something to share.',translation:'小薏米和家人去公园，八一想跑，她想看树。爸爸说可以选择不同的活动。她发现了小鸟和黄叶，之后和八一分享，八一也讲自己的游戏。两人都有值得分享的经历。',question:'What does Yimi want to do?',options:['Look at the trees.','Buy a new bag.','Stay in the car.'],answer:0},
{id:'en-ask-example',title:'One More Example',body:'Yimi is doing her homework. She does not understand one question. She tells Mum which part is difficult. Mum draws a picture and asks Yimi to explain it. Yimi understands a little more. She says, “Could you show me one more example?” Then she tries the next question by herself.',translation:'小薏米做作业时有一题不懂，她告诉妈妈具体哪里难。妈妈画图，请她解释。她明白了一些，又请求再看一个例子，然后自己尝试下一题。',question:'What does Yimi ask for?',options:['A new notebook.','One more example.','A bigger desk.'],answer:1},
{id:'en-break-mark',title:'A Place to Start Again',body:'Yimi is reading a long story. It is time for a break. She writes the page number on a bookmark and closes the book. She takes a walk with Dad and tells him about the story. The next day, she finds the right page quickly. A short note helps her start again.',translation:'小薏米读长故事时到了休息时间。她在书签上记下页码，合上书，和爸爸散步并聊起故事。第二天，她很快找到继续阅读的位置，一条简短记录帮助了她。',question:'How does Yimi remember where to start?',options:['She reads all night.','She throws the book away.','She writes the page number.'],answer:2},
{id:'en-my-turn',title:'Time for My Picture',body:'Bayi asks Yimi to play. She is drawing a picture and wants to finish one leaf. She says, “I can play after I finish this part.” Dad helps Bayi choose some blocks while they wait. Later, Yimi joins them. They take turns choosing what to build. Everyone gets a turn.',translation:'八一找正在画画的小薏米玩。她想先画完一片叶子，说明完成这一部分后再玩。爸爸陪八一挑积木，稍后姐姐加入，大家轮流选择搭什么，每个人都有机会。',question:'What do they do when building with blocks?',options:['Only Yimi chooses.','They take turns choosing.','They stop talking.'],answer:1}
]);
}
if(typeof module!=='undefined')module.exports=enrichYimiContent;
