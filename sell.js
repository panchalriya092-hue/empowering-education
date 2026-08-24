document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // Require Login Before Access
    // =========================
    if (!isLoggedIn()) {
        alert("You must login to sell a book!");
        window.location.href = "login.html";
        return; // Stop loading the page further
    }
    const sellForm = document.getElementById("sellForm");
    const category = document.getElementById("category");
    const customCategoryBox = document.getElementById("customCategoryBox");
    const customCategory = document.getElementById("customCategory");

    // Show custom category input if "Other" selected
    if (category && customCategoryBox && customCategory) {
        category.addEventListener("change", function () {
            if (this.value === "other") {
                customCategoryBox.classList.remove("d-none");
                customCategory.required = true;
            } else {
                customCategoryBox.classList.add("d-none");
                customCategory.required = false;
                customCategory.value = "";
            }
        });
    }

    // Form submission
    if (sellForm) {
        sellForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const bookName = document.getElementById("bookName").value.trim();
            const authorName = document.getElementById("authorName").value.trim();
            const condition = document.getElementById("condition").value;
            const categoryVal = document.getElementById("category").value;
            const price = document.getElementById("price").value;
            const image = document.getElementById("bookImage").files[0];

            // Validation
            if (!image || !bookName || !authorName || !condition || !categoryVal || !price) {
                alert("Please fill all required fields");
                return;
            }

            if (categoryVal === "other") {
                const customCat = document.getElementById("customCategory").value.trim();
                if (!customCat) {
                    alert("Please specify the custom category");
                    return;
                }
            }
            let sellRecords = JSON.parse(localStorage.getItem("sellDB")) || [];
            const loggedUser = JSON.parse(localStorage.getItem("currentUser"));

            sellRecords.push({
                title: bookName,
                author: authorName,
                condition: condition,
                category: categoryVal === "other"
                    ? document.getElementById("customCategory").value.trim()
                    : categoryVal,
                price: Number(price),
                sellerId: loggedUser.id,
                sellerName: loggedUser.name,
                sellerEmail: loggedUser.email,

                date: new Date().toLocaleString()
            });

            localStorage.setItem("sellDB", JSON.stringify(sellRecords));


            // Show success modal
            const successModal = new bootstrap.Modal(document.getElementById("successModal"));
            successModal.show();

            // Reset form
            sellForm.reset();
            customCategoryBox.classList.add("d-none");
        });
    }

});