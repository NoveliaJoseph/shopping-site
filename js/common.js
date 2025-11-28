// common.js

// ---------- NAVBAR ----------
function renderNavbar() {
  const navbarDiv = document.getElementById("navbar");
  if (!navbarDiv) return;

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  let navLinks = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="index.html">ShopSite</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
            <li class="nav-item"><a class="nav-link" href="cart.html">Cart</a></li>`;

  if (!user) {
    navLinks += `
            <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>`;
  } else {
    if (user.role === "admin") {
      navLinks += `
            <li class="nav-item"><a class="nav-link" href="add-product.html">Add Product</a></li>
            <li class="nav-item"><a class="nav-link" href="edit-product.html">Edit Product</a></li>`;
    }
    navLinks += `
            <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout (${user.name})</a></li>`;
  }

  navLinks += `
          </ul>
        </div>
      </div>
    </nav>`;

  navbarDiv.innerHTML = navLinks;
}

// ---------- LOGOUT ----------
function logout() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully!");
  window.location.href = "index.html";
}

// ---------- CHECK LOGIN ----------
function checkLogin() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    console.log("No user logged in");
  } else {
    console.log("Logged in user:", user.name);
  }
}

// ---------- CHECK ADMIN ----------
function checkAdmin() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || user.role !== "admin") {
    alert("You must be an admin to access this page!");
    window.location.href = "login.html";
  }
}

// ---------- RUN ON PAGE LOAD ----------
document.addEventListener("DOMContentLoaded", function () {
  renderNavbar();
});
