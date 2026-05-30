import React, { useMemo, useState } from "react";
import { ShoppingCart, Plus, Minus, Coffee, Clock, MapPin, Phone, Send, Trash2 } from "lucide-react";

const menuSections = [
  {
    title: "Daily Specials",
    subtitle: "Served on a specific bagel • Monday–Friday",
    items: [
      { name: "Monday: Plain Bagel + Plain Cream Cheese", price: 2.99 },
      { name: "Tuesday: Sesame Bagel + Veggie Cream Cheese", price: 2.99 },
      { name: "Wednesday: Asiago Bagel + Jalapeño Cream Cheese", price: 2.99 },
      { name: "Thursday: Everything Bagel + Chive Cream Cheese", price: 2.99 },
      { name: "Friday: Cheddar Jalapeño Bagel + Plain Cream Cheese", price: 2.99 },
    ],
  },
  {
    title: "Cream Cheese Bagels",
    subtitle: "Choose your bagel",
    items: [
      { name: "Bagel with Cream Cheese", price: 4.49 },
      { name: "Bagel with Cream Cheese and Bacon", price: 5.99 },
      { name: "Bagel with Cream Cheese and Tomato", price: 4.99 },
      { name: "Bagel with Cream Cheese and Cucumber", price: 4.99 },
      { name: "Turkey and Provolone Sandwich", description: "Cream cheese, red onions, tomato, cucumber, lettuce", price: 7.99 },
      { name: "Veggie Sandwich", description: "Cream cheese, cucumber, tomato, and onion", price: 5.99 },
      { name: "Bagel with Butter", price: 2.99 },
      { name: "Bagel PB&J", price: 4.49 },
    ],
  },
  {
    title: "Coffee & Donuts",
    subtitle: "Freshly brewed",
    items: [
      { name: "Medium Coffee — Iced or Hot", price: 2.25 },
      { name: "Large Coffee", price: 2.99 },
      { name: "Single Donut", price: 2.49 },
    ],
  },
  {
    title: "Bagel Sandwiches",
    subtitle: "Choose your bagel",
    items: [
      { name: "Bacon Egg and Cheese", price: 7.26 },
      { name: "Sausage Egg and Cheese", price: 7.26 },
      { name: "Ham Egg and Cheese", price: 7.26 },
      { name: "Turkey Egg and Cheese", price: 7.26 },
      { name: "Egg and Cheese", price: 5.99 },
      { name: "Scrambled Egg", price: 5.49 },
    ],
  },
  {
    title: "Wraps",
    subtitle: "Spinach or flour tortilla",
    items: [
      { name: "Turkey Egg and Cheese Wrap", price: 9.07 },
      { name: "Bacon Egg and Cheese Wrap", price: 9.07 },
      { name: "Potato Egg and Cheese Wrap", price: 9.07 },
      { name: "Sausage Egg and Cheese Wrap", price: 9.07 },
      { name: "Veggie Egg and Cheese Wrap", price: 9.07 },
      { name: "Spinach Egg and Cheese Wrap", price: 9.07 },
      { name: "Egg and Cheese Wrap", price: 9.07 },
    ],
  },
  {
    title: "Whole Grain Bread",
    subtitle: "Deliciously healthy",
    items: [
      { name: "Avocado Toast", price: 6.99 },
      { name: "Grilled Cheese", description: "American or provolone", price: 5.99 },
      { name: "Healthy Breakfast Box", description: "Scrambled eggs, bacon, cheese, and roasted veggies", price: 9.07 },
    ],
  },
];

