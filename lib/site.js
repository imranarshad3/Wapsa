// All client behaviour for the MORROW site: rack, accessory board, detail view,
// search, bag, hash routing and GSAP motion. Called once from app/page.js.
export function initSite(gsap) {
  if (typeof window === 'undefined' || window.__morrowReady) return;
  window.__morrowReady = true;

const P = [
  {id:'oversized-shirt',cat:'clothing',kind:'shirt',c:'#1e1e1e',name:'Oversized Shirt',price:180,desc:'A relaxed, boxy cut with dropped shoulders and a long hem. Crisp cotton that softens with wear.',mat:'Cotton poplin',col:'Black'},
  {id:'long-wool-coat',cat:'clothing',kind:'coat',c:'#2b2b2b',name:'Long Wool Coat',price:540,desc:'Single-breasted and cut to the knee, with structured shoulders and a clean notch lapel.',mat:'Wool blend',col:'Charcoal'},
  {id:'pale-over-shirt',cat:'clothing',kind:'shirt',c:'#f3f2ee',name:'Pale Over Shirt',price:190,desc:'A generous shirt with a soft collar and wide sleeves. Worn open over a tee or buttoned to the neck.',mat:'Cotton twill',col:'Pale ivory'},
  {id:'shell-jacket',cat:'clothing',kind:'jacket',c:'#c9c0b2',name:'Shell Jacket',price:320,desc:'A padded zip-front jacket with ribbed cuffs and hem for a closed, insulated shape.',mat:'Nylon, padded',col:'Sand'},
  {id:'grey-shirt',cat:'clothing',kind:'shirt',c:'#8e8b86',name:'Fog Shirt',price:180,desc:'The oversized shirt in a washed mid-grey, with a slightly heavier hand.',mat:'Cotton oxford',col:'Fog grey'},
  {id:'field-coat',cat:'clothing',kind:'coat',c:'#5d5a55',name:'Field Coat',price:480,desc:'A looser coat with patch pockets and a storm flap, for rain and wind.',mat:'Waxed cotton',col:'Graphite'},
  {id:'form-ring',cat:'accessory',kind:'ring',c:'#b9bec4',name:'Form Ring',price:140,desc:'A sculpted band with a soft, hand-formed wave, in polished sterling silver.',mat:'Sterling silver',col:'Silver'},
  {id:'twist-ring',cat:'accessory',kind:'ring',c:'#a7adb4',dash:'18 8',name:'Twist Ring',price:120,desc:'A narrow band with a twisted profile that catches light from every angle.',mat:'Sterling silver',col:'Silver'},
  {id:'chain-band',cat:'accessory',kind:'ring',c:'#c4c8cc',dash:'6 6',name:'Chain Band',price:160,desc:'Fine linked silver worn as a ring or stacked with others.',mat:'Sterling silver',col:'Silver'},
  {id:'pebble-ring',cat:'accessory',kind:'ring',c:'#9da3aa',name:'Pebble Ring',price:150,desc:'A heavy, rounded band with a satin finish.',mat:'Sterling silver',col:'Brushed'},
  {id:'drop-pendant',cat:'accessory',kind:'pendant',c:'#b3b8be',name:'Drop Pendant',price:210,desc:'A single cast drop on a 50 cm fine chain.',mat:'Sterling silver',col:'Silver'},
  {id:'open-cuff',cat:'accessory',kind:'ring',c:'#aeb3b9',dash:'200 40',name:'Open Cuff',price:190,desc:'An open cuff that adjusts to the wrist.',mat:'Sterling silver',col:'Silver'},
];
const POSTS=[
  {t:'How the Long Wool Coat is cut',d:'Studio notes · Nov 2026',p:1},
  {t:'Caring for sterling silver',d:'Care · Oct 2026',p:6},
  {t:'One shirt, four ways to wear it',d:'Styling · Sep 2026',p:2},
  {t:'Inside the silver studio',d:'Makers · Aug 2026',p:7},
  {t:'Why we keep a permanent collection',d:'Essay · Jul 2026',p:3},
  {t:'Layering for the first cold week',d:'Styling · Jun 2026',p:5},
];
const SH={
  shirt:'M110 60 Q150 86 190 60 L240 80 L282 230 L250 245 L222 178 L222 372 Q150 382 78 372 L78 178 L50 245 L18 230 L60 80 Z',
  coat:'M112 52 Q150 78 188 52 L236 72 L262 150 L270 380 L222 384 L218 210 L212 384 L88 384 L82 210 L78 384 L30 380 L38 150 L64 72 Z',
  jacket:'M110 56 Q150 80 190 56 L244 74 Q272 112 276 210 L262 226 L254 300 L254 332 Q150 340 46 332 L46 300 L38 226 L24 210 Q28 112 56 74 Z'};
const EX={shirt:'<path d="M150 96V372" stroke="#000" stroke-opacity=".18" stroke-width="2"/><path d="M118 66 L150 100 L182 66" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="2"/>',
  coat:'<path d="M150 80L120 200M150 80L180 200" stroke="#000" stroke-opacity=".25" stroke-width="2"/><circle cx="140" cy="240" r="4" fill="#000" opacity=".3"/><circle cx="140" cy="290" r="4" fill="#000" opacity=".3"/>',
  jacket:'<path d="M150 80V332" stroke="#000" stroke-opacity=".2" stroke-width="2"/><path d="M46 306H254M46 320H254" stroke="#000" stroke-opacity=".15"/>'};
let gid=0;
const art=(p,withHanger=true)=>{
  const g='g'+(gid++);
  const defs=`<defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient></defs>`;
  if(p.kind==='ring') return `<svg viewBox="0 0 300 300">${defs}<ellipse cx="150" cy="250" rx="90" ry="8" fill="#000" opacity=".1"/><ellipse cx="150" cy="150" rx="88" ry="66" fill="none" stroke="${p.c}" stroke-width="18" stroke-dasharray="${p.dash||''}"/><ellipse cx="150" cy="150" rx="88" ry="66" fill="none" stroke="url(#${g})" stroke-width="18" stroke-dasharray="${p.dash||''}"/></svg>`;
  if(p.kind==='pendant') return `<svg viewBox="0 0 300 300">${defs}<path d="M60 30 Q150 190 240 30" fill="none" stroke="${p.c}" stroke-width="3" stroke-dasharray="4 3"/><path d="M150 150 Q178 200 150 236 Q122 200 150 150Z" fill="${p.c}"/><path d="M150 150 Q178 200 150 236 Q122 200 150 150Z" fill="url(#${g})"/></svg>`;
  const h=withHanger?'<path d="M150 58V40Q150 24 164 26Q172 30 166 40" fill="none" stroke="#6b6863" stroke-width="3"/><path d="M150 58 L96 72 M150 58 L204 72" stroke="#6b6863" stroke-width="3"/>':'';
  return `<svg viewBox="0 0 300 400">${defs}${h}<path d="${SH[p.kind]}" fill="${p.c}"/><path d="${SH[p.kind]}" fill="url(#${g})"/>${EX[p.kind]}</svg>`;
};
const $=s=>document.querySelector(s);
const pad=n=>String(n).padStart(2,'0');
const money=n=>'$'+n.toLocaleString('en-US');
const CL=P.filter(p=>p.cat==='clothing'), AC=P.filter(p=>p.cat==='accessory');
let ci=0, ai=0, busy=false, bag=[];
try{bag=JSON.parse(localStorage.getItem('morrow-bag')||'[]')}catch(e){}
const anim=gsap;

/* ---- clothing rack ---- */
function drawRack(){
  const rack=$('#rack');
  // rail runs from front-left (high) to back-right (lower); each garment hangs further back, smaller
  let s=`<line x1="80" y1="40" x2="980" y2="250" stroke="var(--rail)" stroke-width="4"/>`;
  const order=CL.map((p,i)=>(i-ci+CL.length)%CL.length); // 0 = front
  const items=CL.map((p,i)=>({p,i,o:order[i]})).sort((a,b)=>b.o-a.o);
  items.forEach(({p,i,o})=>{
    const front=o===0;
    const scale=front?1.15:Math.max(.5,.92-o*.08);
    const x=front?130:330+o*112;
    const hookX=x+150*scale, y=40+(hookX-80)/900*210-26*scale; // hanger hook sits on the rail
    s+=`<g class="hang" data-i="${i}" style="cursor:pointer" transform="translate(${x} ${y}) scale(${scale})" opacity="${front?1:Math.max(.35,1-o*.12)}">${art(p).replace('<svg ','<svg width="300" height="400" ')}</g>`;
  });
  rack.innerHTML=s;
  $('#idxA').textContent=pad(ci+1);$('#idxB').textContent=pad(CL.length);
  $('#idxBar').style.height=((ci+1)/CL.length*100)+'%';
}
function drawSpec(){
  const p=CL[ci];
  $('#spec').innerHTML=`
    <div class="no">${pad(ci+1)} / ${pad(CL.length)} · Clothing</div>
    <h1>${p.name}</h1><div class="rule"></div><p>${p.desc}</p>
    <dl><dt>Material</dt><dd>${p.mat}</dd><dt>Colour</dt><dd>${p.col}</dd><dt>Size</dt><dd>1 · 2 · 3</dd></dl>
    <div class="price">${money(p.price)}</div>
    <div class="row"><button class="link" data-open="${p.id}">View details ↗</button>
      <div class="arrows"><button data-step="-1" aria-label="Previous">←</button><span>${pad(ci+1)} / ${pad(CL.length)}</span><button data-step="1" aria-label="Next">→</button></div></div>
    <div class="strip">${CL.map((q,i)=>`<button class="${i===ci?'on':''}" data-pick="${i}" aria-label="${q.name}">${art(q,false)}</button>`).join('')}</div>`;
  if(anim) anim.from('#spec > *',{y:14,opacity:0,stagger:.05,duration:.5,ease:'power3.out'});
}
function stepCloth(d,to){
  if(busy) return;
  const next=to!=null?to:(ci+d+CL.length)%CL.length;
  if(next===ci) return;
  busy=true;
  const out=()=>{ci=next;drawRack();drawSpec();
    if(anim){anim.from('.hang',{x:d>0?60:-60,opacity:0,duration:.6,stagger:.03,ease:'power3.out',onComplete:()=>busy=false})}else busy=false;};
  if(anim) anim.to('.hang',{x:d>0?-60:60,opacity:0,duration:.25,stagger:.015,ease:'power2.in',onComplete:out}); else out();
}

/* ---- accessory ---- */
function drawAcc(){
  $('#board').innerHTML=AC.map((p,i)=>`<button class="${i===ai?'on':''}" data-acc="${i}" aria-label="${p.name}">${art(p)}</button>`).join('');
  const p=AC[ai];
  $('#accSide').innerHTML=`<div class="no note">${pad(ai+1)} / ${pad(AC.length)} · Accessory</div>
    <h1 style="font-weight:300;font-size:clamp(28px,3vw,40px);line-height:1.05">${p.name}</h1>
    <p class="note" style="font-size:15px">${p.desc}</p>
    <div class="big">${art(p)}</div>
    <dl><dt>Material</dt><dd>${p.mat}</dd><dt>Finish</dt><dd>${p.col}</dd></dl>
    <div class="row"><span class="price">${money(p.price)}</span><button class="cta" data-add="${p.id}">Add to bag</button></div>`;
  if(anim) anim.from('#accSide > *',{y:12,opacity:0,stagger:.04,duration:.45,ease:'power3.out'});
}

/* ---- detail ---- */
let size='2', pane='product';
function openDetail(id){
  const p=P.find(x=>x.id===id); if(!p) return;
  const i=CL.indexOf(p);
  const body=`<svg viewBox="0 0 300 520"><ellipse cx="150" cy="70" rx="34" ry="40" fill="#cbb9a6"/><rect x="132" y="104" width="36" height="22" fill="#cbb9a6"/>
     <g transform="translate(0 92)"><path d="${SH[p.kind]}" fill="${p.c}"/></g>
     <path d="M96 440 L104 510 L140 510 L146 470 L154 470 L160 510 L196 510 L204 440Z" fill="#2c2b29"/></svg>`;
  const fabric=`<svg viewBox="0 0 300 400"><rect width="300" height="400" fill="${p.c}"/>${Array.from({length:40},(_,k)=>`<line x1="0" y1="${k*10}" x2="300" y2="${k*10+6}" stroke="#000" stroke-opacity=".06"/>`).join('')}<rect x="140" width="20" height="400" fill="#000" opacity=".06"/></svg>`;
  const panes={product:art(p),'on body':body,fabric};
  const render=()=>{
    $('#detail').innerHTML=`
      <div class="hero">${art(p)}</div>
      <div class="copy">
        <div class="note">${i>=0?pad(i+1)+' / '+pad(CL.length):'Accessory'}</div>
        <h1 style="font-weight:300;font-size:clamp(32px,4vw,48px);line-height:1.05">${p.name}</h1>
        <div class="rule" style="width:28px;height:1px;background:var(--ink)"></div>
        <p class="note" style="font-size:16px">${p.desc}</p>
        <dl><dt>Material</dt><dd>${p.mat}</dd><dt>Colour</dt><dd>${p.col}</dd><dt>Price</dt><dd>${money(p.price)}</dd></dl>
        ${p.cat==='clothing'?`<div class="sizes">${['1','2','3'].map(s=>`<button class="${s===size?'on':''}" data-size="${s}">${s}</button>`).join('')}</div>`:''}
        <button class="cta" data-add="${p.id}">Add to bag</button>
      </div>
      <div class="views">
        <button class="close" data-close-detail>Back to collection ×</button>
        <div class="vtabs">${Object.keys(panes).map(k=>`<button class="${k===pane?'on':''}" data-pane="${k}">${k[0].toUpperCase()+k.slice(1)}</button>`).join('')}</div>
        <div class="vpane">${panes[pane]}</div>
      </div>`;
  };
  render();
  $('#detail').classList.add('on');document.body.style.overflow='hidden';
  $('#detail')._render=render;
  if(anim) anim.from('#detail > *',{y:30,opacity:0,stagger:.08,duration:.6,ease:'power3.out'});
}
function closeDetail(){$('#detail').classList.remove('on');document.body.style.overflow='';pane='product'}

/* ---- bag, toast ---- */
function saveBag(){try{localStorage.setItem('morrow-bag',JSON.stringify(bag))}catch(e){}
  $('#bagCount').textContent=bag.length;
  const items=bag.map((b,k)=>({...P.find(p=>p.id===b.id),size:b.size,k}));
  $('#bagList').innerHTML=items.length?items.map(it=>`<div style="display:flex;justify-content:space-between;gap:10px;padding:10px 0;border-bottom:1px solid var(--line)"><span>${it.name}${it.size?' · size '+it.size:''}<br><small class="note">${money(it.price)}</small></span><button class="link" data-remove="${it.k}">Remove</button></div>`).join(''):'<p class="note">Your bag is empty.</p>';
  $('#bagTotal').textContent=items.length?'Total '+money(items.reduce((a,b)=>a+b.price,0)):'';
}
function toast(t){const el=$('#toast');el.textContent=t;
  if(anim) anim.fromTo(el,{opacity:0,y:10},{opacity:1,y:0,duration:.3,onComplete:()=>anim.to(el,{opacity:0,delay:1.6,duration:.4})}); else {el.style.opacity=1;setTimeout(()=>el.style.opacity=0,1800)}}

/* ---- journal + about ---- */
$('#posts').innerHTML=POSTS.map(x=>`<button class="post" data-open="${P[x.p].id}"><div class="pic">${art(P[x.p])}</div><small>${x.d}</small><h3>${x.t}</h3></button>`).join('');
$('#aboutPic').innerHTML=art(P[1]);

/* ---- search ---- */
function search(){const q=$('#q').value.trim().toLowerCase();
  const r=P.filter(p=>!q||(p.name+' '+p.mat+' '+p.col+' '+p.cat).toLowerCase().includes(q));
  $('#results').innerHTML=r.length?r.map(p=>`<button data-open="${p.id}" data-close>${p.name}<br><small>${p.cat} · ${money(p.price)}</small></button>`).join(''):'<p class="note">Nothing matches that yet.</p>';}

/* ---- routing ---- */
const VIEWS=['clothing','accessory','journal','about'];
function route(){
  const v=VIEWS.includes(location.hash.slice(1))?location.hash.slice(1):'clothing';
  document.querySelectorAll('.view').forEach(el=>el.classList.toggle('on',el.id==='v-'+v));
  document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.dataset.v===v));
  if(anim) anim.from('#v-'+v,{opacity:0,y:16,duration:.5,ease:'power2.out'});
}
window.addEventListener('hashchange',route);

