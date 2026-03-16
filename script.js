// ════════════════════════════════
// THEMES
// ════════════════════════════════
const savedTheme = localStorage.getItem('ib_theme') || 'default';
document.body.dataset.theme = savedTheme === 'default' ? '' : savedTheme;
document.querySelectorAll('.theme-dot').forEach(btn => {
  if (btn.dataset.theme === savedTheme) btn.classList.add('active');
  btn.addEventListener('click', () => {
    const t = btn.dataset.theme;
    document.body.dataset.theme = t === 'default' ? '' : t;
    localStorage.setItem('ib_theme', t);
    document.querySelectorAll('.theme-dot').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ════════════════════════════════
// DATA
// ════════════════════════════════
const subjects = [
  { id:"english",  name:"English A",               sub:"Lang & Lit · Paper 1 · Paper 2 · IO",  level:"HL", icon:"📖", accent:"#E8A838",
    topics:["Reader, Culture & Text","Language & Mass Communication","Poetry – close analysis","Prose – close analysis","Individual Oral (IO)","Higher Level Essay","Paper 1 – unseen texts","Paper 2 – comparative essay"] },
  { id:"business", name:"Business Management",     sub:"Paper 1 · Paper 2 · HL Case Study",    level:"HL", icon:"📊", accent:"#2B4B9B",
    topics:["Unit 1 – Business Organisation & Environment","Unit 2 – Human Resource Management","Unit 3 – Finance & Accounts","Unit 4 – Marketing","Unit 5 – Operations Management","HL Extension – Strategy","HL Extension – Mergers & Acquisitions","HL Case Study preparation"] },
  { id:"economics",name:"Economics",               sub:"Micro · Macro · Global · Development", level:"HL", icon:"📈", accent:"#083378",
    topics:["Microeconomics – Supply & Demand","Microeconomics – Elasticity","Microeconomics – Market Failure","Macroeconomics – AD/AS","Macroeconomics – Inflation & Unemployment","Macroeconomics – Fiscal & Monetary Policy","International Economics – Trade","Development Economics"] },
  { id:"french",   name:"French B",                sub:"Listening · Reading · Writing · Oral", level:"SL", icon:"🥐", accent:"#5B82C0",
    topics:["Theme 1 – Identities","Theme 2 – Experiences","Theme 3 – Human Ingenuity","Theme 4 – Social Organisation","Theme 5 – Sharing the Planet","Individual Oral practice","Paper 1 – Reading comprehension","Paper 2 – Writing skills"] },
  { id:"ess",      name:"Env. Systems & Societies",sub:"Systems Thinking · Case Studies",      level:"SL", icon:"🌿", accent:"#3D7A5C",
    topics:["Topic 1 – Foundations of ESS","Topic 2 – Ecosystems & Ecology","Topic 3 – Biodiversity & Conservation","Topic 4 – Water & Aquatic Food","Topic 5 – Soil Systems & Food","Topic 6 – Atmospheric Systems","Topic 7 – Climate Change","Topic 8 – Human Systems & Resource Use"] },
  { id:"math",     name:"Mathematics AA",          sub:"Analysis & Approaches · SL",          level:"SL", icon:"∫", accent:"#7B5EA7",
    topics:["Number & Algebra","Functions","Geometry & Trigonometry","Statistics & Probability","Calculus – differentiation","Calculus – integration","Mathematical Exploration (IA)"] }
];

const eeMilestones = ["Choose subject & topic area","Draft research question","Get supervisor approved","Complete initial research","Write introduction","Complete first draft","First supervisor meeting","Revise & edit","Final draft submitted","RPPF completed"];

const verses = [
  {text:"I can do all things through Christ who strengthens me.",ref:"Philippians 4:13"},
  {text:"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",ref:"Jeremiah 29:11"},
  {text:"Trust in the Lord with all your heart and lean not on your own understanding.",ref:"Proverbs 3:5"},
  {text:"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",ref:"Joshua 1:9"},
  {text:"The Lord is my light and my salvation — whom shall I fear?",ref:"Psalm 27:1"},
  {text:"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",ref:"Philippians 4:6"},
  {text:"She is clothed with strength and dignity, and she laughs without fear of the future.",ref:"Proverbs 31:25"},
  {text:"Come to me, all you who are weary and burdened, and I will give you rest.",ref:"Matthew 11:28"},
  {text:"For God has not given us a spirit of fear, but of power and of love and of a sound mind.",ref:"2 Timothy 1:7"},
  {text:"And we know that in all things God works for the good of those who love him.",ref:"Romans 8:28"},
  {text:"With man this is impossible, but with God all things are possible.",ref:"Matthew 19:26"},
  {text:"The heart of the discerning acquires knowledge, for the ears of the wise seek it out.",ref:"Proverbs 18:15"},
  {text:"Commit to the Lord whatever you do, and he will establish your plans.",ref:"Proverbs 16:3"},
  {text:"But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",ref:"Isaiah 40:31"},
];

// ════════════════════════════════
// HELPERS
// ════════════════════════════════
function getState(id)      { return JSON.parse(localStorage.getItem(`ib_${id}`) || '{"done":[],"resources":[],"notes":""}'); }
function saveState(id, s)  { localStorage.setItem(`ib_${id}`, JSON.stringify(s)); }
function getCoreState(k)   { return JSON.parse(localStorage.getItem(`ib_core_${k}`) || '{}'); }
function saveCoreState(k,d){ localStorage.setItem(`ib_core_${k}`, JSON.stringify(d)); }
function flashSaved(btn, orig){ btn.textContent='Saved ✓'; setTimeout(()=>btn.textContent=orig, 1500); }

// Date badge
document.getElementById('dateBadge').textContent = new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'});

// Tab switching
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById(`tab-${btn.dataset.tab}`).classList.remove('hidden');
  });
});

// ════════════════════════════════
// SUBJECTS
// ════════════════════════════════
const grid = document.getElementById('subjectsGrid');
subjects.forEach(subject => {
  const state = getState(subject.id);
  const pct = Math.round((state.done.length / subject.topics.length) * 100);
  const card = document.createElement('div');
  card.className = 'subject-card';
  card.style.setProperty('--card-accent', subject.accent);
  card.innerHTML = `
    <div class="card-top"><span class="card-icon">${subject.icon}</span><span class="card-badge ${subject.level==='HL'?'hl-badge':'sl-badge'}">${subject.level}</span></div>
    <div class="card-name">${subject.name}</div><div class="card-sub">${subject.sub}</div>
    <div class="progress-label"><span>Syllabus progress</span><span>${pct}%</span></div>
    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="card-footer"><span>${state.resources.length} resource${state.resources.length!==1?'s':''}</span> · <span>${subject.topics.length} topics</span></div>`;
  grid.appendChild(card);
});

// ── Modal ──
const overlay = document.getElementById('modalOverlay');
let activeSubject = null;
function openModal(subject) {
  activeSubject = subject;
  const state = getState(subject.id);
  document.getElementById('modalIcon').textContent = subject.icon;
  document.getElementById('modalTitle').textContent = subject.name;
  document.getElementById('modalLevel').textContent = subject.level+' · '+subject.sub;
  const tl = document.getElementById('topicList'); tl.innerHTML='';
  subject.topics.forEach((topic,i)=>{
    const li=document.createElement('li');
    if(state.done.includes(i)) li.classList.add('done');
    li.innerHTML=`<input type="checkbox" ${state.done.includes(i)?'checked':''}> ${topic}`;
    li.querySelector('input').addEventListener('change',e=>{
      const s=getState(subject.id);
      if(e.target.checked){if(!s.done.includes(i)) s.done.push(i);}else{s.done=s.done.filter(x=>x!==i);}
      saveState(subject.id,s); li.classList.toggle('done',e.target.checked); refreshCard(subject);
    });
    tl.appendChild(li);
  });
  renderResources(subject,state);
  document.getElementById('notesArea').value=state.notes||'';
  overlay.classList.add('open');
}
function renderResources(subject,state){
  const list=document.getElementById('resourceList'); list.innerHTML='';
  state.resources.forEach((r,i)=>{
    const li=document.createElement('li');
    li.innerHTML=`<a href="${r.url}" target="_blank">${r.name}</a><button class="del-btn">remove</button>`;
    li.querySelector('.del-btn').addEventListener('click',()=>{const s=getState(subject.id);s.resources.splice(i,1);saveState(subject.id,s);renderResources(subject,s);refreshCard(subject);});
    list.appendChild(li);
  });
}
document.getElementById('addResourceBtn').addEventListener('click',()=>{
  const name=document.getElementById('resourceName').value.trim(),url=document.getElementById('resourceUrl').value.trim();
  if(!name||!url) return;
  const s=getState(activeSubject.id); s.resources.push({name,url}); saveState(activeSubject.id,s);
  renderResources(activeSubject,s); refreshCard(activeSubject);
  document.getElementById('resourceName').value=''; document.getElementById('resourceUrl').value='';
});
document.getElementById('saveNotes').addEventListener('click',()=>{
  const s=getState(activeSubject.id); s.notes=document.getElementById('notesArea').value; saveState(activeSubject.id,s);
  flashSaved(document.getElementById('saveNotes'),'Save Notes');
});
document.getElementById('modalClose').addEventListener('click',()=>overlay.classList.remove('open'));
overlay.addEventListener('click',e=>{if(e.target===overlay) overlay.classList.remove('open');});
function refreshCard(subject){
  const state=getState(subject.id),pct=Math.round((state.done.length/subject.topics.length)*100);
  const idx=subjects.findIndex(s=>s.id===subject.id),card=grid.querySelectorAll('.subject-card')[idx];
  card.querySelector('.progress-fill').style.width=pct+'%';
  card.querySelector('.progress-label span:last-child').textContent=pct+'%';
  card.querySelector('.card-footer').innerHTML=`<span>${state.resources.length} resource${state.resources.length!==1?'s':''}</span> · <span>${subject.topics.length} topics</span>`;
}

