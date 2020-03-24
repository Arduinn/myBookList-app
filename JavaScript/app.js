// Book Class: Represents a Book
class Book {
	constructor(title, author, subject, review){
		this.title = title;
		this.author = author;
		this.subject = subject;
		this.review = review;
	}
}

// UI Class: Handle UI Tasks
class UI {
	static displayBooks() {
		const books = Store.getBooks(); 
		/*const StoredBooks = [
		{
			title: 'Book 1',
			author: 'Author 1',
			subject: 'Subject 1',
			review: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		},
		{
			title: 'Book 2',
			author: 'Author 2',
			subject: 'Subject 2',
			review: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		},
		];*/

		/*const books = StoredBooks;*/
		books.forEach((book) => UI.addBookToList(book));
	}

	static addBookToList(book) {
		const list = document.querySelector('#book-list');

		const row = document.createElement('tr');

		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.subject}</td>
			<td>${book.review}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
		`;

		list.appendChild(row)
	}

	static deleteBook(el) {
		if(el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}

	static showAlert(message,className) {
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		container.insertBefore(div,form); 
		// Vanish in 3 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 3000);
	}	

	static clearFields() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#subject').value = '';
		document.querySelector('#review').value = '';
	}
}

// Store Class: Handles Storage
class Store{
	static getBooks() {
		let books;
		if(localStorage.getItem('books') === null){
			books = [];

		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}

	static addBook(book) {
		const books = Store.getBooks();

		books.push(book);

		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBook(title) {
		const books = Store.getBooks();

		books.forEach((book, index) => {
			if(books.title == title) {
				books.splice(index,1);
			}
		});

		localStorage.setItem('books', JSON.stringfy(books));
	}
}
// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
	// Prevent actual submit
	e.preventDefault();

	// Get form Values
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const subject = document.querySelector('#subject').value;
	const review = document.querySelector('#review').value;

	// Validate
	if(title === '' || author === '' || subject === '' || review === ''){
		UI.showAlert('Please fill in all fields', 'danger')
	} else {

		// Instatiate book
		const book = new Book(title, author, subject, review);

		// Add Book to UI
		UI.addBookToList(book)

		// Add Book to LocalStorage
		Store.addBook(book);

		// Show Success Message
		UI.showAlert('Book Added', 'success')

		// Clear Fields
		UI.clearFields();

	}

});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
	UI.deleteBook(e.target)

	// Show Remove Success Message
	UI.showAlert('Book Removed', 'success')

});