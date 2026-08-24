// =======================================================
// ENHANCED LOGIN FUNCTIONALITY 
// =======================================================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    // READ USERS TABLE
    function getUsersFromDB() {
        return JSON.parse(localStorage.getItem("users")) || [];
    }

    // UPDATE USERS TABLE
    function saveUsersToDB(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // =========================
            // Required Field Validation
            // =========================
            if (!email || !password) {
                alert("Please enter both email and password");
                return;
            }

            // =========================
            // Email Validation
            // =========================
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address");
                return;
            }

            const users = getUsersFromDB();

            if (users.length === 0) {
                alert("No users registered yet. Please register first.");
                setTimeout(function () {
                    window.location.href = "register.html";
                }, 1000);
                return;
            }

            // =========================
            // FIND USER 
            // =========================
            const user = users.find(function (u) {
                return u.email.toLowerCase() === email.toLowerCase();
            });

            if (!user) {
                alert("No account found with this email.");
                return;
            }

            // =========================
            // ACCOUNT STATUS CHECK (DB FIELD)
            // =========================
            if (user.status && user.status !== "Active") {
                alert("Your account is not active.");
                return;
            }

            // =========================
            // PASSWORD CHECK
            // =========================
            if (user.password !== password) {
                alert("Incorrect password. Please try again.");
                return;
            }

            // =========================
            // UPDATE LAST LOGIN 
            // =========================
            user.lastLogin = new Date().toISOString();

            saveUsersToDB(users);

            // =========================
            // SESSION MANAGEMENT 
            // =========================
            localStorage.setItem("currentUser", JSON.stringify(user));

            alert("Login Successful! Welcome back, " + user.name + "!");

            setTimeout(function () {
                window.location.href = "index.html";
            }, 1000);

        });

    }

});
