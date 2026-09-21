let currentPlan='',currentPrice=0,currentOrderId='';
function makeOrderId(){return 'HA-'+Date.now().toString().slice(-6)}
function calc(){
 const q=+document.getElementById('qty').value;
 const daysInput=document.getElementById('days');
 const minDays=q; // Minimum delivery: 1 day per design (30 designs = minimum 30 days)
 daysInput.min=minDays;
 if(+daysInput.value<minDays) daysInput.value=minDays;
 const days=+daysInput.value;
 const standardDays=q*2;
 const isRush=days<standardDays;
 const unitPrice=isRush?10:7;
 const total=q*unitPrice;
 document.getElementById('qtyText').textContent=q+' design'+(q>1?'s':'');
 document.getElementById('daysText').textContent=days+' day'+(days>1?'s':'');
 document.getElementById('price').textContent='$'+total;
 document.getElementById('delivery').textContent=q+' design'+(q>1?'s':'')+' • '+days+'-day delivery';
 document.getElementById('planNote').textContent=isRush?'Rush schedule: minimum 1 day per design • $10 per design':'Standard schedule: 2 days per design or more • $7 per design';
}
function checkout(plan,price){currentPlan=plan;currentPrice=price;currentOrderId=makeOrderId();mplan.textContent=plan;mprice.textContent='$'+price;document.getElementById('orderId').textContent=currentOrderId;document.getElementById('paymentStep').classList.add('hidden');document.getElementById('reviewStep').classList.add('hidden');selectedRating=0;document.querySelectorAll('#starPicker button').forEach(b=>b.classList.remove('active'));modal.classList.add('show')}
function customCheckout(){const q=+qty.value,days=+document.getElementById('days').value,unit=days<q*2?10:7;checkout(`Custom Plan — ${q} design${q>1?'s':''} / ${days} day${days>1?'s':''}`,q*unit)}
function closeModal(){modal.classList.remove('show')}
function continueToPayment(){const name=document.getElementById('clientName').value.trim(),phone=document.getElementById('clientPhone').value.trim(),project=document.getElementById('projectName').value.trim(),brief=document.getElementById('projectBrief').value.trim();if(!name||!phone||!project||!brief){alert('Please complete your name, WhatsApp number, project name and project brief.');return}document.getElementById('reviewStep').classList.remove('hidden');document.getElementById('paymentStep').classList.remove('hidden');document.getElementById('reviewStep').scrollIntoView({behavior:'smooth',block:'nearest'})}
function confirmTransfer(){const name=document.getElementById('clientName').value.trim(),phone=document.getElementById('clientPhone').value.trim(),project=document.getElementById('projectName').value.trim(),brief=document.getElementById('projectBrief').value.trim(),start=document.getElementById('startDate').value||'Not specified',ref=document.getElementById('referenceLink').value.trim()||'None';const msg=`Hello Hassan, I have completed the Electronic Wallet transfer.\n\nOrder ID: ${currentOrderId}\nPlan: ${currentPlan}\nAmount: $${currentPrice}\n\nClient: ${name}\nWhatsApp: ${phone}\nProject: ${project}\nPreferred start: ${start}\nReference: ${ref}\n\nProject brief:\n${brief}\n\nI will attach the payment screenshot here for verification.`;window.open('https://wa.me/201115439827?text='+encodeURIComponent(msg),'_blank')}
calc();
const revealTargets=document.querySelectorAll('section:not(.hero) .section-title, .grid3, .pricing, .custom>div, .calculator, .work-slider, .client');
revealTargets.forEach(el=>el.classList.add('reveal'));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
revealTargets.forEach(el=>revealObserver.observe(el));
const portfolioData={
 social:[
  ['portfolio/social/nova-clinics.png','Nova Clinics — Social Media Design'],
  ['portfolio/social/jadid-01.png','JADID — Social Media Design 01'],
  ['portfolio/social/jadid-02.png','JADID — Social Media Design 02'],
  ['portfolio/social/jadid-03.png','JADID — Social Media Design 03'],
  ['portfolio/social/social-01.jpg','Social Media Design 01'],
  ['portfolio/social/social-02.jpg','Social Media Design 02'],
  ['portfolio/social/social-04.jpg','Social Media Design 04'],
  ['portfolio/social/social-05.jpg','Social Media Design 05'],
  ['portfolio/social/social-06.jpg','Social Media Design 06'],
  ['portfolio/social/social-07.jpg','Social Media Design 07'],
  ['portfolio/social/social-08.jpg','Social Media Design 08'],
  ['portfolio/social/social-09.jpg','Social Media Design 09'],
  ['portfolio/social/social-10.jpg','Social Media Design 10']
 ],
 education:[['portfolio/education/education-01.png','Teacher Design 01'],['portfolio/education/education-02.png','Teacher Design 02']],
 identity:[['portfolio/identity/identity-01.png','Ahmed Ali Solutions — Visual Identity'],['portfolio/identity/identity-02.png','Paper Muse — Visual Identity']],
 print:[['portfolio/print/print-01.png','Global Home Furniture — Notebook Print Design'],['portfolio/print/print-02.png','Pink Notebook — Print Design']]
};
let workIndex=0,currentCategory='social';
const workTrack=document.getElementById('workTrack');
const workDots=document.getElementById('workDots');
const workCount=document.getElementById('workCount');
const categoryWork=document.getElementById('categoryWork');
function renderCategory(){const items=portfolioData[currentCategory];workTrack.innerHTML=items.map((x,i)=>{const hasImage=Boolean(x[0]);return `<article class="work-card portfolio-real"><div class="work-art ${currentCategory} ${hasImage?'has-image':''}">${hasImage?`<img src="${x[0]}" alt="${x[1]}" loading="lazy">`:`<b>${x[1]}</b>`}</div><div class="work-meta"><small>${currentCategory.toUpperCase()}</small><h3>${x[1]}</h3><p>${hasImage?`Project ${i+1} of ${items.length} — use the arrows to explore more work.`:'Portfolio samples coming soon.'}</p></div></article>`}).join('');workDots.innerHTML='';items.forEach((_,i)=>{const d=document.createElement('button');d.setAttribute('aria-label',`Go to design ${i+1}`);d.addEventListener('click',()=>{workIndex=i;renderWork()});workDots.appendChild(d)});workIndex=0;renderWork()}
function renderWork(){workTrack.style.transform=`translateX(-${workIndex*100}%)`;[...workDots.children].forEach((d,i)=>d.classList.toggle('active',i===workIndex));if(workCount)workCount.textContent=`Showing ${workIndex+1} of ${portfolioData[currentCategory].length} designs`}
function moveWork(dir){const n=portfolioData[currentCategory].length;workIndex=(workIndex+dir+n)%n;renderWork()}
function changeCategory(cat){currentCategory=cat;document.querySelectorAll('.category-btn').forEach(b=>b.classList.toggle('active',b.dataset.category===cat));categoryWork.classList.remove('switching');void categoryWork.offsetWidth;categoryWork.classList.add('switching');renderCategory()}
document.querySelectorAll('.category-btn').forEach(btn=>btn.addEventListener('click',()=>changeCategory(btn.dataset.category)));
renderCategory();