// ── CAS ──
function loadCAS(){
  const d=getCoreState('cas');
  ['creativity','activity','service'].forEach(s=>renderActivities(s,d[s]||[]));
  document.getElementById('cas-notes').value=d.notes||'';
}
function renderActivities(strand,acts){
  const ul=document.getElementById(`cas-${strand}`); ul.innerHTML='';
  acts.forEach((act,i)=>{
    const li=document.createElement('li');
    li.innerHTML=`${act}<button class="del-btn" style="font-size:.7rem">✕</button>`;
    li.querySelector('.del-btn').addEventListener('click',()=>{const d=getCoreState('cas');d[strand].splice(i,1);saveCoreState('cas',d);renderActivities(strand,d[strand]);});
    ul.appendChild(li);
  });
}
document.querySelectorAll('.add-activity-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const strand=btn.dataset.strand,name=prompt(`Add a ${strand} activity:`);
    if(!name||!name.trim()) return;
    const d=getCoreState('cas'); if(!d[strand]) d[strand]=[];
    d[strand].push(name.trim()); saveCoreState('cas',d); renderActivities(strand,d[strand]);
  });
});
document.querySelector('[data-save="cas-notes"]').addEventListener('click',()=>{const d=getCoreState('cas');d.notes=document.getElementById('cas-notes').value;saveCoreState('cas',d);flashSaved(document.querySelector('[data-save="cas-notes"]'),'Save');});

// ── EE ──
function loadEE(){
  const d=getCoreState('ee');
  if(d.subject) document.getElementById('ee-subject').value=d.subject;
  if(d.rq) document.getElementById('ee-rq').value=d.rq;
  if(d.supervisor) document.getElementById('ee-supervisor').value=d.supervisor;
  if(d.words) document.getElementById('ee-words').value=d.words;
  updateEEProgress(d.words||0);
  document.getElementById('ee-notes').value=d.notes||'';
  const ul=document.getElementById('ee-milestones'); ul.innerHTML='';
  eeMilestones.forEach((m,i)=>{
    const li=document.createElement('li'),done=(d.milestones||[]).includes(i);
    if(done) li.classList.add('done');
    li.innerHTML=`<input type="checkbox" ${done?'checked':''}> ${m}`;
    li.querySelector('input').addEventListener('change',e=>{
      const dd=getCoreState('ee'); if(!dd.milestones) dd.milestones=[];
      if(e.target.checked){if(!dd.milestones.includes(i))dd.milestones.push(i);}else{dd.milestones=dd.milestones.filter(x=>x!==i);}
      saveCoreState('ee',dd); li.classList.toggle('done',e.target.checked);
    }); ul.appendChild(li);
  });
}
document.getElementById('ee-words').addEventListener('input',e=>updateEEProgress(e.target.value));
function updateEEProgress(w){const p=Math.min(Math.round((w/4000)*100),100);document.getElementById('ee-pct').textContent=p+'%';document.getElementById('ee-bar').style.width=p+'%';}
document.querySelector('[data-save="ee"]').addEventListener('click',()=>{const d=getCoreState('ee');d.subject=document.getElementById('ee-subject').value;d.rq=document.getElementById('ee-rq').value;d.supervisor=document.getElementById('ee-supervisor').value;d.words=document.getElementById('ee-words').value;d.notes=document.getElementById('ee-notes').value;saveCoreState('ee',d);flashSaved(document.querySelector('[data-save="ee"]'),'Save');});

// ── TOK ──
function loadTOK(){
  const d=getCoreState('tok');
  ['tok-title','tok-kq','tok-prompt','tok-obj1','tok-obj2','tok-obj3'].forEach(id=>{const k=id.replace('tok-','');if(d[k])document.getElementById(id).value=d[k];});
  const p=d.essayProgress||0;
  document.getElementById('tok-essay-range').value=p;document.getElementById('tok-essay-bar').style.width=p+'%';document.getElementById('tok-essay-pct').textContent=p+'%';
  document.getElementById('tok-notes').value=d.notes||'';
}
document.getElementById('tok-essay-range').addEventListener('input',e=>{const v=e.target.value;document.getElementById('tok-essay-bar').style.width=v+'%';document.getElementById('tok-essay-pct').textContent=v+'%';});
document.querySelector('[data-save="tok"]').addEventListener('click',()=>{const d=getCoreState('tok');['title','kq','prompt','obj1','obj2','obj3'].forEach(k=>{d[k]=document.getElementById(`tok-${k}`).value;});d.essayProgress=document.getElementById('tok-essay-range').value;d.notes=document.getElementById('tok-notes').value;saveCoreState('tok',d);flashSaved(document.querySelector('[data-save="tok"]'),'Save');});

// ════════════════════════════════
// NOTES
// ════════════════════════════════
let pages=JSON.parse(localStorage.getItem('ib_pages')||'[]'),activePage=null;
function savePages(){localStorage.setItem('ib_pages',JSON.stringify(pages));}
function renderPageList(){
  const ul=document.getElementById('pageList');ul.innerHTML='';
  pages.forEach((page,i)=>{
    const li=document.createElement('li');li.className='page-item'+(activePage===i?' active':'');
    li.innerHTML=`<span>📄 ${page.title||'Untitled'}</span><button class="page-del">✕</button>`;
    li.addEventListener('click',e=>{if(e.target.classList.contains('page-del'))return;openPage(i);});
    li.querySelector('.page-del').addEventListener('click',e=>{e.stopPropagation();if(confirm('Delete?')){pages.splice(i,1);savePages();if(activePage===i){activePage=null;showEditorEmpty();}else if(activePage>i)activePage--;renderPageList();}});
    ul.appendChild(li);
  });
}
function showEditorEmpty(){document.getElementById('editorEmpty').classList.remove('hidden');document.getElementById('editorContent').classList.add('hidden');}
function openPage(i){activePage=i;const page=pages[i];document.getElementById('editorEmpty').classList.add('hidden');document.getElementById('editorContent').classList.remove('hidden');document.getElementById('pageTitleInput').value=page.title||'';renderBlocks(page.blocks||[]);renderPageList();}
document.getElementById('pageTitleInput').addEventListener('input',e=>{if(activePage===null)return;pages[activePage].title=e.target.value;savePages();renderPageList();});
document.getElementById('addPageBtn').addEventListener('click',()=>{pages.push({title:'Untitled',blocks:[]});savePages();openPage(pages.length-1);renderPageList();document.getElementById('pageTitleInput').focus();});
function renderBlocks(blocks){const list=document.getElementById('blockList');list.innerHTML='';blocks.forEach((b,i)=>list.appendChild(createBlockEl(b,i)));}
function createBlockEl(block,i){
  if(block.type==='divider'){const w=document.createElement('div');w.className='block';w.innerHTML=`<span class="block-drag">⠿</span><hr class="block-divider" style="flex:1"><button class="block-del">✕</button>`;w.querySelector('.block-del').addEventListener('click',()=>deleteBlock(i));return w;}
  const w=document.createElement('div');w.className='block';
  const prefix=block.type==='bullet'?`<span class="bullet-prefix">•</span>`:'';
  w.innerHTML=`<span class="block-drag">⠿</span>${prefix}<textarea class="block-input type-${block.type}" rows="1" placeholder="${block.type==='heading'?'Heading…':block.type==='bullet'?'List item…':'Type something…'}">${block.content||''}</textarea><button class="block-del">✕</button>`;
  const ta=w.querySelector('textarea');autoResize(ta);
  ta.addEventListener('input',()=>{autoResize(ta);pages[activePage].blocks[i].content=ta.value;savePages();});
  ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();addBlock('text',i+1);}if(e.key==='Backspace'&&ta.value===''){e.preventDefault();deleteBlock(i);}});
  w.querySelector('.block-del').addEventListener('click',()=>deleteBlock(i));
  return w;
}
function autoResize(ta){ta.style.height='auto';ta.style.height=ta.scrollHeight+'px';}
function addBlock(type,afterIndex){const nb={type,content:''};if(afterIndex===undefined)pages[activePage].blocks.push(nb);else pages[activePage].blocks.splice(afterIndex,0,nb);savePages();renderBlocks(pages[activePage].blocks);const inputs=document.querySelectorAll('#blockList .block-input');const t=inputs[afterIndex!==undefined?afterIndex:inputs.length-1];if(t)t.focus();}
function deleteBlock(i){pages[activePage].blocks.splice(i,1);savePages();renderBlocks(pages[activePage].blocks);}
document.querySelectorAll('.add-block-btn').forEach(btn=>btn.addEventListener('click',()=>{if(activePage===null)return;addBlock(btn.dataset.type);}));
renderPageList();

