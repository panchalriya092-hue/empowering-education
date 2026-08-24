// Common functionality for all pages

document.addEventListener("DOMContentLoaded", function() {
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    // Update navbar if user is logged in
    if (currentUser) {
        updateNavbarForLoggedInUser(currentUser);
    }
});

// Function to update navbar when user is logged in
function updateNavbarForLoggedInUser(user) {
    
    const authButtons = document.querySelector('.navbar .d-flex.gap-2');
    
    if (authButtons) {
        // Replace login/register buttons with user info and logout
        authButtons.innerHTML = `
            <span class="navbar-text me-3">
                <i class="fa-solid fa-user me-2"></i>
                Welcome, <strong>${user.name}</strong>
            </span>
            <button onclick="logout()" class="btn btn-danger">Logout</button>
        `;
    }
}

// Logout function
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        // Remove current user from localStorage
        localStorage.removeItem("currentUser");
        
        // Show message
        alert("Logged out successfully!");
        
        // Redirect to home page
        window.location.href = "index.html";
    }
}

// Function to check if user is logged in (can be used on any page)
function isLoggedIn() {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser !== null;
}

// Function to get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

// Function to require login (redirect to login if not logged in)
function requireLogin() {
    if (!isLoggedIn()) {
        alert("Please login to access this page");
        window.location.href = "login.html";
    }
}