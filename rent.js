document.addEventListener('DOMContentLoaded', function() {
  
 if (!isLoggedIn()) {
        alert("You must login to rent a book!");
        window.location.href = "login.html";
        return; // Stop loading the page
    }
// Rent books data
const rentBooks = [
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "computer",
    condition: "Good",
    price: 150,
    duration: "30 Days",
    owner: "Rahul Sharma",
    img: "Algorithms _ A Top-Down Approach.jpg"
  },
  {
    title: "Physics for Scientists",
    author: "Paul A. Tipler",
    category: "science",
    condition: "Like New",
    price: 120,
    duration: "30 Days",
    owner: "Priya Patel",
    img: "Book Cover Design ( Physics) - Ahmed Hashish.jpg"
  },
  {
    title: "Engineering Mathematics",
    author: "BS Grewal",
    category: "engineering",
    condition: "Good",
    price: 100,
    duration: "30 Days",
    owner: "Amit Kumar",
    img: "Math symbols Photos - Download Free High-Quality Pictures _ Freepik.jpg"
  },
  {
    title: "Organic Chemistry",
    author: "Morrison & Boyd",
    category: "science",
    condition: "Fair",
    price: 80,
    duration: "15 Days",
    owner: "Sneha Desai",
    img: "Free Download Organic Chemistry (10th Edition) By Francis A_ Carey and Robert M. Giuliano _ Chemistry.Com.Pk"
  },
  {
    title: "Database Systems",
    author: "Elmasri & Navathe",
    category: "computer",
    condition: "Good",
    price: 140,
    duration: "30 Days",
    owner: "Vikram Singh",
    img: "Database Management System-simpleNeasyBook….jpg"
  },
  {
    title: "Business Studies",
    author: "NCERT",
    category: "commerce",
    condition: "Like New",
    price: 60,
    duration: "15 Days",
    owner: "Anjali Verma",
    img: "download (3).jpg"
  },
  {
    title: "Gray's Anatomy",
    author: "Henry Gray",
    category: "medical",
    condition: "Good",
    price: 200,
    duration: "60 Days",
    owner: "Dr. Sanjay Rao",
    img: "Amazon_com.jpg"
  },
  {
    title: "Data Structures in C",
    author: "Yashavant Kanetkar",
    category: "computer",
    condition: "Good",
    price: 90,
    duration: "30 Days",
    owner: "Karan Mehta",
    img: "In terms of the computer science and computer….jpg"
  },
  {
    title: "Financial Accounting",
    author: "TS Grewal",
    category: "commerce",
    condition: "Like New",
    price: 110,
    duration: "30 Days",
    owner: "Neha Agarwal",
    img: "Buchhaltung für Komplette Anfängeranleitung _ Buchhaltung, Jahresabschluss, Cash Flow, Budgetierung, Steuern und einfache Buchhaltungsfähigkeiten.jpg"
  }
];

// Display rent books
function displayRentBooks() {
  const container = document.getElementById('rentBooksContainer');
  if (!container) return;

  container.innerHTML = '';

  rentBooks.forEach(book => {
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
              <span class="badge bg-warning text-dark">&#8377;${book.price}/${book.duration}</span>
            </div>
            <p class="small text-muted mb-3">
              <i class="fa-solid fa-user me-1"></i>Owner: ${book.owner}
            </p>
            <button class="btn btn-warning btn-sm w-100" onclick="rentBook('${book.title}')">
              <i class="fa-solid fa-bookmark me-2"></i>Rent Now
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

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

// Rent book function
function rentBook(bookTitle) {

    const loggedUser = JSON.parse(localStorage.getItem("currentUser"));

    let rentRecords = JSON.parse(localStorage.getItem("rentDB")) || [];

    rentRecords.push({
        book: bookTitle,
        renterId: loggedUser.id,
        renterName: loggedUser.name,
        renterEmail: loggedUser.email,
        rentDate: new Date().toLocaleString(),
        status: "Not Returned"
    });

    localStorage.setItem("rentDB", JSON.stringify(rentRecords));

    let modal = new bootstrap.Modal(document.getElementById('rentSuccessModal'));
    modal.show();
}


window.rentBook = rentBook;   

// Form submission
function setupRentFormSubmission() {
  const rentForm = document.getElementById('rentForm');

  if (rentForm) {
    rentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const bookName = document.getElementById('bookName').value.trim();
      const authorName = document.getElementById('authorName').value.trim();
      const condition = document.getElementById('condition').value;
      const categoryVal = document.getElementById('category').value;
      const rentalPrice = document.getElementById('rentalPrice').value;
      const rentalDuration = document.getElementById('rentalDuration').value;
      const securityDeposit = document.getElementById('securityDeposit').value;
      const image = document.getElementById('bookImage').files[0];

      // Validation
      if (!image || !bookName || !authorName || !condition || !categoryVal || !rentalPrice || !rentalDuration || !securityDeposit) {
        alert('Please fill all required fields');
        return;
      }

      if (categoryVal === 'other') {
        const customCat = document.getElementById('customCategory').value.trim();
        if (!customCat) {
          alert('Please specify the custom category');
          return;
        }
      }

      // =========================
      // SAVE TO rentDB (DBMS Concept)
      // =========================
      let rentRecords1 = JSON.parse(localStorage.getItem("rentBOOKSdb")) || [];

      rentRecords1.push({
        title: bookName,
        author: authorName,
        condition: condition,
        category: categoryVal === "other"
          ? document.getElementById("customCategory").value.trim()
          : categoryVal,
        rentalPrice: Number(rentalPrice),
        rentalDuration: rentalDuration,
        securityDeposit: Number(securityDeposit),
        owner: getCurrentUser().name,
        ownerId: getCurrentUser().id, 
        date: new Date().toLocaleString(),
        status: "Available"
      });

      localStorage.setItem("rentBOOKSdb", JSON.stringify(rentRecords1));

      // Show success modal
      new bootstrap.Modal(document.getElementById('rentFormSuccessModal')).show();

      // Reset form
      rentForm.reset();
      document.getElementById('customCategoryBox').classList.add('d-none');
    });
  }
}

// Initialize

  displayRentBooks();
  setupCategorySelection();
  setupRentFormSubmission();
});