// ════════════════════════════════
// ASSIGNMENTS
// ════════════════════════════════
const subjectAccents={'English A':'#E8A838','Business Management':'#2B4B9B','Economics':'#083378','French B':'#5B82C0','ESS':'#3D7A5C','Mathematics AA':'#7B5EA7','CAS':'#E8A838','Extended Essay':'#083378','TOK':'#2B4B9B','Other':'#888'};
let assignments=JSON.parse(localStorage.getItem('ib_assignments')||'[]'),assignFilter='all';
function saveAssignments(){localStorage.setItem('ib_assignments',JSON.stringify(assignments));}
function getDueLabel(dueStr){if(!dueStr)return{text:'No date',cls:''};const due=new Date(dueStr),today=new Date();today.setHours(0,0,0,0);due.setHours(0,0,0,0);const diff=Math.round((due-today)/86400000);if(diff<0)return{text:`Overdue (${Math.abs(diff)}d)`,cls:'overdue'};if(diff===0)return{text:'Due today',cls:'soon'};if(diff<=3)return{text:`Due in ${diff}d`,cls:'soon'};return{text:due.toLocaleDateString('en-GB',{day:'numeric',month:'short'}),cls:''};}
function renderAssignments(){
  const list=document.getElementById('assignList');list.innerHTML='';
  const today=new Date();today.setHours(0,0,0,0);
  let filtered=assignments.filter(a=>{if(assignFilter==='pending')return!a.done;if(assignFilter==='done')return a.done;if(assignFilter==='overdue'){const d=new Date(a.due);d.setHours(0,0,0,0);return!a.done&&a.due&&d<today;}return true;});
  filtered.sort((a,b)=>{if(a.done!==b.done)return a.done?1:-1;if(!a.due)return 1;if(!b.due)return -1;return new Date(a.due)-new Date(b.due);});
  if(!filtered.length){list.innerHTML=`<div class="assign-empty">✦ Nothing here — enjoy the break!</div>`;return;}
  filtered.forEach(a=>{
    const dueInfo=getDueLabel(a.due),isOverdue=dueInfo.cls==='overdue'&&!a.done;
    const card=document.createElement('div');
    card.className='assign-card'+(a.done?' done-card':'')+(isOverdue?' overdue-card':'');
    card.style.setProperty('--card-accent',subjectAccents[a.subject]||'#2B4B9B');
    card.innerHTML=`<input type="checkbox" class="assign-check" ${a.done?'checked':''}/>
      <div class="assign-body"><div class="assign-name">${a.title}</div><div class="assign-meta"><span class="assign-subject-tag">${a.subject}</span><span class="assign-type-tag">${a.type}</span></div>${a.notes?`<div class="assign-notes-text">${a.notes}</div>`:''}</div>
      <span class="assign-due ${dueInfo.cls}">${dueInfo.text}</span><button class="assign-del">✕</button>`;
    card.querySelector('.assign-check').addEventListener('change',e=>{const idx=assignments.findIndex(x=>x.id===a.id);assignments[idx].done=e.target.checked;saveAssignments();renderAssignments();});
    card.querySelector('.assign-del').addEventListener('click',()=>{if(confirm('Delete?')){assignments=assignments.filter(x=>x.id!==a.id);saveAssignments();renderAssignments();}});
    list.appendChild(card);
  });
}
document.querySelectorAll('.filter-pill').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-pill').forEach(b=>b.classList.remove('active'));btn.classList.add('active');assignFilter=btn.dataset.filter;renderAssignments();}));
document.getElementById('openAddAssign').addEventListener('click',()=>document.getElementById('assignFormOverlay').classList.remove('hidden'));
document.getElementById('af-cancel').addEventListener('click',()=>document.getElementById('assignFormOverlay').classList.add('hidden'));
document.getElementById('af-submit').addEventListener('click',()=>{
  const title=document.getElementById('af-title').value.trim(),subject=document.getElementById('af-subject').value,type=document.getElementById('af-type').value,due=document.getElementById('af-due').value,notes=document.getElementById('af-notes').value.trim();
  if(!title||!subject){alert('Please add a title and subject!');return;}
  assignments.push({id:Date.now(),title,subject,type,due,notes,done:false});saveAssignments();renderAssignments();
  document.getElementById('assignFormOverlay').classList.add('hidden');
  ['af-title','af-due','af-notes'].forEach(id=>document.getElementById(id).value='');document.getElementById('af-subject').value='';
});
renderAssignments();

// ════════════════════════════════
// BUILDERS
// ════════════════════════════════
const builderConfigs = {
  'econ-ia': {
    title:'📈 Econ IA Builder',
    subtitle:'Fill these in or fail. Article → Concept → Diagram → Analysis → Evaluation',
    waffle: true,
    fields:[
      {key:'article',    label:'Article summary',             ph:'Summarise the article in 2–3 sentences. What is happening?',                      hint:'Keep this factual — no analysis here yet'},
      {key:'concept',    label:'Key concept',                 ph:'Which key concept links to this? (e.g. Scarcity, Efficiency, Equity…)',            hint:''},
      {key:'definition', label:'Definition & theory',         ph:'Define the relevant theory. What does the syllabus say?',                          hint:''},
      {key:'diagram',    label:'Diagram description',         ph:'Describe your diagram and what it shows (shifts, labels, equilibrium changes…)',   hint:'Draw it on paper — describe it here'},
      {key:'analysis',   label:'Economic analysis',           ph:'Explain the cause and effect using your diagram. Use economic language.',          hint:'This is your biggest section — be specific'},
      {key:'evaluation', label:'Evaluation',                  ph:'Evaluate: limitations, assumptions, short vs long run, other stakeholders…',      hint:'This is what separates 6s from 7s'},
      {key:'conclusion', label:'Conclusion',                  ph:'Wrap up: what is the overall impact? Does it achieve its goal?',                   hint:''},
    ]
  },
  'english-ia': {
    title:'📖 English IA Builder',
    subtitle:'Individual Oral — structured response builder',
    waffle: false,
    fields:[
      {key:'text',       label:'Literary text',               ph:'Title, author, and genre of your literary text',                              hint:''},
      {key:'extract',    label:'Extract / focus passage',     ph:'Which part of the text are you focusing on? Describe it.',                    hint:''},
      {key:'global',     label:'Global issue',                ph:'What is your global issue? (e.g. "the use of language to enforce power")',    hint:'Be specific — not just "inequality"'},
      {key:'thesis',     label:'Thesis statement',            ph:'Your thesis: how does the text explore this global issue?',                  hint:'One sentence, arguable and specific'},
      {key:'quotes',     label:'Key quotes',                  ph:'List 3–5 quotes with brief notes on what they show',                         hint:'Quote → technique → effect'},
      {key:'analysis',   label:'Analysis',                    ph:'Develop your argument. How do authorial choices connect to the global issue?', hint:''},
      {key:'conclusion', label:'Conclusion',                  ph:'What is the significance of this text in relation to the global issue?',     hint:''},
    ]
  },
  'math-ia': {
    title:'∫ Math IA Builder',
    subtitle:'Mathematical Exploration — hit all the criteria',
    waffle: false,
    fields:[
      {key:'topic',      label:'Topic',                       ph:'What topic/area of maths are you exploring?',                                hint:'Be specific — narrower is better'},
      {key:'rq',         label:'Research question',           ph:'What is the mathematical question you are investigating?',                   hint:'Should be answerable with maths'},
      {key:'aim',        label:'Aim & rationale',             ph:'Why did you choose this? What personal interest connects to it?',            hint:'This gets you personal engagement marks'},
      {key:'variables',  label:'Variables & parameters',      ph:'What are your variables? What are you changing/measuring?',                 hint:''},
      {key:'method',     label:'Mathematical method',         ph:'What mathematics will you use? List the techniques.',                       hint:'Show you know what you\'re doing'},
      {key:'data',       label:'Data / calculations',         ph:'Summarise your key findings and calculations here',                         hint:''},
      {key:'reflection', label:'Reflection',                  ph:'What worked? What didn\'t? What are the limitations? What would you do differently?', hint:'Reflection = easy marks, don\'t skip it'},
    ]
  },
  'tok-builder': {
    title:'🧠 TOK Builder',
    subtitle:'Exhibition + Essay — build your arguments',
    waffle: false,
    fields:[
      {key:'prompt',     label:'Exhibition — IA Prompt',      ph:'Which IA prompt did you choose?',                                           hint:''},
      {key:'obj1',       label:'Object 1 + justification',    ph:'Object: [describe it]\nJustification: how does it link to the prompt?',     hint:'Must have a clear, specific connection'},
      {key:'obj2',       label:'Object 2 + justification',    ph:'Object: [describe it]\nJustification: how does it link to the prompt?',     hint:''},
      {key:'obj3',       label:'Object 3 + justification',    ph:'Object: [describe it]\nJustification: how does it link to the prompt?',     hint:''},
      {key:'essay-title',label:'Essay — Prescribed Title',    ph:'Your chosen title (copy it exactly)',                                       hint:''},
      {key:'kq',         label:'Knowledge Question',          ph:'What is your main knowledge question?',                                    hint:'Must be open-ended and debatable'},
      {key:'claim',      label:'Claim',                       ph:'Your main argument — what do you want to prove?',                          hint:''},
      {key:'counterclaim',label:'Counterclaim',               ph:'Counter your own argument — what speaks against your claim?',              hint:'Show you can think from multiple angles'},
      {key:'rls',        label:'Real Life Situation (RLS)',   ph:'A concrete real-world example that illustrates your claim',                hint:'Be specific — not vague'},
      {key:'aok',        label:'Areas of Knowledge (AOKs)',   ph:'Which AOKs are you exploring and how do they connect?',                    hint:''},
      {key:'conclusion', label:'Conclusion',                  ph:'What is your conclusion? How do you resolve the tension between claim and counterclaim?', hint:''},
    ]
  },
  'ee-builder': {
    title:'📝 EE Builder',
    subtitle:'Extended Essay — future you will say thank you',
    waffle: false,
    fields:[
      {key:'subject',    label:'Subject',                     ph:'Which subject is your EE in?',                                             hint:''},
      {key:'rq',         label:'Research Question',           ph:'Your exact research question',                                             hint:'Must be focused and answerable in 4000 words'},
      {key:'thesis',     label:'Working thesis',              ph:'What is your main argument or answer?',                                    hint:'This will evolve as you write'},
      {key:'outline',    label:'Outline / structure',         ph:'List your sections and what each will cover',                              hint:'Intro → Body (3–4 sections) → Conclusion'},
      {key:'sources',    label:'Key sources',                 ph:'List your main sources with a brief note on each',                         hint:'Aim for variety: academic, primary, secondary'},
      {key:'argument',   label:'Core argument',               ph:'Develop your main argument here. What are you actually saying?',           hint:''},
      {key:'reflection', label:'Reflection (RPPF)',           ph:'Reflect on your research process: what challenged you? what changed?',    hint:'This goes in your RPPF — be honest'},
    ]
  },
  'presentation': {
    title:'🎤 Presentation Builder',
    subtitle:'For French oral, Business presentations, TOK — "I need to speak but I don\'t know what"',
    waffle: false,
    fields:[
      {key:'topic',      label:'Topic',                       ph:'What is the presentation about?',                                          hint:''},
      {key:'audience',   label:'Audience & context',          ph:'Who are you presenting to? What is the occasion/assessment?',              hint:''},
      {key:'keypoints',  label:'Key points (3–5)',            ph:'Point 1:\nPoint 2:\nPoint 3:\nPoint 4:\nPoint 5:',                         hint:'One idea per point — keep it tight'},
      {key:'vocab',      label:'Key vocabulary / phrases',    ph:'Important terms, subject-specific language, or phrases to use',           hint:'For French: include translations'},
      {key:'script',     label:'Script / notes',              ph:'Write out what you\'ll say — or bullet point notes for each section',      hint:''},
      {key:'timing',     label:'Timing plan',                 ph:'Intro: ___ mins\nPoint 1: ___ mins\nPoint 2: ___ mins\nConclusion: ___ mins\nTotal: ___ mins', hint:''},
    ]
  }
};

