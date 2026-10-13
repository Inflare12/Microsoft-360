import {useEffect,useMemo,useState} from 'react';
import * as XLSX from 'xlsx';
import pptxgen from 'pptxgenjs';
import {Document,Packer,Paragraph,TextRun} from 'docx';
import {FileText,Grid2X2,Presentation,Download,Upload,Plus,Search,Settings,Save,Sparkles,X,Send,KeyRound,Trash2,Copy,Check} from 'lucide-react';

type AppName='home'|'writer'|'sheets'|'slides';
type Provider='openai'|'openrouter'|'gemini'|'anthropic'|'custom';
type AIConfig={provider:Provider;apiKey:string;baseUrl:string;model:string};
const starterGrid=Array.from({length:12},(_,r)=>Array.from({length:8},(_,c)=>r===0?String.fromCharCode(65+c):''));
const defaults:AIConfig={provider:'openai',apiKey:'',baseUrl:'',model:'gpt-4o-mini'};

function loadAI():AIConfig{try{return JSON.parse(localStorage.getItem('m360-ai')||'null')||defaults}catch{return defaults}}
function textOf(html:string){return new DOMParser().parseFromString(html,'text/html').body.innerText}

async function askAI(cfg:AIConfig,prompt:string){
 if(!cfg.apiKey)throw new Error('Add an AI API key in Settings first.');
 let url=cfg.baseUrl;
 let headers:Record<string,string>={'Content-Type':'application/json'};
 let body:any;
 if(cfg.provider==='gemini'){
  url=url||`https://generativelanguage.googleapis.com/v1beta/models/${cfg.model}:generateContent?key=${encodeURIComponent(cfg.apiKey)}`;
  body={contents:[{parts:[{text:prompt}]}]};
 }else if(cfg.provider==='anthropic'){
  url=url||'https://api.anthropic.com/v1/messages';
  headers={'Content-Type':'application/json','x-api-key':cfg.apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'};
  body={model:cfg.model,max_tokens:2048,messages:[{role:'user',content:prompt}]};
 }else{
  url=url||(cfg.provider==='openrouter'?'https://openrouter.ai/api/v1/chat/completions':'https://api.openai.com/v1/chat/completions');
  headers.Authorization=`Bearer ${cfg.apiKey}`;
  body={model:cfg.model||'gpt-4o-mini',messages:[{role:'user',content:prompt}],temperature:.3};
 }
 const r=await fetch(url,{method:'POST',headers,body:JSON.stringify(body)});
 if(!r.ok)throw new Error(`${r.status}: ${await r.text()}`);
 const j=await r.json();
 if(cfg.provider==='gemini')return j.candidates?.[0]?.content?.parts?.map((p:any)=>p.text).join('')||'';
 if(cfg.provider==='anthropic')return j.content?.map((p:any)=>p.text).join('')||'';
 return j.choices?.[0]?.message?.content||'';
}

export default function App(){
 const [app,setApp]=useState<AppName>('home');
 const [docName,setDocName]=useState('Untitled document');
 const [dark,setDark]=useState(false);
 const [writer,setWriter]=useState('<h1>Welcome to Microsoft-360</h1><p>A free, independent productivity workspace.</p><p>Start writing here...</p>');
 const [grid,setGrid]=useState(starterGrid);
 const [slides,setSlides]=useState([{title:'Microsoft-360',body:'A free, independent productivity suite.'},{title:'Create',body:'Write documents, build spreadsheets and design presentations.'}]);
 const [ai,setAI]=useState(false);
 const [settings,setSettings]=useState(false);
 const [cfg,setCfg]=useState<AIConfig>(loadAI);
 const [chat,setChat]=useState<{role:'user'|'ai';text:string}[]>([]);
 const [question,setQuestion]=useState('');
 const [busy,setBusy]=useState(false);
 useEffect(()=>localStorage.setItem('m360-ai',JSON.stringify(cfg)),[cfg]);
 useEffect(()=>{localStorage.setItem('m360-state',JSON.stringify({docName,writer,grid,slides,app}));},[docName,writer,grid,slides,app]);
 const updateCell=(r:number,c:number,v:string)=>setGrid(g=>g.map((row,ri)=>ri===r?row.map((x,ci)=>ci===c?v:x):row));
 const exportSheet=()=>{const ws=XLSX.utils.aoa_to_sheet(grid);const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Sheet1');XLSX.writeFile(wb,docName+'.xlsx');};
 const exportWriter=async()=>{const plain=textOf(writer);const d=new Document({sections:[{children:plain.split('\n').map(x=>new Paragraph({children:[new TextRun(x)]}))}]});const b=await Packer.toBlob(d);const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=docName+'.docx';a.click();};
 const exportSlides=()=>{const p=new pptxgen();slides.forEach(s=>{const slide=p.addSlide();slide.addText(s.title,{x:.7,y:.7,w:8.5,h:.6,fontSize:28,bold:true});slide.addText(s.body,{x:.7,y:1.6,w:8.5,h:2,fontSize:18});});p.writeFile({fileName:docName+'.pptx'});};
 const newFile=()=>{setDocName('Untitled');setWriter('<h1>Untitled document</h1><p></p>');setGrid(starterGrid);setSlides([{title:'Untitled',body:''}]);setApp('writer');};
 const context=app==='writer'?textOf(writer):app==='sheets'?JSON.stringify(grid):JSON.stringify(slides);
 const runAI=async(q:string)=>{if(!q.trim())return;setChat(c=>[...c,{role:'user',text:q}]);setQuestion('');setBusy(true);try{const answer=await askAI(cfg,`You are the built-in AI assistant for an independent productivity suite. The current application is ${app}. The current file is "${docName}". Work directly on the user's task. Keep answers practical. Current document data/context:\n${context.slice(0,30000)}\n\nUser request:\n${q}`);setChat(c=>[...c,{role:'ai',text:answer}]);}catch(e:any){setChat(c=>[...c,{role:'ai',text:`AI error: ${e.message}`}]);}finally{setBusy(false)}};
 const content=useMemo(()=>{
  if(app==='writer')return <Writer value={writer} setValue={setWriter}/>;
  if(app==='sheets')return <Sheets grid={grid} updateCell={updateCell}/>;
  if(app==='slides')return <Slides slides={slides} setSlides={setSlides}/>;
  return <Home onOpen={setApp} onNew={newFile}/>;
 },[app,writer,grid,slides]);
 return <div className={dark?'app dark':'app'}><header className="top"><div className="brand" onClick={()=>setApp('home')}><span className="logo">M</span><span>Microsoft-360</span></div><div className="title"><input value={docName} onChange={e=>setDocName(e.target.value)}/><span>Saved locally</span></div><div className="actions"><button title="Save"><Save size={17}/></button><button title="AI assistant" className={ai?'selected':''} onClick={()=>setAI(v=>!v)}><Sparkles size={17}/></button><button title="Settings" onClick={()=>setSettings(true)}><Settings size={17}/></button></div></header><div className="bar"><button onClick={newFile}><Plus size={16}/> New</button><label><Upload size={16}/> Import<input hidden type="file" accept=".xlsx,.csv,.txt" onChange={e=>{const f=e.target.files?.[0];if(f){const r=new FileReader();r.onload=()=>{try{const wb=XLSX.read(r.result,{type:'array'});setGrid(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1}) as string[][]);setApp('sheets')}catch{}};r.readAsArrayBuffer(f)}}}/></label><button onClick={()=>app==='writer'?exportWriter():app==='sheets'?exportSheet():app==='slides'?exportSlides():newFile()}><Download size={16}/> Export</button><span className="spacer"/><div className="search"><Search size={16}/><input placeholder="Search"/></div></div><aside><button className={app==='home'?'active':''} onClick={()=>setApp('home')}>⌂ Home</button><button className={app==='writer'?'active':''} onClick={()=>setApp('writer')}><FileText/> Writer</button><button className={app==='sheets'?'active':''} onClick={()=>setApp('sheets')}><Grid2X2/> Sheets</button><button className={app==='slides'?'active':''} onClick={()=>setApp('slides')}><Presentation/> Slides</button></aside><main>{content}</main>{ai&&<AIPanel chat={chat} question={question} setQuestion={setQuestion} run={runAI} busy={busy} close={()=>setAI(false)} clear={()=>setChat([])}/>} {settings&&<SettingsPanel cfg={cfg} setCfg={setCfg} dark={dark} setDark={setDark} close={()=>setSettings(false)}/>}</div>
}