const format = (num) => num.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function FrenchMarketOrderLandingPage() {
  const [cart, setCart] = useState({});
  const [customer, setCustomer] = useState({ name: "", phone: "", pickupTime: "", notes: "" });

  const flatItems = useMemo(() => menuSections.flatMap((section) => section.items.map((item) => ({ ...item, section: section.title }))), []);
  const cartLines = Object.entries(cart).map(([name, quantity]) => {
    const item = flatItems.find((i) => i.name === name);
    return { ...item, quantity, lineTotal: item.price * quantity };
  });
  const subtotal = cartLines.reduce((sum, item) => sum + item.lineTotal, 0);

  const addItem = (name) => setCart((current) => ({ ...current, [name]: (current[name] || 0) + 1 }));
  const removeItem = (name) => setCart((current) => {
    const next = { ...current };
    if (!next[name] || next[name] === 1) delete next[name];
    else next[name] -= 1;
    return next;
  });

  const orderText = encodeURIComponent(
    `New Breakfast Order%0A%0AName: ${customer.name}%0APhone: ${customer.phone}%0APickup Time: ${customer.pickupTime}%0A%0AItems:%0A${cartLines
      .map((item) => `- ${item.quantity}x ${item.name} — ${format(item.lineTotal)}`)
      .join("%0A")}%0A%0ASubtotal: ${format(subtotal)}%0ANotes: ${customer.notes || "None"}`
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-950">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-950 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
              <Clock className="h-4 w-4" /> Breakfast Bar • 7AM–12PM
            </div>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">Order breakfast from Suarez Market.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50">Bagels, wraps, coffee, daily specials, and breakfast boxes made simple for pickup orders.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#menu" className="rounded-2xl bg-white px-6 py-3 font-bold text-emerald-950 shadow-lg transition hover:scale-105">Start Order</a>
              <a href="#cart" className="rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-white shadow-lg transition hover:scale-105">View Cart</a>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white/10 p-6 shadow-2xl ring-1 ring-white/15 backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-6 text-stone-950">
              <Coffee className="mb-4 h-10 w-10 text-emerald-700" />
              <h2 className="text-3xl font-black">Today’s quick picks</h2>
              <div className="mt-6 space-y-4">
                {flatItems.slice(0, 5).map((item) => (
                  <button key={item.name} onClick={() => addItem(item.name)} className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-4 text-left transition hover:border-emerald-600 hover:bg-emerald-50">
                    <span className="font-bold">{item.name}</span>
                    <span className="font-black text-emerald-700">{format(item.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_380px] lg:px-10" id="menu">
        <div className="space-y-8">
          {menuSections.map((section) => (
            <section key={section.title} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-stone-200">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-emerald-800">{section.title}</h2>
                  <p className="mt-1 font-semibold text-stone-500">{section.subtitle}</p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {section.items.map((item) => (
                  <div key={item.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-black">{item.name}</h3>
                        {item.description && <p className="mt-1 text-sm text-stone-600">{item.description}</p>}
                      </div>
                      <p className="font-black text-emerald-700">{format(item.price)}</p>
                    </div>
                    <button onClick={() => addItem(item.name)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 font-bold text-white transition hover:bg-emerald-800">
                      <Plus className="h-4 w-4" /> Add to Order
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside id="cart" className="h-fit rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-stone-200 lg:sticky lg:top-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-black"><ShoppingCart className="h-6 w-6 text-emerald-700" /> Your Order</h2>
            {cartLines.length > 0 && <button onClick={() => setCart({})} className="text-sm font-bold text-stone-500 hover:text-red-600"><Trash2 className="inline h-4 w-4" /> Clear</button>}
          </div>

          <div className="mt-5 space-y-3">
            {cartLines.length === 0 ? (
              <p className="rounded-2xl bg-stone-50 p-4 text-stone-500">Add items from the menu to start an order.</p>
            ) : cartLines.map((item) => (
              <div key={item.name} className="rounded-2xl bg-stone-50 p-4">
                <div className="flex justify-between gap-3">
                  <p className="font-bold">{item.name}</p>
                  <p className="font-black">{format(item.lineTotal)}</p>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button onClick={() => removeItem(item.name)} className="rounded-full bg-white p-2 ring-1 ring-stone-200"><Minus className="h-4 w-4" /></button>
                  <span className="font-black">{item.quantity}</span>
                  <button onClick={() => addItem(item.name)} className="rounded-full bg-white p-2 ring-1 ring-stone-200"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="my-5 border-t border-stone-200 pt-5">
            <div className="flex justify-between text-xl font-black"><span>Subtotal</span><span>{format(subtotal)}</span></div>
            <p className="mt-2 text-sm text-stone-500">Add-ons may incur an additional charge.</p>
          </div>

          <div className="space-y-3">
            <input className="w-full rounded-xl border border-stone-200 px-4 py-3" placeholder="Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
            <input className="w-full rounded-xl border border-stone-200 px-4 py-3" placeholder="Phone number" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
            <input className="w-full rounded-xl border border-stone-200 px-4 py-3" placeholder="Pickup time" value={customer.pickupTime} onChange={(e) => setCustomer({ ...customer, pickupTime: e.target.value })} />
            <textarea className="min-h-24 w-full rounded-xl border border-stone-200 px-4 py-3" placeholder="Special instructions" value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })} />
          </div>

          <a href={`mailto:orders@example.com?subject=New Breakfast Order&body=${orderText}`} className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-center font-black text-white shadow-lg transition ${cartLines.length ? "bg-emerald-700 hover:bg-emerald-800" : "pointer-events-none bg-stone-300"}`}>
            <Send className="h-5 w-5" /> Submit Order
          </a>
          <p className="mt-3 text-center text-xs text-stone-500">Replace orders@example.com with your restaurant order email before publishing.</p>
        </aside>
      </main>

      <footer className="border-t border-stone-200 bg-white px-6 py-8 text-center text-stone-600">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 text-sm font-semibold">
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Chicago French Market</span>
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> Breakfast: 7AM–12PM</span>
          <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> Call for availability</span>
        </div>
      </footer>
    </div>
  );
}
