// ---------- DEFAULT ADMIN ACCOUNT ----------
let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
const adminExists = existingUsers.some(user => user.email === "admin@gmail.com");
if (!adminExists) {
  existingUsers.push({ name: "Admin", email: "admin@gmail.com", password: "admin123", role: "admin" });
  localStorage.setItem("users", JSON.stringify(existingUsers));
}

// ---------- REGISTER ----------
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Check password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

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

    alert("Registration successful! Welcome.");
    
    // Redirect to Home page
    window.location.replace("index.html");
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

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert(`Welcome, ${user.name}!`);

    // Redirect to Home page
    window.location.replace("index.html");
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
    window.location.replace("login.html");
  }
}
