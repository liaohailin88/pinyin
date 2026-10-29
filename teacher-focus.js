// Transcribed learning points from the parent's photograph, textbook page 57.
const PAGE57_WORDS = [
  {word:'写字',pinyin:'xiě zì',focus:'ie',sound:'写字'},
  {word:'打雷',pinyin:'dǎ léi',focus:'ei',sound:'打雷'},
  {word:'叠被子',pinyin:'dié bèi zi',focus:'ie / ei',sound:'叠被子'},
  {word:'吹气球',pinyin:'chuī qì qiú',focus:'ui / iu',sound:'吹气球'},
  {word:'堆雪人',pinyin:'duī xuě rén',focus:'ui',sound:'堆雪人'},
  {word:'丢手绢',pinyin:'diū shǒu juàn',focus:'iu',sound:'丢手绢'}
];
const PAGE57_PACK = [
  ['帽子','mào zi'],['水壶','shuǐ hú'],['苹果','píng guǒ'],
  ['跳棋','tiào qí'],['面包','miàn bāo'],['水彩笔','shuǐ cǎi bǐ'],
  ['饼干','bǐng gān'],['雨伞','yǔ sǎn'],['望远镜','wàng yuǎn jìng']
];
const PAGE57_QUESTIONS = [
  {id:'xie',syllable:'xiě',word:'写字',pinyin:'xiě zì',options:['ie','ei'],answer:'ie',hint:'xiě 的韵母是 ie，先 i 后 e。'},
  {id:'lei',syllable:'léi',word:'打雷',pinyin:'dǎ léi',options:['ie','ei'],answer:'ei',hint:'léi 的韵母是 ei，先 e 后 i。'},
  {id:'dui',syllable:'duī',word:'堆雪人',pinyin:'duī xuě rén',options:['ui','iu'],answer:'ui',hint:'duī 中是 ui，u 在前，i 在后。'},
  {id:'diu',syllable:'diū',word:'丢手绢',pinyin:'diū shǒu juàn',options:['ui','iu'],answer:'iu',hint:'diū 中是 iu，i 在前，u 在后。'},
  {id:'an',syllable:'sǎn',word:'雨伞',pinyin:'yǔ sǎn',options:['an','ang'],answer:'an',hint:'sǎn 是前鼻韵母 an，没有 g。'},
  {id:'ang',syllable:'wàng',word:'望远镜',pinyin:'wàng yuǎn jìng',options:['an','ang'],answer:'ang',hint:'wàng 是后鼻韵母 ang，有 g。'}
];
let focusQuestion=0,focusAnswered=false;
function teacherWord(word,pin,extra){const b=el('button','','card focus-word');b.setAttribute('aria-label','点读'+word);const p=el('span',pin,'phonetic');p.dataset.noPinyin='true';const text=el('span','','focus-word-hanzi');text.append(rubyText(word,pin.split(' ')));b.append(p,text);if(extra)b.append(el('small',extra));b.onclick=()=>speak(word);return b}
function renderTeacherFocus(){const host=document.querySelector('#content');host.append(el('p','老师重点 · 人教版一年级上册第57页。按你提供的教材照片整理。每天先读词语，再认字母，最后做小练习。','hint'));
  const compare=el('section','','focus-section');compare.append(el('h3','一、比一比：ie / ei，iu / ui'));const grid=el('div','','grid focus-grid');PAGE57_WORDS.forEach(x=>grid.append(teacherWord(x.word,x.pinyin,x.focus)));compare.append(grid,el('p','看清字母先后顺序：ie 和 ei 不一样，iu 和 ui 不一样。先听完整词语，再由家长示范拼读。','hint'));host.append(compare);
  const pack=el('section','','focus-section');pack.append(el('h3','二、秋游带什么？先拼读，再选择'));const packGrid=el('div','','grid focus-grid');PAGE57_PACK.forEach(([word,pin])=>{const b=teacherWord(word,pin,'点读词语');packGrid.append(b)});pack.append(packGrid);const form=el('div','','packing-choices');PAGE57_PACK.forEach(([word])=>{const label=el('label',''),check=document.createElement('input');check.type='checkbox';check.value=word;check.setAttribute('aria-label','秋游选择'+word);label.append(check,el('span',word));form.append(label)});const say=el('button','🔊 说说我的选择','secondary');say.onclick=()=>{const chosen=[...form.querySelectorAll('input:checked')].map(x=>x.value);if(!chosen.length){toast('先选择你想带的物品吧');return}speak('廖八一想带'+chosen.join('、')+'去秋游。')};pack.append(form,say,el('p','这是说话练习，没有唯一的物品清单。和爸爸妈妈说说你为什么想带它。','hint'));host.append(pack);
  const review=el('section','','focus-section');review.append(el('h3','三、读一读，记一记'));const rows=[['声母',py[0][1]],['单韵母',['a','o','e','i','u','ü']],['复韵母',['ai','ei','ui','ao','ou','iu','ie','üe']],['特殊韵母',['er']],['前鼻韵母',['an','en','in','un','ün']],['后鼻韵母',['ang','eng','ing','ong']],['整体认读音节',py[2][1]]];for(const [name,letters] of rows){let row=el('div','','focus-letter-row');row.append(el('h4',name));const group=el('div','','letter-chips');for(const letter of letters){const b=el('button',letter,'secondary');b.setAttribute('aria-label','练习拼音'+letter);b.onclick=()=>{speak(sound[letter]||letter);toast('单音为设备近似音，请家长结合教材示范')};group.append(b)}row.append(group);review.append(row)}review.append(el('p','复习23个声母、24个韵母、16个整体认读音节。图片里 y、w 放在括号内；整体认读音节要直接认读。单字母的设备语音是近似提示，不能替代标准拼音示范。','hint'));host.append(review);
  const name=el('section','','focus-section');name.append(el('h3','四、我的名字里有什么？'));[['廖','liào','l — i — ào','声母是 l，i 是介母，韵母部分是 iao。'],['八','bā','b — ā','声母是 b，韵母是 a。'],['一','yī','yi','yi 是整体认读音节，直接认读。']].forEach(([char,pin,parts,note])=>{let row=el('div','','name-syllable');row.append(teacherWord(char,pin),el('b',parts),el('p',note,'hint'));name.append(row)});host.append(name);
  const quiz=el('section','','focus-section focus-quiz');quiz.append(el('h3','五、小小辨认练习'),el('div','','focus-question'));host.append(quiz);renderFocusQuestion();
}
function renderFocusQuestion(){const box=document.querySelector('.focus-question');box.replaceChildren();const q=PAGE57_QUESTIONS[focusQuestion];focusAnswered=false;box.append(el('p',`第 ${focusQuestion+1} / ${PAGE57_QUESTIONS.length} 题：重点看 ${q.syllable}，它的韵母是哪组字母？`,'hint'),teacherWord(q.word,q.pinyin));const feedback=el('p','','feedback');feedback.setAttribute('aria-live','polite');const choices=el('div','','actions');q.options.forEach(value=>{const b=el('button',value,'primary');b.dataset.answer=value;b.onclick=()=>{if(value===q.answer){showResult(feedback,'success','答对了！'+q.hint);if(!focusAnswered){focusAnswered=true;reward('page57-'+q.id)}}else showResult(feedback,'retry','看清先后顺序，再试一试。');annotate(feedback)};choices.append(b)});const next=el('button','下一题 →','secondary');next.onclick=()=>{focusQuestion=(focusQuestion+1)%PAGE57_QUESTIONS.length;renderFocusQuestion();annotate(box)};box.append(choices,feedback,next)}
