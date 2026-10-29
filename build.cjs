const fs=require('node:fs');
const path=require('node:path');
const files=['index.html','profiles.js','yimi-data.js','yimi-extra.js','yimi.js','yimi.css','style.css','learning.css','app.js','learning.js','curriculum.js','examples.js','readings.js','provided-readings.js','catalogue.js','catalogue-ui.js','teacher-focus.js','vendor/pinyin-pro.js','vendor/pinyin-pro.LICENSE'];
for(const file of files){const target=path.join(__dirname,'dist',file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(__dirname,file),target)}
console.log('Static app prepared in dist/');
