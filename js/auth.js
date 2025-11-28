// Registration
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = name.value;
    let email = email.value;
    let pass = password.value;
    let cpass = confirmPassword.value;

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

    let email = loginEmail.value;
    let pass = loginPassword.value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === pass);

    if (!user) {
        alert("Invalid Credentials!");
        return;
    }

    localStorage.setItem("loggedInUser", email);
    window.location.href = "index.html";
});
