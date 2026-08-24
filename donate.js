// donate.js - Donate Page Functionality

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // Require Login Before Access
    // =========================
    if (!isLoggedIn()) {
        alert("You must login to donate a book!");
        window.location.href = "login.html";
        return; // Stop loading the page
    }

    // =========================
    // Donated Books Data (sample)
    // =========================
    const donatedBooks = [
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        condition: "Good",
        donatedBy: "Rahul Sharma",
        img: "Algorithms _ A Top-Down Approach.jpg"
      },
      {
        title: "Physics for Scientists",
        author: "Paul A. Tipler",
        condition: "Like New",
        donatedBy: "Priya Patel",
        img: "Book Cover Design ( Physics) - Ahmed Hashish.jpg"
      },
      {
        title: "Engineering Mathematics",
        author: "BS Grewal",
        condition: "Good",
        donatedBy: "Amit Kumar",
        img: "Math symbols Photos - Download Free High-Quality Pictures _ Freepik.jpg"
      }
    ];

    // =========================
    // Display Donated Books
    // =========================
    function displayDonatedBooks() {
        const container = document.getElementById('donatedBooksContainer');
        if (!container) return;

        container.innerHTML = '';

        donatedBooks.forEach(book => {
            const conditionClass = {
                'New': 'bg-success',
                'Like New': 'bg-info',
                'Good': 'bg-primary',
                'Fair': 'bg-warning',
                'Old': 'bg-secondary'
            }[book.condition] || 'bg-secondary';

            container.innerHTML += `
                <div class="col-md-4 mb-4">
                  <div class="card h-100 shadow-sm">
                    <img src="${book.img}" class="card-img-top" alt="${book.title}" style="height:450px; object-fit:cover;">
                    <div class="card-body">
                      <h6 class="fw-bold mb-2">${book.title}</h6>
                      <p class="text-muted small mb-2">by ${book.author}</p>
                      <div class="d-flex justify-content-between mb-2">
                        <span class="badge ${conditionClass}">${book.condition}</span>
                        <span class="badge bg-success">Free</span>
                      </div>
                      <p class="small text-muted mb-3">
                        <i class="fa-solid fa-user me-1"></i>${book.donatedBy}
                      </p>
                      <button class="btn btn-outline-success btn-sm w-100" onclick="requestBook('${book.title}')">
                        <i class="fa-solid fa-hand-holding-heart me-2"></i>Request
                      </button>
                    </div>
                  </div>
                </div>
            `;
        });
    }

    // =========================
    // Request Book
    // =========================
 function requestBook(bookTitle) {
    const loggedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!loggedUser) {
        alert("You must be logged in to request a book!");
        return;
    }

    let requestRecords = JSON.parse(localStorage.getItem("requestDB")) || [];

    requestRecords.push({
        book: bookTitle,
        requesterId: loggedUser.id,
        requesterName: loggedUser.name,
        requesterEmail: loggedUser.email,
        requestDate: new Date().toLocaleString(),
        status: "Pending"
    });

    localStorage.setItem("requestDB", JSON.stringify(requestRecords));

    let modal = new bootstrap.Modal(document.getElementById('requestModal'));
    modal.show();
}

window.requestBook = requestBook;


    // =========================
    // Category Selection
    // =========================
    function setupCategorySelection() {
        const category = document.getElementById('category');
        const customCategoryBox = document.getElementById('customCategoryBox');
        const customCategory = document.getElementById('customCategory');

        if (category && customCategoryBox && customCategory) {
            category.addEventListener('change', function() {
                if (this.value === 'other') {
                    customCategoryBox.classList.remove('d-none');
                    customCategory.required = true;
                } else {
                    customCategoryBox.classList.add('d-none');
                    customCategory.required = false;
                    customCategory.value = '';
                }
            });
        }
    }

    // =========================
    // Form Submission
    // =========================
 function setupFormSubmission() {
    const donateForm = document.getElementById('donateForm');

    if (donateForm) {
        donateForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const bookName = document.getElementById('bookName').value.trim();
            const authorName = document.getElementById('authorName').value.trim();
            const condition = document.getElementById('condition').value;
            const category = document.getElementById('category').value;
            const image = document.getElementById('bookImage').files[0];

            if (!image || !bookName || !authorName || !condition || !category) {
                alert('Please fill all required fields');
                return;
            }

            if (category === 'other') {
                const customCat = document.getElementById('customCategory').value.trim();
                if (!customCat) {
                    alert('Please specify the custom category');
                    return;
                }
            }

            
           const loggedUser = JSON.parse(localStorage.getItem("currentUser"));


            if (!loggedUser) {
                alert("User not found. Please login again.");
                return;
            }

            // Get existing donate DB
            let donateRecords = JSON.parse(localStorage.getItem("donateDB")) || [];

            // ush new donation
            donateRecords.push({

                title: bookName,
                author: authorName,
                condition: condition,
                category: category === "other"
                    ? document.getElementById("customCategory").value.trim()
                    : category,

                donorId: loggedUser.id,     
                donorName: loggedUser.name,
                donorEmail: loggedUser.email,

                date: new Date().toLocaleString(),
                status: "Available"
            });

            localStorage.setItem("donateDB", JSON.stringify(donateRecords));

            // Show success modal
            new bootstrap.Modal(document.getElementById('successModal')).show();

            // Reset form
            donateForm.reset();
            document.getElementById('customCategoryBox').classList.add('d-none');
        });
    }
}


    // =========================
    // Initialize Everything
    // =========================
    displayDonatedBooks();
    setupCategorySelection();
    setupFormSubmission();

});
