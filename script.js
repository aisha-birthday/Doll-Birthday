const screens = [...document.querySelectorAll('.screen')];
let current = 0;

function showScreen(id){
  screens.forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
document.getElementById('startBtn').onclick=()=>showScreen('story');

document.querySelector('#story .next').onclick=()=>showScreen('letter');
document.querySelector('#letter .next').onclick=()=>showScreen('reasons');

let opened = 0;
const memories = document.querySelectorAll('.memory');
const messageBox = document.getElementById('messageBox');
memories.forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(!btn.classList.contains('used')){
      btn.classList.add('used'); opened++;
      if(opened===memories.length) document.querySelector('.final-next').classList.add('show');
    }
    messageBox.style.opacity=0;
    setTimeout(()=>{messageBox.textContent=btn.dataset.message;messageBox.style.opacity=1},180);
  });
});
document.querySelector('.final-next').onclick=()=>showScreen('wish');
document.getElementById('giftBtn').onclick=()=>showScreen('surprise');
document.getElementById('restartBtn').onclick=()=>{
  opened=0; memories.forEach(x=>x.classList.remove('used'));
  document.querySelector('.final-next').classList.remove('show');
  messageBox.textContent='Choose a star, birthday girl ✨';
  showScreen('opening');
};

// Animated star field
const canvas=document.getElementById('stars'),ctx=canvas.getContext('2d');
let w,h,stars=[];
function resize(){
  w=canvas.width=innerWidth*devicePixelRatio;
  h=canvas.height=innerHeight*devicePixelRatio;
  canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  stars=Array.from({length:Math.min(160,Math.floor(innerWidth/7))},()=>({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    r:Math.random()*1.6+.2,a:Math.random(),v:Math.random()*.012+.003
  }));
}
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  stars.forEach(s=>{
    s.a+=s.v;if(s.a>1||s.a<.2)s.v*=-1;
    ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,245,255,${s.a})`;ctx.fill();
  });
  requestAnimationFrame(draw);
}
addEventListener('resize',resize);resize();draw();
