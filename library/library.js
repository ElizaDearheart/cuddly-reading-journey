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

// CHECK FOR EMPTY LIBRARY
const emptyLibraryContainer = document.getElementById("card-parent");
const emptyLibraryMessage = document.createElement("h1");
// TODO: Find new font //

function emptyLibrary() {
  if (myLibrary.length == 0) {
    emptyLibraryMessage.textContent =
      "Looks like your library is empty.  Add books to get started!";
    emptyLibraryContainer.appendChild(emptyLibraryMessage);
  }
}

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

//clear modal functions
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

//ADD BOOKS TO LIBRARY
const bookCardContainer = document.getElementById("book-cards");

function addBookToLibrary() {
  // modal form submission
  document
    .getElementById("add-book-form")
    //TODO Update form to have form controls:  number for pages, etc)
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
      // add new book to library
      const book = new Book(title, author, pages, have_read);
      myLibrary.push(book);
      // add card to page
      function addBookCard() {
        //book info
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
        //delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.id = "delete-button";
        deleteButton.addEventListener("click", () => {
          bookDiv.remove();
          const index = myLibrary.indexOf(book);
          if (index > -1) {
            myLibrary.splice(index, 1);
          }

          console.log(myLibrary);
        });

        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(haveRead);
        bookDiv.appendChild(deleteButton);
        bookCardContainer.appendChild(bookDiv);
      }

      addBookCard();
      clearAllInputs();
      resetRadio();
      dialog.style.display = "none";
    });
}

emptyLibrary();
addBookToLibrary();

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet');
// const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', '480 pages', 'read');
// const hamlet = new Book('Hamlet', 'William Shakespeare', '400 pages', 'read');