const waffleResponses = [
  {test: s => s.split(/\s+/).length < 30, msg:"🌵 Barely anything here. Are you trying to get a 2?"},
  {test: s => /very|really|a lot|basically|things|stuff/gi.test(s), msg:"🧇 Waffle detected. Phrases like 'basically', 'very', 'things' are vague. Get specific."},
  {test: s => s.split('.').filter(x=>x.trim().length>0).length < 3, msg:"🥱 Only one or two sentences? Your examiner needs more than this."},
  {test: () => true, msg:"✅ Reads okay — make sure you've got specific examples, economic/literary language, and a clear argument."}
];

function checkWaffle(text) {
  for (const r of waffleResponses) {
    if (r.test(text)) return r.msg;
  }
}

let activeBuilder = null;
const builderOverlay = document.getElementById('builderOverlay');

document.querySelectorAll('.builder-card').forEach(card => {
  card.addEventListener('click', () => openBuilder(card.dataset.builder));
});

function openBuilder(key) {
  const config = builderConfigs[key];
  if (!config) return;
  activeBuilder = key;
  document.getElementById('builderTitle').textContent = config.title;
  document.getElementById('builderSubtitle').textContent = config.subtitle;

  const saved = JSON.parse(localStorage.getItem(`ib_builder_${key}`) || '{}');
  const fieldsEl = document.getElementById('builderFields');
  fieldsEl.innerHTML = '';

  config.fields.forEach(f => {
    const div = document.createElement('div');
    div.className = 'builder-field';
    div.innerHTML = `
      <label>${f.label}${f.hint?` <span style="font-weight:400;opacity:.6;text-transform:none;letter-spacing:0">— ${f.hint}</span>`:''}</label>
      <textarea data-key="${f.key}" placeholder="${f.ph}">${saved[f.key]||''}</textarea>
      <div class="wc-badge"><span class="field-wc">0</span> words</div>
    `;
    const ta = div.querySelector('textarea');
    const wc = div.querySelector('.field-wc');
    const countWords = () => { wc.textContent = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0; updateTotalWC(); };
    ta.addEventListener('input', countWords);
    countWords();
    fieldsEl.appendChild(div);
  });

  document.getElementById('waffleCheck').classList.toggle('hidden', !config.waffle);
  document.getElementById('compiledOutput').classList.add('hidden');
  document.getElementById('waffleResult').classList.add('hidden');
  updateTotalWC();
  builderOverlay.classList.add('open');
}

function updateTotalWC() {
  let total = 0;
  document.querySelectorAll('#builderFields textarea').forEach(ta => {
    if (ta.value.trim()) total += ta.value.trim().split(/\s+/).length;
  });
  document.getElementById('builderWC').textContent = total;
}

document.getElementById('builderClose').addEventListener('click', () => builderOverlay.classList.remove('open'));
builderOverlay.addEventListener('click', e => { if (e.target === builderOverlay) builderOverlay.classList.remove('open'); });

document.getElementById('builderSave').addEventListener('click', () => {
  if (!activeBuilder) return;
  const data = {};
  document.querySelectorAll('#builderFields textarea').forEach(ta => { data[ta.dataset.key] = ta.value; });
  localStorage.setItem(`ib_builder_${activeBuilder}`, JSON.stringify(data));
  flashSaved(document.getElementById('builderSave'), 'Save draft');
});

document.getElementById('waffleCheck').addEventListener('click', () => {
  const allText = Array.from(document.querySelectorAll('#builderFields textarea')).map(t=>t.value).join(' ');
  const result = checkWaffle(allText);
  const el = document.getElementById('waffleResult');
  el.textContent = result;
  el.classList.remove('hidden');
});

document.getElementById('builderExport').addEventListener('click', () => {
  if (!activeBuilder) return;
  const config = builderConfigs[activeBuilder];
  let output = `${config.title}\n${'─'.repeat(50)}\n\n`;
  document.querySelectorAll('#builderFields textarea').forEach((ta, i) => {
    const label = config.fields[i]?.label || '';
    if (ta.value.trim()) output += `【${label.toUpperCase()}】\n${ta.value.trim()}\n\n`;
  });
  document.getElementById('compiledText').value = output.trim();
  document.getElementById('compiledOutput').classList.remove('hidden');
});

document.getElementById('copyCompiled').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('compiledText').value).then(() => flashSaved(document.getElementById('copyCompiled'), 'Copy to clipboard'));
});

// ════════════════════════════════
// MIND
// ════════════════════════════════
const dayIndex = new Date().getDate() % verses.length;
document.getElementById('verseText').textContent = `"${verses[dayIndex].text}"`;
document.getElementById('verseRef').textContent = verses[dayIndex].ref;

const mindData = JSON.parse(localStorage.getItem('ib_mind')||'{}');
document.getElementById('stressText').value = mindData.stress||'';
document.getElementById('dumpText').value   = mindData.dump||'';

document.querySelector('[data-save="stress"]').addEventListener('click',()=>{const d=JSON.parse(localStorage.getItem('ib_mind')||'{}');d.stress=document.getElementById('stressText').value;localStorage.setItem('ib_mind',JSON.stringify(d));flashSaved(document.querySelector('[data-save="stress"]'),'Save');});
document.querySelector('[data-save="dump"]').addEventListener('click',()=>{const d=JSON.parse(localStorage.getItem('ib_mind')||'{}');d.dump=document.getElementById('dumpText').value;localStorage.setItem('ib_mind',JSON.stringify(d));flashSaved(document.querySelector('[data-save="dump"]'),'Save');});

// Breathing
let breathInterval=null;
const phases=[{name:'Inhale…',cls:'inhale',dur:4000},{name:'Hold.',cls:'hold',dur:4000},{name:'Exhale…',cls:'exhale',dur:4000},{name:'Hold.',cls:'hold',dur:4000}];
let phaseIdx=0;
function runBreath(){const circle=document.getElementById('breathCircle'),label=document.getElementById('breathPhase');circle.className='breath-circle '+phases[phaseIdx].cls;label.textContent=phases[phaseIdx].name;phaseIdx=(phaseIdx+1)%phases.length;}
document.getElementById('breathStart').addEventListener('click',()=>{if(breathInterval)return;phaseIdx=0;runBreath();breathInterval=setInterval(runBreath,4000);});
document.getElementById('breathStop').addEventListener('click',()=>{clearInterval(breathInterval);breathInterval=null;document.getElementById('breathCircle').className='breath-circle';document.getElementById('breathPhase').textContent='Press start';});

// ════════════════════════════════
// AM I COOKED
// ════════════════════════════════
document.getElementById('cookedClose').addEventListener('click',()=>document.getElementById('cookedOverlay').classList.add('hidden'));
document.getElementById('cookedOverlay').addEventListener('click',e=>{if(e.target===document.getElementById('cookedOverlay'))document.getElementById('cookedOverlay').classList.add('hidden');});
const stressSlider=document.getElementById('ck-stress');
stressSlider.addEventListener('input',()=>document.getElementById('ck-stress-val').textContent=stressSlider.value);
document.getElementById('ck-again').addEventListener('click',()=>{document.getElementById('cookedForm').classList.remove('hidden');document.getElementById('cookedResult').classList.add('hidden');});
document.getElementById('ck-submit').addEventListener('click',()=>{
  const sleep=parseFloat(document.getElementById('ck-sleep').value)||0,assign=parseInt(document.getElementById('ck-assign').value)||0,stress=parseInt(document.getElementById('ck-stress').value)||5;
  let score=0;
  if(sleep<5)score+=3;else if(sleep<7)score+=1;
  if(assign>=4)score+=3;else if(assign>=2)score+=1;
  if(stress>=8)score+=3;else if(stress>=6)score+=1;
  let verdict,msg;
  if(score>=7){
    verdict='🔥🔥🔥';
    msg=['Yeah bestie you are SO cooked. Put the phone down, open the textbook, drink water, and lock in. Right now.','Fully cooked. Crispy. But it\'s okay — you still have time. Close TikTok and go.','The oven is on. You are in it. But God\'s got you — just get to work sis.'][Math.floor(Math.random()*3)];
  } else if(score>=4){
    verdict='🌡️';
    msg=['It\'s getting warm in here… not cooked yet but you should probably start.','Medium rare. Could go either way. Don\'t push your luck — get something done today.','You\'re on the edge. One productive study session and you\'ll be fine. Go.'][Math.floor(Math.random()*3)];
  } else {
    verdict='✨😎';
    msg=['Nah we chillin. You\'re actually fine. Maybe do a little revision anyway though.','You\'re good bestie! Don\'t stress. God\'s got this, and so do you.','Chill mode activated. Life is good. Keep it up!'][Math.floor(Math.random()*3)];
  }
  document.getElementById('cookedVerdict').textContent=verdict;
  document.getElementById('cookedMsg').textContent=msg;
  document.getElementById('cookedForm').classList.add('hidden');
  document.getElementById('cookedResult').classList.remove('hidden');
});

// ════════════════════════════════
// LOCK IN — POMODORO
// ════════════════════════════════
let pomoInterval=null,pomoSeconds=25*60,pomoRunning=false,pomoMode='Focus';
const statKey=()=>`ib_pomo_${new Date().toDateString()}`;

function loadPomoStats(){
  const s=JSON.parse(localStorage.getItem(statKey())||'{"sessions":0,"mins":0}');
  document.getElementById('statSessions').textContent=s.sessions;
  document.getElementById('statMins').textContent=s.mins;
  const streak=localStorage.getItem('ib_streak')||0;
  document.getElementById('statStreak').textContent=streak;
}

function savePomoSession(mins){
  const s=JSON.parse(localStorage.getItem(statKey())||'{"sessions":0,"mins":0}');
  s.sessions+=1; s.mins+=mins;
  localStorage.setItem(statKey(),JSON.stringify(s));
  // streak
  const today=new Date().toDateString(),lastDay=localStorage.getItem('ib_streak_day');
  const yesterday=new Date(Date.now()-86400000).toDateString();
  let streak=parseInt(localStorage.getItem('ib_streak')||0);
  if(lastDay===yesterday) streak++;
  else if(lastDay!==today) streak=1;
  localStorage.setItem('ib_streak',streak);
  localStorage.setItem('ib_streak_day',today);
  loadPomoStats();
}

