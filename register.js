// =======================================================
// ENHANCED REGISTRATION WITH PROPER DBMS STRUCTURE
// =======================================================

document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    function generateUserId() {
    let lastId = Number(localStorage.getItem("lastUserId")) || 0;
    lastId++;
    localStorage.setItem("lastUserId", lastId);
    return lastId;
}

    function getUsersFromDB() {
        return JSON.parse(localStorage.getItem("users")) || [];
    }

    function saveUsersToDB(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    if (registerForm) {

        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("regEmail").value.trim();
            const password = document.getElementById("regPassword").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();

            // ========================
            // Required Field Validation
            // ========================
            if (!name || !email || !password || !confirmPassword) {
                alert("All fields are required");
                return;
            }

            // ========================
            // Email Validation
            // ========================
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address (e.g., example@domain.com)");
                return;
            }

            // ========================
            // Password Match Check
            // ========================
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            // ========================
            // Password Length
            // ========================
            if (password.length < 6) {
                alert("Password must be at least 6 characters long");
                return;
            }

            // ========================
            // First Character Must Be Capital
            // ========================
            const firstChar = password.charAt(0);

            if (!/[A-Z]/.test(firstChar)) {
                alert("Password must start with a capital letter (A-Z)");
                return;
            }

            // ========================
            // Password Strength Check
            // ========================
            const hasLetter = /[a-zA-Z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

            if (!hasLetter) {
                alert("Password must contain at least one letter");
                return;
            }

            if (!hasNumber) {
                alert("Password must contain at least one number");
                return;
            }

            if (!hasSpecialChar) {
                alert("Password must contain at least one special character (!@#$ etc.)");
                return;
            }

            let users = getUsersFromDB();

            // CHECK UNIQUE EMAIL (UNIQUE CONSTRAINT)
            const existingUser = users.find(function (user) {
                return user.email === email;
            });

            if (existingUser) {
                alert("Email already registered. Please login.");
                return;
            }

            // CREATE NEW USER RECORD (TABLE ROW)
            const newUser = {
                id: generateUserId(users), 
                email: email,
                password: password,
                registeredDate: new Date().toISOString(),
                status: "Active"
            };

            // INSERT OPERATION (CREATE)
            users.push(newUser);

            // SAVE TABLE
            saveUsersToDB(users);

            console.log("DB TABLE (Users):", users);

            alert("Registration Successful! Welcome, " + name);

            setTimeout(function () {
                window.location.href = "login.html";
            }, 1500);

        });

    }

});
