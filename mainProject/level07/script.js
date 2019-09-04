let booksCollection = document.querySelector('.books');
let books = document.querySelectorAll('.book');
booksCollection.insertBefore(books[1], books[0]);
booksCollection.appendChild(books[2]);
booksCollection.insertBefore(books[4], books[3]);

let body = document.querySelector('body');
body.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');

books[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

let adv = document.querySelector('.adv');
body.removeChild(adv);

let collection = books[0].querySelector('ul');
let chapters = collection.querySelectorAll('li');
collection.insertBefore(chapters[2], chapters[10]);
collection.insertBefore(chapters[6], chapters[4]);
collection.insertBefore(chapters[8], chapters[4]);

let collection2 = books[5].querySelector('ul');
let chapters2 = collection2.querySelectorAll('li');
collection2.insertBefore(chapters2[9], chapters2[3]);
collection2.insertBefore(chapters2[2], chapters2[6]);
collection2.insertBefore(chapters2[5], chapters2[8]);

let collection3 = books[2].querySelector('ul');
let chapters3 = collection3.querySelectorAll('li');
let extraChapters = chapters3[0].cloneNode();
extraChapters.textContent = 'Глава 8: За пределами ES6';
collection3.insertBefore(extraChapters, chapters3[9]);