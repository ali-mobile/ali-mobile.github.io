const products=[
{id:1,name:'قاب محافظ موبایل',price:350000,icon:'📱'},
{id:2,name:'هندزفری بلوتوث',price:890000,icon:'🎧'},
{id:3,name:'شارژر سریع',price:650000,icon:'🔌'},
{id:4,name:'پاوربانک ۲۰۰۰۰',price:1200000,icon:'🔋'},
{id:5,name:'محافظ صفحه نمایش',price:180000,icon:'🛡️'},
{id:6,name:'کابل شارژ Type-C',price:250000,icon:'🔗'}
];
let cart=JSON.parse(localStorage.getItem('aliCart')||'[]');
const money=n=>Number(n).toLocaleString('fa-IR');
function save(){localStorage.setItem('aliCart',JSON.stringify(cart));updateCount()}
function updateCount(){document.querySelectorAll('#cartCount').forEach(e=>e.textContent=cart.reduce((s,x)=>s+x.qty,0))}
function add(id){let p=products.find(x=>x.id===id),x=cart.find(x=>x.id===id);x?x.qty++:cart.push({...p,qty:1});save();alert('محصول به سبد خرید اضافه شد.')}
function renderProducts(){let box=document.getElementById('products');if(!box)return;let q=(document.getElementById('search')?.value||'').trim();let list=products.filter(p=>p.name.includes(q));box.innerHTML=list.map(p=>`<article class="product"><div class="emoji">${p.icon}</div><h3>${p.name}</h3><p class="price">${money(p.price)} تومان</p><button class="btn" onclick="add(${p.id})">افزودن به سبد</button></article>`).join('')||'<p>محصولی پیدا نشد.</p>'}
function renderCart(){let box=document.getElementById('cartItems');if(!box)return;if(!cart.length){box.innerHTML='<p>سبد خرید خالی است.</p>';document.getElementById('total').textContent='۰';return}let sum=0;box.innerHTML=cart.map((x,i)=>{sum+=x.price*x.qty;return `<div class="cartrow"><div>${x.icon} ${x.name}<br>${money(x.price)} تومان</div><div><button class="smallbtn" onclick="change(${i},-1)">−</button> ${x.qty} <button class="smallbtn" onclick="change(${i},1)">+</button> <button class="smallbtn" onclick="removeItem(${i})">🗑️</button></div></div>`}).join('');document.getElementById('total').textContent=money(sum)}
function change(i,d){cart[i].qty+=d;if(cart[i].qty<=0)cart.splice(i,1);save();renderCart()}
function removeItem(i){cart.splice(i,1);save();renderCart()}
function submitOrder(e){e.preventDefault();if(!cart.length){alert('ابتدا محصولی به سبد خرید اضافه کنید.');return}let name=document.getElementById('name').value;alert('سفارش نمایشی شما ثبت شد، '+name+' عزیز. برای اتصال واقعی به سیستم سفارش و پرداخت، Backend لازم است.');cart=[];save();e.target.reset()}
updateCount();renderProducts();renderCart();