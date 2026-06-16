import React, { useMemo, useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, MapPin, Clock, Phone, Mail, MessageCircle, Utensils, Search, CheckCircle2, ChevronDown, X, Star, Sandwich, Salad, Coffee, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CHEESES = [
  { name: "Provolone", price: 0 },
  { name: "Swiss", price: 0 },
  { name: "American", price: 0 },
  { name: "Cheddar", price: 0 },
  { name: "Mozzarella", price: 0 },
  { name: "Brie", price: 1.25 },
  { name: "Goat Cheese", price: 1.25 },
  { name: "Fresh Mozzarella", price: 1.25 },
  { name: "Pepper Jack", price: 1.25 },
];

const CONDIMENTS = ["Mayo", "Chipotle Mayo", "Ranch", "Honey Mustard", "Dijon Mustard", "Yellow Mustard", "Olive Oil", "Pesto", "Buffalo Sauce", "BBQ Sauce", "Hot Sauce"];
const SAUCE_LEVELS = ["None", "Light", "Regular", "Extra"];

const ADDONS = [
  { name: "Avocado", price: 1.5 },
  { name: "Bacon", price: 2.5 },
  { name: "Extra Turkey", price: 2 },
  { name: "Extra Salami", price: 2 },
  { name: "Prosciutto", price: 3 },
  { name: "Chicken Breast", price: 3 },
  { name: "Roasted Red Peppers", price: 0.75 },
  { name: "Jalapeños", price: 0.75 },
  { name: "Mushrooms", price: 0.75 },
];

const SIDES = [
  { name: "Sea Salt Kettle Chips", price: 2.49 },
  { name: "Jalapeño Kettle Chips", price: 2.49 },
  { name: "Mixed Fruit", price: 4.99 },
  { name: "Donut", price: 2.49 },
  { name: "Cookie", price: 2.99 },
  { name: "Bottled Water", price: 2 },
  { name: "Coke", price: 2.5 },
  { name: "Sprite", price: 2.5 },
];

const MENU = [
  {
    category: "Popular Sandwiches",
    icon: Sandwich,
    items: [
      { name: "Italian Premium", price: 11.99, description: "Prosciutto, hard salami, provolone, Swiss, lettuce, tomato, onion, yellow mustard and olive oil on ciabatta.", included: ["Prosciutto", "Hard Salami", "Provolone", "Swiss", "Lettuce", "Tomato", "Onion", "Yellow Mustard", "Olive Oil"] },
      { name: "Big Blue", price: 11.99, description: "Prosciutto, brie cheese, blueberry jam, and field greens on ciabatta.", included: ["Prosciutto", "Brie", "Blueberry Jam", "Field Greens"] },
      { name: "California", price: 9.99, description: "Roasted turkey, provolone, lettuce, tomato, cucumber, avocado, and ranch dressing on ciabatta.", included: ["Roasted Turkey", "Provolone", "Lettuce", "Tomato", "Cucumber", "Avocado", "Ranch"] },
      { name: "Turkey Pesto", price: 9.99, description: "Black pepper turkey, fresh mozzarella, roasted red peppers, pesto, and field greens on ciabatta.", included: ["Black Pepper Turkey", "Fresh Mozzarella", "Roasted Red Peppers", "Pesto", "Field Greens"] },
      { name: "Curse", price: 9.99, description: "Black pepper salami, goat cheese, roasted red peppers, honey, and field greens on ciabatta.", included: ["Black Pepper Salami", "Goat Cheese", "Roasted Red Peppers", "Honey", "Field Greens"] },
      { name: "Smokey", price: 9.99, description: "Prosciutto, brie cheese spread, onion, honey Dijon, and field greens on ciabatta.", included: ["Prosciutto", "Brie Cheese Spread", "Onion", "Honey Dijon", "Field Greens"] },
    ],
  },
  {
    category: "Wraps & Lunch",
    icon: Utensils,
    items: [
      { name: "Buffalo Wrap", price: 7.99, description: "Breaded chicken, lettuce, tomato, and Buffalo sauce in a flour tortilla.", included: ["Breaded Chicken", "Lettuce", "Tomato", "Buffalo Sauce"] },
      { name: "Chipotle Wrap", price: 7.99, description: "Breaded chicken breast, cheddar, lettuce, tomato, and chipotle mayo on spinach wrap.", included: ["Breaded Chicken", "Cheddar", "Lettuce", "Tomato", "Chipotle Mayo"] },
      { name: "Buffalo Chicken Sandwich", price: 9.99, description: "Buffalo chicken deli meat, cheddar, lettuce, tomato, onion, and honey Dijon on Italian roll.", included: ["Buffalo Chicken", "Cheddar", "Lettuce", "Tomato", "Onion", "Honey Dijon"] },
      { name: "Veggie Wrap", price: 9.99, description: "Provolone cheese and roasted vegetables in a flour tortilla wrap.", included: ["Provolone", "Roasted Vegetables"] },
      { name: "Tuna Wrap", price: 13.99, description: "Tuna salad, lettuce, tomato, red onion, and cheddar cheese in a flour wrap.", included: ["Tuna Salad", "Lettuce", "Tomato", "Red Onion", "Cheddar"] },
      { name: "Cajun Salmon Wrap", price: 13.99, description: "Cajun salmon, goat cheese, field greens, tomato, and mayo in a flour wrap.", included: ["Cajun Salmon", "Goat Cheese", "Field Greens", "Tomato", "Mayo"] },
    ],
  },
  {
    category: "Breakfast & Quick Bites",
    icon: Coffee,
    items: [
      { name: "Bagel with Cream Cheese", price: 4.49, description: "Fresh bagel with cream cheese. Great for morning pickup.", included: ["Bagel", "Cream Cheese"] },
      { name: "Grilled Cheese", price: 5.99, description: "Classic grilled cheese with your choice of cheese.", included: ["Bread", "Cheese", "Butter"] },
      { name: "Healthy Breakfast Box", price: 9.07, description: "Scrambled eggs, bacon, cheese, and roasted veggies.", included: ["Scrambled Eggs", "Bacon", "Cheese", "Roasted Veggies"] },
      { name: "Donut", price: 2.49, description: "Grab-and-go sweet treat.", included: ["Donut"] },
    ],
  },
  {
    category: "Salads & Sides",
    icon: Salad,
    items: [
      { name: "City Fresh Salad", price: 7.99, description: "Apples, cranberries, walnuts, goat cheese, greens, and vinaigrette.", included: ["Apples", "Cranberries", "Walnuts", "Goat Cheese", "Greens", "Vinaigrette"] },
      { name: "Kale Salad", price: 11.99, description: "Kale, red cabbage, cranberries, carrots, pumpkin seeds, lime, olive oil, honey vinaigrette.", included: ["Kale", "Red Cabbage", "Cranberries", "Carrots", "Pumpkin Seeds", "Honey Vinaigrette"] },
      { name: "Mixed Fruit", price: 4.99, description: "Fresh mixed fruit cup.", included: ["Mixed Fruit"] },
    ],
  },
  {
    category: "Catering Favorites",
    icon: PackageCheck,
    items: [
      { name: "6 Sandwich Box", price: 59.94, description: "Serves 6. Choose up to 6 sandwiches or wraps. Pickup only; 24-hour notice recommended.", included: ["6 Sandwiches or Wraps", "Pickup Only"] },
      { name: "10 Sandwich Box", price: 99.99, description: "Serves 10. Choose up to 10 sandwiches or wraps. Pickup only; 24-hour notice recommended.", included: ["10 Sandwiches or Wraps", "Pickup Only"] },
    ],
  },
];

const business = {
  name: "Suarez Market",
  location: "Chicago French Market, 131 N Clinton St, Chicago, IL 60661",
  phone: "312-575-0230",
  email: "Zuluj94@suarezmarket.com",
  hours: "Mon–Fri 7AM–7PM • Sat 9AM–4PM",
};

const makeKey = () => Math.random().toString(36).slice(2, 10);

export default function SuarezMarketLandingPage() {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderType, setOrderType] = useState("Pickup");
  const [showCart, setShowCart] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customizer, setCustomizer] = useState(null);

  const categories = ["All", ...MENU.map((section) => section.category)];
  const flatItems = MENU.flatMap((section) => section.items.map((item) => ({ ...item, category: section.category, icon: section.icon })));

  const filteredItems = flatItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartItems = cart;
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.totalPrice * item.qty, 0), [cartItems]);
  const estimatedTax = subtotal * 0.1025;
  const total = subtotal + estimatedTax;

  const openCustomizer = (item) => {
    setSelectedItem(item);
    setCustomizer({
      cheese: "",
      condiments: {},
      addons: [],
      sides: [],
      omit: [],
      notes: "",
      toasted: false,
      cutInHalf: false,
    });
  };

  const toggleArray = (field, value) => {
    setCustomizer((prev) => {
      const exists = prev[field].includes(value);
      return { ...prev, [field]: exists ? prev[field].filter((x) => x !== value) : [...prev[field], value] };
    });
  };

  const toggleCondiment = (name, level) => {
    setCustomizer((prev) => ({ ...prev, condiments: { ...prev.condiments, [name]: level } }));
  };

  const customizedPrice = useMemo(() => {
    if (!selectedItem || !customizer) return 0;
    const cheesePrice = CHEESES.find((c) => c.name === customizer.cheese)?.price || 0;
    const addonPrice = customizer.addons.reduce((sum, name) => sum + (ADDONS.find((a) => a.name === name)?.price || 0), 0);
    const sidePrice = customizer.sides.reduce((sum, name) => sum + (SIDES.find((s) => s.name === name)?.price || 0), 0);
    return selectedItem.price + cheesePrice + addonPrice + sidePrice;
  }, [selectedItem, customizer]);

  const addCustomizedItem = () => {
    if (!selectedItem || !customizer) return;
    setCart((prev) => [
      ...prev,
      {
        key: makeKey(),
        name: selectedItem.name,
        basePrice: selectedItem.price,
        totalPrice: customizedPrice,
        qty: 1,
        details: customizer,
      },
    ]);
    setSelectedItem(null);
    setCustomizer(null);
    setShowCart(true);
  };

  const updateQty = (key, change) => {
    setCart((prev) => prev.flatMap((item) => {
      if (item.key !== key) return [item];
      const qty = item.qty + change;
      return qty <= 0 ? [] : [{ ...item, qty }];
    }));
  };

  const clearItem = (key) => setCart((prev) => prev.filter((item) => item.key !== key));

  return (
    <div className="min-h-screen bg-stone-50 text-stone-950">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">Chicago French Market</p>
            <h1 className="text-xl font-black md:text-2xl">Suarez Market</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden rounded-2xl md:flex" onClick={() => window.location.href = `tel:${business.phone}`}><Phone className="mr-2 h-4 w-4" /> Call</Button>
            <Button variant="outline" className="rounded-2xl" onClick={() => window.location.href = `mailto:${business.email}?subject=Suarez%20Market%20Order%20Assistance`}><MessageCircle className="mr-2 h-4 w-4" /> Assistance</Button>
            <Button className="rounded-2xl bg-emerald-700 hover:bg-emerald-800" onClick={() => setShowCart(!showCart)}><ShoppingCart className="mr-2 h-4 w-4" /> View Cart ({cartItems.reduce((sum, item) => sum + item.qty, 0)})</Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-emerald-950 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #fbbf24 0, transparent 24%), radial-gradient(circle at 90% 10%, #34d399 0, transparent 25%), radial-gradient(circle at 50% 90%, #f97316 0, transparent 24%)" }} />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-6 md:py-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 ring-1 ring-white/20"><Star className="mr-2 h-4 w-4 text-amber-300" /> Fresh sandwiches • salads • breakfast • catering pickup</div>
            <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Build your Suarez Market order your way.</h2>
            <p className="mt-5 max-w-2xl text-lg text-emerald-50">Customize every sandwich or wrap with cheese, condiments, add-ons, sides, removed ingredients, and special instructions before checkout.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-2xl bg-amber-400 font-bold text-stone-950 hover:bg-amber-300" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>Start Order</Button>
              <Button size="lg" variant="outline" className="rounded-2xl border-white/50 bg-white/10 text-white hover:bg-white/20" onClick={() => window.location.href = `mailto:${business.email}?subject=Suarez%20Market%20Catering%20Request`}>Catering Request</Button>
            </div>
          </motion.div>
          <Card className="rounded-3xl border-white/10 bg-white/95 text-stone-950 shadow-2xl">
            <CardContent className="space-y-5 p-6">
              <h3 className="text-2xl font-black">Order Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 text-emerald-700" /><span>{business.location}</span></div>
                <div className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 text-emerald-700" /><span>{business.hours}</span></div>
                <div className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 text-emerald-700" /><span>{business.phone}</span></div>
                <div className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 text-emerald-700" /><span>{business.email}</span></div>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4 text-sm text-stone-800"><strong>Catering note:</strong> Please allow 24 hours for catering orders. Pickup only.</div>
            </CardContent>
          </Card>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1fr_390px] md:px-6" id="menu">
        <section>
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div><p className="font-semibold uppercase tracking-[0.2em] text-emerald-700">Menu Builder</p><h2 className="text-3xl font-black">Choose an item to customize</h2></div>
            <div className="relative w-full md:w-80"><Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search sandwiches, salads..." className="w-full rounded-2xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 outline-none ring-emerald-600 focus:ring-2" /></div>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => <button key={category} onClick={() => setSelectedCategory(category)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${selectedCategory === category ? "bg-emerald-700 text-white" : "bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-100"}`}>{category}</button>)}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return <Card key={item.name} className="rounded-3xl border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><CardContent className="flex h-full flex-col p-5"><div className="mb-3 flex items-start justify-between gap-4"><div><div className="mb-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-emerald-700"><Icon className="mr-1 h-3.5 w-3.5" />{item.category}</div><h3 className="text-xl font-black">{item.name}</h3></div><span className="rounded-full bg-amber-100 px-3 py-1 font-black text-stone-950">${item.price.toFixed(2)}</span></div><p className="mb-4 flex-1 text-sm leading-6 text-stone-600">{item.description}</p><div className="mb-4 flex flex-wrap gap-1.5">{item.included.slice(0, 5).map((ing) => <span key={ing} className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600">{ing}</span>)}</div><Button className="rounded-2xl bg-emerald-700 hover:bg-emerald-800" onClick={() => openCustomizer(item)}><Plus className="mr-2 h-4 w-4" /> Customize & Add</Button></CardContent></Card>;
            })}
          </div>
        </section>

        <aside className={`${showCart ? "block" : "hidden md:block"}`}>
          <div className="sticky top-24 space-y-4">
            <Card className="rounded-3xl border-stone-200 bg-white shadow-xl"><CardContent className="p-5"><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black">Your Cart</h2><ShoppingCart className="h-5 w-5 text-emerald-700" /></div><div className="mb-4 grid grid-cols-2 rounded-2xl bg-stone-100 p-1 text-sm font-bold">{["Pickup", "Catering"].map((type) => <button key={type} onClick={() => setOrderType(type)} className={`rounded-xl py-2 ${orderType === type ? "bg-white shadow-sm" : "text-stone-500"}`}>{type}</button>)}</div>{cartItems.length === 0 ? <div className="rounded-2xl bg-stone-50 p-6 text-center text-sm text-stone-500"><Utensils className="mx-auto mb-3 h-8 w-8 text-stone-300" />Add menu items to start your order.</div> : <div className="space-y-3">{cartItems.map((item) => <div key={item.key} className="rounded-2xl border border-stone-200 p-3"><div className="flex justify-between gap-3"><div><p className="font-bold">{item.name}</p><p className="text-xs text-stone-500">{[item.details.cheese, ...item.details.addons, ...item.details.sides].filter(Boolean).join(", ") || "Standard"}</p>{item.details.omit.length > 0 && <p className="mt-1 text-xs font-semibold text-red-600">No: {item.details.omit.join(", ")}</p>}</div><button onClick={() => clearItem(item.key)} className="text-stone-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2 rounded-full bg-stone-100 p-1"><button onClick={() => updateQty(item.key, -1)} className="rounded-full bg-white p-1 shadow-sm"><Minus className="h-4 w-4" /></button><span className="w-8 text-center font-black">{item.qty}</span><button onClick={() => updateQty(item.key, 1)} className="rounded-full bg-white p-1 shadow-sm"><Plus className="h-4 w-4" /></button></div><p className="font-black">${(item.totalPrice * item.qty).toFixed(2)}</p></div></div>)}</div>}<div className="my-5 space-y-2 border-t border-stone-200 pt-4 text-sm"><div className="flex justify-between"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><div className="flex justify-between"><span>Estimated tax</span><strong>${estimatedTax.toFixed(2)}</strong></div><div className="flex justify-between text-lg"><span className="font-black">Estimated Total</span><strong>${total.toFixed(2)}</strong></div></div><form className="space-y-3" onSubmit={(e) => e.preventDefault()}><input className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-600 focus:ring-2" placeholder="Customer name" /><input className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-600 focus:ring-2" placeholder="Phone number" /><input className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-600 focus:ring-2" placeholder="Pickup date/time" /><textarea className="min-h-24 w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none ring-emerald-600 focus:ring-2" placeholder="Order notes or allergy details" /><Button className="w-full rounded-2xl bg-emerald-700 py-6 text-base font-black hover:bg-emerald-800" disabled={cartItems.length === 0} onClick={() => alert("Connect this button to Stripe, Square, Toast, Clover, Ritual, or an email/order webhook.")}><CheckCircle2 className="mr-2 h-5 w-5" /> Submit Order Request</Button><Button type="button" variant="outline" className="w-full rounded-2xl py-6 text-base font-black" onClick={() => window.location.href = `mailto:${business.email}?subject=Suarez%20Market%20Order%20Assistance`}>Assistance</Button></form></CardContent></Card><p className="px-2 text-xs leading-5 text-stone-500">Prices and availability should be confirmed before launch. The checkout can connect to Stripe, Square, Clover, Toast, email, Google Sheets, or a custom webhook.</p></div>
        </aside>
      </main>

      {selectedItem && customizer && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50 p-0 md:items-center md:p-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl md:rounded-3xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-stone-200 bg-white p-5">
              <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Customize Item</p><h2 className="text-3xl font-black">{selectedItem.name}</h2><p className="mt-1 text-sm text-stone-600">Base price ${selectedItem.price.toFixed(2)}</p></div>
              <button onClick={() => { setSelectedItem(null); setCustomizer(null); }} className="rounded-full bg-stone-100 p-2 hover:bg-stone-200"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid gap-6 p-5 md:grid-cols-2">
              <section className="space-y-6">
                <div><h3 className="mb-3 text-lg font-black">1. Choose Cheese</h3><div className="grid grid-cols-2 gap-2">{CHEESES.map((cheese) => <button key={cheese.name} onClick={() => setCustomizer((p) => ({ ...p, cheese: p.cheese === cheese.name ? "" : cheese.name }))} className={`rounded-2xl border p-3 text-left text-sm font-bold ${customizer.cheese === cheese.name ? "border-emerald-700 bg-emerald-50 text-emerald-900" : "border-stone-200 bg-white"}`}>{cheese.name}<span className="block text-xs font-semibold text-stone-500">{cheese.price ? `+$${cheese.price.toFixed(2)}` : "Included"}</span></button>)}</div></div>
                <div><h3 className="mb-3 text-lg font-black">2. Condiments & Sauce Level</h3><div className="space-y-3">{CONDIMENTS.map((condiment) => <div key={condiment} className="rounded-2xl border border-stone-200 p-3"><div className="mb-2 font-bold">{condiment}</div><div className="grid grid-cols-4 gap-1">{SAUCE_LEVELS.map((level) => <button key={level} onClick={() => toggleCondiment(condiment, level)} className={`rounded-xl px-2 py-2 text-xs font-bold ${customizer.condiments[condiment] === level ? "bg-emerald-700 text-white" : "bg-stone-100 text-stone-600"}`}>{level}</button>)}</div></div>)}</div></div>
              </section>
              <section className="space-y-6">
                <div><h3 className="mb-3 text-lg font-black">3. Add Premium Extras</h3><div className="grid grid-cols-2 gap-2">{ADDONS.map((addon) => <button key={addon.name} onClick={() => toggleArray("addons", addon.name)} className={`rounded-2xl border p-3 text-left text-sm font-bold ${customizer.addons.includes(addon.name) ? "border-emerald-700 bg-emerald-50" : "border-stone-200 bg-white"}`}>{addon.name}<span className="block text-xs font-semibold text-stone-500">+${addon.price.toFixed(2)}</span></button>)}</div></div>
                <div><h3 className="mb-3 text-lg font-black">4. Remove Ingredients</h3><p className="mb-3 text-sm text-stone-500">Tap anything you want omitted from this order.</p><div className="flex flex-wrap gap-2">{selectedItem.included.map((ingredient) => <button key={ingredient} onClick={() => toggleArray("omit", ingredient)} className={`rounded-full px-3 py-2 text-sm font-bold ${customizer.omit.includes(ingredient) ? "bg-red-100 text-red-700 line-through" : "bg-stone-100 text-stone-700"}`}>{ingredient}</button>)}</div></div>
                <div><h3 className="mb-3 text-lg font-black">5. Add Sides & Drinks</h3><div className="grid grid-cols-2 gap-2">{SIDES.map((side) => <button key={side.name} onClick={() => toggleArray("sides", side.name)} className={`rounded-2xl border p-3 text-left text-sm font-bold ${customizer.sides.includes(side.name) ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white"}`}>{side.name}<span className="block text-xs font-semibold text-stone-500">+${side.price.toFixed(2)}</span></button>)}</div></div>
                <div><h3 className="mb-3 text-lg font-black">6. Special Instructions</h3><div className="mb-3 grid grid-cols-2 gap-2"><button onClick={() => setCustomizer((p) => ({ ...p, toasted: !p.toasted }))} className={`rounded-2xl border p-3 text-sm font-bold ${customizer.toasted ? "border-emerald-700 bg-emerald-50" : "border-stone-200"}`}>Toast it</button><button onClick={() => setCustomizer((p) => ({ ...p, cutInHalf: !p.cutInHalf }))} className={`rounded-2xl border p-3 text-sm font-bold ${customizer.cutInHalf ? "border-emerald-700 bg-emerald-50" : "border-stone-200"}`}>Cut in half</button></div><textarea value={customizer.notes} onChange={(e) => setCustomizer((p) => ({ ...p, notes: e.target.value }))} className="min-h-24 w-full rounded-2xl border border-stone-200 p-3 outline-none ring-emerald-600 focus:ring-2" placeholder="Example: sauce on side, allergy note, extra toasted..." /></div>
              </section>
            </div>
            <div className="sticky bottom-0 flex flex-col gap-3 border-t border-stone-200 bg-white p-5 md:flex-row md:items-center md:justify-between"><div><p className="text-sm text-stone-500">Customized item total</p><p className="text-3xl font-black">${customizedPrice.toFixed(2)}</p></div><Button size="lg" className="rounded-2xl bg-emerald-700 px-8 py-6 text-base font-black hover:bg-emerald-800" onClick={addCustomizedItem}><Plus className="mr-2 h-5 w-5" /> Add Customized Item</Button></div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
