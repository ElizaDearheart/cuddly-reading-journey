//LIBRARY
const myLibrary = [];

let book;
const bookCardContainer = document.getElementById("book-cards");

//BOOK CONSTRUCTOR
function Book(title, author, pages, have_read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.have_read = Boolean(have_read);
  this.info = function () {
    return `${this.title}, ${this.author}, ${this.pages}, ${this.have_read}`;
  };
}

Book.prototype.click = function () {
  this.have_read = !this.have_read;
};

// CHECK FOR EMPTY LIBRARY
const emptyLibraryContainer = document.getElementById("card-parent");
const emptyLibraryMessage = document.createElement("h1");

function emptyLibrary() {
  if (bookCardContainer.children.length == 0) {
    emptyLibraryMessage.textContent =
      "Looks like your library is empty.  Add books to get started!";
    emptyLibraryContainer.appendChild(emptyLibraryMessage);
  }
  if (bookCardContainer.children.length >= 1) {
    emptyLibraryMessage.remove();
  }
}

//HAVE_READ
let have_read;
function selectHaveRead() {
  document.getElementById("have-read").addEventListener("click", function () {
    have_read = true;
    document.getElementById("result").textContent = have_read;
  });
  document
    .getElementById("have-not-read")
    .addEventListener("click", function () {
      have_read = false;
      document.getElementById("result").textContent = have_read;
    });
  console.log(have_read);
}

//BOOK MODAL
const addBookModal = document.getElementById("add-book-modal");
const addBookButton = document.getElementById("add-book");
const closeButton = document.getElementById("close-book-modal");

//open modal
// selectHaveRead() must be called here, when modal is initialized
addBookButton.onclick = function () {
  addBookModal.style.display = "grid";
  selectHaveRead();
};
//close modal button
closeButton.onclick = function () {
  addBookModal.style.display = "none";
};

//clear modal functions
function clearAllInputs() {
  const textInputs = document.querySelectorAll('input[type="text"]');
  const numberInputs = document.querySelectorAll('input[type="number"]');
  textInputs.forEach((singleInput) => (singleInput.value = ""));
  numberInputs.forEach((singleInput) => (singleInput.value = ""));
}

//ADD BOOKS TO LIBRARY

function addBookToLibrary() {
  emptyLibrary();

  // modal form submission
  document
    .getElementById("add-book-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const pages = document.getElementById("pages").value;
      // add new book to library
      book = new Book(title, author, pages, have_read);
      myLibrary.push(book);
      const index = myLibrary.indexOf(book);

      console.log(book.have_read);

      // add card to page
      function createBookCard() {
        const bookDiv = document.createElement("div");
        bookDiv.id = "card";
        bookDiv.dataset.id = Math.random().toString(36).substring(5, 22);
        const bookTitle = document.createElement("h3");
        bookTitle.textContent = "Title: " + book.title;
        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = "Author: " + book.author;
        const bookPages = document.createElement("p");
        bookPages.textContent = "Number of Pages: " + book.pages;
        const readStatus = document.createElement("p");
        readStatus.id = "read-status";
        readStatus.className = "read-status";

        if (book.have_read == true) {
          readStatus.textContent = "Read it!";
        }
        if (book.have_read == false) {
          readStatus.textContent = "The anticipation is real.";
        }

        //BUTTON GROUP

        const cardButtonDiv = document.createElement("div");
        cardButtonDiv.id = "card-button-group";
        //update read status
        const readStatusButton = document.createElement("button");
        readStatusButton.textContent = "RS";
        //TODO: Add image
        readStatusButton.id = "read-status";
        cardButtonDiv.appendChild(readStatusButton);

        readStatusButton.addEventListener("click", () => {
          book.click();
          document.getElementById("read-status");
          if (book.have_read == true) {
            readStatus.textContent = "Read it!";
          }
          if (book.have_read == false) {
            readStatus.textContent = "The anticipation is real.";
          }
          console.log(myLibrary);
        });

        //share button
        const shareButton = document.createElement("button");
        //TODO: add image for button
        shareButton.id = "share-button";
        cardButtonDiv.appendChild(shareButton);

        //delete button
        const deleteBookButton = document.createElement("button");
        deleteBookButton.innerHTML =
          '<img src="/Users/jordan/Odin_JS/repos/cuddly-reading-journey/images/delete-outline.svg"/>';
        deleteBookButton.id = "delete-button";
        cardButtonDiv.appendChild(deleteBookButton);
        //delete book card function
        deleteBookButton.addEventListener("click", () => {
          bookDiv.remove();
          if (index > -1) {
            myLibrary.splice(index, 1);
          }
          emptyLibrary();
          console.log(myLibrary);
        });

        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(readStatus);
        bookDiv.appendChild(cardButtonDiv);
        bookCardContainer.appendChild(bookDiv);
      }

      createBookCard();
      emptyLibrary();
      clearAllInputs();
      addBookModal.style.display = "none";
      console.log(myLibrary);
    });
}

addBookToLibrary();

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet');
// const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', '480 pages', 'read');
// const hamlet = new Book('Hamlet', 'William Shakespeare', '400 pages', 'read');
