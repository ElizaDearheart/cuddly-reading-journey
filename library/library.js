//LIBRARY
const myLibrary = [];

//BOOK CONSTRUCTOR
function Book(title, author, pages, have_read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.have_read = have_read;
  this.info = function () {
    return `${this.title}, ${this.author}, ${this.pages}, ${this.have_read}`;
  };
}

// let bookCard = document.getElementById("card");

//BOOK MODAL
const dialog = document.querySelector("dialog");
const addBookButton = document.getElementById("add-book");
const closeButton = document.getElementById("close");

//open modal
addBookButton.onclick = function () {
  dialog.style.display = "grid";
};
//close modal button
closeButton.onclick = function () {
  dialog.style.display = "none";
};

//ADD BOOKS TO LIBRARY
const bookCardContainer = document.getElementById("book-cards");
function addBookToLibrary() {
  // modal form submission
  document
    .getElementById("add-book-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const pages = document.getElementById("pages").value;
      const haveReadGroup = document.getElementsByName("have-read");
      const checkedRadio = Array.from(haveReadGroup).find(
        (radio) => radio.checked,
      );
      const have_read = checkedRadio.value;

      const book = new Book(title, author, pages, have_read);

      myLibrary.push(book);

      function addBookCard() {
        const bookDiv = document.createElement("div");
        bookDiv.id = "card";
        const bookTitle = document.createElement("h3");
        bookTitle.textContent = book.title;
        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = book.author;
        const bookPages = document.createElement("p");
        bookPages.textContent = book.pages;
        const haveRead = document.createElement("p");
        haveRead.textContent = book.have_read;

        // bookDiv.textContent = book;
        // let container = document.getElementById("card");
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(haveRead);
        bookCardContainer.appendChild(bookDiv);
      }

      addBookCard();

      function clearAllInputs() {
        const allInputs = document.querySelectorAll('input[type="text"]');
        allInputs.forEach((singleInput) => (singleInput.value = ""));
      }

      const radioButtons = document.querySelectorAll('input[type="radio"]');
      function resetRadio() {
        for (const radioButton of radioButtons) {
          radioButton.checked = false;
        }
      }

      console.log(myLibrary);
      clearAllInputs();
      resetRadio();
      dialog.style.display = "none";
    });
}

addBookToLibrary();

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet');
// const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', '480 pages', 'read');
// const hamlet = new Book('Hamlet', 'William Shakespeare', '400 pages', 'read');
