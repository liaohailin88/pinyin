let catalogueBook='upper',catalogueQuery='',pendingStoryTitle='';
function renderCatalogue(){
  const host=document.querySelector('#content');
  const tabs=el('div','','filters');CURRICULUM.forEach(book=>{let b=el('button',book.name,book.id===catalogueBook?'selected':'');b.onclick=()=>{catalogueBook=book.id;render()};tabs.append(b)});host.append(tabs);
  host.append(el('p','2024修订版：列出全部识字课、拼音课和阅读主课，并补充已核对的拼音儿歌及园地篇目。附属阅读目录仍在核对，不把目录当作全文。','hint'));
  const form=el('div','','catalogue-search'),input=document.createElement('input');input.type='search';input.placeholder='搜索课题，例如：洗手歌';input.setAttribute('aria-label','搜索课本篇目');input.value=catalogueQuery;form.append(input);host.append(form);
  const results=el('div','','catalogue-list');host.append(results);
  function fill(){results.replaceChildren();const entries=TEXTBOOK_CATALOGUE.filter(s=>s.book===catalogueBook&&(!catalogueQuery||s.title.includes(catalogueQuery)||s.section.includes(catalogueQuery)));
    results.append(el('p',`共 ${entries.length} 个篇目或课次`,'hint'));
    if(!entries.length)results.append(el('p','没有找到这个篇目，试试切换上下册。','empty'));
    for(const entry of entries){const article=el('article','','catalogue-card');const built=READINGS.find(s=>s.title===entry.title&&s.kind==='教材古诗'),saved=customReadings.find(s=>s.title===entry.title),story=saved||built;article.append(el('span',entry.section+(entry.page?' · 第'+entry.page+'页':''),'hint'),el('h3',entry.title));
      if(CATALOGUE_GUIDES[entry.title])article.append(el('p',CATALOGUE_GUIDES[entry.title],'hint'));
      article.append(el('span',story?'全文可读':'待家长提供正文','badge'));
      const actions=el('div','','actions');
      if(story){const read=el('button','打开全文','primary');read.onclick=()=>{category=saved?2:0;readingId=story.id;render()};actions.append(read)}else{const add=el('button','添加这篇课文','secondary');add.onclick=()=>{pendingStoryTitle=entry.title;category=2;readingId='';render();document.querySelector('[aria-label="课文内容"]').focus()};actions.append(add)}
      if(Number.isInteger(entry.lessonIndex)){const words=el('button','学本课生字','secondary');words.onclick=()=>{current='words';wordBook=entry.book==='upper'?0:1;wordLesson=String(entry.lessonIndex);wordSearch='';wordType='all';wordPage=0;selectedChar=null;render()};actions.append(words)}article.append(actions);results.append(article)
    }annotate(results)
  }input.oninput=()=>{catalogueQuery=input.value.trim();fill()};fill();
}
