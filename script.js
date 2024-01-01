

const myLibrary = [];

function Book(title, author, pages, read){
    this.title= title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return { title:this.author,
                 author:this.title,
                 pages:this.pages,
                 read:this.read,};
    };
}

function addBookTolibrary(){
    let book = new Book(title,author,pages,read);
    myLibrary.push(book);
}