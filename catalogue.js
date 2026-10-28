/* Lesson titles are metadata. Modern lesson texts are supplied by the parent. */
const TEXTBOOK_CATALOGUE = CURRICULUM.flatMap(book=>book.lessons.flatMap((lesson,i)=>{
  if(lesson[0].startsWith('语文园地'))return [];
  const [section,title]=lesson[0].split(' · ');
  return [{id:book.id+'-lesson-'+i,book:book.id,section,title,lessonIndex:i}];
}));
TEXTBOOK_CATALOGUE.push(
  ...[['我是中国人',2],['我爱我们的祖国',4],['我是小学生',6],['我爱学语文',7]].map(([title,page],i)=>({id:'upper-start-'+i,book:'upper',section:'我上学了',title,page})),
  {id:'upper-pinyin-1',book:'upper',section:'拼音 1',title:'a o e',page:20},
  {id:'upper-pinyin-2',book:'upper',section:'拼音 2',title:'i u ü',page:22},
  ...[
    ['小白兔','拼音 4 · d t n l',27],
    ['说话','拼音 5 · g k h',33],
    ['在一起','拼音 6 · j q x',35],
    ['绕口令','拼音 8 · zh ch sh r',39],
    ['哪座房子最漂亮','拼音 9 · y w',41],
    ['洗手歌','拼音 10 · ai ei ui',46],
    ['欢迎台湾小朋友','拼音 11 · ao ou iu',48],
    ['月儿弯弯','拼音 12 · ie üe er',50],
    ['家','拼音 13 · an en in un ün',53],
    ['两只羊','拼音 14 · ang eng ing ong',55],
    ['咏鹅','语文园地一 · 日积月累',17],
    ['画','语文园地二 · 日积月累',29],
    ['悯农','语文园地四 · 日积月累',58],
    ['小鸟念书','语文园地四 · 和大人一起读',59],
    ['风','语文园地八 · 日积月累',102],
    ['春节童谣','语文园地八 · 和大人一起读',104]
  ].map(([title,section,page],i)=>({id:'upper-extra-'+i,book:'upper',section,title,page})),
  {id:'lower-chishang',book:'lower',section:'课文 10 · 古诗二首',title:'池上'},
  {id:'lower-xiaochi',book:'lower',section:'课文 10 · 古诗二首',title:'小池'}
);
const CATALOGUE_GUIDES = {
  '洗手歌':'学习按顺序洗手。读的时候，可以一边听节奏，一边做洗手动作。',
  '欢迎台湾小朋友':'学习礼貌待客。想一想：有新朋友来学校，你会怎样介绍、怎样欢迎？'
};

// Keep legacy-only titles accessible without pretending they are new-edition lessons.
for(const story of PROVIDED_READINGS){if(!TEXTBOOK_CATALOGUE.some(e=>e.book===story.book&&e.title===story.title))TEXTBOOK_CATALOGUE.push({id:'catalogue-'+story.id,book:story.book,section:'家长提供合集 · '+story.sourceSection,title:story.title})}
