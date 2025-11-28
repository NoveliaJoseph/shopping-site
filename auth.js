// auth.js

// ---------- REGISTER ----------
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      alert("User with this email already exists!");
      return;
    }

    // Add new user
    users.push({ name, email, password, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now login.");
    window.location.href = "login.html";
  });
}

// ---------- LOGIN ----------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    // Save logged-in user in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert(`Welcome, ${user.name}!`);
    window.location.href = "index.html";
  });
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
