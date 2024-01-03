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
}

function saveLibrary(library){
    localStorage.setItem('library',JSON.stringify(library));
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    saveLibrary(myLibrary);
}

window.addEventListener('load',()=>{
    const storedLibrary = localStorage.getItem('library');
    if(storedLibrary){
        myLibrary= JSON.parse(storedLibrary);
        render(myLibrary);
        console.log('library loaded');
    }
    else{
        console.log('not library found in local storage');
    }
})

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value; 
    const pages = pagesInput.value;
    const read = readInput.checked;

    if (title && author && pages !== '') {
        addBookToLibrary(title, author, pages, read);
        render(myLibrary);
        titleInput.value = '';
        authorInput.value = '';
        pagesInput.value = '';
        readInput.checked = false;
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
        const card = document.createElement('div');
        const titleTemp= document.createElement('p');
        titleTemp.textContent = element.title;
        const authorTemp = document.createElement('p');
        authorTemp.textContent = "Author: " + element.author;
        const pagesTemp = document.createElement('p');
        pagesTemp.textContent = "Pages:" + element.pages;
        const readTemp = document.createElement('button');
        readTemp.classList.add('btn-read');
        readTemp.textContent = element.read? 'Read' : 'Not read';
        card.classList.add('cardstyle');
        card.classList.add(element.read?'read':'not-read');
        card.appendChild(titleTemp);
        card.appendChild(authorTemp);
        card.appendChild(pagesTemp);
        card.appendChild(readTemp);
        cardContainer.appendChild(card);

        readTemp.addEventListener('click',()=>{
            if(card.classList.contains('read')){
                card.classList.remove('read');
                card.classList.add('not-read');
                readTemp.textContent = 'Not read'
            }
            else{
                card.classList.remove('not-read');
                card.classList.add('read');
                readTemp.textContent = 'Read';
            }
        })
    });   
}
