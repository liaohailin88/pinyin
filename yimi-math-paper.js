let yimiMathPaperSection=0;
const YIMI_PAPER_KEY='sprout-yimi-math-unit3';
function yimiPaperDraft(){try{const v=JSON.parse(localStorage.getItem(YIMI_PAPER_KEY)||'{}');return v&&typeof v==='object'&&!Array.isArray(v)?v:{}}catch{return {}}}
function renderYimiMathPaper(){
  const host=document.querySelector('#content'),section=YIMI_MATH_PAPER[yimiMathPaperSection],drafts=yimiPaperDraft();
  host.append(el('h3','第三单元综合素养评价 · 三位数乘两位数'),el('p','四年级上册 · 人教版（RJ） · 原卷60分钟，满分100＋10分。按家长提供的扫描卷整理；可分几次完成。图示、原题顺序和参考答案均保留。','hint'));
  host.append(yimiSelect('选择试卷部分',YIMI_MATH_PAPER.map((x,i)=>[String(i),x.title]),String(yimiMathPaperSection),v=>{yimiMathPaperSection=Number(v);render()}));
  const status=el('p','答案与解题草稿仅保存在本机浏览器。','hint');status.setAttribute('aria-live','polite');
  function save(key,value){drafts[key]=value;try{localStorage.setItem(YIMI_PAPER_KEY,JSON.stringify(drafts));status.textContent='已保存到本机，下次可接着做。'}catch{status.textContent='本机保存失败，请先复制草稿。'}}
  const sheet=el('section','','yimi-paper');sheet.dataset.noPinyin='';let field=0;
  function renderBody(text,parent,editable){let code=false,table=null;
    for(const line of text.split('\n')){
      if(line.trim().startsWith('```')){code=!code;continue}if(!line.trim())continue;
      const img=line.match(/!\[([^\]]*)\]\(([^)]+)\)/);if(img){const figure=document.createElement('figure'),image=document.createElement('img');image.src='media/unit3-'+img[2].replace('.png','.jpg');image.alt=img[1];image.loading='lazy';figure.append(image);parent.append(figure);continue}
      if(line.trim().startsWith('|')){if(/^\s*\|[\s|:-]+\|\s*$/.test(line))continue;if(!table){table=document.createElement('table');table.className='english-writing-table';parent.append(table)}const row=document.createElement('tr');line.trim().slice(1,-1).split('|').forEach(x=>row.append(el('td',x.trim())));table.append(row);continue}table=null;
      if(code){parent.append(el('pre',line,'paper-vertical'));continue}
      if(line.startsWith('### ')){parent.append(el('h4',line.slice(4)));continue}
      const p=el('p','','paper-line');if(!editable||/^4\. 在○|^6\. 根据37/.test(line.trim())){p.textContent=line.trim();parent.append(p);continue}
      const pieces=line.trim().split(/(（[\s　]+）|○)/);for(const piece of pieces){if(/^(（[\s　]+）|○)$/.test(piece)){const key=yimiMathPaperSection+':field:'+field++,input=document.createElement('input');input.type='text';input.className='paper-answer';input.maxLength=60;input.autocomplete='off';input.setAttribute('aria-label',section.title+' 第'+field+'个填答框');input.value=typeof drafts[key]==='string'?drafts[key]:'';input.oninput=()=>save(key,input.value);p.append(input)}else p.append(document.createTextNode(piece))}parent.append(p);
    }
  }
  renderBody(section.body,sheet,true);host.append(sheet);
  const work=el('textarea','','yimi-draft'),key=yimiMathPaperSection+':work';work.rows=8;work.maxLength=12000;work.placeholder='在这里写计算结果、竖式过程、选择题答案或解题思路。也可以先在纸上写，再回来对照。';work.setAttribute('aria-label','本部分解题草稿');work.value=typeof drafts[key]==='string'?drafts[key]:'';work.oninput=()=>save(key,work.value);host.append(el('h3','计算与解题草稿'),work,status);
  const answers=document.createElement('details');answers.className='yimi-outline paper-solutions';answers.append(el('summary','做完再看 · 本部分参考答案'),el('p','先自己做，再逐题对照。估算和开放题可能有其他合理答案。','hint'));const result=el('div');result.dataset.noPinyin='';renderBody(section.answer,result,false);answers.append(result);host.append(answers);
  const pager=el('div','','pager');for(const [title,delta] of [['上一部分',-1],['下一部分',1]]){const b=yimiButton(title,()=>{yimiMathPaperSection+=delta;render()});b.disabled=yimiMathPaperSection+delta<0||yimiMathPaperSection+delta>=YIMI_MATH_PAPER.length;pager.append(b)}host.append(pager);
}
