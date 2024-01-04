const addBtn = document.querySelector('.submit');
const titleInput = document.querySelector('.title');
const authorInput = document.querySelector('.author');
const pagesInput = document.querySelector('.pages');
const readInput = document.querySelector('.read');
const newBook = document.querySelector('.add');
const form = document.querySelector('.form');
const modal = document.querySelector('#modal');
const cardContainer = document.querySelector('.card-container');
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function saveLibrary(library) {
    const serializedLibrary = library.map(book => {
        return {
            title: book.title,
            author: book.author,
            pages: book.pages,
            read: book.read
        };
    });
    localStorage.setItem('library', JSON.stringify(serializedLibrary));
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    saveLibrary(myLibrary);
}

window.addEventListener('load', () => {
    const storedLibrary = localStorage.getItem('library');
    if (storedLibrary) {
        const serializedLibrary = JSON.parse(storedLibrary);
        myLibrary = serializedLibrary.map(book => new Book(book.title, book.author, book.pages, book.read));
        render(myLibrary);
        console.log('library loaded');
    } else {
        console.log('no library found in local storage');
    }
});

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
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');
        const readTemp = document.createElement('button');
        readTemp.classList.add('btn-read');
        readTemp.textContent = element.read? 'Read' : 'Not read';
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('btn-read');
        card.classList.add('cardstyle');
        card.classList.add(element.read?'read':'not-read');
        card.appendChild(titleTemp);
        card.appendChild(authorTemp);
        card.appendChild(pagesTemp);
        btnContainer.appendChild(readTemp);
        btnContainer.appendChild(deleteBtn);
        card.appendChild(btnContainer);
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

        deleteBtn.addEventListener('click', () => {
            
            const index = myLibrary.indexOf(element);
        
            if (index !== -1) {
                myLibrary.splice(index, 1);
                saveLibrary(myLibrary);
                render(myLibrary);
            }
        });

    });   
}
