const addBtn = document.querySelector('.submit');
const titleInput = document.querySelector('.title');
const authorInput = document.querySelector('.author');
const pagesInput = document.querySelector('.pages');
const readInput = document.querySelector('.read');
const newBook = document.querySelector('.add');
const form = document.querySelector('.form');
const modal = document.querySelector('#modal');
const cardContainer = document.querySelector('.card-container');
const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return {
            title: this.title,
            author: this.author,
            pages: this.pages,
            read: this.read,
        };
    };
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);

    console.log('book added to library:', book.info());
}

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value; // Fix the variable name here
    const pages = pagesInput.value;
    const read = readInput.checked;

    if (title && author && pages !== '') {
        addBookToLibrary(title, author, pages, read);
        render(myLibrary);
        // You can add more logic here, such as clearing the form inputs
        titleInput.value = '';
        authorInput.value = '';
        pagesInput.value = '';
        readInput.checked = false; // Reset the checkbox
        modal.close();
    } else {
        alert('Please fill in all fields before adding a book.');
    }
});

newBook.addEventListener('click',()=>{
    modal.showModal();
})

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

function render(arr){
    
    cardContainer.innerHTML = '';
    arr.forEach(element => {
        const title = element.title;
        const author = element.author;
        const pages = element.pages;
        const read = element.read;

        const card = document.createElement('div');
        const titleTemp= document.createElement('p');
        titleTemp.textContent = title;
        const authorTemp = document.createElement('p');
        authorTemp.textContent = author;
        const pagesTemp = document.createElement('p');
        pagesTemp.textContent = pages;
        const readTemp = document.createElement('p');
        readTemp.textContent = read ? 'read' : 'not read';
        card.classList.add('cardstyle');
        card.appendChild(titleTemp);
        card.appendChild(authorTemp);
        card.appendChild(pagesTemp);
        card.appendChild(readTemp);

        cardContainer.appendChild(card);
    });
}