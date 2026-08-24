document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // Require Login Before Access
  // =========================
  if (!isLoggedIn()) {
    alert("You must login to buy books!");
    window.location.href = "login.html";
    return;
  }

  // If books not stored in DB, insert initial data
  if (!localStorage.getItem("booksDB")) {

    const books = [
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        price: 850,
        img: "Algorithms _ A Top-Down Approach.jpg",
        category: "Computer/IT",
        condition: "Like New",
        seller: "Rajesh Kumar",
        description: "Comprehensive guide to algorithms and data structures."
      },
      {
        title: "Engineering Mathematics",
        author: "BS Grewal",
        price: 450,
        img: "Math symbols Photos - Download Free High-Quality Pictures _ Freepik.jpg",
        category: "Engineering",
        condition: "Good",
        seller: "Priya Sharma",
        description: "Complete engineering mathematics textbook."
      },
      {
        title: "Grays Anatomy",
        author: "Henry Gray",
        price: 1200,
        img: "Amazon_com.jpg",
        category: "Medical",
        condition: "New",
        seller: "Dr. Amit Patel",
        description: "Brand new edition of the classic anatomy textbook."
      },
      {
        title: "Organic Chemistry",
        author: "Morrison & Boyd",
        price: 550,
        img: "Free Download Organic Chemistry (10th Edition) By Francis A_ Carey and Robert M. Giuliano _ Chemistry.Com.Pk",
        category: "Science",
        condition: "Like New",
        seller: "Sneha Desai",
        description: "Detailed organic chemistry textbook."
      },
      {
        title: "Database Management Systems",
        author: "Elmasri & Navathe",
        price: 600,
        img: "Database Management System-simpleNeasyBook….jpg",
        category: "Computer/IT",
        condition: "Good",
        seller: "Vikram Singh",
        description: "Comprehensive DBMS textbook."
      },
      {
        title: "Business Studies",
        author: "NCERT",
        price: 200,
        img: "download (3).jpg",
        category: "Commerce",
        condition: "Good",
        seller: "Anjali Verma",
        description: "NCERT business studies for class 12."
      },
      {
        title: "Physics for Scientists",
        author: "Serway & Jewett",
        price: 750,
        img: "Book Cover Design ( Physics) - Ahmed Hashish.jpg",
        category: "Science",
        condition: "Like New",
        seller: "Karan Mehta",
        description: "Complete physics textbook."
      },
      {
        title: "Data Structures in C",
        author: "Yashavant Kanetkar",
        price: 350,
        img: "In terms of the computer science and computer….jpg",
        category: "Computer/IT",
        condition: "Good",
        seller: "Rohit Joshi",
        description: "Learn data structures with C."
      },
      {
        title: "Fundamentals of Electrical Engineering",
        author: "Charles Alexander",
        price: 680,
        img: "Electronic Engineering by Korbin Bowers _ Indigo Chapters.jpg",
        category: "Engineering",
        condition: "New",
        seller: "Sanjay Rao",
        description: "Electrical engineering fundamentals."
      },
      {
        title: "Financial Accounting",
        author: "TS Grewal",
        price: 380,
        img: "Buchhaltung für Komplette Anfängeranleitung _ Buchhaltung, Jahresabschluss, Cash Flow, Budgetierung, Steuern und einfache Buchhaltungsfähigkeiten.jpg",
        category: "Commerce",
        condition: "Like New",
        seller: "Neha Agarwal",
        description: "Comprehensive accounting book."
      },
      {
        title: "The Art of Computer Programming",
        author: "Donald Knuth",
        price: 950,
        img: "Check out gauthp's new book cover from 99designs.jpg",
        category: "Computer/IT",
        condition: "Good",
        seller: "Arjun Reddy",
        description: "Classic computer science textbook."
      },
      {
        title: "Thermodynamics: An Engineering Approach",
        author: "Yunus Cengel",
        price: 720,
        img: "EBOOK.jpg",
        category: "Engineering",
        condition: "Like New",
        seller: "Deepak Kumar",
        description: "Thermodynamics textbook."
      }
    ];

    // Insert into DB
    localStorage.setItem("booksDB", JSON.stringify(books));
  }

  // Get books from DB
  const books = JSON.parse(localStorage.getItem("booksDB"));

  // =========================
  // Render Books Function
  // =========================
  function renderAllBooks() {
    const container = document.getElementById("bookContainer");
    if (!container) return;

    container.innerHTML = "";

    books.forEach((book) => {
      const conditionBadge = {
        "New": "bg-success",
        "Like New": "bg-info",
        "Good": "bg-primary",
        "Fair": "bg-warning",
        "Old": "bg-danger"
      }[book.condition] || "bg-secondary";

      container.innerHTML += `
            <div class="col-md-4 mb-4">
              <div class="card book-card h-100 shadow-sm">
                <img src="${book.img}" 
                     class="card-img-top" 
                     alt="${book.title}"
                     style="height: 450px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                  <h6 class="fw-bold mb-2">${book.title}</h6>
                  <p class="text-muted small mb-1">by ${book.author}</p>
                  <p class="text-muted small mb-2">${book.category}</p>
                  <span class="badge ${conditionBadge} mb-2 align-self-start">
                    ${book.condition}
                  </span>
                  <h5 class="text-primary fw-bold mt-auto mb-3">
                    ₹${book.price}
                  </h5>
                  <div class="d-grid gap-2">
                    <button class="btn btn-success btn-sm" onclick="quickBuy('${book.title}')">
                      <i class="fa-solid fa-shopping-cart me-2"></i>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            `;
    });
  }

  renderAllBooks();
});


// =========================
// Quick Buy Function (DBMS Purchase Record)
// =========================
function quickBuy(bookTitle) {

  if (!isLoggedIn()) {
    alert("You must login to buy books!");
    window.location.href = "login.html";
    return;
  }

  const books = JSON.parse(localStorage.getItem("booksDB"));
  const selectedBook = books.find(book => book.title === bookTitle);
  const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
  let purchases = JSON.parse(localStorage.getItem("purchaseDB")) || [];

  purchases.push({
    title: selectedBook.title,
    author: selectedBook.author,
    price: Number(selectedBook.price),
    buyerId: loggedUser.id,
    buyerName: loggedUser.name,
    buyerEmail: loggedUser.email,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("purchaseDB", JSON.stringify(purchases));

  const successModal = new bootstrap.Modal(document.getElementById("buySuccessModal"));
  successModal.show();
}
