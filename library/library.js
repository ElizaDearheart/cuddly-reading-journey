//LIBRARY
const myLibrary = [];
const bookCardContainer = document.getElementById("book-cards");

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

//BOOK MODAL
const addBookModal = document.getElementById("add-book-modal");
const addBookButton = document.getElementById("add-book");
const closeButton = document.getElementById("close-book-modal");

//open modal
addBookButton.onclick = function () {
  addBookModal.style.display = "grid";
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

const radioButtons = document.querySelectorAll('input[type="radio"]');
function resetRadio() {
  for (const radioButton of radioButtons) {
    radioButton.checked = false;
  }
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
      const haveReadGroup = document.getElementsByName("have-read");
      const checkedRadio = Array.from(haveReadGroup).find(
        (radio) => radio.checked,
      );
      let have_read = checkedRadio.value;
      // add new book to library
      const book = new Book(title, author, pages, have_read);
      myLibrary.push(book);
      console.log(book.have_read);
      // add card to page
      function addBookCard() {
        //book info
        const bookDiv = document.createElement("div");
        bookDiv.id = "card";
        const bookTitle = document.createElement("h3");
        bookTitle.textContent = "Title: " + book.title;
        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = "Author: " + book.author;
        const bookPages = document.createElement("p");
        bookPages.textContent = "Number of Pages: " + book.pages;
        const haveRead = document.createElement("p");
        haveRead.textContent = "Read status: " + book.have_read;
        //BUTTON GROUP
        // TODO: Add share button //
        const cardButtonDiv = document.createElement("div");
        cardButtonDiv.id = "card-button-group";

        //update read status button
        const updateReadStatusButton = document.createElement("button");
        //TODO: add image for button
        updateReadStatusButton.id = "read-status-button";
        cardButtonDiv.appendChild(updateReadStatusButton);
        // modal consts
        const readStatusModal = document.getElementById(
          "update-read-status-modal",
        );
        const closeReadSelectionModal =
          document.getElementById("close-read-modal");
        // close modal button
        closeReadSelectionModal.onclick = function () {
          readStatusModal.style.display = "none";
        };

        //update read status function
        updateReadStatusButton.addEventListener("click", () => {
          readStatusModal.style.display = "grid";

          document
            .getElementById("submit-update")
            .addEventListener("click", function () {
              haveReadGroup.forEach((radio) => {
                let bookToUpdate = myLibrary.indexOf(book);
                myLibrary[bookToUpdate].have_read = radio.value;
                haveRead.textContent = "Read status: " + book.newReadStatus;
              });

              console.log(book.have_read);
              console.log(myLibrary);
              //bookDiv.replaceChild(newHaveReadDiv, haveRead);
              //bookDiv.removeChild(haveRead);
              //bookDiv.appendChild(newHaveReadDiv);
              resetRadio();
              readStatusModal.style.display = "none";
            });
          //TO DO: document.getElementById("update-read-status").submit()
        });

        //delete button
        const deleteBookButton = document.createElement("button");
        deleteBookButton.innerHTML =
          '<img src="/Users/jordan/Odin_JS/repos/cuddly-reading-journey/images/delete-outline.svg"/>';
        deleteBookButton.id = "delete-button";
        cardButtonDiv.appendChild(deleteBookButton);
        //delete book card function
        deleteBookButton.addEventListener("click", () => {
          bookDiv.remove();
          const index = myLibrary.indexOf(book);
          if (index > -1) {
            myLibrary.splice(index, 1);
          }
          emptyLibrary();
          console.log(myLibrary);
        });

        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(haveRead);
        bookDiv.appendChild(cardButtonDiv);
        bookCardContainer.appendChild(bookDiv);
      }

      addBookCard();
      emptyLibrary();
      clearAllInputs();
      resetRadio();
      addBookModal.style.display = "none";
      console.log(myLibrary);
    });
}

addBookToLibrary();

// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet');
// const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', '480 pages', 'read');
// const hamlet = new Book('Hamlet', 'William Shakespeare', '400 pages', 'read');