function formatTime(s){return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}

function updatePomoDisplay(){document.getElementById('pomoTime').textContent=formatTime(pomoSeconds);}

document.getElementById('lockinClose').addEventListener('click',()=>{document.getElementById('lockinOverlay').classList.add('hidden');});
document.getElementById('lockinOverlay').addEventListener('click',e=>{if(e.target===document.getElementById('lockinOverlay'))document.getElementById('lockinOverlay').classList.add('hidden');});

document.getElementById('pomoStart').addEventListener('click',()=>{
  if(pomoRunning) return;
  pomoRunning=true;
  document.getElementById('lockinMode').textContent=pomoMode+' session in progress…';
  pomoInterval=setInterval(()=>{
    pomoSeconds--;
    updatePomoDisplay();
    if(pomoSeconds<=0){
      clearInterval(pomoInterval); pomoRunning=false;
      const modeMins=Math.round(parseInt(document.querySelector('.pomo-mode.active').dataset.mins));
      if(pomoMode==='Focus') savePomoSession(modeMins);
      document.getElementById('lockinMode').textContent=pomoMode==='Focus'?'🎉 Session done! Take a break.':'Break over! Back to it.';
      new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAA==').play().catch(()=>{});
    }
  },1000);
});

document.getElementById('pomoPause').addEventListener('click',()=>{
  if(pomoRunning){clearInterval(pomoInterval);pomoRunning=false;document.getElementById('lockinMode').textContent='Paused';}
});

document.getElementById('pomoReset').addEventListener('click',()=>{
  clearInterval(pomoInterval);pomoRunning=false;
  pomoSeconds=parseInt(document.querySelector('.pomo-mode.active').dataset.mins)*60;
  updatePomoDisplay();
  document.getElementById('lockinMode').textContent='Ready';
});

document.querySelectorAll('.pomo-mode').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.pomo-mode').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    clearInterval(pomoInterval);pomoRunning=false;
    pomoMode=btn.dataset.label;
    pomoSeconds=parseInt(btn.dataset.mins)*60;
    updatePomoDisplay();
    document.getElementById('lockinMode').textContent=pomoMode+' ready';
  });
});

// ── Init all ──
loadCAS(); loadEE(); loadTOK();

// ════════════════════════════════
// AI REVIEWER
// ════════════════════════════════

const reviewerPrompts = {
  'econ-ia': `You are a strict but fair IB Economics examiner reviewing a student's IA draft notes. The student has filled in sections for: article summary, key concept, definition, diagram description, economic analysis, evaluation, and conclusion.

Review their work against IB Economics IA criteria:
- Criterion A: Diagrams (are they described correctly and relevantly?)
- Criterion B: Terminology (is economic language used accurately?)
- Criterion C: Application (does the article link clearly to the concept?)
- Criterion D: Analysis (is there logical cause-and-effect reasoning?)
- Criterion E: Evaluation (are there limitations, assumptions, short/long run, stakeholders?)

Respond ONLY as valid JSON in this exact format:
{
  "overall": "A short overall verdict in one sentence",
  "score": {"diagrams": "X/3", "terminology": "X/4", "application": "X/3", "analysis": "X/4", "evaluation": "X/6"},
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["specific improvement 1", "specific improvement 2", "specific improvement 3"],
  "tips": ["quick tip 1", "quick tip 2"]
}`,

  'english-ia': `You are an experienced IB English A examiner reviewing a student's Individual Oral preparation notes. They have filled in: literary text, extract/focus, global issue, thesis, key quotes, analysis, and conclusion.

Review against IB English A Individual Oral criteria:
- Criterion A: Knowledge (do they show understanding of the text?)  
- Criterion B: Analysis (are literary choices being analysed for effect?)
- Criterion C: Focus on global issue (is the global issue specific and well-connected?)
- Criterion D: Organisation (is there a clear line of argument?)

Respond ONLY as valid JSON:
{
  "overall": "One sentence overall verdict",
  "score": {"knowledge": "X/10", "analysis": "X/10", "global_focus": "X/10", "organisation": "X/10"},
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "tips": ["tip 1", "tip 2"]
}`,

  'math-ia': `You are an IB Mathematics examiner reviewing a student's Mathematical Exploration (IA) notes. They have filled in: topic, research question, aim/rationale, variables, method, data/calculations, and reflection.

Review against IB Maths IA criteria:
- Criterion A: Communication (is it clear and well-structured?)
- Criterion B: Mathematical Presentation (appropriate notation, diagrams, tech?)
- Criterion C: Personal Engagement (is personal interest/curiosity shown?)
- Criterion D: Reflection (is there critical reflection on results and process?)
- Criterion E: Use of Mathematics (is the maths correct, relevant, and sufficiently complex?)

Respond ONLY as valid JSON:
{
  "overall": "One sentence verdict",
  "score": {"communication": "X/4", "presentation": "X/4", "engagement": "X/3", "reflection": "X/3", "mathematics": "X/6"},
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "tips": ["tip 1", "tip 2"]
}`,

  'tok-builder': `You are an IB Theory of Knowledge examiner reviewing a student's TOK Exhibition and Essay notes. They have filled in: exhibition prompt, 3 objects with justifications, essay title, knowledge question, claim, counterclaim, real life situation, AOKs, and conclusion.

Review against IB TOK criteria:
Exhibition: Are all 3 objects specifically and compellingly linked to the prompt? Is each justification clear?
Essay - Criterion A: Understanding of knowledge questions (is the KQ open and genuinely TOK?)
Essay - Criterion B: Quality of analysis (claim/counterclaim well-developed? RLS relevant?)
Essay - Criterion C: Connections (AOKs explored meaningfully?)
Essay - Criterion D: Organisation (logical structure?)

Respond ONLY as valid JSON:
{
  "overall": "One sentence verdict",
  "score": {"exhibition": "X/10", "knowledge_q": "X/10", "analysis": "X/10", "connections": "X/10"},
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "tips": ["tip 1", "tip 2"]
}`,

  'ee-builder': `You are an IB Extended Essay examiner reviewing a student's EE planning notes. They have: subject, research question, working thesis, outline, key sources, core argument, and reflection.

Review against IB EE criteria:
- Criterion A: Focus and Method (is RQ focused and researchable?)
- Criterion B: Knowledge and Understanding (appropriate sources? subject knowledge shown?)
- Criterion C: Critical Thinking (is there a clear argument? analysis and evaluation?)
- Criterion D: Presentation (is the structure logical?)
- Criterion E: Engagement (genuine intellectual curiosity shown?)

Respond ONLY as valid JSON:
{
  "overall": "One sentence verdict",
  "score": {"focus": "X/6", "knowledge": "X/6", "critical_thinking": "X/12", "presentation": "X/4", "engagement": "X/6"},
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "tips": ["tip 1", "tip 2"]
}`,

  'presentation': `You are an experienced teacher reviewing a student's presentation plan. They have filled in: topic, audience/context, key points, vocabulary, script/notes, and timing plan.

Review the presentation plan for:
- Clarity: Are the key points clear and logical?
- Structure: Does it have a clear intro, body, conclusion?
- Content depth: Is there enough substance?
- Language: Is vocabulary appropriate for the context?
- Timing: Is the timing realistic?

Respond ONLY as valid JSON:
{
  "overall": "One sentence verdict",
  "score": {"clarity": "X/5", "structure": "X/5", "content": "X/5", "language": "X/5"},
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "tips": ["tip 1", "tip 2"]
}`
};

async function runAIReview() {
  if (!activeBuilder) return;

  const config = builderConfigs[activeBuilder];
  const systemPrompt = reviewerPrompts[activeBuilder];
  if (!systemPrompt) return;

  // Gather all field content
  const fieldData = {};
  document.querySelectorAll('#builderFields textarea').forEach((ta, i) => {
    const label = config.fields[i]?.label || `field_${i}`;
    fieldData[label] = ta.value.trim();
  });

  const hasContent = Object.values(fieldData).some(v => v.length > 20);
  if (!hasContent) {
    alert('Fill in at least a few fields before reviewing!');
    return;
  }

  // Show panel, show loading
  const panel = document.getElementById('reviewPanel');
  const loading = document.getElementById('reviewLoading');
  const content = document.getElementById('reviewContent');
  const scoreEl = document.getElementById('reviewScore');
  const btn = document.getElementById('aiReviewBtn');

  panel.classList.remove('hidden');
  loading.classList.remove('hidden');
  content.innerHTML = '';
  scoreEl.textContent = '';
  btn.disabled = true;
  btn.textContent = 'Reviewing…';

  // Scroll to panel
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const userMessage = `Here are my ${config.title} notes:\n\n` +
    Object.entries(fieldData).map(([k,v]) => `**${k}:**\n${v||'(not filled in)'}`).join('\n\n');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    const data = await response.json();
    const raw = data.content?.find(b => b.type === 'text')?.text || '';

    // Parse JSON — strip any markdown fences
    const cleaned = raw.replace(/```json|```/g, '').trim();
    const review = JSON.parse(cleaned);

    loading.classList.add('hidden');
    renderReview(review, content, scoreEl);

  } catch (err) {
    loading.classList.add('hidden');
    content.innerHTML = `<p style="color:var(--text-muted);font-size:.85rem;padding:.5rem 0">Couldn't load review — check your internet connection and try again.</p>`;
    console.error(err);
  }

  btn.disabled = false;
  btn.textContent = '✨ AI Review';
}

