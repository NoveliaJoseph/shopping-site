// Registration
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let cpass = document.getElementById("confirmPassword").value;

    if (pass !== cpass) {
        alert("Passwords do not match!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.email === email)) {
        alert("Email already registered!");
        return;
    }

    users.push({
        id: Date.now(),
        name,
        email,
        password: pass
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered Successfully!");
    window.location.href = "login.html";
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === pass);

    if (!user) {
        alert("Invalid Credentials!");
        return;
    }

    localStorage.setItem("loggedInUser", email);
    window.location.href = "index.html";
});
