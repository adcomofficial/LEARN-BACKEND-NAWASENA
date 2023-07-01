# BERKENALAN DENGAN ORM

Materi by : Kabinet Nawasena Android Developer Community STMIK IKMI Cirebon

Mentor : Muhammad Fitrian Shousyade Almadina

**Pengenalan**

ORM atau *Object Relational Mapping* ialah sebuah teknik yang memungkinkan kita melakukan query database tanpa menguasai lebih dalam sintaks sql. Lalu mengapa kita menggunakan ORM sedangkan jika kita menggunakan native query sql saja bisa diterapkan ?,

Perhatikan kode berikut :

```javascript
...
connection.query('SELECT * FROM users',function(error,result,field){
    if(error) return handleErorr()
    return result
})
...
```

Pada sintaks diatas merupakan native query menggunakan sintaks sql untuk mendapatkan sebuah data dari dalam database dengan nama table user, Bisa kita lihat diatas terdapat 3 baris hanya untuk mendapatkan data user tersebut. Hal ini bisa kita pangkas lagi dengan menggunakan ORM, Sebagai contoh disini kita akan menggunakan ORM untuk sql yang bernama **Sequelize**.

Dari sintaks panjang diatas kita bisa membuatnya seperti ini dengan menggunakan ORM :

```javascript
const result = await User.findAll()
```

Hasil 1 line tersebut sama dengan 3 baris kode diatas, Tentu saja hal ini bisa sangat mengefisiensikan waktu kita dalam melakukan query kedalam database.

##### **Instalasi Sequelize**

```bash
npm install --save sequelize
```

Karena kita menggunakan database yang disediakan xampp maka install driver mysql

```bash
npm install --save mysql2
```

#### **Konfigurasi Koneksi Database**

Dalam file app.js kita tambahkan sintaks berikut :

```javascript
...

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

...
```

Perhatikan pada sintkas new Sequelize, Ia menerima 4 parameter yaitu:

1. database : Nama database yang akan digunakan, Lebih baik sebelum memulai materi ini kalian buat database dengan nama **LEARN-BACKEND-NAWASENA**

2. username : Username untuk autentikasi database, Karena kita menggunakan xampp maka default username yaitu **root**

3. password : Password untuk autentikasi database, sama seperti username karena kita menggunakan xampp maka secara default password nya kosong, Jadi isikan saja empy string, **""**

4. host : Merupakan url dimana database tersebut berada, kita masukkan saja **localhost**

5. dialect : Merupakan jenis database apa yang akan digunakan, Masukkan saja **mysql** karena kita menggunakan xampp sebagai database nya

#### KONFIGURASI TABLE DATABASE

*Models are the essence of Sequelize. A model is an abstraction that 
represents a table in your database. In Sequelize, it is a class that 
extends [Model](https://sequelize.org/api/v6/class/src/model.js~Model.html).*

Merupakan kutipan dari dokumentasi resmi situs sequelize nya, Jadi intinya Model merupakan representasi dari table dari database kita dan setiap kali kita ingin melakukan query kedalam table tersebut kita bisa menggunakan model untuk menangani hal tersebut.

Untuk membuat table menggunakan sequelize kita bisa membuatnya dengan cara :

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
```

Kemudian kita jalankan sinkroninasi agar table yang sudah dibuat dapat kita gunakan dengan cara:

```javascript
await User.sync({ force: true });
console.log("The table for the User model was just (re)created!");
```

#### BAGAIMANA DENGAN QUERY ?

Pada latar belakang sebelumnya kita sudah mengenal sedikit query dari kemampuan ORM ini, Pada section ini kita akan belajar banyak bagaimana penggunakan query ketika kita menggunakan ORM Sequelize ini.

**GET Data / READ**

Untuk get data dari sebuah table database kita perlu memanggil model yang sudah kita definisikan sebelumnya lalu panggil perintah **findAll()**,Lebih jelasnya.

```javascript
const result = await User.findAll()
```

**CREATE Data / CREATE**

Untuk membuat sebuah data kita bisa menggunakan fungsi create

```javascript
const result = await User.create({
    username:'doe'
    ...other field
})
```

**EDIT Data / UPDATE**

Untuk edit data kita bisa melakuannya dengan cara 

```javascript
const result = await User.update({ username: "Doe" }, {
  where: {
    lastName: ...
  }
});
```

**DELETE Data / DELETE**

Untuk delete data kita bisa melakukannya dengan cara 

```javascript
const result = await User.destroy({
  where: {
    firstName: "Jane"
  }
});
```

Apabila ingin belajar lebih lanjut, Saya rekomendasikan anda semua untuk baca dokumentasi resmi nya disini : **https://sequelize.org/docs/v6/**


