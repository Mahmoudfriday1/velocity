import React, { useState, useEffect } from "react";

const getData = () => JSON.parse(localStorage.getItem("cart")) || [];
const saveData = (data) => localStorage.setItem("cart", JSON.stringify(data));

export default function App() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(getData());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // --- Custom Design States ---
  const [customImg, setCustomImg] = useState(null);
  const [customText, setCustomText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [customType, setCustomType] = useState("T-Shirt");

  useEffect(() => {
    const initialProducts = [
      { id: 1, name: "Oxford White Shirt", price: 35, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
      { id: 2, name: "Black Heavy Hoodie", price: 55, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
      { id: 3, name: "Vintage Denim Jacket", price: 90, image: "https://images.unsplash.com/photo-1576871333020-2219bc088863?w=500" },
      { id: 4, name: "Wool Trench Coat", price: 150, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500" },
      { id: 5, name: "Urban Cargo Pants", price: 60, image: "https://images.unsplash.com/photo-1624371414361-e6e8ea02c1e2?w=500" },
      { id: 6, name: "Beige Knit Sweater", price: 45, image: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=500" },
      { id: 7, name: "Utility Bomber", price: 80, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500" },
      { id: 8, name: "Linen Summer Shirt", price: 30, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500" },
      { id: 9, name: "Nightfall Parka", price: 110, image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500" },
      { id: 10, name: "Classic Chinos", price: 40, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500" },
      { id: 11, name: "Puffer Vest", price: 70, image: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=500" },
      { id: 12, name: "Satin Evening Shirt", price: 50, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500" },
    ];
    setProducts(initialProducts);
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id && item.name === product.name);
    let newCart = existingItem 
      ? cart.map(item => (item.id === product.id && item.name === product.name) ? { ...item, qty: item.qty + 1 } : item)
      : [...cart, { ...product, qty: 1 }];
    setCart(newCart);
    saveData(newCart);
  };

  const updateQty = (id, delta) => {
    const newCart = cart.map(item => (item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
    setCart(newCart);
    saveData(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    saveData(newCart);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100" dir="ltr">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-widest cursor-pointer uppercase" onClick={() => setPage("home")}>VELOCITY</h1>
        <div className="hidden md:flex gap-10 text-[13px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <button onClick={() => setPage("home")} className={page==='home'?'text-black underline underline-offset-8':''}>Home</button>
          <button onClick={() => setPage("products")} className={page==='products'?'text-black underline underline-offset-8':''}>Collection</button>
          <button onClick={() => setPage("custom")} className={page==='custom'?'text-black underline underline-offset-8':''}>Custom</button>
          <button onClick={() => setPage("about")} className={page==='about'?'text-black underline underline-offset-8':''}>About</button>
          <button onClick={() => setPage("contact")} className={page==='contact'?'text-black underline underline-offset-8':''}>Contact</button>
        </div>
        <div className="flex gap-6 items-center">
          <button onClick={() => setPage("cart")} className="text-[13px] font-bold flex items-center gap-2 uppercase tracking-widest">
            Bag <span className="bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px]">{cart.length}</span>
          </button>
          {user ? (
            <button onClick={() => {localStorage.removeItem("user"); setUser(null); setPage("home");}} className="text-[11px] font-black border-b-2 border-black pb-1 uppercase">{user.name}</button>
          ) : (
            <button onClick={() => setPage("login")} className="text-[11px] font-black border-b-2 border-black pb-1 uppercase tracking-widest">Login</button>
          )}
        </div>
      </nav>

      <main className="pt-28 pb-20 px-8">
        {/* --- Home Page --- */}
        {page === "home" && (
          <div className="relative h-[85vh] w-full rounded-3xl overflow-hidden group shadow-2xl">
            <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 transition-transform duration-[3s]" alt="Hero" />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-6 text-center">
              <span className="text-[12px] font-bold tracking-[0.5em] mb-4 uppercase">Established 2026</span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic uppercase leading-[0.9]">CRAFTSMANSHIP <br/> OVER TRENDS.</h1>
              <div className="flex gap-4">
                <button onClick={() => setPage("products")} className="bg-white text-black px-12 py-4 rounded-full font-black text-sm tracking-widest hover:invert transition uppercase shadow-xl">Explore Shop</button>
                <button onClick={() => setPage("custom")} className="bg-transparent border-2 border-white text-white px-12 py-4 rounded-full font-black text-sm tracking-widest hover:bg-white hover:text-black transition uppercase">Custom Studio</button>
              </div>
            </div>
          </div>
        )}

        {/* --- Login Page --- */}
        {page === "login" && (
          <div className="max-w-md mx-auto py-24">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black italic tracking-tighter uppercase underline decoration-gray-100 underline-offset-[12px]">Member Access</h2>
              <p className="mt-6 text-gray-400 font-bold uppercase text-xs tracking-[0.3em]">Enter your identity to proceed</p>
            </div>
            <div className="space-y-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest text-gray-300 uppercase ml-2">Email Address</label>
                <input id="login-email" className="w-full bg-transparent border-b-2 border-gray-100 p-5 font-bold text-xl focus:border-black outline-none transition placeholder:text-gray-100" placeholder="YOU@EXAMPLE.COM" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-widest text-gray-300 uppercase ml-2">Password</label>
                <input className="w-full bg-transparent border-b-2 border-gray-100 p-5 font-bold text-xl focus:border-black outline-none transition" type="password" placeholder="••••••••" />
              </div>
              <button className="w-full bg-black text-white py-7 rounded-full font-black text-sm tracking-[0.5em] hover:invert transition shadow-2xl uppercase mt-10" onClick={() => {
                const mail = document.getElementById('login-email').value;
                if(mail) { 
                  const userData = {name: mail.split('@')[0].toUpperCase()};
                  setUser(userData); 
                  localStorage.setItem("user", JSON.stringify(userData));
                  setPage('home'); 
                }
              }}>Access Account</button>
            </div>
          </div>
        )}

        {/* --- Custom Lab Page --- */}
        {page === "custom" && (
          <div className="max-w-6xl mx-auto py-10">
            <h2 className="text-center text-4xl font-black italic tracking-tighter uppercase underline decoration-gray-200 underline-offset-[12px] mb-20">Custom Lab</h2>
            <div className="flex flex-col md:flex-row gap-20">
              <div className="md:w-1/2 relative bg-gray-50 rounded-[3rem] p-12 flex items-center justify-center shadow-inner aspect-square">
                <img src={customType === "T-Shirt" ? "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800" : "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"} className="w-full h-full object-contain mix-blend-multiply opacity-80" alt="Base" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-44 text-center">
                   {customImg && <img src={customImg} className="max-w-full max-h-36 object-contain rounded shadow-lg" alt="User Design" />}
                   {customText && <p style={{ color: textColor }} className="text-2xl font-black break-words leading-tight uppercase tracking-tighter shadow-sm">{customText}</p>}
                </div>
              </div>
              <div className="md:w-1/2 space-y-10">
                <div className="space-y-5"><h4 className="font-black text-sm tracking-widest uppercase italic">1. Apparel Type</h4><div className="flex gap-4">{["T-Shirt", "Hoodie"].map(t => (<button key={t} onClick={() => setCustomType(t)} className={`px-10 py-4 rounded-xl font-bold text-xs tracking-widest transition ${customType === t ? 'bg-black text-white shadow-xl' : 'bg-gray-100 text-gray-400'}`}>{t.toUpperCase()}</button>))}</div></div>
                <div className="space-y-5"><h4 className="font-black text-sm tracking-widest uppercase italic">2. Add Text</h4><input value={customText} onChange={(e) => setCustomText(e.target.value)} className="w-full bg-transparent border-b-2 border-gray-100 p-4 font-bold text-lg focus:border-black outline-none transition" placeholder="TYPE HERE..." /><div className="flex items-center gap-4 mt-4"><span className="text-xs font-black text-gray-400">COLOR:</span><input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-10 h-10 rounded-full cursor-pointer border-none bg-transparent" /></div></div>
                <div className="space-y-5"><h4 className="font-black text-sm tracking-widest uppercase italic">3. Upload Graphic</h4><label className="block w-full cursor-pointer bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-black transition"><input type="file" className="hidden" onChange={(e) => {const f=e.target.files[0]; if(f) setCustomImg(URL.createObjectURL(f))}} accept="image/*" /><span className="text-gray-400 font-black uppercase text-[11px] tracking-[0.2em] italic">Browse Design</span></label></div>
                <button onClick={() => {alert("Custom Piece Added!"); setPage("cart");}} className="w-full bg-black text-white py-6 rounded-full font-black text-sm tracking-[0.4em] hover:invert transition shadow-2xl uppercase">Add to Bag</button>
              </div>
            </div>
          </div>
        )}

        {/* --- Collection/About/Contact --- */}
        {page === "products" && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-[12px] tracking-[0.6em] font-black uppercase mb-20 text-gray-400 italic">Full Collection</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-20">
              {products.map(p => (
                <div key={p.id} className="cursor-pointer group" onClick={() => setSelectedProduct(p)}>
                  <div className="aspect-[4/5] overflow-hidden bg-gray-50 rounded-2xl mb-6 shadow-sm"><img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000 grayscale-[0.2] group-hover:grayscale-0" alt={p.name} /></div>
                  <div className="space-y-2 text-center md:text-left"><h3 className="font-bold text-[14px] uppercase tracking-[0.15em] text-gray-800 leading-tight">{p.name}</h3><p className="text-[15px] text-gray-400 font-bold tracking-widest">${p.price}.00</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "about" && (
          <div className="max-w-3xl mx-auto py-24 text-center">
            <h2 className="text-5xl font-black mb-16 italic tracking-tighter uppercase underline decoration-gray-100 underline-offset-[15px]">Our Story</h2>
            <p className="text-2xl text-gray-500 leading-[1.8] italic font-medium tracking-wide">Velocity is more than a label; it's a statement. Founded in 2026, we specialize in luxury minimalism.</p>
          </div>
        )}

        {page === "contact" && (
          <div className="max-w-2xl mx-auto py-16 text-center">
            <h2 className="text-5xl font-black mb-20 italic tracking-tighter uppercase underline decoration-gray-100 underline-offset-[15px]">Get In Touch</h2>
            <div className="space-y-12 text-left">
              <input className="w-full bg-transparent border-b-2 border-gray-100 p-5 font-bold text-lg focus:border-black outline-none transition" placeholder="NAME" />
              <textarea className="w-full bg-transparent border-b-2 border-gray-100 p-5 h-48 font-bold text-lg focus:border-black outline-none transition" placeholder="MESSAGE"></textarea>
              <button className="w-full bg-black text-white py-7 rounded-full font-black text-sm tracking-[0.5em] hover:invert transition shadow-2xl uppercase" onClick={() => alert("Sent.")}>Send Query</button>
            </div>
          </div>
        )}

        {/* --- Cart Page (REFIXED CHECKOUT BUTTON) --- */}
        {page === "cart" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-black mb-20 tracking-[0.4em] uppercase border-b-2 pb-8 italic">Your Bag</h2>
            {cart.length === 0 ? (
              <p className="text-gray-300 text-center py-32 text-lg uppercase tracking-[0.4em] italic font-bold">Empty</p>
            ) : (
              <div className="space-y-16">
                {cart.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row items-center gap-12 border-b border-gray-50 pb-12">
                    <img src={item.image} className="w-32 h-44 object-cover rounded-2xl shadow-lg" alt="" />
                    <div className="flex-1">
                      <h4 className="font-black uppercase text-lg tracking-widest mb-4">{item.name}</h4>
                      <div className="flex items-center gap-8 bg-gray-50 w-fit px-6 py-3 rounded-full">
                        <button onClick={() => updateQty(item.id, -1)} className="text-2xl">－</button>
                        <span className="text-lg font-black">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="text-2xl">＋</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-2xl mb-6">${item.price * item.qty}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs font-black text-red-400 uppercase underline underline-offset-8">Remove Item</button>
                    </div>
                  </div>
                ))}
                
                {/* --- THE CHECKOUT BAR --- */}
                <div className="mt-20 p-10 bg-gray-50 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-center md:text-left">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-2">Grand Total</p>
                        <p className="text-5xl font-black italic tracking-tighter">${total}.00</p>
                    </div>
                    <button 
                        onClick={() => alert("Redirecting to Checkout...")}
                        className="bg-black text-white px-16 py-7 rounded-full font-black text-sm tracking-[0.4em] hover:invert transition shadow-2xl uppercase w-full md:w-auto"
                    >
                        Checkout Now
                    </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- Modal --- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-white/98 z-[100] flex items-center justify-center p-10">
          <div className="max-w-6xl w-full flex flex-col md:flex-row gap-20 relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute -top-16 right-0 text-5xl font-thin hover:rotate-90 transition">✕</button>
            <div className="md:w-1/2 aspect-[3/4] overflow-hidden shadow-2xl"><img src={selectedProduct.image} className="w-full h-full object-cover rounded-[2rem]" alt="" /></div>
            <div className="md:w-1/2 flex flex-col justify-center space-y-12">
              <h2 className="text-7xl font-black tracking-tighter uppercase italic leading-none">{selectedProduct.name}</h2>
              <p className="text-4xl font-light text-gray-300 font-bold tracking-[0.2em]">${selectedProduct.price}.00</p>
              <button onClick={() => {addToCart(selectedProduct); setSelectedProduct(null);}} className="bg-black text-white py-8 rounded-full font-black text-xl tracking-[0.3em] hover:invert transition uppercase">Add to Bag</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}