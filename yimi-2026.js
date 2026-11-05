// 独立保留资料的六个单元，不混入原有通用上下册主题。
let yimi2026Unit=0,yimi2026Mode='words',yimi2026Page=0,yimi2026Round=null,yimi2026Writing=0;
function yimi2026Shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function yimi2026Bank(index){return YIMI_2026.flatMap((u,i)=>index==='all'||i===Number(index)?[...u.words,...u.phrases].map(([en,zh])=>({id:i+':'+en,en,zh})):[])}
function yimi2026Start(index){const pool=yimi2026Bank(index);const unique=[...new Map(pool.map(x=>[x.en,x])).values()];yimi2026Round={index,items:yimi2026Shuffle(unique).slice(0,10).map(item=>({item,options:yimi2026Shuffle([item,...yimi2026Shuffle(unique.filter(x=>x.zh!==item.zh&&x.en!==item.en)).slice(0,3)]),chosen:null})),position:0,correct:0};render()}
function renderYimi2026(){const host=document.querySelector('#content'),unit=YIMI_2026[yimi2026Unit];
  host.append(el('p','按家长提供的《2026新版四上人教英语知识点总结》7页整理。6个单元，含单词、短语、句型、语音和语法；检测题为配套练习。','hint'));
  const link=el('a','查看原资料 PDF','secondary');link.href='media/yimi-2026-english.pdf#page='+(yimi2026Unit+1);link.target='_blank';link.rel='noopener';host.append(link);
  host.append(yimiSelect('选择2026四上单元',YIMI_2026.map((u,i)=>[String(i),`Unit ${i+1} ${u.title}`]),String(yimi2026Unit),v=>{yimi2026Unit=Number(v);yimi2026Page=0;render()}));
  const tabs=el('div','','filters');[['单词点读','words'],['常用短语','phrases'],['句型跟读','sentences'],['语音与语法','grammar'],['随机检测','test'],['书面表达','writing']].forEach(([label,id])=>tabs.append(yimiButton(label,()=>{yimi2026Mode=id;yimi2026Page=0;render()},yimi2026Mode===id?'selected':'secondary')));host.append(tabs);
  if(yimi2026Mode==='writing')renderYimi2026Writing(host);
  if(['words','phrases','sentences'].includes(yimi2026Mode)){
    const entries=unit[yimi2026Mode],pages=Math.ceil(entries.length/6),grid=el('div','','yimi-card-grid english-2026-cards');
    entries.slice(yimi2026Page*6,yimi2026Page*6+6).forEach(([en,zh])=>{const card=el('article','','yimi-card'),line=el('p',en,'english-sentence');line.lang='en';card.append(line,el('p',zh),yimiButton('🔊 听英语',()=>yimiSpeak(en),'primary'));
      if(yimi2026Mode!=='sentences'){const detail=document.createElement('details');detail.append(el('summary','试试拼写（先想，再展开）'));const input=document.createElement('input');input.autocomplete='off';input.autocapitalize='off';input.spellcheck=false;input.setAttribute('aria-label','2026拼写：'+zh);const result=el('p','','feedback');result.setAttribute('aria-live','polite');detail.append(el('p',zh),input,yimiButton('核对拼写',()=>{const ok=input.value.trim().replace(/\s+/g,' ').toLowerCase()===en.toLowerCase();showResult(result,ok?'success':'retry',ok?'✓ 拼对啦！':'再听一遍，留意字母顺序。');if(ok)yimiDone('2026-spell-'+yimi2026Unit+'-'+en);annotate(result)}),result);card.append(detail)}grid.append(card)});
    const pager=el('div','','pager');for(const [label,delta] of [['上一组',-1],['下一组',1]]){const b=yimiButton(label,()=>{yimi2026Page+=delta;render()});b.disabled=yimi2026Page+delta<0||yimi2026Page+delta>=pages;pager.append(b)}host.append(el('p',`本单元 ${entries.length} 项 · 第 ${yimi2026Page+1}/${pages} 组`,'hint'),grid,pager);
  }
  if(yimi2026Mode==='grammar'){const grid=el('div','','yimi-card-grid');unit.phonics.forEach(([rule,examples])=>{const card=el('article','','yimi-card');card.append(el('h3',rule),el('p','点完整单词，听共同发音。字母组合的读音需要结合单词。','hint'));examples.split(' ').forEach(word=>card.append(yimiButton('🔊 '+word,()=>yimiSpeak(word))));grid.append(card)});const grammar=el('section','','yimi-outline');grammar.append(el('h3','语法小提醒'));unit.grammar.forEach(line=>grammar.append(el('p',line)));host.append(grid,grammar)}
  if(yimi2026Mode==='test')renderYimi2026Test(host);
}
function renderYimi2026Test(host){
  const scope=yimi2026Round?String(yimi2026Round.index):String(yimi2026Unit);
  const actions=el('div','','actions');let selection=scope;actions.append(yimiSelect('检测范围',[['all','全部6单元'],...YIMI_2026.map((u,i)=>[String(i),`Unit ${i+1} ${u.title}`])],scope,v=>{selection=v}));actions.append(yimiButton('随机出10题',()=>yimi2026Start(selection),'primary'));host.append(el('p',`题库 ${yimi2026Bank('all').length} 项单词与短语；每次随机抽题、打乱选项。可先独立判断，再点读核对。`,'hint'),actions);
  const round=yimi2026Round;if(!round){host.append(el('p','准备好后，点“随机出10题”开始。','empty'));return}
  if(round.position>=round.items.length){host.append(el('h3',`完成啦！首次答对 ${round.correct}/${round.items.length} 题`));const wrong=round.items.filter(x=>x.chosen!==x.options.findIndex(o=>o.en===x.item.en));if(wrong.length){host.append(el('p','再读一读这些词，下次会更熟悉。'));wrong.forEach(x=>host.append(yimiButton('🔊 '+x.item.en+' · '+x.item.zh,()=>yimiSpeak(x.item.en))))}else host.append(el('p','✓ 全部答对！试着选一个短语说句话吧。'));return}
  const q=round.items[round.position],box=el('section','','yimi-choice'),feedback=el('p','','feedback');feedback.setAttribute('aria-live','polite');box.append(el('p',`第 ${round.position+1}/${round.items.length} 题 · 首次答对 ${round.correct} 题`,'hint'),el('h3','选择“'+q.item.zh+'”对应的英语。'));
  q.options.forEach((o,i)=>{const row=el('div','','actions'),b=yimiButton(o.en,()=>{if(q.chosen!==null)return;q.chosen=i;const ok=o.en===q.item.en;if(ok){round.correct++;yimiDone('2026-test-'+q.item.id)}render()});b.disabled=q.chosen!==null;b.dataset.answer=o.en;row.append(b,yimiButton('🔊 读选项'+(i+1),()=>yimiSpeak(o.en)));box.append(row)});
  if(q.chosen!==null){const ok=q.options[q.chosen].en===q.item.en;showResult(feedback,ok?'success':'retry',ok?'✓ 答对啦！':'再记一记：'+q.item.en+' · '+q.item.zh);box.append(feedback,yimiButton('🔊 听正确答案',()=>yimiSpeak(q.item.en)),yimiButton('下一题 →',()=>{round.position++;render()},'primary'))}host.append(box);
}