let selectedRating=0;
function setRating(n){selectedRating=n;document.querySelectorAll('#starPicker button').forEach((b,i)=>b.classList.toggle('active',i<n))}
function getReviews(){try{return JSON.parse(localStorage.getItem('ha_reviews')||'[]')}catch(e){return[]}}
function renderReviews(){const list=document.getElementById('reviewsList'),empty=document.getElementById('reviewEmpty');if(!list)return;const reviews=getReviews();empty.style.display=reviews.length?'none':'block';list.innerHTML=reviews.slice().reverse().map(r=>`<article class="review-card"><div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div><p>“${escapeReview(r.comment)}”</p><footer><b>${escapeReview(r.name)}</b><span>${escapeReview(r.plan)} • ${escapeReview(r.orderId)}</span></footer></article>`).join('')}
function escapeReview(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function submitReview(){const comment=document.getElementById('reviewComment').value.trim(),name=document.getElementById('clientName').value.trim();if(!selectedRating){alert('Please choose a star rating.');return}if(!comment){alert('Please add a short comment.');return}const reviews=getReviews();reviews.push({name,rating:selectedRating,comment,plan:currentPlan,orderId:currentOrderId,date:new Date().toISOString()});localStorage.setItem('ha_reviews',JSON.stringify(reviews));document.getElementById('reviewComment').value='';setRating(0);renderReviews();alert('Thank you! Your review has been added on this device.')}
renderReviews();
