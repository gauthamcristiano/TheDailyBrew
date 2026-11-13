(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover)').matches;
const THEMES=[['espresso','Espresso Luxury','#3b2314'],['midnight','Midnight Roast','#c9a85c'],['matcha','Matcha Morning','#8a9a5b'],['sunset','Sunset Café','#c9663f']];
const PAGES=[['index.html','Home'],['about.html','Our Story'],['menu.html','Menu'],['contact.html','Contact']];
const INFO={addr:'12 Brew Lane, Anna Nagar, Chennai 600040',tel:'+91 98765 43210',mail:'hello@thedailybrew.example',hrs:'Daily, 8 am to 10 pm'};
// MENU DATA: add a product by adding a line. Set img:'assets/yourfile.jpg' to use a photo.
const CATS=['Hot Coffee','Cold Coffee','Tea and Other Drinks','Sandwiches and Snacks','Desserts'];
const MENU=[
{n:'Signature Brew Latte',c:0,p:240,d:'Double espresso, steamed milk, caramel and sea salt.',b:'Signature'},
{n:'Flat White',c:0,p:210,d:'Velvety microfoam over a ristretto base.'},
{n:'Filter Kaapi',c:0,p:150,d:'Chicory-kissed South Indian decoction, served in a davara.',b:'Bestseller'},
{n:'Iced Hazelnut Cold Brew',c:1,p:260,d:'Eighteen-hour cold brew, hazelnut, ice.',b:'Bestseller'},
{n:'Espresso Tonic',c:1,p:230,d:'Bright, bitter, fizzy. Orange peel on top.'},
{n:'Matcha Latte',c:2,p:250,d:'Ceremonial matcha whisked with oat milk.'},
{n:'Masala Chai',c:2,p:140,d:'Slow-simmered with ginger and cardamom.'},
{n:'Grilled Pesto Sandwich',c:3,p:280,d:'Sourdough, pesto, mozzarella, roasted tomato.'},
{n:'Butter Croissant',c:3,p:160,d:'Baked each morning. Flaky, golden, warm.',b:'Bestseller'},
{n:'Tiramisu Jar',c:4,p:260,d:'Mascarpone, espresso-soaked sponge, cocoa.',b:'Signature'},
{n:'Dark Chocolate Brownie',c:4,p:180,d:'Fudgy centre, crisp top, sea salt.'}];
const card=m=>`<article class="card" tabindex="0">${m.b?`<span class="tag">${m.b}</span>`:''}<div class="im">${m.img?`<img src="${m.img}" alt="${m.n}" loading="lazy">`:`<span aria-hidden="true">${m.n[0]}</span>`}</div><div class="tx"><div class="row"><h3>${m.n}</h3><span class="price">₹${m.p}</span></div><p>${m.d}</p><p><small>${CATS[m.c]}</small></p></div></article>`;
// theme
const root=document.documentElement;
const setTheme=t=>{try{localStorage.setItem('tdb-theme',t)}catch(e){}root.dataset.theme=t;$$('.themes button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===t))};
// chrome
const cur=location.pathname.split('/').pop()||'index.html';
$('#site-nav').innerHTML=`<a class="sk" href="#main">Skip to content</a><header><div class="wrap"><nav aria-label="Main"><a class="brand" href="index.html"><img src="assets/logo.svg" alt="">The Daily Brew</a><ul class="links" id="links">${PAGES.map(([h,l])=>`<li><a href="${h}"${h===cur?' aria-current="page"':''}>${l}</a></li>`).join('')}</ul><div class="themes" role="group" aria-label="Theme">${THEMES.map(([k,l,c])=>`<button data-t="${k}" style="background:${c}" aria-label="${l} theme" title="${l}" aria-pressed="false"></button>`).join('')}</div><a class="btn visit" href="contact.html#visit" data-mag>Visit us</a><button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="links"><i></i><i></i></button></nav></div></header>`;
$('#site-footer').innerHTML=`<footer><div class="wrap"><div class="cols"><div><h3>The Daily Brew</h3><p>Your Everyday Coffee Destination. Small-batch coffee and warm bites, every day.</p></div><div><h3>Explore</h3><ul>${PAGES.map(([h,l])=>`<li><a href="${h}">${l}</a></li>`).join('')}</ul></div><div><h3>Visit</h3><p>${INFO.addr}<br>${INFO.hrs}</p></div><div><h3>Say hello</h3><p><a href="tel:${INFO.tel.replace(/\s/g,'')}">${INFO.tel}</a><br><a href="mailto:${INFO.mail}">${INFO.mail}</a></p><p><a href="#">Instagram</a> · <a href="#">Facebook</a></p></div></div><small>© ${new Date().getFullYear()} The Daily Brew. All rights reserved.</small></div></footer>`;
setTheme((()=>{try{return localStorage.getItem('tdb-theme')}catch(e){}})()||'espresso');
$$('.themes button').forEach(b=>b.onclick=()=>setTheme(b.dataset.t));
const bg=$('.burger'),lk=$('#links');bg.onclick=()=>{const o=lk.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
const hd=$('header');const sc=()=>hd.classList.toggle('solid',scrollY>40);sc();addEventListener('scroll',sc,{passive:true});
// loader
const ld=document.createElement('div');ld.id='load';ld.innerHTML='<svg viewBox="0 0 40 40"><use href="assets/logo.svg"/></svg><img src="assets/logo.svg" alt="" width="90">';ld.innerHTML='<img src="assets/logo.svg" alt="Loading" width="90" style="animation:pulse 1.4s infinite">';document.body.prepend(ld);
const hide=()=>setTimeout(()=>{ld.classList.add('gone');setTimeout(()=>ld.remove(),800)},calm?0:700);document.readyState==='complete'?hide():addEventListener('load',hide);
// word reveal
$$('[data-split]').forEach(e=>{e.setAttribute('aria-label',e.textContent);e.innerHTML=e.textContent.split(' ').map((w,i)=>`<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ')});
// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});$$('.rv').forEach(e=>io.observe(e));
// menu
const mg=$('#menu-grid'),ff=$('#filters'),fe=$('#featured');
if(fe)fe.innerHTML=MENU.filter(m=>m.b).slice(0,6).map(card).join('');
if(mg){ff.innerHTML=['All',...CATS].map((c,i)=>`<button data-c="${i-1}" aria-pressed="${i==0}">${c}</button>`).join('');
const draw=c=>{mg.innerHTML=MENU.filter(m=>c<0||m.c===c).map(card).join('');tilt()};
ff.onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('button',ff).forEach(x=>x.setAttribute('aria-pressed',x===b));draw(+b.dataset.c)};draw(-1)}
// tilt, magnetic, cursor, parallax
function tilt(){if(!fine||calm)return;$$('.card').forEach(c=>{c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`};c.onmouseleave=()=>c.style.transform=''})}tilt();
if(fine&&!calm){$$('[data-mag],.btn').forEach(b=>{b.onmousemove=e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`};b.onmouseleave=()=>b.style.transform=''});
const k=document.createElement('div');k.id='cur';document.body.append(k);addEventListener('mousemove',e=>{k.style.left=e.clientX+'px';k.style.top=e.clientY+'px'});
const cup=$('#cup');if(cup)addEventListener('mousemove',e=>{cup.style.transform=`translate(${(e.clientX/innerWidth-.5)*-18}px,${(e.clientY/innerHeight-.5)*-12}px)`})}
const st=$('.stage');if(st&&!calm)for(let i=0;i<7;i++){const b=document.createElement('i');b.className='bean';b.style.cssText=`left:${8+Math.random()*84}%;top:${10+Math.random()*80}%;animation-delay:${-Math.random()*9}s;transform:rotate(${Math.random()*180}deg);opacity:${.5+Math.random()*.5}`;st.append(b)}
// contact form
const f=$('#cform');if(f){const R={name:v=>v.trim().length>1||'Enter your name.',email:v=>/^\S+@\S+\.\S+$/.test(v)||'Enter a valid email, like name@example.com.',subject:v=>v.trim().length>2||'Add a short subject.',message:v=>v.trim().length>9||'Write at least 10 characters.'};
f.onsubmit=async e=>{e.preventDefault();let ok=true;for(const k in R){const i=f.elements[k],r=R[k](i.value);i.setAttribute('aria-invalid',r!==true);$('#e-'+k).textContent=r===true?'':r;if(r!==true)ok=false}
if(!ok)return;try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});if(!r.ok)throw 0}catch(x){if(!f.action.includes('YOUR_FORM_ID')){$('#e-message').textContent='Could not send. Try again or call us.';return}}
f.style.display='none';$('#ok').style.display='block'}}
})();
