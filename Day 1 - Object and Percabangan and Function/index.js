/**
 * Apa itu object ?
 * Bagaimana akses property dan value pada object
 * Berkenalan Template Literal `${}`
 * Destructuring Object
 */

const person = {
  name: "Budi",
  age: 20,
  favorite_books: {
    title: "Mencari Cinta Sejati",
    author: "Bayu",
    publisher: "PT Farhan Mencari Ayang",
  },
};

// WITH DESTRUCTURING OBJECT
const { name, age, favorite_books } = person;

const { title, author, publisher } = favorite_books;

let kata = `${name} berumur ${age} dan buku favoritnya ${title} dan dibuat oleh ${author} dan dikeluarkan oleh ${publisher}`;

console.log(kata);