function renderReview(review, container, scoreEl) {
  // Overall verdict badge
  scoreEl.textContent = '✓ Reviewed';

  // Score chips row
  if (review.score) {
    const scores = Object.entries(review.score);
    const scoreRow = document.createElement('div');
    scoreRow.className = 'review-score-row';
    scores.forEach(([k, v]) => {
      const [got, total] = v.split('/').map(Number);
      const pct = got / total;
      const cls = pct >= 0.75 ? 'good' : pct >= 0.5 ? 'ok' : 'weak';
      const chip = document.createElement('div');
      chip.className = 'score-chip';
      chip.innerHTML = `<span class="score-chip-label">${k.replace(/_/g,' ')}</span><span class="score-chip-val ${cls}">${v}</span>`;
      scoreRow.appendChild(chip);
    });
    container.appendChild(scoreRow);
  }

  const divider = () => { const d = document.createElement('div'); d.className = 'review-divider'; return d; };

  // Overall
  if (review.overall) {
    container.appendChild(divider());
    const s = document.createElement('div'); s.className = 'review-section';
    s.innerHTML = `<div class="review-section-label">Overall</div><div class="review-section-body" style="font-family:'Playfair Display',serif;font-style:italic">${review.overall}</div>`;
    container.appendChild(s);
  }

  // Strengths
  if (review.strengths?.length) {
    container.appendChild(divider());
    const s = document.createElement('div'); s.className = 'review-section';
    s.innerHTML = `<div class="review-section-label">✅ Strengths</div><div>${review.strengths.map(x=>`<span class="review-tag strength">${x}</span>`).join('')}</div>`;
    container.appendChild(s);
  }

  // Improvements
  if (review.improvements?.length) {
    container.appendChild(divider());
    const s = document.createElement('div'); s.className = 'review-section';
    s.innerHTML = `<div class="review-section-label">⚠️ Needs work</div>` +
      review.improvements.map(x => `<div class="review-section-body" style="padding:.25rem 0;border-bottom:1px solid var(--bg-soft)">→ ${x}</div>`).join('');
    container.appendChild(s);
  }

  // Tips
  if (review.tips?.length) {
    container.appendChild(divider());
    const s = document.createElement('div'); s.className = 'review-section';
    s.innerHTML = `<div class="review-section-label">💡 Quick tips</div><div>${review.tips.map(x=>`<span class="review-tag tip">${x}</span>`).join('')}</div>`;
    container.appendChild(s);
  }
}

document.getElementById('aiReviewBtn').addEventListener('click', runAIReview);

// ════════════════════════════════
// DARK / LIGHT MODE
// ════════════════════════════════
// DARK / LIGHT MODE
// ════════════════════════════════
const dmToggle = document.getElementById('darkmodeToggle');
const dmIcon   = document.getElementById('dmIcon');

const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let isDark = localStorage.getItem('ib_darkmode') !== null
  ? localStorage.getItem('ib_darkmode') === 'true'
  : sysDark;

function applyDarkMode(dark) {
  isDark = dark;
  document.body.classList.toggle('dark-mode',  dark);
  document.body.classList.toggle('light-mode', !dark);
  dmIcon.textContent = dark ? '🌙' : '☀️';
  localStorage.setItem('ib_darkmode', dark);
}

dmToggle.addEventListener('click', () => applyDarkMode(!isDark));
applyDarkMode(isDark);

// ════════════════════════════════
// SIDEBAR CARD WIRING
// ════════════════════════════════

// Am I Cooked sidebar card → opens the popup
document.getElementById('sidebarCookedBtn').addEventListener('click', () => {
  document.getElementById('cookedOverlay').classList.remove('hidden');
  document.getElementById('cookedForm').classList.remove('hidden');
  document.getElementById('cookedResult').classList.add('hidden');
});

// Lock In sidebar card → opens the popup
document.getElementById('sidebarLockinBtn').addEventListener('click', () => {
  document.getElementById('lockinOverlay').classList.remove('hidden');
  loadPomoStats();
});

// Mirror the pomodoro timer into the sidebar card via polling
function updateSidebarTimer() {
  const el  = document.getElementById('sidebarTimer');
  const lbl = document.getElementById('sidebarTimerLabel');
  if (!el) return;
  el.textContent  = formatTime(pomoSeconds);
  el.style.color  = pomoRunning ? 'var(--accent)' : 'var(--primary)';
  lbl.textContent = pomoRunning ? pomoMode + ' in progress…' : 'Ready to focus';
}
setInterval(updateSidebarTimer, 500);
updateSidebarTimer();

// ════════════════════════════════
// QUICK NAV — pick up where you left off
// ════════════════════════════════
const TAB_LABELS = {
  subjects:    '📚 Subjects',
  cas:         '🌱 CAS',
  ee:          '📝 Extended Essay',
  tok:         '🧠 TOK',
  notes:       '🗒️ Notes',
  assignments: '📋 Assignments',
  builders:    '🏗️ Builders',
  mind:        '🌸 Mindfully'
};

// Save last visited tab
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    localStorage.setItem('ib_last_tab', btn.dataset.tab);
    highlightLastVisited(btn.dataset.tab);
  });
});

function highlightLastVisited(tab) {
  document.querySelectorAll('.qnav-btn').forEach(b => b.classList.remove('last-visited'));
  const target = document.querySelector(`.qnav-btn[data-tab="${tab}"]`);
  if (target) target.classList.add('last-visited');

  const label = document.getElementById('lastVisitLabel');
  if (label && tab) {
    label.textContent = `Last on: ${TAB_LABELS[tab] || tab}`;
  }
}

// Quick nav buttons → switch tabs
document.querySelectorAll('.qnav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    // Trigger the matching tab button
    const tabBtn = document.querySelector(`.tab[data-tab="${tab}"]`);
    if (tabBtn) tabBtn.click();
    highlightLastVisited(tab);
  });
});

// On load: highlight the last visited tab
const lastTab = localStorage.getItem('ib_last_tab');
if (lastTab) highlightLastVisited(lastTab);

// ════════════════════════════════════════════════════════
// SMART PLANNER
// ════════════════════════════════════════════════════════

// ── IB Key Dates (2024-2025 cycle) ──
const IB_DATES = [
  { date:'2025-03-15', label:'EE first draft due (typical)', type:'ee' },
  { date:'2025-04-01', label:'TOK Exhibition submission', type:'tok' },
  { date:'2025-04-07', label:'IB Exams begin', type:'exam' },
  { date:'2025-04-22', label:'HL Paper 1 season', type:'exam' },
  { date:'2025-05-08', label:'Predicted grades submission', type:'admin' },
  { date:'2025-05-16', label:'IB Exams end', type:'exam' },
  { date:'2025-06-05', label:'IB Results Day', type:'results' },
  { date:'2025-09-01', label:'Year 2 begins', type:'admin' },
  { date:'2025-09-15', label:'IA drafts due (Year 2)', type:'ia' },
  { date:'2025-10-01', label:'EE final submission window', type:'ee' },
  { date:'2025-11-01', label:'TOK Essay submission', type:'tok' },
  { date:'2025-11-03', label:'IB Exams (Nov session) begin', type:'exam' },
  { date:'2025-12-01', label:'Predicted grades (Year 2)', type:'admin' },
  { date:'2026-04-20', label:'IB May 2026 Exams begin', type:'exam' },
  { date:'2026-05-22', label:'IB May 2026 Exams end', type:'exam' },
  { date:'2026-07-06', label:'IB Results Day 2026', type:'results' },
];

const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let plannerCurrentDate = new Date();
let plannerCurrentWeekStart = getMonday(new Date());
let plannerCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let plannerView = 'daily';
let aiPlanData = JSON.parse(localStorage.getItem('ib_ai_plan') || 'null');
let routines = JSON.parse(localStorage.getItem('ib_routines') || '[]');

function getMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0,0,0,0);
  return date;
}

function toDateStr(d) {
  return d.toISOString().split('T')[0];
}

function isSameDay(a, b) {
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}

// ── View switching ──
document.querySelectorAll('.pview-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pview-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    plannerView = btn.dataset.view;
    document.querySelectorAll('.planner-view').forEach(v => v.classList.add('hidden'));
    document.getElementById(`pview-${plannerView}`).classList.remove('hidden');
    renderPlannerView();
  });
});

function renderPlannerView() {
  if (plannerView === 'daily')   renderDailyView();
  if (plannerView === 'weekly')  renderWeeklyView();
  if (plannerView === 'monthly') renderMonthlyView();
}

