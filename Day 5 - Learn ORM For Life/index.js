const express = require('express')
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 *
 * Challenge :
 * 1. Buat studi kasus berbeda
 * 2. Handling error ketika data tidak ada
 *
 */


// set up sequelize
const { Sequelize } = require('sequelize');

const connection = new Sequelize('LEARN-BACKEND-NAWASENA', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

async function sinkron() {
    try {
        await connection.authenticate();
        console.log('Berhasil connect ke database mysql');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
sinkron()


// Set up table / Model Book
const { DataTypes } = require('sequelize');

const Product = connection.define('product', {
    nama_product: DataTypes.STRING,
    harga: DataTypes.INTEGER,
});

const Book = connection.define('book', {
    judul: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    sinopsis: DataTypes.STRING,
    penulis: DataTypes.STRING,
    genre: DataTypes.STRING,
    penerbit: DataTypes.STRING,
});

async function sinkronTable() {
    await Book.sync();
    await Product.sync();
}
sinkronTable()


// CRUD | CREATE READ UPDATE DELETE

// READ | GET
app.get('/beranda', async function (req, res, next) {
    const result = await Book.findAll()
    res.status(200).json({ data: result })
})

app.get('/beranda', BerandaController)

// CREATE | POST
app.post('/beranda/create', async function (req, res, next) {
    // Kita ambil data dari user lakukan destruc
    const { judul, deskripsi, sinopsis, penulis, genre, penerbit } = req.body

    // tampung kedalam sebuah variabel
    const result = await Book.create({
        judul, // judul:judul
        deskripsi,
        sinopsis,
        penulis,
        genre,
        penerbit
    })

    res.status(200).json({ data: result })

})



// UPDATE | PUT
app.put('/beranda/edit/:id', async function (req, res, next) {
    // ambil id dari paramter/params
    const id = req.params.id

    // Kita ambil data dari user dan lakukan destruc
    const { judul, deskripsi, sinopsis, penulis, genre, penerbit } = req.body

    // syarat status 404, data:'Not found'

    // lakukan update data
    const result = await Book.update({
        judul,
        deskripsi,
        sinopsis,
        penulis,
        genre,
        penerbit
    }, {
        where: { id: id }
    })

    res.status(200).json({ data: result })


})
// DELETE | DELETE
app.delete('/beranda/delete/:id', async function (req, res, next) {
    // ambil id dari paramter
    const id = req.params.id

    // syarat status 404, message:'Not found'

    // hapus data
    await Book.destroy({
        where: { id: id }
    })

    // kirim pesan ke user
    res.status(200).json({
        data: "Berhasil hapus data"
    })
})



app.listen(3000, () => console.log('Server berjalan pada port 3000'))
