/**
 * TODO : Membuat object yang berisikan input manual lalu dimasukkan kedalam array
 *
 * 1.) User input email,password
 * 2.) Sistem melakukan pengecekan terhadap email tersebut
 * 3.) Jika terdapat email maka sistem memberikan responses berupa bad request dan message sudah terdaftar email
 * 4.) Jika tidak ada maka kita lakukan proses enkripsi password terlebih dahulu menggunakan library bcryptjs sebelum di save kedalam array
 * 5.) Kembalikan data
 */

// Database
const users = [
  {
    email: "mahmed@gmail.com",
    password: "lorem10",
  },
  {
    email: "iyan@gmail.com",
    password: "lorem10",
  },
];

console.log("Sebelum ditambahkan data");
console.log(users);

// Inputan user
const new_data = {
  email: "mahmed12@gmail.com",
  password: "lorem10",
};

// Pengecekan terlebih dahulu
const checkEmail = users.find((data) => data.email === new_data.email);
if (checkEmail) {
  console.log("Email sudah terdaftar dalam database kita");
} else {
  users.push(new_data);
  console.log(users);
}

// or with this

/**
 * if (checkEmail) return console.log("Email sudah terdaftar");
 * users.push(new_data);
 * console.log(users);
 *
 */
