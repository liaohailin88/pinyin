// 首题按家长提供的图片整理，其余为同题型原创练习；角色均为虚构人物。
const YIMI_ENGLISH_WRITING=[
  ['Tom','tall','short hair','quiet','doctor','the park','take a walk','高个子；短发；文静；医生；公园；散步'],
  ['Amy','short','long hair','kind','nurse','the library','read books','矮个子；长发；友善；护士；图书馆；读书'],
  ['Ben','strong','short hair','helpful','firefighter','the playground','do sports','强壮；短发；乐于助人；消防员；操场；运动'],
  ['Lucy','tall','long hair','quiet','teacher','the library','read stories','高个子；长发；文静；教师；图书馆；读故事'],
  ['Jack','tall','short hair','kind','driver','the park','take a walk','高个子；短发；友善；司机；公园；散步'],
  ['Lily','short','short hair','helpful','cleaner','the community centre','help others','矮个子；短发；乐于助人；清洁工；社区中心；帮助他人'],
  ['Mike','strong','short hair','kind','cook','the park','play games','强壮；短发；友善；厨师；公园；玩游戏'],
  ['Anna','tall','long hair','quiet','office worker','the museum','take photos','高个子；长发；文静；公司职员；博物馆；拍照'],
  ['Sam','strong','short hair','helpful','farmer','the park','fly a kite','强壮；短发；乐于助人；农民；公园；放风筝'],
  ['Emma','tall','short hair','kind','doctor','the library','read books','高个子；短发；友善；医生；图书馆；读书'],
  ['Leo','short','short hair','quiet','factory worker','the playground','play basketball','矮个子；短发；文静；工厂工人；操场；打篮球'],
  ['Grace','tall','long hair','helpful','nurse','the community centre','tell stories','高个子；长发；乐于助人；护士；社区中心；讲故事']
].map(([name,appearance,hair,character,job,place,activity,help],i)=>({id:'en-writing-'+i,name,appearance,hair,character,job,place,activity,help}));
function yimiEnglishWritingLines(t){return [`My name is ${t.name}.`,`I'm ${t.appearance}.`,`I have ${t.hair}.`,`I'm ${t.character}.`,`I am ${/^[aeiou]/i.test(t.job)?'an':'a'} ${t.job}.`,`My favourite place is ${t.place}.`,`I often ${t.activity} there.`]}
function yimiEnglishWritingDrafts(){try{const value=JSON.parse(localStorage.getItem('sprout-yimi-english-writing')||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{}}catch{return {}}}
function renderYimi2026Writing(host){
  const t=YIMI_ENGLISH_WRITING[yimi2026Writing],labels=['姓名 Name','外貌 Appearance','性格 Characteristic','职业 Job','喜欢的地方 Favourite place','活动 Activity'];
  host.append(el('h3','看表格，介绍自己'),el('p','假如你是表格中的人物，请根据所给信息介绍自己，不少于6句话。外貌可以分成两句话，写成7句。先口头说，再自己写。','hint'),yimiSelect('选择书面表达题目',YIMI_ENGLISH_WRITING.map((x,i)=>[String(i),(i===0?'图片原题':'相似练习 '+i)+' · '+x.name]),String(yimi2026Writing),v=>{yimi2026Writing=Number(v);render()}));
  host.append(yimiButton('随机换一道',()=>{yimi2026Writing=(yimi2026Writing+1+Math.floor(Math.random()*(YIMI_ENGLISH_WRITING.length-1)))%YIMI_ENGLISH_WRITING.length;render()}));
  const table=el('table','','english-writing-table'),caption=el('caption',t.name+' 的信息卡');table.append(caption);const body=document.createElement('tbody');[t.name,`${t.appearance}, ${t.hair}`,t.character,t.job,t.place,t.activity].forEach((value,i)=>{const row=document.createElement('tr'),heading=el('th',labels[i]),cell=el('td',value);heading.scope='row';cell.lang='en';row.append(heading,cell);body.append(row)});table.append(body);host.append(table);
  const help=document.createElement('details');help.className='yimi-outline';help.append(el('summary','需要中文或句型提示时再打开'),el('p',t.help),el('p','姓名：My name is …；外貌、性格：I am … / I’m …；头发：I have …；职业：I am a/an …；喜欢的地方：My favourite place is …；活动：I often … there.'));host.append(help);
  const drafts=yimiEnglishWritingDrafts(),saved=drafts[t.id]||{},draft=el('textarea','','yimi-draft');draft.rows=8;draft.maxLength=3000;draft.lang='en';draft.placeholder='先看信息卡，自己试着写6句或更多句子……';draft.setAttribute('aria-label','英语作文草稿');draft.value=typeof saved.text==='string'?saved.text:'';const status=el('p','草稿仅保存在本机浏览器。','hint');status.setAttribute('aria-live','polite');
  function save(){const all=yimiEnglishWritingDrafts();all[t.id]={text:draft.value,checks:[...host.querySelectorAll('[data-writing-check]')].map(x=>x.checked)};try{localStorage.setItem('sprout-yimi-english-writing',JSON.stringify(all));status.textContent='草稿与自查已保存到本机。'}catch{status.textContent='本机未能保存，请先复制草稿。'}}draft.oninput=save;host.append(el('h3','我来写一写'),draft,status);
  const check=el('section','','yimi-outline');check.append(el('h3','写后逐项检查'),el('p','检查内容有没有写全；不同的正确表达也可以。这里提供自查，不自动判断作文对错。','hint'));labels.forEach((label,i)=>{const row=el('label','','english-writing-check'),input=document.createElement('input');input.type='checkbox';input.dataset.writingCheck=String(i);input.checked=Array.isArray(saved.checks)&&saved.checks[i]===true;input.onchange=save;row.append(input,el('span','我写了'+label));check.append(row)});check.append(yimiButton('检查句数',()=>{const count=draft.value.split(/[.!?。！？]+/).filter(x=>x.trim()).length;status.textContent=`按句末标点初步数到 ${count} 句。`+(count>=6?'再检查信息是否齐全、语法是否通顺。':'试着写满6句，并补上句末标点。')+' 这不是作文评分。';annotate(status)}));host.append(check);
  const model=document.createElement('details');model.className='yimi-outline english-writing-model';model.append(el('summary','写完再看参考范文 · 逐句听读'),el('p','范文只是其中一种写法，不要求和它一字不差。先找遗漏的信息，再看看句首大写、a/an 和句末标点。','hint'));const lines=yimiEnglishWritingLines(t);lines.forEach(line=>{const p=el('p',line,'english-sentence');p.lang='en';model.append(p,yimiButton('🔊 '+line,()=>yimiSpeak(line)))});model.append(yimiButton('🔊 朗读整篇范文',()=>yimiSpeak(lines.join(' ')),'primary'),el('p','小窍门：说“我有短发”用 I have short hair；说“我很文静”用 I am quiet。office worker 前用 an。','hint'));host.append(model);
}
