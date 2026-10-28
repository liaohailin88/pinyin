const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {JSDOM}=require('jsdom');
const curriculum=require('./curriculum');
const {EXAMPLES}=require('./examples');
const readings=require('./readings');
const all=new Set(curriculum.flatMap(b=>b.lessons.flatMap(l=>[...l[1]+l[2]])));
const upper=new Set(curriculum[0].lessons.map(l=>l[1]).join(''));
assert.equal(upper.size,280);
assert.equal(new Set(curriculum[0].lessons.map(l=>l[2]).join('')).size,100);
const lower=new Set(curriculum[1].lessons.map(l=>l[1]).join(''));
assert.equal([...lower].filter(c=>!upper.has(c)).length,410);
assert.equal(new Set(curriculum[1].lessons.map(l=>l[2]).join('')).size,200);
assert.equal(all.size,690);
for(const c of all){const e=EXAMPLES[c];assert(e,`Missing example: ${c}`);assert(e.word.includes(c),`Word does not contain ${c}`);assert(e.sentence.includes(e.word),`Sentence misses word ${e.word}`);assert(e.sentence.includes('@'),`Sentence has no name: ${c}`)}
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'http://localhost/',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window,d=w.document,ctx=dom.getInternalVMContext();
const spoken=[];
w.speechSynthesis={getVoices:()=>[],cancel(){},speak:u=>spoken.push(u.text)};
w.SpeechSynthesisUtterance=function(text){this.text=text};
w.HTMLElement.prototype.scrollIntoView=function(){};
for(const file of ['vendor/pinyin-pro.js','curriculum.js','examples.js','readings.js','learning.js','app.js'])new vm.Script(fs.readFileSync(file,'utf8'),{filename:file}).runInContext(ctx);
function plain(node){const c=node.cloneNode(true);c.querySelectorAll('rt').forEach(r=>r.remove());return c.textContent}
function change(node,value,event='change'){node.value=value;node.dispatchEvent(new w.Event(event,{bubbles:true}))}
function clickText(text){const b=[...d.querySelectorAll('button')].find(b=>plain(b)===text);assert(b,`Button missing: ${text}`);b.click()}
function coverage(root){const walker=d.createTreeWalker(root,w.NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(n.parentElement.closest('rt,select,textarea,[data-no-pinyin],.hanzi,script'))continue;if(/[\u3400-\u9fff]/u.test(n.textContent))assert(n.parentElement.closest('ruby'),`Unannotated: ${n.textContent}`)}for(const rt of root.querySelectorAll('rt'))assert(rt.textContent.trim(),`Empty pinyin for ${rt.parentElement.textContent}`)}
assert.equal(d.title,'廖八一的小芽学堂');
coverage(d.querySelector('main'));
d.querySelector('[data-tab="words"]').click();
assert.equal(d.querySelectorAll('.word-card').length,18);
assert.equal(w.getCharacters(curriculum[0],'write').length,100);
assert.equal(w.getCharacters(curriculum[1],'write').length,200);
const search=d.querySelector('[aria-label="查找生字"]');
change(search,'好','input');
const good=d.querySelector('.word-card[data-char="好"]');assert(good);good.click();
assert.equal(plain(d.querySelector('.example-sentence')),'廖八一是一个好人。');
coverage(d.querySelector('#content'));
change(d.querySelector('#learner'),'廖寅杰');
assert.equal(plain(d.querySelector('.example-sentence')),'廖寅杰是一个好人。');
assert.equal(JSON.parse(w.localStorage.getItem('sprout-settings')).learner,'廖寅杰');
clickText('🔊 读例句');assert.equal(spoken.at(-1),'廖寅杰是一个好人。');
const starsBefore=Number(d.querySelector('#stars').textContent);clickText('我会读了 ⭐');clickText('我会读了 ⭐');assert.equal(Number(d.querySelector('#stars').textContent),starsBefore+1);
change(d.querySelector('[aria-label="查找生字"]'),'不存在的词','input');assert(d.querySelector('.empty'));
change(d.querySelector('[aria-label="查找生字"]'),'','input');clickText('一年级下册');
change(d.querySelector('[aria-label="学习范围"]'),'write');
assert(plain(d.querySelector('.word-results>.hint')).includes('200'));
change(d.querySelector('[aria-label="按课学习"]'),'0');assert.equal(d.querySelectorAll('.word-card').length,6);
d.querySelector('[data-tab="reading"]').click();
for(const story of readings.filter(s=>s.kind.includes('古诗'))){change(d.querySelector('[aria-label="选择阅读篇目"]'),story.id);assert.equal(plain(d.querySelector('.story h3')),story.title);coverage(d.querySelector('.story'));clickText('🔊 全篇朗读');assert.equal(spoken.at(-1),story.body)}
clickText('我的故事');for(const story of readings.filter(s=>s.kind==='原创短文')){change(d.querySelector('[aria-label="选择阅读篇目"]'),story.id);coverage(d.querySelector('.story'));assert(plain(d.querySelector('.story')).includes('廖寅杰'))}
clickText('家长添加');
change(d.querySelector('[aria-label="课文标题"]'),'测试课文');change(d.querySelector('[aria-label="课文内容"]'),'@认真读书。\n<script>测试</script>');
d.querySelector('.import-story').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
assert.equal(JSON.parse(w.localStorage.getItem('sprout-readings')).length,1);
assert.equal(d.querySelectorAll('.story script').length,0);coverage(d.querySelector('.story'));
clickText('🔊 全篇朗读');assert(spoken.at(-1).startsWith('廖寅杰认真读书。'));
clickText('删除这篇');assert.equal(JSON.parse(w.localStorage.getItem('sprout-readings')).length,0);
const toggle=d.querySelector('#pinyin-toggle');toggle.checked=false;toggle.dispatchEvent(new w.Event('change'));assert(d.body.classList.contains('hide-pinyin'));
toggle.checked=true;toggle.dispatchEvent(new w.Event('change'));assert(!d.body.classList.contains('hide-pinyin'));
for(const b of d.querySelectorAll('nav button')){b.click();coverage(d.querySelector('main'))}
assert.equal(w.pronunciations('乐园').join(' '),'lè yuán');
for(const name of ['廖八一','廖寅杰'])assert.equal(w.pronunciations(name).length,3);
dom.window.close();
console.log('PASS: 690 character examples; 280/410 recognition and 100/200 writing; name switch; ruby coverage; search; lesson filters; speech payloads; story import and deletion; local storage; math navigation.');
