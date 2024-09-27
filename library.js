let myLibrary = [];

//constructor for adding books to library
function Book(book, pages, have_read) {
    this.book = book;
    this.pages = pages;
    this.have_read = have_read;
    this.info = function () {
        return `${this.book}, ${this.pages}, ${this.have_read}`;
    }
};

//function to add books to library



//Books added to library
const theHobbit = new Book('The Hobbit by J.R.R. Tolkien', '295 pages', 'not read yet');
const prideAndPrejudice = new Book('Pride and Prejudice by Jane Austen', '480 pages', 'read');

theHobbit.info()


// console.log(this.book);
// console.log(this.pages);
// console.log(this.have_read);
// console.log(theHobbit.info())
