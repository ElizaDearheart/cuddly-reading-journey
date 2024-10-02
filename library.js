//constructor for adding books to library
function Book(title, author, pages, have_read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.have_read = have_read;
    this.info = function () {
        return `${this.title}, ${this.author}, ${this.pages}, ${this.have_read}`;
    }
};

//Books
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet');
const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', '480 pages', 'read');
const hamlet = new Book('Hamlet', 'William Shakespeare', '400 pages', 'read');

let myLibrary = [prideAndPrejudice, hamlet];

//function to loop through books and display on page
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

    // myLibrary.forEach(book => {

    //     document.getElementById('book-title').textContent = book.title;
    //     document.getElementById('author').textContent = book.author;
    //     document.getElementById('page-number').textContent = book.pages;
    //     document.getElementById('have-read').textContent = book.have_read;
    // })

};


//function to add books to library
function addBookToLibrary(title, author, pages, have_read) {
    let newBook = new Book(title, author, pages, have_read)
    let newBookDiv = document.createElement("div");
    myLibrary.push(newBook);
    newBookDiv.textContent = newBook;

    newBookDiv.id = "card";
    let container = document.getElementById("book-cards");
    container.appendChild(newBookDiv)

    displayBooks()

}




//     bookForm.onsubmit = e => {
//         e.target.reset();
//     };
//     console.log(myLibrary)
// };

// let bookSubmit = document.querySelector(".submit");
// bookSubmit.addEventListener("click", addBookToLibrary);


console.log(myLibrary[0])
console.log(myLibrary[1])
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet')
console.log(myLibrary[2])
