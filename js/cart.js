// cart.js

// ---------- LOAD CART ----------
function loadCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  if (!cartItemsDiv) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item, index) => {
    const cartCard = document.createElement("div");
    cartCard.classList.add("cart-item-card", "d-flex", "justify-content-between", "align-items-center");
    cartCard.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${item.image}" alt="${item.name}" class="me-3" style="width:80px; height:80px; object-fit:cover; border-radius:8px;">
        <div>
          <h5>${item.name}</h5>
          <p>$${item.price} x ${item.quantity}</p>
        </div>
      </div>
      <div>
        <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartItemsDiv.appendChild(cartCard);
  });

  // Optional: Show total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("text-end", "mt-3");
  totalDiv.innerHTML = `<h5>Total: $${total.toFixed(2)}</h5>`;
  cartItemsDiv.appendChild(totalDiv);
}

// ---------- REMOVE ITEM ----------
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!confirm(`Are you sure you want to remove "${cart[index].name}"?`)) return;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ---------- UPDATE QUANTITY ----------
function updateQuantity(index, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (quantity <= 0) {
    removeFromCart(index);
    return;
  }
  cart[index].quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ---------- CLEAR CART ----------
function clearCart() {
  if (confirm("Are you sure you want to clear the cart?")) {
    localStorage.removeItem("cart");
    loadCart();
  }
}
