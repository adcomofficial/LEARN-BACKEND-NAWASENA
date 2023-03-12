// no object
// const name = "Muhammad Fitrian";
// const name_age = 20;

// with object
const person = {
  name: "Muhammad Fitrian",
  age: 20,
  //RELASI ANTAR TABLE
  favorite_books: {
    title: "Rahasia Dunia",
    author: "Bambang",
    publisher: "STMIK IKMI CIREBON",
  },
};

// HOW TO ACCESS PROPERTY

console.log(person.name);
console.log(person.age);

// SOAL STUDI KASUS - Buatlah kalimat dibawah dan ganti nilai yang didalam tanda petik dari object yang diketahui
// Nama anda "name", anda berumur "age" buku favorites anda ialah "title" buku tersebut dibuat oleh "author" dan publisher buku tersebut "publisher"

// NOT IMPLEMENT DESCTURTURING OBJECT

let kata = `Nama anda ${person.name}, Anda berumur ${person.age} buku favorites anda ${person.favorite_books.title} buku tersebut dibuat oleh ${person.favorite_books.author} dan publisher buku tersebut ${person.favorite_books.publisher}`;

console.log(kata);

// WITH DESCTURTURING OBJECT
// const {} = nama_object <= // Cara membuat Desctructuring Object

const { name, age, favorite_books } = person;
const { title, author, publisher } = favorite_books;

let kataLagi = `Nama anda ${name}, Anda berumur ${age} buku favorites anda ${title} buku tersebut dibuat oleh ${author} dan publisher buku tersebut ${publisher}`;

console.log(kataLagi);

// NOT IMPLEMENT TEMPLATE LITERAL

console.log("Hai nama sama " + person.name + " dan umur saya " + person.age);
let kata_not_literal =
  "Hai nama sama " + person.name + " dan umur saya " + person.age;
console.log(kata_not_literal);

// IMPLEMENT TEMPLATE LITERAL

let kata_with_literal = `Hi nama kamu ${person.name} dan umur kamu ${person.age}`;
console.log(kata_with_literal);