// ── DAILY VIEW ──
function renderDailyView() {
  const d = plannerCurrentDate;
  const today = new Date(); today.setHours(0,0,0,0);
  const isToday = isSameDay(d, today);
  document.getElementById('dayLabel').textContent =
    (isToday ? '📍 Today — ' : '') +
    d.toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

  const dateStr = toDateStr(d);
  const grid = document.getElementById('dailyGrid');
  grid.innerHTML = '';

  // Gather items for this day
  const dayItems = getDayItems(d);

  // Render time blocks 6am–11pm
  const hours = [];
  for (let h = 6; h <= 23; h++) hours.push(h);

  hours.forEach(h => {
    const timeLabel = h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h-12}pm`;
    const block = document.createElement('div');
    block.className = 'daily-time-block';

    const slotItems = dayItems.filter(item => item.hour === h);
    const hasItems = slotItems.length > 0;

    block.innerHTML = `
      <div class="daily-time">${timeLabel}</div>
      <div class="daily-slot ${hasItems ? 'has-items' : ''}">
        <div class="slot-items">
          ${slotItems.map(item => `
            <div class="slot-item ${item.type}">
              <span class="slot-item-dot"></span>
              <span>${item.label}</span>
            </div>`).join('')}
        </div>
      </div>`;
    grid.appendChild(block);
  });

  // Add IB dates for today
  const todayIbDates = IB_DATES.filter(id => id.date === dateStr);
  if (todayIbDates.length) {
    const banner = document.createElement('div');
    banner.style.cssText = 'background:color-mix(in srgb,#e74c3c 10%,transparent);border:1px solid #e74c3c44;border-radius:14px;padding:.75rem 1rem;margin-bottom:.5rem;font-size:.82rem;color:#c0392b;display:flex;gap:.5rem;align-items:center;';
    banner.innerHTML = `📌 <strong>IB Date:</strong> ${todayIbDates.map(d=>d.label).join(' · ')}`;
    grid.prepend(banner);
  }
}

// ── WEEKLY VIEW ──
function renderWeeklyView() {
  const ws = plannerCurrentWeekStart;
  const we = new Date(ws); we.setDate(we.getDate() + 6);
  document.getElementById('weekLabel').textContent =
    ws.toLocaleDateString('en-GB',{day:'numeric',month:'short'}) + ' – ' +
    we.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});

  const grid = document.getElementById('weeklyGrid');
  grid.innerHTML = '';
  const today = new Date(); today.setHours(0,0,0,0);

  for (let i = 0; i < 7; i++) {
    const day = new Date(ws); day.setDate(ws.getDate() + i);
    const isToday = isSameDay(day, today);
    const items = getDayItems(day);
    const ibToday = IB_DATES.filter(id => id.date === toDateStr(day));

    const col = document.createElement('div');
    col.className = 'week-day-col';
    col.innerHTML = `
      <div class="week-day-header ${isToday ? 'today-col' : ''}">
        ${DAY_NAMES[i]}<br><small style="font-weight:400;font-size:.65rem">${day.getDate()}/${day.getMonth()+1}</small>
      </div>
      ${ibToday.map(ib => `<div class="week-item ibdate">📌 ${ib.label}</div>`).join('')}
      ${items.length ? items.map(item => `<div class="week-item ${item.type}">${item.label}</div>`).join('') : '<div class="week-empty">free</div>'}
    `;
    grid.appendChild(col);
  }
}

// ── MONTHLY VIEW ──
function renderMonthlyView() {
  const m = plannerCurrentMonth;
  document.getElementById('monthLabel').textContent = MONTH_NAMES[m.getMonth()] + ' ' + m.getFullYear();

  const grid = document.getElementById('monthlyGrid');
  grid.innerHTML = '';

  // Day name headers
  const headerRow = document.createElement('div');
  headerRow.className = 'month-header-row';
  DAY_NAMES.forEach(n => {
    const d = document.createElement('div');
    d.className = 'month-day-name'; d.textContent = n;
    headerRow.appendChild(d);
  });
  grid.appendChild(headerRow);

  // Cells
  const body = document.createElement('div');
  body.className = 'month-body';

  const firstDay = new Date(m.getFullYear(), m.getMonth(), 1);
  const lastDay  = new Date(m.getFullYear(), m.getMonth()+1, 0);
  let startDow = firstDay.getDay(); // 0=Sun
  startDow = startDow === 0 ? 6 : startDow - 1; // convert to Mon=0

  const today = new Date(); today.setHours(0,0,0,0);

  // Padding cells before
  for (let i = 0; i < startDow; i++) {
    const prev = new Date(firstDay); prev.setDate(prev.getDate() - (startDow - i));
    body.appendChild(makeMonthCell(prev, true, today));
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const day = new Date(m.getFullYear(), m.getMonth(), d);
    body.appendChild(makeMonthCell(day, false, today));
  }
  // Padding after
  const totalCells = startDow + lastDay.getDate();
  const remainder = totalCells % 7;
  if (remainder > 0) {
    for (let i = 1; i <= 7 - remainder; i++) {
      const next = new Date(lastDay); next.setDate(next.getDate() + i);
      body.appendChild(makeMonthCell(next, true, today));
    }
  }

  grid.appendChild(body);
}

function makeMonthCell(day, otherMonth, today) {
  const cell = document.createElement('div');
  cell.className = 'month-cell' + (otherMonth ? ' other-month' : '') + (isSameDay(day, today) ? ' today-cell' : '');

  const dateNum = document.createElement('div');
  dateNum.className = 'month-date';
  dateNum.textContent = day.getDate();
  cell.appendChild(dateNum);

  const dotRow = document.createElement('div');
  dotRow.className = 'month-dot-row';

  const items = getDayItems(day);
  const ibDots = IB_DATES.filter(id => id.date === toDateStr(day));

  ibDots.forEach(() => { const d=document.createElement('div'); d.className='month-dot ibdate'; dotRow.appendChild(d); });
  items.filter(i=>i.type==='assignment').forEach(() => { const d=document.createElement('div'); d.className='month-dot assignment'; dotRow.appendChild(d); });
  items.filter(i=>i.type==='routine').forEach(() => { const d=document.createElement('div'); d.className='month-dot routine'; dotRow.appendChild(d); });
  items.filter(i=>i.type==='aiplan').forEach(() => { const d=document.createElement('div'); d.className='month-dot aiplan'; dotRow.appendChild(d); });

  cell.appendChild(dotRow);

  // Show first label
  const allLabels = [...ibDots.map(i=>i.label), ...items.map(i=>i.label)];
  if (allLabels.length) {
    const lbl = document.createElement('div');
    lbl.className = 'month-dot-label';
    lbl.textContent = allLabels[0].length > 18 ? allLabels[0].slice(0,18)+'…' : allLabels[0];
    cell.appendChild(lbl);
  }

  return cell;
}

// ── Items for a given day (routines + assignments + AI plan) ──
function getDayItems(day) {
  const items = [];
  const dateStr = toDateStr(day);
  const dow = day.getDay() === 0 ? 6 : day.getDay() - 1; // Mon=0

  // Routines
  routines.filter(r => parseInt(r.day) === dow).forEach(r => {
    const hour = parseInt(r.time.split(':')[0]);
    items.push({ hour, label: `${r.time} ${r.label}`, type: 'routine' });
  });

  // Assignments due
  assignments.filter(a => a.due === dateStr && !a.done).forEach(a => {
    items.push({ hour: 9, label: `📋 Due: ${a.title}`, type: 'assignment' });
  });

  // AI plan tasks
  if (aiPlanData && aiPlanData[dateStr]) {
    aiPlanData[dateStr].forEach((task, i) => {
      items.push({ hour: 9 + i, label: task, type: 'aiplan' });
    });
  }

  return items;
}

// ── Nav buttons ──
document.getElementById('dayPrev').addEventListener('click', () => { plannerCurrentDate.setDate(plannerCurrentDate.getDate()-1); renderDailyView(); });
document.getElementById('dayNext').addEventListener('click', () => { plannerCurrentDate.setDate(plannerCurrentDate.getDate()+1); renderDailyView(); });
document.getElementById('dayToday').addEventListener('click', () => { plannerCurrentDate = new Date(); renderDailyView(); });

document.getElementById('weekPrev').addEventListener('click', () => { plannerCurrentWeekStart.setDate(plannerCurrentWeekStart.getDate()-7); renderWeeklyView(); });
document.getElementById('weekNext').addEventListener('click', () => { plannerCurrentWeekStart.setDate(plannerCurrentWeekStart.getDate()+7); renderWeeklyView(); });
document.getElementById('weekToday').addEventListener('click', () => { plannerCurrentWeekStart = getMonday(new Date()); renderWeeklyView(); });

document.getElementById('monthPrev').addEventListener('click', () => { plannerCurrentMonth.setMonth(plannerCurrentMonth.getMonth()-1); renderMonthlyView(); });
document.getElementById('monthNext').addEventListener('click', () => { plannerCurrentMonth.setMonth(plannerCurrentMonth.getMonth()+1); renderMonthlyView(); });
document.getElementById('monthToday').addEventListener('click', () => { plannerCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1); renderMonthlyView(); });

// Init planner when tab opens
document.querySelector('.tab[data-tab="planner"]').addEventListener('click', () => {
  setTimeout(renderPlannerView, 50);
});

// ── ROUTINES ──
function renderRoutineList() {
  const list = document.getElementById('routineList');
  list.innerHTML = '';
  const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  routines.forEach((r, i) => {
    const item = document.createElement('div');
    item.className = 'routine-item';
    item.innerHTML = `<span class="routine-day-badge">${dayNames[r.day]}</span>
      <span>${r.time}</span><span style="flex:1">${r.label}</span>
      <button class="routine-del" data-idx="${i}">✕</button>`;
    item.querySelector('.routine-del').addEventListener('click', () => {
      routines.splice(i, 1);
      localStorage.setItem('ib_routines', JSON.stringify(routines));
      renderRoutineList();
      renderPlannerView();
    });
    list.appendChild(item);
  });
  if (!routines.length) list.innerHTML = '<div style="font-size:.78rem;color:var(--text-muted);padding:.5rem">No routines yet — add your weekly activities!</div>';
}

document.getElementById('addRoutineBtn').addEventListener('click', () => {
  renderRoutineList();
  document.getElementById('routineOverlay').classList.remove('hidden');
});
document.getElementById('routineClose').addEventListener('click', () => {
  document.getElementById('routineOverlay').classList.add('hidden');
  renderPlannerView();
});
document.getElementById('routine-add-btn').addEventListener('click', () => {
  const day = document.getElementById('routine-day').value;
  const time = document.getElementById('routine-time').value;
  const label = document.getElementById('routine-label').value.trim();
  if (!label) return;
  routines.push({ day, time, label });
  localStorage.setItem('ib_routines', JSON.stringify(routines));
  document.getElementById('routine-label').value = '';
  renderRoutineList();
});

// ── AI STUDY PLAN ──
document.getElementById('aiPlanBtn').addEventListener('click', async () => {
  const panel = document.getElementById('aiPlanPanel');
  const loading = document.getElementById('aiPlanLoading');
  const content = document.getElementById('aiPlanContent');
  panel.classList.remove('hidden');
  loading.classList.remove('hidden');
  content.innerHTML = '';
  panel.scrollIntoView({ behavior: 'smooth' });

  // Build context for AI
  const upcomingAssignments = assignments
    .filter(a => !a.done && a.due)
    .sort((a,b) => new Date(a.due)-new Date(b.due))
    .slice(0, 12)
    .map(a => `- ${a.title} (${a.subject}, due ${a.due})`)
    .join('\n');

  const today = toDateStr(new Date());
  const next7 = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    next7.push(toDateStr(d));
  }

  const routineSummary = routines.map(r => {
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    return `${days[r.day]} ${r.time}: ${r.label}`;
  }).join('\n') || 'None set';

  const upcomingIB = IB_DATES.filter(id => id.date >= today).slice(0, 5).map(id => `- ${id.date}: ${id.label}`).join('\n');

  const prompt = `You are a smart IB study planner. Create a 7-day study plan starting from ${today} for an IB Diploma student.

ASSIGNMENTS DUE:
${upcomingAssignments || 'None logged yet'}

WEEKLY ROUTINE:
${routineSummary}

UPCOMING IB DATES:
${upcomingIB}

SUBJECTS: English A HL, Business Management HL, Economics HL, French B SL, Math AA SL, ESS SL

Rules:
- Respect the weekly routine (don't schedule study during those times)
- Prioritise subjects with nearest deadlines
- Balance the workload — don't overload any single day
- Include breaks and self-care
- Each day max 3-4 study tasks
- Be specific (e.g. "Revise Elasticity diagrams for Econ IA" not just "study")

Respond ONLY with a JSON object like this (no markdown, no extra text):
{
  "days": [
    {
      "date": "YYYY-MM-DD",
      "dayName": "Monday",
      "tasks": ["Task 1", "Task 2", "Task 3"]
    }
  ]
}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    let text = data.content.filter(b=>b.type==='text').map(b=>b.text).join('');
    text = text.replace(/```json|```/g,'').trim();
    const parsed = JSON.parse(text);

    // Save AI plan to localStorage keyed by date
    const planMap = {};
    parsed.days.forEach(day => { planMap[day.date] = day.tasks; });
    aiPlanData = planMap;
    localStorage.setItem('ib_ai_plan', JSON.stringify(planMap));

    // Render
    loading.classList.add('hidden');
    parsed.days.forEach(day => {
      const div = document.createElement('div');
      div.className = 'ai-plan-day';
      div.innerHTML = `<div class="ai-plan-day-title">${day.dayName} · ${day.date}</div>
        ${day.tasks.map(t => `<div class="ai-plan-task">${t}</div>`).join('')}`;
      content.appendChild(div);
    });
    renderPlannerView();

  } catch(e) {
    loading.classList.add('hidden');
    content.innerHTML = '<p style="color:var(--text-muted);font-size:.85rem;padding:.5rem">Couldn\'t generate plan — make sure you have assignments added first, then try again.</p>';
  }
});

