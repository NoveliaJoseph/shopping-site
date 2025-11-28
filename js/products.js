// products.js

// ---------- LOAD PRODUCTS ON SHOP PAGE ----------
function loadProducts() {
  const productList = document.getElementById("productList");
  if (!productList) return;

  const products = JSON.parse(localStorage.getItem("products")) || [];

  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<p class='text-center'>No products available.</p>";
    return;
  }

  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-md-4", "mb-4");
    productCard.innerHTML = `
      <div class="card shadow-sm">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price}</p>
          <button class="btn btn-primary w-100" onclick="addToCart(${index})">Add to Cart</button>
        </div>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

// ---------- ADD PRODUCT (ADMIN) ----------
const addProductForm = document.getElementById("addProductForm");
if (addProductForm) {
  addProductForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("pname").value.trim();
    const price = document.getElementById("price").value.trim();
    const desc = document.getElementById("desc").value.trim();
    const image = document.getElementById("image").value.trim();

    let products = JSON.parse(localStorage.getItem("products")) || [];

    products.push({ name, price, desc, image });
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product added successfully!");
    window.location.href = "shop.html";
  });
}

// ---------- LOAD PRODUCT DATA ON EDIT PAGE ----------
function loadEditProduct() {
  const editForm = document.getElementById("editProductForm");
  if (!editForm) return;

  const productIndex = localStorage.getItem("editProductIndex");
  if (productIndex === null) {
    alert("No product selected for editing!");
    window.location.href = "shop.html";
    return;
  }

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products[productIndex];

  document.getElementById("editName").value = product.name;
  document.getElementById("editPrice").value = product.price;
  document.getElementById("editDesc").value = product.desc;
  document.getElementById("editImage").value = product.image;

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();

    product.name = document.getElementById("editName").value.trim();
    product.price = document.getElementById("editPrice").value.trim();
    product.desc = document.getElementById("editDesc").value.trim();
    product.image = document.getElementById("editImage").value.trim();

    products[productIndex] = product;
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product updated successfully!");
    window.location.href = "shop.html";
  });
}

// ---------- DELETE PRODUCT ----------
function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  if (!confirm(`Are you sure you want to delete "${products[index].name}"?`)) return;
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

// ---------- ADD TO CART (FROM SHOP) ----------
function addToCart(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products[index];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product already in cart
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
