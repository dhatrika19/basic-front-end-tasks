
const products = [
  {
    id:1,
    title:"Wireless Headphones",
    category:"Electronics", 
    price:300, 
    rating:4.5,
    img:"pic1.jpg" 
  },
  { 
    id:2, 
    title:"Coffee Maker", 
    category:"Home", 
    price:400, 
    rating:4.2, 
    img:"pic2.jpg" 
  },
  { id:3, 
    title:"T-Shirt (Blue)", 
    category:"Clothing", 
    price:350, 
    rating:4.0, 
    img:"pic3.jpg" 
  },
  { id:4, 
    title:"Smart Watch", 
    category:"Electronics", 
    price:850, 
    rating:4.7, 
    img:"pic4.jpg" 
  },
  { id:5, 
    title:"Blender", 
    category:"Home", 
    price:1050, 
    rating:3.9, 
    img:"pic5.jpg" 
  },
  { id:6, 
    title:"Denim Jacket", 
    category:"Clothing", 
    price:1200, 
    rating:4.6, 
    img:"pic6.jpg" 
  },
  { id:7, 
    title:"Bluetooth Speaker", 
    category:"Electronics", 
    price:500, 
    rating:4.1, 
    img:"pic7.jpg" 
  },
  { id:8, 
    title:"Floor Lamp", 
    category:"Home", 
    price:1400, 
    rating:4.3, 
    img:"pic8.jpg" 
  },
  { id:9, 
    title:"Sneakers", 
    category:"Clothing", 
    price:1500, 
    rating:4.4, 
    img:"pic9.jpg" 
  }
];

const productsGrid = document.getElementById('productsGrid');
const priceRange = document.getElementById('priceRange');
const priceVal = document.getElementById('priceVal');
const cats = Array.from(document.querySelectorAll('.cat'));
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.getElementById('searchInput');
const resetBtn = document.getElementById('resetBtn');
const resultsCount = document.getElementById('resultsCount');

// init price slider max from products
const maxPrice = Math.max(...products.map(p => p.price));
priceRange.max = Math.ceil(maxPrice / 10) * 10;
priceRange.value = priceRange.max;
priceVal.textContent = priceRange.value;

function render(list){
  productsGrid.innerHTML = '';
  if(!list.length){ productsGrid.innerHTML = '<p>No products found.</p>'; resultsCount.textContent = '0 products'; return; }
  resultsCount.textContent = `${list.length} product(s)`;
  list.forEach(p => {
    const card = document.createElement('div'); card.className='product';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" />
      <h3>${p.title}</h3>
      <p class="small muted">${p.category}</p>
      <div class="prod-meta">
        <div class="price">Rs ${p.price.toFixed(2)}</div>
        <div class="rating">${p.rating.toFixed(1)}</div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// apply filters & sorting
function applyFilters(){
  const selectedCats = cats.filter(c => c.checked).map(c=>c.value);
  const maxP = Number(priceRange.value);
  const q = searchInput.value.trim().toLowerCase();
  let filtered = products.filter(p => selectedCats.includes(p.category) && p.price <= maxP && (p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)));
  // sort
  const sort = sortSelect.value;
  if(sort === 'price-asc') filtered.sort((a,b)=>a.price-b.price);
  else if(sort === 'price-desc') filtered.sort((a,b)=>b.price-a.price);
  else if(sort === 'rating-desc') filtered.sort((a,b)=>b.rating-a.rating);
  else if(sort === 'rating-asc') filtered.sort((a,b)=>a.rating-b.rating);
  render(filtered);
}

// events
priceRange.addEventListener('input', () => { priceVal.textContent = priceRange.value; applyFilters(); });
cats.forEach(c => c.addEventListener('change', applyFilters));
sortSelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', debounce(applyFilters, 250));
resetBtn.addEventListener('click', () => {
  searchInput.value = ''; cats.forEach(c => c.checked = true); priceRange.value = priceRange.max; priceVal.textContent = priceRange.value; sortSelect.value = 'default'; applyFilters();
});

// simple debounce
function debounce(fn, wait=200){
  let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), wait); };
}

// initial render
applyFilters();