document.getElementById('aiPlanClose').addEventListener('click', () => {
  document.getElementById('aiPlanPanel').classList.add('hidden');
});

// ════════════════════════════════════════════════════════
// SUBJECT FULL PAGE (Notion style)
// ════════════════════════════════════════════════════════
let spActiveSubject = null;
let spActiveSection = 'overview';
let spBlocks = [];

function openSubjectPage(subject) {
  spActiveSubject = subject;
  spActiveSection = 'overview';

  // Set header
  document.getElementById('spBadge').textContent = subject.icon + ' ' + subject.name;
  document.getElementById('spSidebarTitle').textContent = subject.name;
  document.getElementById('spTitle').textContent = subject.icon + ' ' + subject.name;
  document.getElementById('spSubtitle').textContent = subject.level + ' · ' + subject.sub;
  document.getElementById('spQaSubjectName').textContent = subject.name;

  // Progress
  const state = getState(subject.id);
  const pct = Math.round((state.done.length / subject.topics.length) * 100);
  document.getElementById('spProgressPct').textContent = pct + '%';
  document.getElementById('spProgressBar').style.width = pct + '%';

  // Topics
  renderSpTopics(subject, state);

  // Resources
  renderSpResources(subject, state);

  // Notes blocks
  spBlocks = JSON.parse(localStorage.getItem(`ib_sp_blocks_${subject.id}`) || '[]');
  renderSpBlocks();

  // Clear QA chat
  const chat = document.getElementById('spQaChat');
  chat.innerHTML = `<div class="sp-qa-welcome"><span class="sp-qa-icon">🤖</span><p>Ask me anything about <strong>${subject.name}</strong> — I'll explain it clearly, with IB exam tips.</p></div>`;

  // Set nav active
  document.querySelectorAll('.sp-nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.sp-nav-btn[data-sp="overview"]').classList.add('active');
  document.querySelectorAll('.sp-section').forEach(s => s.classList.add('hidden'));
  document.getElementById('sp-overview').classList.remove('hidden');

  document.getElementById('subjectPageOverlay').classList.remove('hidden');
}

document.getElementById('spBack').addEventListener('click', () => {
  document.getElementById('subjectPageOverlay').classList.add('hidden');
  spActiveSubject = null;
});

// Sidebar nav
document.querySelectorAll('.sp-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sp-nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    spActiveSection = btn.dataset.sp;
    document.querySelectorAll('.sp-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(`sp-${spActiveSection}`).classList.remove('hidden');
  });
});

// Topics
function renderSpTopics(subject, state) {
  const list = document.getElementById('spTopicList');
  list.innerHTML = '';
  subject.topics.forEach((topic, i) => {
    const li = document.createElement('li');
    if (state.done.includes(i)) li.classList.add('done');
    li.innerHTML = `<input type="checkbox" ${state.done.includes(i)?'checked':''}> ${topic}`;
    li.querySelector('input').addEventListener('change', e => {
      const s = getState(subject.id);
      if (e.target.checked) { if (!s.done.includes(i)) s.done.push(i); }
      else { s.done = s.done.filter(x => x !== i); }
      saveState(subject.id, s);
      li.classList.toggle('done', e.target.checked);
      const pct = Math.round((s.done.length / subject.topics.length) * 100);
      document.getElementById('spProgressPct').textContent = pct + '%';
      document.getElementById('spProgressBar').style.width = pct + '%';
      refreshCard(subject);
    });
    list.appendChild(li);
  });
}

// Notes blocks
function renderSpBlocks() {
  const list = document.getElementById('spBlockList');
  list.innerHTML = '';
  spBlocks.forEach((block, i) => {
    const div = document.createElement('div');
    if (block.type === 'divider') {
      div.className = 'sp-block divider-block';
      div.innerHTML = `<hr><button class="sp-block-del" data-idx="${i}">✕</button>`;
    } else {
      div.className = `sp-block ${block.type === 'heading' ? 'heading-block' : ''}`;
      div.innerHTML = `<textarea rows="1" placeholder="${block.type === 'heading' ? 'Heading…' : block.type === 'bullet' ? '• List item…' : 'Write something…'}">${block.content||''}</textarea><button class="sp-block-del" data-idx="${i}">✕</button>`;
      const ta = div.querySelector('textarea');
      ta.addEventListener('input', () => {
        spBlocks[i].content = ta.value;
        ta.style.height = 'auto';
        ta.style.height = ta.scrollHeight + 'px';
        saveSpBlocks();
      });
      setTimeout(() => { ta.style.height='auto'; ta.style.height=ta.scrollHeight+'px'; }, 0);
    }
    div.querySelector('.sp-block-del').addEventListener('click', () => {
      spBlocks.splice(i, 1);
      saveSpBlocks();
      renderSpBlocks();
    });
    list.appendChild(div);
  });
}

document.querySelectorAll('.add-block-btn[data-sptype]').forEach(btn => {
  btn.addEventListener('click', () => {
    spBlocks.push({ type: btn.dataset.sptype, content: '' });
    saveSpBlocks();
    renderSpBlocks();
  });
});

function saveSpBlocks() {
  localStorage.setItem(`ib_sp_blocks_${spActiveSubject.id}`, JSON.stringify(spBlocks));
}

// Resources
function renderSpResources(subject, state) {
  const list = document.getElementById('spResourceList');
  list.innerHTML = '';
  state.resources.forEach((r, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${r.url}" target="_blank">${r.name}</a><button class="del-btn">remove</button>`;
    li.querySelector('.del-btn').addEventListener('click', () => {
      const s = getState(subject.id); s.resources.splice(i,1); saveState(subject.id,s);
      renderSpResources(subject,s); refreshCard(subject);
    });
    list.appendChild(li);
  });
}
document.getElementById('spAddResourceBtn').addEventListener('click', () => {
  const name = document.getElementById('spResourceName').value.trim();
  const url  = document.getElementById('spResourceUrl').value.trim();
  if (!name || !url) return;
  const s = getState(spActiveSubject.id); s.resources.push({name,url}); saveState(spActiveSubject.id,s);
  renderSpResources(spActiveSubject,s); refreshCard(spActiveSubject);
  document.getElementById('spResourceName').value='';
  document.getElementById('spResourceUrl').value='';
});

// ── AI Tutor Q&A ──
document.getElementById('spQaSend').addEventListener('click', askAITutor);
document.getElementById('spQaInput').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askAITutor(); }
});

async function askAITutor() {
  const input = document.getElementById('spQaInput');
  const question = input.value.trim();
  if (!question || !spActiveSubject) return;
  input.value = '';

  const chat = document.getElementById('spQaChat');

  // User bubble
  const userMsg = document.createElement('div');
  userMsg.className = 'sp-qa-msg user';
  userMsg.innerHTML = `<div class="sp-qa-bubble">${question}</div>`;
  chat.appendChild(userMsg);

  // Loading bubble
  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'sp-qa-msg ai loading';
  loadingMsg.innerHTML = `<div class="sp-qa-bubble">Thinking…</div>`;
  chat.appendChild(loadingMsg);
  chat.scrollTop = chat.scrollHeight;

  const systemPrompt = `You are an expert IB ${spActiveSubject.name} tutor. The student is in Year 1 of the IB Diploma.
Subject details: ${spActiveSubject.level} — ${spActiveSubject.sub}
Topics covered: ${spActiveSubject.topics.join(', ')}

Answer clearly and concisely. Use examples. Relate to IB assessment criteria when relevant. Keep responses under 200 words. Format with short paragraphs — no long bullet lists.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: question }]
      })
    });
    const data = await res.json();
    const answer = data.content.filter(b=>b.type==='text').map(b=>b.text).join('').trim();

    loadingMsg.classList.remove('loading');
    loadingMsg.querySelector('.sp-qa-bubble').textContent = answer;
  } catch(e) {
    loadingMsg.querySelector('.sp-qa-bubble').textContent = 'Sorry, couldn\'t reach AI right now. Try again!';
  }
  chat.scrollTop = chat.scrollHeight;
}

// ── Wire subject cards to open full page instead of old modal ──
// Replace existing card click listeners
document.getElementById('subjectsGrid').addEventListener('click', e => {
  const card = e.target.closest('.subject-card');
  if (!card) return;
  const idx = Array.from(document.querySelectorAll('.subject-card')).indexOf(card);
  if (idx >= 0) openSubjectPage(subjects[idx]);
});