// contact.js - Contact Form Logic

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const successAlert = document.getElementById("successAlert");

    if (!contactForm) return; 
    
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validation
        if (!fullName || !email || !subject || !message) {
            alert("Please fill in all fields");
            return;
        }
  
        if (!email.includes("@")) {
            alert("Please enter a valid email address");
            return;
        }

        // Show success alert
        successAlert.classList.remove("d-none");

        // Reset form
        contactForm.reset();

        // Auto-hide alert after 5 seconds
        setTimeout(() => {
            successAlert.classList.add("d-none");
        }, 5000);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});
