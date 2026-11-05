const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {JSDOM}=require('jsdom');
const html=fs.readFileSync('index.html','utf8'),dom=new JSDOM(html,{url:'https://example.test/',runScripts:'outside-only'}),w=dom.window,d=w.document,ctx=dom.getInternalVMContext(),spoken=[];
w.HTMLElement.prototype.scrollIntoView=function(){};w.speechSynthesis={getVoices:()=>[],cancel(){},speak:u=>spoken.push(u)};w.SpeechSynthesisUtterance=function(text){this.text=text};w.localStorage.setItem('sprout-active-learner','yimi');
for(const m of html.matchAll(/<script src="([^"?]+)(?:\?[^\"]*)?"><\/script>/g))new vm.Script(fs.readFileSync(m[1],'utf8'),{filename:m[1]}).runInContext(ctx);
const plain=n=>{const c=n.cloneNode(true);c.querySelectorAll('rt').forEach(x=>x.remove());return c.textContent};
const click=label=>{const b=[...d.querySelectorAll('button')].find(b=>b.getAttribute('aria-label')===label||b.textContent===label);assert(b,label);b.click()};
d.querySelector('[data-profile="yimi"]').click();d.querySelector('[data-yimi="english"]').click();click('2026四上同步');
const data=vm.runInContext('YIMI_2026',ctx);assert.equal(data.length,6);assert(data.every(u=>u.words.length>=14&&u.phrases.length>=10&&u.sentences.length>=6));
assert.equal(d.querySelectorAll('.english-2026-cards article').length,6);click('🔊 听英语');assert.equal(spoken.at(-1).text,'doctor');assert.equal(spoken.at(-1).lang,'en-US');
const input=d.querySelector('.english-2026-cards input');input.value='doctor';click('核对拼写');assert(plain(d.querySelector('.english-2026-cards .feedback')).includes('拼对'));
for(let i=0;i<6;i++){const select=d.querySelector('[aria-label="选择2026四上单元"]');select.value=String(i);select.dispatchEvent(new w.Event('change'));assert(d.querySelector('a[href*="yimi-2026"]').href.endsWith('page='+(i+1)));}
click('语音与语法');assert(d.querySelector('#content').textContent.includes('Whose'));click('随机检测');
const select=d.querySelector('[aria-label="检测范围"]');select.value='all';select.dispatchEvent(new w.Event('change'));click('随机出10题');
assert.equal(vm.runInContext('new Set(yimi2026Round.items.map(x=>x.item.en)).size',ctx),10);
for(let i=0;i<10;i++){const answer=vm.runInContext('yimi2026Round.items[yimi2026Round.position].item.en',ctx);[...d.querySelectorAll('[data-answer]')].find(b=>b.dataset.answer===answer).click();assert.equal(d.querySelectorAll('[data-answer]:disabled').length,4);click('下一题 →')}
assert(d.querySelector('#content').textContent.includes('10/10'));click('随机出10题');assert.equal(vm.runInContext('yimi2026Round.position',ctx),0);
click('书面表达');assert(plain(d.querySelector('table')).includes('Tom'));assert(!d.querySelector('.english-writing-model').open);
const area=d.querySelector('[aria-label="英语作文草稿"]');area.value="My name is Tom. I'm tall. I have short hair. I'm quiet. I am a doctor. My favourite place is the park. I often take a walk there.";area.dispatchEvent(new w.Event('input'));click('检查句数');assert(plain(d.querySelector('#content')).includes('7 句'));
const savedText=area.value;const check=d.querySelector('[data-writing-check]');check.checked=true;check.dispatchEvent(new w.Event('change'));
const choose=value=>{const s=d.querySelector('[aria-label="选择书面表达题目"]');s.value=value;s.dispatchEvent(new w.Event('change'))};choose('1');assert.equal(d.querySelector('textarea').value,'');choose('0');assert.equal(d.querySelector('textarea').value,savedText);assert(d.querySelector('[data-writing-check]').checked);
click('🔊 My name is Tom.');assert.equal(spoken.at(-1).text,'My name is Tom.');assert.equal(spoken.at(-1).lang,'en-US');
choose('7');assert(vm.runInContext('yimiEnglishWritingLines(YIMI_ENGLISH_WRITING[7])[4]',ctx).includes('an office worker'));click('随机换一道');assert.notEqual(d.querySelector('[aria-label="选择书面表达题目"]').value,'7');
dom.window.close();console.log('2026 English: six units, audio, spelling, scope, unique random questions and scoring passed.');
