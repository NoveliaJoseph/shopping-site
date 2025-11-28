// products.js

// ---------- LOAD PRODUCTS ON SHOP PAGE ----------
function loadProducts() {
  const productList = document.getElementById("productList");
  if (!productList) return;

  const products = JSON.parse(localStorage.getItem("products")) || [];

  productList.innerHTML = "";

  if (products.length === 0) {
    // Seed default products
    products = [
      {
        name: "Louis Vuitton Monogram Bag",
        price: "2499.99",
        desc: "Iconic monogram canvas handbag with gold hardware.",
        image: "images/lv_bag_1.png"
      },
      {
        name: "Louis Vuitton Tote Bag",
        price: "2899.99",
        desc: "Premium leather tote with signature design.",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80"
      },
      {
        name: "Louis Vuitton Crossbody",
        price: "1999.99",
        desc: "Elegant crossbody bag with gold chain strap.",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80"
      },
      {
        name: "Gucci Floral Dress",
        price: "3499.99",
        desc: "Exquisite designer dress with signature floral pattern.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80"
      },
      {
        name: "Gucci Bloom Perfume",
        price: "189.99",
        desc: "Luxury fragrance with floral notes.",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80"
      },
      {
        name: "Elegant Dress",
        price: "49.99",
        desc: "A beautiful evening dress for special occasions.",
        image: "images/dress.png"
      },
      {
        name: "Sporty Shoes",
        price: "79.99",
        desc: "High-performance running shoes.",
        image: "images/shoes.png"
      },
      {
        name: "Luxury Watch",
        price: "129.99",
        desc: "A timeless classic watch.",
        image: "images/watch.png"
      }
    ];
    localStorage.setItem("products", JSON.stringify(products));
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
    const imageFile = document.getElementById("image").files[0];

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const image = event.target.result;
      let products = JSON.parse(localStorage.getItem("products")) || [];

      products.push({ name, price, desc, image });
      localStorage.setItem("products", JSON.stringify(products));

      alert("Product added successfully!");
      window.location.href = "shop.html";
    };
    reader.readAsDataURL(imageFile);
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
  // document.getElementById("editImage").value = product.image; // Cannot set value of file input

  editForm.addEventListener("submit", function (e) {
    e.preventDefault();

    product.name = document.getElementById("editName").value.trim();
    product.price = document.getElementById("editPrice").value.trim();
    product.desc = document.getElementById("editDesc").value.trim();

    const imageFile = document.getElementById("editImage").files[0];

    const saveProduct = () => {
      products[productIndex] = product;
      localStorage.setItem("products", JSON.stringify(products));

      alert("Product updated successfully!");
      window.location.href = "shop.html";
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        product.image = event.target.result;
        saveProduct();
      };
      reader.readAsDataURL(imageFile);
    } else {
      saveProduct();
    }
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