function Home({onOpen,onNew}:{onOpen:(a:AppName)=>void,onNew:()=>void}){return <section className="home"><div className="hero"><div><p className="eyebrow">FREE • NO ACCOUNT • LOCAL-FIRST</p><h1>Your work.<br/><span>One workspace.</span></h1><p>Create documents, spreadsheets and presentations without a subscription or sign-in.</p><button className="primary" onClick={onNew}><Plus size={18}/> Create document</button></div><div className="hero-card"><Sparkles size={42}/><b>Bring your own AI</b><span>Add your own provider API key. It stays in this browser.</span></div></div><h2>Start creating</h2><div className="cards"><Card icon={<FileText/>} title="Writer" text="Documents and rich text" onClick={()=>onOpen('writer')}/><Card icon={<Grid2X2/>} title="Sheets" text="Tables and spreadsheets" onClick={()=>onOpen('sheets')}/><Card icon={<Presentation/>} title="Slides" text="Presentations" onClick={()=>onOpen('slides')}/></div></section>}
function Card(p:any){return <button className="card" onClick={p.onClick}>{p.icon}<b>{p.title}</b><span>{p.text}</span></button>}
function Writer({value,setValue}:{value:string,setValue:(s:string)=>void}){return <section className="editor"><div className="toolbar"><button onClick={()=>document.execCommand('bold')}><b>B</b></button><button onClick={()=>document.execCommand('italic')}><i>I</i></button><button onClick={()=>document.execCommand('underline')}><u>U</u></button><button onClick={()=>document.execCommand('insertUnorderedList')}>☷</button><button onClick={()=>document.execCommand('justifyLeft')}>≡</button><button onClick={()=>document.execCommand('justifyCenter')}>≣</button><span/><button onClick={()=>document.execCommand('undo')}>↶</button><button onClick={()=>document.execCommand('redo')}>↷</button></div><article className="page" contentEditable suppressContentEditableWarning dangerouslySetInnerHTML={{__html:value}} onInput={e=>setValue(e.currentTarget.innerHTML)}/></section>}
function Sheets({grid,updateCell}:{grid:string[][],updateCell:(r:number,c:number,v:string)=>void}){return <section className="sheet"><div className="formula">fx <input placeholder="Select a cell or enter a formula"/></div><div className="grid"><div className="corner"/>{grid[0].map((_,c)=><div className="head" key={c}>{String.fromCharCode(65+c)}</div>)}{grid.map((row,r)=><div className="gridrow" key={r}><div className="rowhead">{r+1}</div>{row.map((v,c)=><input key={r+'-'+c} value={v} onChange={e=>updateCell(r,c,e.target.value)}/>)}</div>)}</div></section>}
function Slides({slides,setSlides}:{slides:any[],setSlides:any}){return <section className="slides"><div className="slide-list">{slides.map((s,i)=><button key={i} className="thumb"><b>{i+1}</b><span>{s.title}</span></button>)}<button className="addslide" onClick={()=>setSlides([...slides,{title:'New slide',body:'Click to edit'}])}><Plus/></button></div><div className="slide-stage">{slides.map((s,i)=><div className="slide" key={i}><input value={s.title} onChange={e=>setSlides(slides.map((x,j)=>j===i?{...x,title:e.target.value}:x))}/><textarea value={s.body} onChange={e=>setSlides(slides.map((x,j)=>j===i?{...x,body:e.target.value}:x))}/></div>)}<button className="present">Present</button></div></section>}
function AIPanel({chat,question,setQuestion,run,busy,close,clear}:{chat:{role:'user'|'ai';text:string}[];question:string;setQuestion:(s:string)=>void;run:(s:string)=>void;busy:boolean;close:()=>void;clear:()=>void}){return <div className="ai-panel"><div className="panel-head"><div><Sparkles size={18}/><b>AI Assistant</b></div><div><button onClick={clear} title="Clear"><Trash2 size={16}/></button><button onClick={close} title="Close"><X size={16}/></button></div></div><div className="chat">{chat.length===0&&<div className="ai-empty"><Sparkles size={30}/><b>Bring your own AI</b><span>Ask it to draft, rewrite, summarize, explain, analyze a sheet, create formulas or plan slides.</span><div className="quick"><button onClick={()=>run('Draft a professional document about this topic.')}>Draft</button><button onClick={()=>run('Improve the current content and explain the changes.')}>Improve</button><button onClick={()=>run('Summarize the current file.')}>Summarize</button></div></div>}{chat.map((m,i)=><div className={m.role==='user'?'msg user':'msg ai'} key={i}>{m.text}</div>)}{busy&&<div className="msg ai">Thinking…</div>}</div><form className="chat-input" onSubmit={e=>{e.preventDefault();run(question)}}><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask your AI…"/><button disabled={busy||!question.trim()}><Send size={17}/></button></form></div>}
function SettingsPanel({cfg,setCfg,dark,setDark,close}:{cfg:AIConfig;setCfg:(c:AIConfig)=>void;dark:boolean;setDark:(v:boolean)=>void;close:()=>void}){const [saved,setSaved]=useState(false);return <div className="modal-backdrop"><div className="settings"><div className="panel-head"><div><Settings size={18}/><b>Settings</b></div><button onClick={close}><X size={18}/></button></div><h3>AI provider</h3><p className="muted">No account is required. Your API key is stored only in this browser's local storage and is sent directly to the provider you choose.</p><label>Provider<select value={cfg.provider} onChange={e=>{const p=e.target.value as Provider;setCfg({...cfg,provider:p,model:p==='gemini'?'gemini-2.5-flash':p==='anthropic'?'claude-3-5-haiku-latest':p==='openrouter'?'openai/gpt-4o-mini':'gpt-4o-mini',baseUrl:p==='custom'?cfg.baseUrl:''})}}><option value="openai">OpenAI</option><option value="openrouter">OpenRouter</option><option value="gemini">Google Gemini</option><option value="anthropic">Anthropic</option><option value="custom">Custom OpenAI-compatible API</option></select></label><label><span><KeyRound size={14}/> API key</span><input type="password" value={cfg.apiKey} onChange={e=>setCfg({...cfg,apiKey:e.target.value})} placeholder="Paste your key" autoComplete="off"/></label><label>Model<input value={cfg.model} onChange={e=>setCfg({...cfg,model:e.target.value})}/></label>{cfg.provider==='custom'&&<label>Base URL<input value={cfg.baseUrl} onChange={e=>setCfg({...cfg,baseUrl:e.target.value})} placeholder="https://your-provider.example/v1/chat/completions"/></label>}<div className="setting-row"><span>Dark mode</span><button className="toggle" onClick={()=>setDark(!dark)}>{dark?'On':'Off'}</button></div><button className="primary full" onClick={()=>{localStorage.setItem('m360-ai',JSON.stringify(cfg));setSaved(true);setTimeout(()=>setSaved(false),1200)}}>{saved?<><Check size={16}/> Saved</>:<><Save size={16}/> Save settings</>}</button><p className="security-note">⚠️ A browser-only app cannot make a secret API key invisible to the browser. Only enter a key you are comfortable using client-side. Never commit keys to GitHub.</p></div></div>}
