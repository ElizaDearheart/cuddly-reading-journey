//LIBRARY
let myLibrary = [];

//BOOK CONSTRUCTOR
function Book(title, author, pages, have_read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.have_read = have_read;
    this.info = function () {
        return `${this.title}, ${this.author}, ${this.pages}, ${this.have_read}`;
    }
};

let bookDiv = document.createElement("div");
bookDiv.id = "card";
// let bookCard = document.getElementById("card");
let bookCardContainer = document.getElementById("book-cards");


//DISPLAY BOOKS
function displayBooks() {
    let bookTitle = document.createElement("h3");
    let bookAuthor = document.createElement("p");
    let bookPages = document.createElement("p");
    let haveRead = document.createElement("p");

    myLibrary.forEach(book => {
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = book.pages;
        haveRead.textContent = book.have_read;

    })

    let container = document.getElementById("card");
    container.appendChild(bookTitle);
    container.appendChild(bookAuthor);
    container.appendChild(bookPages);
    container.appendChild(haveRead);

};


//BOOK MODAL
let dialog = document.querySelector("dialog");
let addBookButton = document.getElementById("add-book");
let closeButton = document.getElementById("close");

//open modal
addBookButton.onclick = function () {
    dialog.style.display = "grid"
}
//close modal button
closeButton.onclick = function () {
    dialog.style.display = "none"
}


//ADD BOOKS TO LIBRARY
function addBookToLibrary() {


    // modal form submission
    document.getElementById("add-book-form").addEventListener("submit", function (event) {
        event.preventDefault();
        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let pages = document.getElementById("pages").value;
        let haveReadGroup = document.getElementsByName("have-read");
        let checkedRadio = Array.from(haveReadGroup).find((radio) => radio.checked);
        let have_read = checkedRadio.value;

        let book = new Book(title, author, pages, have_read);
        // let bookDiv = document.createElement("div");
        myLibrary.push(book);
        bookDiv.textContent = book;

        // bookDiv.id = "card";
        // let container = document.getElementById("book-cards");

        bookCardContainer.appendChild(bookDiv)
        displayBooks()


        function clearAllInputs() {
            let allInputs = document.querySelectorAll('input[type="text"]');
            allInputs.forEach(singleInput => singleInput.value = "");
        }

        let radioButtons = document.querySelectorAll('input[type="radio"]');
        function resetRadio() {
            for (const radioButton of radioButtons) {
                radioButton.checked = false
            }
        }

        console.log(myLibrary);
        clearAllInputs();
        resetRadio();
        dialog.style.display = "none";

    })

}



addBookToLibrary()


// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet');
// const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', '480 pages', 'read');
// const hamlet = new Book('Hamlet', 'William Shakespeare', '400 pages', 'read');
