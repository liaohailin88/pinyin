const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync('app.js','utf8');
const core=source.slice(source.indexOf('function rand'),source.indexOf('function renderMath'));
const context=vm.createContext({Math,quiz:null,category:0,showQuiz(){}});
vm.runInContext(core,context);
for(let category=0;category<3;category++){
 context.category=category;const max=[20,100,200][category];
 for(let i=0;i<10000;i++){context.nextQuiz(false);const q=context.quiz;assert(q.a>=0&&q.a<=max&&q.b>=0&&q.b<=max&&q.answer>=0&&q.answer<=max);assert.equal(q.answer,q.op==='+'?q.a+q.b:q.a-q.b);}
}
for(let i=0;i<10000;i++){context.nextQuiz(true);const q=context.quiz;assert(q.a>=1&&q.a<=9&&q.b>=1&&q.b<=9);assert.equal(q.answer,q.a*q.b);}
console.log('PASS: 30,000 addition/subtraction and 10,000 multiplication cases');
