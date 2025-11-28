// script.js
const statusEl = document.getElementById("status");
const productsEl = document.getElementById("products");

async function loadProducts() {
  try {
    statusEl.textContent = "Fetching products...";
    const res = await fetch('/product/get'); // hits /product/get on same origin
    if (!res.ok) {
      const err = await res.json().catch(()=>({message: res.statusText}));
      statusEl.textContent = `Error: ${err.message || res.statusText}`;
      return;
    }
    const products = await res.json();
    statusEl.textContent = `Loaded ${products.length} product(s).`;
    productsEl.innerHTML = "";
    products.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name} — ₹${p.price} — ${p.category || 'general'}`;
      productsEl.appendChild(li);
    });
  } catch (error) {
    statusEl.textContent = `Network error: ${error.message}`;
  }
}

loadProducts();
