// Parent-supplied demonstrations stay in this browser's IndexedDB. No upload service.
const PINYIN_NEEDS_HUMAN=new Set(['f','d','t','n','l']);
const pinyinVoices=new Map();
let pinyinVoicesLoaded=!window.indexedDB;
let pinyinVoiceDB=null,pinyinPlayId=0,pinyinAudio=null,pinyinAudioCleanup=null;
let voiceRecorder=null,voiceStream=null,voiceRecordTimer=null,voiceRecordCancelled=false,voiceDraft=null;
const pinyinVoiceReady=new Promise(resolve=>{
  if(!window.indexedDB){resolve(false);return}
  const request=indexedDB.open('sprout-pinyin-voices',1);
  request.onupgradeneeded=()=>request.result.createObjectStore('voices',{keyPath:'key'});
  request.onerror=()=>resolve(false);
  request.onblocked=()=>resolve(false);
  request.onsuccess=()=>{pinyinVoiceDB=request.result;pinyinVoiceDB.onversionchange=()=>pinyinVoiceDB.close();const tx=pinyinVoiceDB.transaction('voices'),all=tx.objectStore('voices').getAll();all.onsuccess=()=>{for(const row of all.result)if(row.blob instanceof Blob&&row.blob.size)pinyinVoices.set(row.key,row);resolve(true)};all.onerror=()=>resolve(false)};
}).then(ok=>{pinyinVoicesLoaded=true;return ok});
function pinyinVoiceKeys(){return [...new Set([...py.flatMap(row=>row[1]),'ia','iao','ian','iang','iong','ua','uo','uai','uan','uang','ue',...buildSpellBank().map(q=>q.tone)])]}
function stopPinyinPlayback(){pinyinPlayId++;if(pinyinAudio){pinyinAudio.pause();pinyinAudio=null}if(pinyinAudioCleanup){pinyinAudioCleanup();pinyinAudioCleanup=null}if('speechSynthesis'in window)speechSynthesis.cancel()}
function playPinyinSequence(segments){
  stopPinyinPlayback();const id=pinyinPlayId;if(!pinyinVoicesLoaded){pinyinVoiceReady.then(()=>{if(id===pinyinPlayId)playPinyinSequence(segments)});return}const missing=segments.filter(s=>s.key&&PINYIN_NEEDS_HUMAN.has(s.key)&&!pinyinVoices.has(s.key));
  if(missing.length)toast([...new Set(missing.map(s=>s.key))].join('、')+' 尚未录入人声，已跳过近似读音；请打开“家长示范音”。');
  const playable=segments.filter(s=>!s.key||!PINYIN_NEEDS_HUMAN.has(s.key)||pinyinVoices.has(s.key));
  if(!playable.length)return;
  // Keep a single slow utterance when no human recording is involved.
  if(!playable.some(s=>pinyinVoices.has(s.key))){speakPinyin(playable.map(s=>s.text).join('。'),()=>{});return}
  function step(index){if(id!==pinyinPlayId||index>=playable.length)return;const segment=playable[index],row=pinyinVoices.get(segment.key);if(row){playPinyinBlob(row.blob,()=>step(index+1),id)}else speakPinyin(segment.text,()=>step(index+1))}
  step(0);
}
function playPinyinBlob(blob,done,id=pinyinPlayId){
  const url=URL.createObjectURL(blob),audio=new Audio(url);pinyinAudio=audio;let finished=false;
  const cleanup=()=>{URL.revokeObjectURL(url);audio.onended=null;audio.onerror=null};pinyinAudioCleanup=cleanup;
  const finish=failed=>{if(finished)return;finished=true;cleanup();if(pinyinAudio===audio){pinyinAudio=null;pinyinAudioCleanup=null}if(failed&&id===pinyinPlayId)toast('这段音频无法播放，请换成MP3/M4A，或在本机重新录制。');if(id===pinyinPlayId)done?.()};
  audio.onended=()=>finish(false);audio.onerror=()=>finish(true);audio.play().catch(()=>finish(true));
}
function playPinyinKey(key,fallback){playPinyinSequence([{key,text:fallback||spellOptionSound(key)}]);return !PINYIN_NEEDS_HUMAN.has(key)||pinyinVoices.has(key)}
async function savePinyinVoiceRows(rows){
  if(!await pinyinVoiceReady||!pinyinVoiceDB)throw Error('当前浏览器不能保存示范音，请在正常浏览模式下打开网站。');
  const merged=new Map(pinyinVoices);for(const row of rows)merged.set(row.key,row);if([...merged.values()].reduce((sum,row)=>sum+row.blob.size,0)>20*1024*1024)throw Error('本机示范音总量需在20MB以内，请缩短音频后再保存。');
  await new Promise((resolve,reject)=>{const tx=pinyinVoiceDB.transaction('voices','readwrite');for(const row of rows)tx.objectStore('voices').put(row);tx.oncomplete=resolve;tx.onerror=()=>reject(Error('保存失败，请检查浏览器存储空间。'));tx.onabort=()=>reject(Error('保存失败，原有示范音保持不变。'))});
  for(const row of rows)pinyinVoices.set(row.key,row);
}
function cancelPinyinRecording(){voiceRecordCancelled=true;if(voiceRecorder)voiceRecorder.cancelled=true;clearTimeout(voiceRecordTimer);if(voiceRecorder&&voiceRecorder.state==='recording')voiceRecorder.stop();voiceStream?.getTracks().forEach(track=>track.stop());voiceRecorder=null;voiceStream=null}
function voiceAudioFile(file){const extension=(file.name||'').split('.').pop().toLowerCase();if(!file.size||file.size>5*1024*1024)throw Error('请选择不超过5MB的音频文件。');if(!file.type.startsWith('audio/')&&!['mp3','m4a','wav','webm','ogg','aac','mp4'].includes(extension))throw Error('请选择MP3、M4A、WAV、WebM或OGG音频。');return new Blob([file],{type:file.type||({mp3:'audio/mpeg',m4a:'audio/mp4',mp4:'audio/mp4',wav:'audio/wav',webm:'audio/webm',ogg:'audio/ogg',aac:'audio/aac'}[extension])})}
function blobDataURL(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob)})}
function decodeVoicePack(pack){
  if(pack?.format!=='sprout-pinyin-voices'||pack.version!==1||!Array.isArray(pack.voices)||pack.voices.length>600)throw Error('这不是有效的拼音人声包。');const allowed=new Set(pinyinVoiceKeys()),seen=new Set();
  return pack.voices.map(row=>{if(!allowed.has(row.key)||seen.has(row.key)||typeof row.data!=='string'||row.data.length>7*1024*1024)throw Error('人声包中有无效或重复的拼音。');seen.add(row.key);const match=/^data:(audio\/[a-zA-Z0-9.+;=-]+);base64,([A-Za-z0-9+/]*={0,2})$/.exec(row.data);if(!match)throw Error('人声包中有无效的音频。');let bytes;try{bytes=Uint8Array.from(atob(match[2]),c=>c.charCodeAt(0))}catch{throw Error('音频数据损坏。')}if(!bytes.length||bytes.length>5*1024*1024)throw Error('单条音频必须在5MB以内。');return {key:row.key,blob:new Blob([bytes],{type:match[1]}),updated:Date.now()}});
}
function renderPinyinVoiceManager(){
  const details=document.createElement('details');details.className='voice-manager';details.append(el('summary','🎙️ 家长示范音 · 录制或上传人声'));
  details.append(el('p','可以请熟悉拼音的老师或家长示范。先录f、d、t、n、l：未录入这五个音时，不再播放汉字近似音；其他音未录入时仍用设备近似音。','hint'));
  details.append(el('p','录音只保存在当前浏览器，不会上传到网站或GitHub。换手机、iPad或浏览器时，请先导出人声包，再到另一台设备导入；清理浏览器数据会删除本机录音。','hint'));
  const controls=el('div','','voice-controls'),label=el('label','选择要替换的拼音 '),select=document.createElement('select');select.setAttribute('aria-label','示范音拼音');select.className='textbook-pinyin';const keys=pinyinVoiceKeys(),ordered=[...PINYIN_NEEDS_HUMAN,...keys.filter(k=>!PINYIN_NEEDS_HUMAN.has(k))];
  for(const key of ordered){const option=el('option',key+(PINYIN_NEEDS_HUMAN.has(key)?' · 优先录制':''));option.value=key;select.append(option)}if(voiceDraft)select.value=voiceDraft.key;label.append(select);controls.append(label);
  const status=el('p','正在读取本机示范音……','voice-status');status.setAttribute('role','status');const actions=el('div','','actions'),start=gameButton('开始录音',startRecording),stop=gameButton('停止录音',()=>{if(voiceRecorder?.state==='recording')voiceRecorder.stop()}),preview=gameButton('试听待保存录音',()=>{if(voiceDraft?.key===select.value){stopPinyinPlayback();playPinyinBlob(voiceDraft.blob,()=>{})}}),saveButton=gameButton('保存并替换',async()=>{if(!voiceDraft||voiceDraft.key!==select.value)return;try{await savePinyinVoiceRows([{...voiceDraft,updated:Date.now()}]);voiceDraft=null;update('已保存，将用于点读和拼读。')}catch(error){update(error.message)}}),hearSaved=gameButton('试听已保存示范音',()=>{const row=pinyinVoices.get(select.value);if(row){stopPinyinPlayback();playPinyinBlob(row.blob,()=>{})}});
  stop.disabled=true;actions.append(start,stop,preview,saveButton,hearSaved);
  const uploadLabel=el('label','或上传单条音频（5MB以内） '),upload=document.createElement('input');upload.type='file';upload.accept='audio/*,.mp3,.m4a,.wav,.webm,.ogg,.aac';upload.setAttribute('aria-label','上传单条拼音音频');upload.onchange=()=>{const file=upload.files?.[0];if(!file)return;try{voiceDraft={key:select.value,blob:voiceAudioFile(file)};update('音频已选好。请先试听，确认后点击“保存并替换”。')}catch(error){update(error.message)}upload.value=''};uploadLabel.append(upload);
  function update(message){if(!details.isConnected)return;const recording=voiceRecorder?.state==='recording';start.disabled=recording;stop.disabled=!recording;select.disabled=recording;upload.disabled=recording;const draft=voiceDraft?.key===select.value;preview.disabled=!draft||recording;saveButton.disabled=!draft||recording;hearSaved.disabled=!pinyinVoices.has(select.value)||recording;status.textContent=message||`${select.value}：${pinyinVoices.has(select.value)?'已有人声示范':'尚未录入'}。本机共保存${pinyinVoices.size}个示范音。`;annotate(status)}
  async function startRecording(){
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){update('本浏览器不支持直接录音。可使用系统录音机录好后上传，或在HTTPS网站使用Safari/Chrome。');return}
    start.disabled=true;select.disabled=true;const key=select.value;
    try{stopPinyinPlayback();const stream=await navigator.mediaDevices.getUserMedia({audio:true});if(!details.isConnected){stream.getTracks().forEach(t=>t.stop());return}voiceStream=stream;voiceRecordCancelled=false;const mime=['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus'].find(type=>MediaRecorder.isTypeSupported(type));const recorder=new MediaRecorder(stream,mime?{mimeType:mime}:undefined),chunks=[];voiceRecorder=recorder;
      recorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data)};recorder.onstop=()=>{clearTimeout(voiceRecordTimer);stream.getTracks().forEach(t=>t.stop());if(voiceRecorder===recorder){voiceRecorder=null;voiceStream=null}if(recorder.cancelled)return;const blob=new Blob(chunks,{type:recorder.mimeType||mime||'audio/webm'});if(!blob.size){update('没有录到声音，请检查麦克风后重试。');return}voiceDraft={key,blob};update('录音完成。请先试听，确认后点击“保存并替换”。')};recorder.onerror=()=>{cancelPinyinRecording();update('录音失败。可改用系统录音机录好后上传。')};recorder.start();voiceRecordTimer=setTimeout(()=>{if(recorder.state==='recording')recorder.stop()},15000);update('正在录音，清楚读一遍即可；最长15秒。')
    }catch(error){voiceStream?.getTracks().forEach(t=>t.stop());voiceStream=null;voiceRecorder=null;update(error.name==='NotAllowedError'?'未获麦克风权限。可以允许录音，或上传系统录音机录好的音频。':'暂时无法录音。请检查麦克风，或直接上传录好的音频。')}
  }
  const transfer=el('div','','actions'),exportButton=gameButton('导出人声包',async()=>{await pinyinVoiceReady;if(!pinyinVoices.size){update('请先保存至少一个示范音。');return}const voices=await Promise.all([...pinyinVoices.values()].map(async row=>({key:row.key,data:await blobDataURL(row.blob)}))),blob=new Blob([JSON.stringify({format:'sprout-pinyin-voices',version:1,voices})],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='pinyin-human-voices.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);update('人声包已准备下载，请妥善保存。')});const importLabel=el('label','导入人声包 '),importInput=document.createElement('input');importInput.type='file';importInput.accept='.json,application/json';importInput.setAttribute('aria-label','导入拼音人声包');importInput.onchange=async()=>{const file=importInput.files?.[0];if(!file)return;try{if(file.size>30*1024*1024)throw Error('人声包太大，请控制在30MB以内。');const rows=decodeVoicePack(JSON.parse(await file.text()));await savePinyinVoiceRows(rows);update(`已导入${rows.length}个示范音，同音录音已替换。`)}catch(error){update(error.message||'导入失败，请检查人声包。')}importInput.value=''};importLabel.append(importInput);transfer.append(exportButton,importLabel);
  select.onchange=()=>update();details.append(controls,actions,uploadLabel,status,transfer);$('#content').prepend(details);pinyinVoiceReady.then(ok=>{if(!ok)update('当前浏览器不能保存示范音。请尝试正常浏览模式，或更换浏览器。');else update()});update();
}