/* ---- events ---- */
const openDrawer=id=>{$(id).classList.add('on');if(anim) anim.from(id+' .in',{x:60,opacity:0,duration:.4,ease:'power3.out'})};
document.addEventListener('click',e=>{
  const t=e.target.closest('button,a,.hang,.drawer'); if(!t) return;
  if(t.classList.contains('drawer')&&e.target===t){t.classList.remove('on');return}
  const d=t.dataset;
  if(d.step) stepCloth(+d.step);
  if(d.pick!=null) stepCloth(+d.pick>ci?1:-1,+d.pick);
  if(t.classList.contains('hang')){const i=+d.i; i===ci?openDetail(CL[i].id):stepCloth(1,i)}
  if(d.acc!=null){ai=+d.acc;drawAcc()}
  if(d.open) openDetail(d.open);
  if(d.pane){pane=d.pane;$('#detail')._render()}
  if(d.size){size=d.size;$('#detail')._render()}
  if(d.add){const p=P.find(x=>x.id===d.add);bag.push({id:p.id,size:p.cat==='clothing'?size:null});saveBag();toast(p.name+' added to bag')}
  if(d.remove!=null){bag.splice(+d.remove,1);saveBag()}
  if('closeDetail' in d) closeDetail();
  if('close' in d) t.closest('.drawer')?.classList.remove('on');
  if(t.id==='openMenu') openDrawer('#menu');
  if(t.id==='openSearch'){openDrawer('#search');search();$('#q').focus()}
  if(t.id==='openBag') openDrawer('#bag');
});
$('#q').addEventListener('input',search);
$('#news').addEventListener('submit',e=>{e.preventDefault();e.target.reset();toast('Thanks — you are on the list')});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeDetail();document.querySelectorAll('.drawer').forEach(d=>d.classList.remove('on'))}
  if($('#detail').classList.contains('on')||document.activeElement.tagName==='INPUT') return;
  const v=location.hash.slice(1)||'clothing';
  if(v==='clothing'&&e.key==='ArrowRight') stepCloth(1);
  if(v==='clothing'&&e.key==='ArrowLeft') stepCloth(-1);
  if(v==='accessory'&&/Arrow(Right|Left)/.test(e.key)){ai=(ai+(e.key==='ArrowRight'?1:-1)+AC.length)%AC.length;drawAcc()}
});
let lastWheel=0;
$('#stage').addEventListener('wheel',e=>{e.preventDefault();const n=Date.now();if(n-lastWheel<500||Math.abs(e.deltaY)<15) return;lastWheel=n;stepCloth(e.deltaY>0?1:-1)},{passive:false});
let tx=null;
$('#stage').addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
$('#stage').addEventListener('touchend',e=>{if(tx==null) return;const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>40) stepCloth(dx<0?1:-1);tx=null});

drawRack();drawSpec();drawAcc();saveBag();route();
if(anim) anim.from('#rack line',{attr:{x2:80,y2:40},duration:1.1,ease:'power3.out'});
}
