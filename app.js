const products=[
{id:1,name:"Burgundy Bow Heels",cat:"Heels",price:30000,old:38000,discount:21,rating:4.8,reviews:24,stock:8,image:"assets/products/burgundy-bow-heels.jpg",best:true,flash:true},
{id:2,name:"Black Bow Heels",cat:"Heels",price:30000,old:36000,discount:17,rating:4.9,reviews:31,stock:6,image:"assets/products/black-bow-heels.jpg",best:true,new:true},
{id:3,name:"White Bow Heels",cat:"Heels",price:28000,old:35000,discount:20,rating:4.7,reviews:18,stock:10,image:"assets/products/white-bow-heels.jpg",new:true},
{id:4,name:"Pink Bow Heels",cat:"Heels",price:28000,old:34000,discount:18,rating:4.8,reviews:21,stock:5,image:"assets/products/pink-bow-heels.jpg",new:true},
{id:5,name:"Burgundy Structured Bag",cat:"Bags",price:32000,old:40000,discount:20,rating:4.9,reviews:16,stock:7,image:"assets/products/burgundy-structured-bag.jpg",best:true,flash:true},
{id:6,name:"Black & Beige Flat Sandals",cat:"Sandals",price:22000,old:28000,discount:21,rating:4.8,reviews:27,stock:13,image:"assets/products/black-beige-flat-sandals.jpg",best:true,flash:true},
{id:7,name:"Burgundy & Cream Pam Slides",cat:"Slippers",price:18000,old:22000,discount:18,rating:4.9,reviews:38,stock:14,image:"assets/products/burgundy-cream-pam-slides.jpg",best:true,new:true,flash:true}
];

let cart=JSON.parse(localStorage.getItem("ivyCart")||"[]");
let wishlist=JSON.parse(localStorage.getItem("ivyWish")||"[]");

function money(n){return "₦"+n.toLocaleString()}
function card(p){
 return `<article class="product">
  <div class="pic"><img src="${p.image || ''}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;display:${p.image ? 'block' : 'none'}"><span class="emoji" style="display:${p.image ? 'none' : 'block'}">${p.emoji || '🛍️'}</span><button class="wish" onclick="toggleWish(${p.id})">${wishlist.includes(p.id)?"♥":"♡"}</button><span class="discount">-${p.discount}%</span></div>
  <div class="info"><div class="name">${p.name}</div><div class="stars">★★★★★ <span style="color:#777">(${p.reviews})</span></div><div><span class="price">${money(p.price)}</span><span class="old">${money(p.old)}</span></div><div class="stock">${p.stock} pieces in stock</div><button class="add" onclick="addCart(${p.id})">ADD TO CART</button><button class="add" style="margin-top:7px" onclick="viewProduct(${p.id})">VIEW PRODUCT</button></div>
 </article>`
}
function renderInto(id,list){document.getElementById(id).innerHTML=list.map(card).join("")}
function renderProducts(){
 const q=document.getElementById("searchInput").value.trim().toLowerCase();
 const list=q?products.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q)):products;
 renderInto("bestGrid",list.filter(p=>p.best).slice(0,8));
 if(q){document.getElementById("best").scrollIntoView({behavior:"smooth"})}
}
function addCart(id){const p=products.find(x=>x.id===id);const old=cart.find(x=>x.id===id);if(old)old.qty++;else cart.push({id,qty:1});save();openCart()}
function removeCart(id){cart=cart.filter(x=>x.id!==id);save();renderCart()}
function save(){localStorage.setItem("ivyCart",JSON.stringify(cart));localStorage.setItem("ivyWish",JSON.stringify(wishlist));document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0)}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<p style="padding:30px 0;color:#777;text-align:center">Your cart is empty.</p>';document.getElementById("cartTotal").textContent="₦0";return}
 let total=0;
 box.innerHTML=cart.map(x=>{let p=products.find(y=>y.id===x.id);total+=p.price*x.qty;return `<div class="cart-item"><div class="thumb">${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:5px">` : (p.emoji || "🛍️")}</div><div><b>${p.name}</b><br><small>${money(p.price)} × ${x.qty}</small></div><button class="remove" onclick="removeCart(${p.id})">Remove</button></div>`}).join("");
 document.getElementById("cartTotal").textContent=money(total);
}
function openCart(){document.getElementById("drawer").classList.add("open");document.getElementById("overlay").classList.add("show");renderCart()}
function closeCart(){document.getElementById("drawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
function toggleWish(id){if(wishlist.includes(id))wishlist=wishlist.filter(x=>x!==id);else wishlist.push(id);save();renderAll()}
function showWishlist(){let items=products.filter(p=>wishlist.includes(p.id));document.getElementById("modalContent").innerHTML=`<h2>♡ My Wishlist</h2><div class="grid" style="margin-top:20px">${items.length?items.map(card).join(""):'<p style="padding:30px 0;color:#777">Your wishlist is empty.</p>'}</div>`;document.getElementById("modal").classList.add("show")}
function viewProduct(id){let p=products.find(x=>x.id===id);document.getElementById("modalContent").innerHTML=`<div class="modal-grid"><div class="modal-pic">${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:5px">` : (p.emoji || "🛍️")}</div><div><div class="kicker">${p.cat}</div><h2>${p.name}</h2><div class="stars" style="font-size:16px;margin:14px 0">★★★★★ ${p.rating} <span style="color:#777">(${p.reviews} reviews)</span></div><div><span class="price" style="font-size:28px">${money(p.price)}</span><span class="old">${money(p.old)}</span></div><p style="margin:18px 0;color:#666;line-height:1.7">Premium Everything by Ivy piece designed for effortless everyday style. Quality, comfortable and made to stand out.</p><b>Availability:</b> <span style="color:#17833b">In Stock</span><div class="size" style="margin-top:18px"><b>Size</b><br><button>37</button><button>38</button><button>39</button><button>40</button></div><button class="btn" style="width:100%" onclick="addCart(${p.id});closeModal()">ADD TO CART</button></div></div>`;document.getElementById("modal").classList.add("show")}
function closeModal(){document.getElementById("modal").classList.remove("show")}
function checkout(){alert("Checkout demo: connect this button to your preferred payment/WhatsApp order flow.");}
function toggleNav(){document.querySelector(".nav").style.display=document.querySelector(".nav").style.display==="block"?"none":"block"}
function renderAll(){
 renderInto("flashGrid",products.filter(p=>p.flash));
 renderInto("bestGrid",products.filter(p=>p.best).slice(0,8));
 renderInto("newGrid",products.filter(p=>p.new).slice(0,8));
 renderInto("bagGrid",products.filter(p=>p.cat==="Bags"));
 renderInto("heelGrid",products.filter(p=>p.cat==="Heels"));
 renderInto("sandalGrid",products.filter(p=>p.cat==="Sandals"));
 renderInto("slipperGrid",products.filter(p=>p.cat==="Slippers"));
 save();
}
let end=Date.now()+3*60*60*1000;
setInterval(()=>{let s=Math.max(0,Math.floor((end-Date.now())/1000));let h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;document.getElementById("timer").textContent=`Ends in ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`},1000);
renderAll();
