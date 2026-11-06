import React, { useEffect, useMemo, useState } from "react";

const DEFAULT_CARS = [
  {id:1, name:"Toyota RAV4", brand:"Toyota", model:"RAV4", year:2021, price:28500000, color:"Pearl white", fuel:"Petrol", transmission:"Automatic", mileage:"48,000 km", condition:"Used - excellent", location:"Nyamagabe", category:"SUV", featured:true, status:"Available", description:"A comfortable family SUV with a spacious interior, reliable performance and a smooth automatic transmission.", image:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85", photos:[]},
  {id:2, name:"Toyota Corolla", brand:"Toyota", model:"Corolla", year:2020, price:16800000, color:"Silver", fuel:"Petrol", transmission:"Automatic", mileage:"61,000 km", condition:"Used - good", location:"Nyamagabe", category:"Sedan", featured:true, status:"Available", description:"Economical and practical sedan suitable for everyday driving and family use.", image:"https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=85", photos:[]},
  {id:3, name:"Toyota Hilux", brand:"Toyota", model:"Hilux", year:2019, price:32500000, color:"Dark grey", fuel:"Diesel", transmission:"Manual", mileage:"83,000 km", condition:"Used - good", location:"Nyamagabe", category:"Pickup", featured:true, status:"Available", description:"A strong pickup suited to work, rural roads and demanding everyday tasks.", image:"https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=85", photos:[]},
  {id:4, name:"Hyundai Tucson", brand:"Hyundai", model:"Tucson", year:2022, price:29800000, color:"Blue", fuel:"Petrol", transmission:"Automatic", mileage:"32,000 km", condition:"Used - excellent", location:"Nyamagabe", category:"SUV", featured:false, status:"Available", description:"Modern SUV with comfortable seating, useful space and a refined driving experience.", image:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85", photos:[]},
  {id:5, name:"Nissan X-Trail", brand:"Nissan", model:"X-Trail", year:2018, price:21500000, color:"Black", fuel:"Petrol", transmission:"Automatic", mileage:"92,000 km", condition:"Used - good", location:"Nyamagabe", category:"SUV", featured:false, status:"Available", description:"Versatile SUV with generous cabin space for trips and daily travel.", image:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85", photos:[]},
  {id:6, name:"Mercedes-Benz C-Class", brand:"Mercedes-Benz", model:"C-Class", year:2017, price:26000000, color:"White", fuel:"Diesel", transmission:"Automatic", mileage:"78,000 km", condition:"Used - good", location:"Nyamagabe", category:"Luxury", featured:false, status:"Available", description:"A premium sedan with a comfortable cabin and elegant styling.", image:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85", photos:[]}
  ,
  {id:7, name:"BMW 3 Series", brand:"BMW", model:"3 Series", year:2021, price:38500000, color:"Graphite grey", fuel:"Petrol", transmission:"Automatic", mileage:"39,000 km", condition:"Used - excellent", location:"Nyamagabe", category:"Luxury", featured:true, status:"Available", description:"Elegant graphite-grey executive sedan with a comfortable cabin and smooth automatic drive.", image:"https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85", photos:[]},
  {id:8, name:"Honda Civic", brand:"Honda", model:"Civic", year:2021, price:23500000, color:"Blue", fuel:"Petrol", transmission:"Automatic", mileage:"44,000 km", condition:"Used - excellent", location:"Nyamagabe", category:"Sedan", featured:true, status:"Available", description:"Sporty blue sedan with modern styling and efficient everyday performance.", image:"https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=1200&q=85", photos:[]},
  {id:9, name:"Mercedes-Benz E-Class", brand:"Mercedes-Benz", model:"E-Class", year:2020, price:52000000, color:"Silver", fuel:"Diesel", transmission:"Automatic", mileage:"51,000 km", condition:"Used - excellent", location:"Nyamagabe", category:"Luxury", featured:true, status:"Available", description:"Silver premium saloon with refined comfort and a spacious interior.", image:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85", photos:[]},
  {id:10, name:"BMW 5 Series", brand:"BMW", model:"5 Series", year:2019, price:46500000, color:"Pearl white", fuel:"Diesel", transmission:"Automatic", mileage:"62,000 km", condition:"Used - good", location:"Nyamagabe", category:"Luxury", featured:false, status:"Available", description:"White executive sedan offering a balanced mix of comfort and performance.", image:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85", photos:[]},
  {id:11, name:"Honda Accord", brand:"Honda", model:"Accord", year:2022, price:34500000, color:"Blue", fuel:"Petrol", transmission:"Automatic", mileage:"28,000 km", condition:"Used - excellent", location:"Nyamagabe", category:"Sedan", featured:false, status:"Available", description:"Modern blue family sedan with generous passenger space and a comfortable ride.", image:"https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=85", photos:[]},
  {id:12, name:"Audi A6", brand:"Audi", model:"A6", year:2020, price:49500000, color:"Black", fuel:"Petrol", transmission:"Automatic", mileage:"47,000 km", condition:"Used - good", location:"Nyamagabe", category:"Luxury", featured:false, status:"Available", description:"Black luxury sedan with a clean design and premium cabin features.", image:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85", photos:[]}
];

const money = n => new Intl.NumberFormat("en-US").format(Number(n || 0)) + " RWF";
const load = (key, fallback) => { try { const v=localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch { return fallback; } };
const normalize = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
const loadCars = () => {
  const current = load("hcfd_cars_v2", null);
  if (Array.isArray(current)) return current;
  const old = load("hcfd_cars", null);
  if (!Array.isArray(old)) return DEFAULT_CARS;
  const names = new Set(DEFAULT_CARS.map(c=>normalize(c.name)));
  return [...DEFAULT_CARS, ...old.filter(c=>c && c.name && !names.has(normalize(c.name)))];
};
const wordDistance = (a,b) => {
  if (Math.abs(a.length-b.length)>1) return 2;
  let prev=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){
    const row=[i]; let min=i;
    for(let j=1;j<=b.length;j++){ row[j]=Math.min(row[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1)); min=Math.min(min,row[j]); }
    if(min>1)return 2; prev=row;
  }
  return prev[b.length];
};
const matchesTerm = (haystack, term) => {
  if(haystack.includes(term)) return true;
  return haystack.split(" ").filter(Boolean).some(word=>word.startsWith(term) || (term.length>=4 && wordDistance(word,term)<=1));
};

export default function App() {
  const [cars,setCars] = useState(loadCars);
  const [page,setPage] = useState("home");
  const [selected,setSelected] = useState(null);
  const [search,setSearch] = useState("");
  const [brand,setBrand] = useState("All brands");
  const [category,setCategory] = useState("All types");
  const [color,setColor] = useState("All colors");
  const [maxPrice,setMaxPrice] = useState("all");
  const [sort,setSort] = useState("featured");
  const [favorites,setFavorites] = useState(()=>load("hcfd_favorites", []));
  const [admin,setAdmin] = useState(false);
  const [login,setLogin] = useState({username:"",password:""});
  const [loginError,setLoginError] = useState("");
  const [editing,setEditing] = useState(null);
  const [notice,setNotice] = useState("");
  const [inquiry,setInquiry] = useState(null);
  const [mobileMenu,setMobileMenu] = useState(false);
  const [storageWarning,setStorageWarning] = useState("");

  // Vehicle listings and saved cars persist in this browser after refresh.
  useEffect(()=>{
    try { localStorage.setItem("hcfd_cars_v2",JSON.stringify(cars)); setStorageWarning(""); }
    catch { setStorageWarning("Browser storage is full. Remove a large photo or use a smaller image, then save again."); }
  },[cars]);
  useEffect(()=>{
    try { localStorage.setItem("hcfd_favorites",JSON.stringify(favorites)); }
    catch { setStorageWarning("Could not save favorites in this browser."); }
  },[favorites]);
  // Keep the inventory in sync if the same site is open in another browser tab.
  useEffect(()=>{
    const syncStorage = event => {
      if((event.key === "hcfd_cars_v2" || event.key === "hcfd_cars") && event.newValue){ try { setCars(JSON.parse(event.newValue)); } catch {} }
      if(event.key === "hcfd_favorites" && event.newValue){ try { setFavorites(JSON.parse(event.newValue)); } catch {} }
    };
    window.addEventListener("storage",syncStorage);
    return ()=>window.removeEventListener("storage",syncStorage);
  },[]);

  const available = cars.filter(c=>c.status==="Available");
  const brands = ["All brands",...new Set(cars.map(c=>c.brand))];
  const colors = ["All colors",...new Set(cars.map(c=>c.color))];
  const filtered = useMemo(()=>{
    const terms = normalize(search).split(/\s+/).filter(Boolean);
    let list = available.filter(c=>{
      const searchable = normalize([c.name,c.brand,c.model,c.year,c.color,c.category,c.fuel,c.transmission,c.mileage,c.condition,c.location,c.description].join(" "));
      const keywordMatch = terms.every(term=>matchesTerm(searchable,term));
      return keywordMatch
        && (brand==="All brands" || normalize(c.brand)===normalize(brand))
        && (category==="All types" || normalize(c.category)===normalize(category))
        && (color==="All colors" || normalize(c.color)===normalize(color))
        && (maxPrice==="all" || Number(c.price)<=Number(maxPrice));
    });
    if(terms.length) list.sort((a,b)=>{
      const score=c=>{const n=normalize(c.name), br=normalize(c.brand), mo=normalize(c.model); return terms.reduce((v,t)=>v+(n.startsWith(t)?5:n.includes(t)?3:br.startsWith(t)?4:mo.startsWith(t)?4:1),0);};
      return score(b)-score(a);
    });
    if(sort==="low") list.sort((a,b)=>a.price-b.price);
    if(sort==="high") list.sort((a,b)=>b.price-a.price);
    if(sort==="new") list.sort((a,b)=>b.year-a.year);
    if(sort==="featured") list.sort((a,b)=>Number(b.featured)-Number(a.featured));
    return list;
  },[available,search,brand,category,color,maxPrice,sort]);
  const searchSuggestions = useMemo(()=>search.trim()?filtered.slice(0,5):[],[filtered,search]);

  function go(p){setPage(p);setSelected(null);setNotice("");setMobileMenu(false);window.scrollTo({top:0,behavior:"smooth"});}
  function toggleFavorite(id){setFavorites(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);}
  function showCar(car){setSelected(car);setPage("details");window.scrollTo({top:0,behavior:"smooth"});}
  function saveCar(e){
    e.preventDefault();
    const fd=new FormData(e.currentTarget);
    const obj=Object.fromEntries(fd.entries());
    const record={...obj,id:editing?.id || Date.now(),year:Number(obj.year),price:Number(obj.price),featured:obj.featured==="yes",status:obj.status || "Available",photos:editing?.photos||[]};
    if(!record.image) record.image=editing?.image || "";
    setCars(old=>editing?old.map(c=>c.id===editing.id?record:c):[record,...old]);
    setEditing(null);setNotice(editing?"Car information updated.":"New car added successfully.");
  }
  function handlePhoto(e){
    const file=e.target.files?.[0]; if(!file)return;
    if(!file.type.startsWith("image/")){alert("Please choose an image file.");e.target.value="";return;}
    const reader=new FileReader();
    reader.onload=()=>{
      const img=new Image();
      img.onload=()=>{
        const maxSide=1200, scale=Math.min(1,maxSide/Math.max(img.width,img.height));
        const canvas=document.createElement("canvas");
        canvas.width=Math.round(img.width*scale); canvas.height=Math.round(img.height*scale);
        canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);
        const compressed=canvas.toDataURL("image/jpeg",0.78);
        if(compressed.length>1800000){alert("This photo is still too large. Please choose a smaller photo.");return;}
        setEditing(old=>({...old,image:compressed}));
      };
      img.onerror=()=>alert("Could not read this image. Please choose another one.");
      img.src=reader.result;
    };
    reader.onerror=()=>alert("Could not upload this image. Please try again.");
    reader.readAsDataURL(file);
  }
  function loginAdmin(e){
    e.preventDefault();
    // Demo-only credentials. Real authentication must be implemented on a secure backend.
    if(login.username==="admin" && login.password==="Chizo@2026"){setAdmin(true);setPage("dashboard");setLoginError("");setLogin({username:"",password:""});}
    else setLoginError("Incorrect username or password.");
  }
  function deleteCar(id){if(window.confirm("Delete this vehicle?"))setCars(old=>old.filter(c=>c.id!==id));}
  function submitInquiry(e){
    e.preventDefault();const d=new FormData(e.currentTarget);
    const message=`Hello, I am interested in ${inquiry.name} (${inquiry.year}), listed at ${money(inquiry.price)}. My name: ${d.get("name")}. Phone: ${d.get("phone")}. Message: ${d.get("message")||"Please contact me."}`;
    const url=`https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url,"_blank","noopener,noreferrer");setInquiry(null);
  }
  const nav=[["home","Home"],["cars","Browse cars"],["about","About us"],["contact","Contact"]];

  return <div className="app">
    <header className="header">
      <button className="brand" onClick={()=>go("home")}><span className="brand-icon">H</span><span><b>HAVUGIMANA CHIZO FELEX DEV</b><small>DRIVING SYSTEM</small></span></button>
      <button className="mobile-toggle" onClick={()=>setMobileMenu(!mobileMenu)}>☰</button>
      <nav className={mobileMenu?"nav open":"nav"}>{nav.map(([p,label])=><button key={p} className={page===p?"nav-active":""} onClick={()=>go(p)}>{label}</button>)}</nav>
      <div className="header-actions"><button className="favorite-link" onClick={()=>go("favorites")}>♡ <span>Saved ({favorites.length})</span></button><button className="admin-entry" onClick={()=>go("admin-login")}>Admin login ↗</button></div>
    </header>

    {page==="home" && <>
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><i/> NYAMAGABE, RWANDA</div><h1>Find the car that moves <em>you forward.</em></h1><p>Explore carefully selected vehicles, compare your options and contact our team in Nyamagabe.</p><div className="hero-ctas"><button className="btn-primary" onClick={()=>go("cars")}>Explore cars <b>↗</b></button><button className="btn-outline" onClick={()=>go("contact")}>Talk to our team</button></div><div className="hero-points"><span>✓ Vehicle details</span><span>✓ Clear listed prices</span><span>✓ Local support</span></div></div>
        <div className="hero-photo"><img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=90" alt="Car for sale"/><div className="hero-stamp"><b>HC</b><span>DRIVE YOUR<br/>NEXT CHAPTER</span></div><div className="photo-caption">DISCOVER YOUR NEXT VEHICLE <span>01 / 03</span></div></div>
      </section>
      <section className="search-panel"><div className="search-heading"><b>Find your next car</b><span>Search our available vehicles</span></div><div className="search-fields"><div className="search-box-wrap"><label className="search-input">⌕ <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")go("cars");}} placeholder="Search make, model, color, year..."/></label>{searchSuggestions.length>0&&<div className="search-suggestions">{searchSuggestions.map(car=><button type="button" key={car.id} onClick={()=>showCar(car)}><img src={car.image} alt=""/><span><b>{car.name}</b><small>{car.year} · {car.color} · {money(car.price)}</small></span><i>View ↗</i></button>)}</div>}</div><select value={brand} onChange={e=>setBrand(e.target.value)}>{brands.map(x=><option key={x}>{x}</option>)}</select><select value={category} onChange={e=>setCategory(e.target.value)}>{["All types","SUV","Sedan","Pickup","Hatchback","Luxury","Van"].map(x=><option key={x}>{x}</option>)}</select><button className="btn-primary" onClick={()=>go("cars")}>Search cars ↗</button></div></section>
      <section className="section"><div className="section-title"><div><div className="eyebrow">OUR SELECTION</div><h2>Featured vehicles</h2><p>Explore some of the vehicles available from our Nyamagabe listing.</p></div><button className="link-button" onClick={()=>go("cars")}>View all cars ↗</button></div><div className="car-grid">{cars.filter(c=>c.status==="Available"&&c.featured).slice(0,3).map(c=><CarCard key={c.id} car={c} onOpen={showCar} favorite={favorites.includes(c.id)} onFavorite={toggleFavorite}/>)}</div></section>
      <section className="why"><div><div className="eyebrow">WHY CHOOSE US</div><h2>A clearer way to find your next vehicle.</h2><p>We make it easier to discover vehicles, review their details and reach the seller directly.</p></div><div className="why-grid"><Feature icon="⌕" title="Easy discovery" text="Search and filter vehicles by make, type, color and budget." onClick={()=>go("cars")}/><Feature icon="▣" title="Vehicle details" text="Review the year, mileage, fuel, transmission and condition." onClick={()=>go("cars")}/><Feature icon="☏" title="Direct enquiries" text="Send an enquiry to discuss a vehicle with the seller." onClick={()=>go("contact")}/><Feature icon="⌖" title="Local dealership" text="Find us in Nyamagabe District, Southern Province, Rwanda." onClick={()=>go("contact")}/></div></section>
      <section className="cta-band"><div><div className="eyebrow">READY TO GET STARTED?</div><h2>Your next vehicle could be one click away.</h2></div><button className="btn-light" onClick={()=>go("cars")}>Browse available cars ↗</button></section>
    </>}

    {page==="cars" && <main className="catalog section"><div className="eyebrow">VEHICLE INVENTORY</div><div className="section-title"><div><h2>Browse available cars</h2><p>{filtered.length} vehicles currently match your search. Results update as you type.</p></div><select className="sort-select" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Sort: Featured</option><option value="low">Price: Low to high</option><option value="high">Price: High to low</option><option value="new">Newest year</option></select></div>{storageWarning&&<div className="notice">{storageWarning}</div>}<div className="catalog-layout"><aside className="filters"><div className="filter-title"><b>Filter vehicles</b><button onClick={()=>{setSearch("");setBrand("All brands");setCategory("All types");setColor("All colors");setMaxPrice("all");}}>Reset</button></div><label>Keyword<div className="catalog-search-wrap"><input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&filtered[0])showCar(filtered[0]);}} placeholder="Try Toyota, Hilux, white, diesel..."/>{searchSuggestions.length>0&&<div className="search-suggestions catalog-suggestions">{searchSuggestions.map(car=><button type="button" key={car.id} onClick={()=>showCar(car)}><img src={car.image} alt=""/><span><b>{car.name}</b><small>{car.year} · {car.color} · {money(car.price)}</small></span><i>View ↗</i></button>)}</div>}</div>{search&&<button type="button" className="filter-clear" onClick={()=>setSearch("")}>Clear keyword ×</button>}</label><label>Manufacturer<select value={brand} onChange={e=>setBrand(e.target.value)}>{brands.map(x=><option key={x}>{x}</option>)}</select></label><label>Vehicle type<select value={category} onChange={e=>setCategory(e.target.value)}>{["All types","SUV","Sedan","Pickup","Hatchback","Luxury","Van"].map(x=><option key={x}>{x}</option>)}</select></label><label>Color<select value={color} onChange={e=>setColor(e.target.value)}>{colors.map(x=><option key={x}>{x}</option>)}</select></label><label>Maximum price<select value={maxPrice} onChange={e=>setMaxPrice(e.target.value)}><option value="all">Any budget</option><option value="15000000">15,000,000 RWF</option><option value="20000000">20,000,000 RWF</option><option value="25000000">25,000,000 RWF</option><option value="30000000">30,000,000 RWF</option></select></label><div className="location-chip">⌖ Nyamagabe, Rwanda</div></aside><div className="catalog-results">{filtered.length?<div className="car-grid">{filtered.map(c=><CarCard key={c.id} car={c} onOpen={showCar} favorite={favorites.includes(c.id)} onFavorite={toggleFavorite}/>)}</div>:<div className="empty"><span>⌕</span><h3>No vehicles found</h3><p>No available vehicle matches “{search}” and the selected filters.</p><button className="btn-primary" onClick={()=>{setSearch("");setBrand("All brands");setCategory("All types");setColor("All colors");setMaxPrice("all");}}>Clear all filters</button></div>}</div></div></main>}

    {page==="details"&&selected&&<main className="details-page section"><button className="back-link" onClick={()=>go("cars")}>← Back to vehicles</button><div className="details-grid"><div className="details-image"><img src={selected.image} alt={selected.name}/><span className="image-tag">{selected.status}</span></div><div className="details-info"><div className="eyebrow">{selected.location} · {selected.category}</div><h1>{selected.name}</h1><div className="detail-price">{money(selected.price)}</div><p>{selected.description}</p><div className="spec-grid">{[["Year",selected.year],["Color",selected.color],["Fuel",selected.fuel],["Transmission",selected.transmission],["Mileage",selected.mileage],["Condition",selected.condition]].map(([k,v])=><div key={k}><small>{k}</small><b>{v}</b></div>)}</div><div className="detail-actions"><button className="btn-primary" onClick={()=>setInquiry(selected)}>Enquire about this car ↗</button><button className="btn-outline" onClick={()=>toggleFavorite(selected.id)}>{favorites.includes(selected.id)?"♥ Saved":"♡ Save vehicle"}</button></div><div className="seller-note">⌖ Vehicle listed in <b>{selected.location}, Rwanda</b></div></div></div></main>}

    {page==="favorites"&&<main className="section"><div className="eyebrow">YOUR SHORTLIST</div><h2>Saved vehicles</h2><p className="muted">Vehicles you have saved on this device.</p>{cars.filter(c=>favorites.includes(c.id)).length?<div className="car-grid">{cars.filter(c=>favorites.includes(c.id)).map(c=><CarCard key={c.id} car={c} onOpen={showCar} favorite onFavorite={toggleFavorite}/>)}</div>:<div className="empty"><span>♡</span><h3>No saved vehicles yet</h3><button className="btn-primary" onClick={()=>go("cars")}>Browse cars</button></div>}</main>}

    {page==="about"&&<main className="inner-page"><div><div className="eyebrow">ABOUT OUR BUSINESS</div><h1>Local vehicle listings in Nyamagabe.</h1><p>HAVUGIMANA CHIZO FELEX DEV Car Sales is a vehicle sales platform concept based in Nyamagabe, Southern Province, Rwanda. We help customers explore vehicle listings, compare key details and contact the seller.</p><button className="btn-primary" onClick={()=>go("cars")}>Explore inventory ↗</button></div><img src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=85" alt="Cars"/></main>}

    {page==="contact"&&<main className="contact-page section"><div><div className="eyebrow">GET IN TOUCH</div><h1>Let's find the right car for you.</h1><p>Contact our team for vehicle information, availability and viewing arrangements.</p><div className="contact-detail">⌖ <span><b>Location</b><small>Nyamagabe District, Southern Province, Rwanda</small></span></div><div className="contact-detail">☎ <span><b>Phone</b><small>Ask the administrator to add the official phone number.</small></span></div><div className="contact-detail">✉ <span><b>Email</b><small>Ask the administrator to add the official email address.</small></span></div></div><form className="contact-form" onSubmit={e=>{e.preventDefault();alert("Thank you. Please add a real business phone number to enable direct contact.");e.currentTarget.reset();}}><h3>Send an enquiry</h3><label>Your name<input required placeholder="Full name"/></label><label>Phone number<input required type="tel" placeholder="+250..."/></label><label>What are you looking for?<textarea rows="4" placeholder="Tell us about the car you need"/></label><button className="btn-primary">Send enquiry ↗</button></form></main>}

    {page==="admin-login"&&<main className="login-page"><form className="login-card" onSubmit={loginAdmin}><div className="login-icon">♙</div><div className="eyebrow">RESTRICTED AREA</div><h1>Administrator login</h1><p>Only the authorized administrator can manage vehicles, prices and photos.</p><label>Username<input value={login.username} onChange={e=>setLogin({...login,username:e.target.value})} placeholder="Enter username" required/></label><label>Password<input type="password" value={login.password} onChange={e=>setLogin({...login,password:e.target.value})} placeholder="Enter password" required/></label>{loginError&&<div className="error">{loginError}</div>}<button className="btn-primary wide">Sign in securely ↗</button><button type="button" className="back-link centered" onClick={()=>go("home")}>← Back to website</button><small className="demo-warning">Frontend demo credentials are documented in README. This is not production security.</small></form></main>}

    {page==="dashboard"&&admin&&<main className="dashboard section"><div className="dashboard-head"><div><div className="eyebrow">CONTROL CENTER</div><h1>Admin dashboard</h1><p>Manage every vehicle listing shown on the public website.</p></div><button className="btn-outline" onClick={()=>{setAdmin(false);go("home");}}>Log out ↗</button></div><div className="admin-stats"><Stat label="Total listings" value={cars.length}/><Stat label="Available cars" value={available.length}/><Stat label="Sold / unavailable" value={cars.filter(c=>c.status!=="Available").length}/><Stat label="Saved by visitors" value={favorites.length}/></div><div className="admin-toolbar"><div><h2>Vehicle management</h2><p>Add new cars, update details, upload photos or remove listings.</p></div><button className="btn-primary" onClick={()=>setEditing({})}>＋ Add new car</button></div>{notice&&<div className="notice">{notice}</div>}<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Vehicle</th><th>Price</th><th>Year</th><th>Color</th><th>Status</th><th>Actions</th></tr></thead><tbody>{cars.map(c=><tr key={c.id}><td><div className="table-car"><img src={c.image} alt=""/><b>{c.name}</b></div></td><td>{money(c.price)}</td><td>{c.year}</td><td>{c.color}</td><td><span className={c.status==="Available"?"status available":"status sold"}>{c.status}</span></td><td><div className="row-actions"><button onClick={()=>setEditing(c)}>Edit</button><button className="danger" onClick={()=>deleteCar(c.id)}>Delete</button></div></td></tr>)}</tbody></table></div><div className="admin-tip">Admin access is for managing vehicle data and photos in this browser demo. Connect a secure backend before publishing.</div></main>}

    {page==="dashboard"&&!admin&&<main className="empty section"><h2>Administrator access required</h2><button className="btn-primary" onClick={()=>go("admin-login")}>Go to admin login</button></main>}

    <footer className="footer"><div className="footer-main"><div className="footer-brand"><div className="brand footer-logo"><span className="brand-icon">H</span><span><b>HAVUGIMANA CHIZO FELEX DEV</b><small>DRIVING SYSTEM</small></span></div><p>Your next vehicle journey starts in Nyamagabe.</p></div><div><b>Explore</b><button onClick={()=>go("cars")}>Browse cars</button><button onClick={()=>go("about")}>About us</button><button onClick={()=>go("contact")}>Contact</button></div><div><b>Our location</b><span>Nyamagabe District</span><span>Southern Province, Rwanda</span><span>Rwanda</span></div><div><b>Admin</b><button onClick={()=>go("admin-login")}>Administrator login ↗</button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} HAVUGIMANA CHIZO FELEX DEV. All rights reserved.</span><span>CAR SALES MANAGEMENT SYSTEM · NYAMAGABE</span></div></footer>

    {editing&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setEditing(null);}}><form className="edit-modal" onSubmit={saveCar}><div className="modal-head"><div><div className="eyebrow">ADMIN ONLY</div><h2>{editing.id?"Edit vehicle":"Add a vehicle"}</h2></div><button type="button" onClick={()=>setEditing(null)}>✕</button></div><div className="edit-grid"><label>Vehicle name<input name="name" required defaultValue={editing.name||""} placeholder="e.g. Toyota RAV4"/></label><label>Manufacturer<input name="brand" required defaultValue={editing.brand||""} placeholder="Toyota"/></label><label>Model<input name="model" required defaultValue={editing.model||""}/></label><label>Year<input name="year" type="number" required min="1980" max="2035" defaultValue={editing.year||new Date().getFullYear()}/></label><label>Price (RWF)<input name="price" type="number" required min="1" defaultValue={editing.price||""}/></label><label>Color<input name="color" required defaultValue={editing.color||""}/></label><label>Fuel<select name="fuel" defaultValue={editing.fuel||"Petrol"}><option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option></select></label><label>Transmission<select name="transmission" defaultValue={editing.transmission||"Automatic"}><option>Automatic</option><option>Manual</option></select></label><label>Mileage<input name="mileage" defaultValue={editing.mileage||""} placeholder="e.g. 50,000 km"/></label><label>Category<select name="category" defaultValue={editing.category||"SUV"}>{["SUV","Sedan","Pickup","Hatchback","Luxury","Van"].map(x=><option key={x}>{x}</option>)}</select></label><label>Condition<select name="condition" defaultValue={editing.condition||"Used - good"}><option>New</option><option>Used - excellent</option><option>Used - good</option><option>Needs inspection</option></select></label><label>Status<select name="status" defaultValue={editing.status||"Available"}><option>Available</option><option>Sold</option><option>Reserved</option></select></label><label>Location<input name="location" defaultValue={editing.location||"Nyamagabe"}/></label><label>Featured<select name="featured" defaultValue={editing.featured?"yes":"no"}><option value="no">No</option><option value="yes">Yes</option></select></label><label className="full-field">Description<textarea name="description" rows="3" defaultValue={editing.description||""}/></label><label className="full-field">Main photo URL<input name="image" defaultValue={editing.image?.startsWith("data:")?"":editing.image||""} placeholder="Paste an image URL or upload below"/></label><label className="full-field upload-label">Upload car photo<input type="file" accept="image/*" onChange={handlePhoto}/>{editing.image&&<img className="upload-preview" src={editing.image} alt="Preview"/>}</label></div><div className="modal-actions"><button type="button" className="btn-outline" onClick={()=>setEditing(null)}>Cancel</button><button className="btn-primary">Save vehicle ↗</button></div></form></div>}

    {inquiry&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setInquiry(null);}}><form className="inquiry-modal" onSubmit={submitInquiry}><div className="modal-head"><div><div className="eyebrow">VEHICLE ENQUIRY</div><h2>{inquiry.name}</h2><p>{money(inquiry.price)}</p></div><button type="button" onClick={()=>setInquiry(null)}>✕</button></div><label>Your name<input name="name" required placeholder="Full name"/></label><label>Phone number<input name="phone" required type="tel" placeholder="+250..."/></label><label>Message<textarea name="message" rows="3" placeholder="I would like to know if this car is available."/></label><button className="btn-primary wide">Continue with WhatsApp ↗</button><small>WhatsApp opens with your enquiry text. Add the business phone number to direct messages to the seller.</small></form></div>}
  </div>;
}

function CarCard({car,onOpen,favorite,onFavorite}){
  return <article className="car-card car-card-clickable" role="button" tabIndex={0} onClick={()=>onOpen(car)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onOpen(car);}}} aria-label={`Open details for ${car.name}`}>
    <div className="car-image-button"><img src={car.image} alt={car.name}/><span className="car-condition">{car.condition}</span></div>
    <button className="heart" onClick={e=>{e.stopPropagation();onFavorite(car.id);}} aria-label="Save vehicle">{favorite?"♥":"♡"}</button>
    <div className="car-content"><div className="car-meta"><span>{car.year}</span><span>{car.category}</span><span>{car.location}</span></div><span className="car-name">{car.name} ↗</span><div className="car-specs"><span>⚙ {car.transmission}</span><span>⛽ {car.fuel}</span><span>◷ {car.mileage}</span></div><div className="car-bottom"><b>{money(car.price)}</b><span>View details →</span></div></div>
  </article>;
}
function Feature({icon,title,text,onClick}){return <button type="button" className="feature feature-clickable" onClick={onClick}><span>{icon}</span><div><b>{title}</b><p>{text}</p></div><small>Open ↗</small></button>}
function Stat({label,value}){return <div className="stat"><span>{label}</span><b>{value}</b></div>}
