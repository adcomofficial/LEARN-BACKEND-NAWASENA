const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * TODO : CREATE READ UPDATE DELETE To Our Database
 * Requirements : XAMPP,NodeJS
 *
 * == CHALLANGE ==
 * Buatalah Data CRUD Dengan Tema sebagai berikut:
 *
 * 1. Data Barang Rental
 * 2. Data Pegawai
 * 3. Data Barang
 *
 */


// Untuk proses enkripsi data password
const bcryptjs = require('bcryptjs')

// Buat variabel untuk menampung package mysql2 yang sudah diinstall
const mysql = require('mysql2');

// Buat variabel yang akan kita gunakan untuk setiap kali kita query kedalam database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'LEARN-BACKEND-NAWASENA' // -- PERHATIKAN DISINI : Pastikan kalian set database ini sesuai dengan database kalian
});


// Agar terdapat pesan apakah gagal/tidaknya koneksi kedalam database
connection.connect(function (error) {
    if (error) return console.log(`Terjadi error`, error)
    console.log('Connected to database')
})


// CREATE / REGISTRASI
app.post('/auth/register', async function (req, res, next) {

    /**
     *  Alur Create Register User
     *
     * 1. Ambil input user
     * 2. Lakukan validasi
     * 3. Masukkan kedalam database kita
     */

    // Ambil input user | Destruc
    const { nama, username, no_hp, email, password, alamat } = req.body

    // Validasi sederhana
    if (!nama || !username || !no_hp || !email || !password || !alamat) return res.status(400).json({ message: "Semua input harus diisi" })


    // hashing / enkripsi data password sebelum ke save di database
    const hashPassword = await bcryptjs.hash(password, 10)


    // buat object untuk menampung data kedalam database
    const newData = {
        nama, // nama:nama
        username, // Prinsip DRY
        no_hp,
        email,
        password: hashPassword,
        alamat
    }

    connection.query('INSERT INTO users SET ?', newData, function (error, result, field) {
        console.log(result)
        console.log(field)
        if (error) return res.status(500).json({ message: error })
        res.status(200).json({ message: 'Berhasil mendaftar' })
    })

})

// READ / MEMBACA
app.get('/users', function (req, res, next) {


    /**
     * Apabila ingin spesifik data yang ingin dikembalikan maka gunakan query :
     *
     *  -- SELECT column,column, FROM table --
     *
     * Contoh : SELECT username,email FROM users
     *
     * */


    connection.query('SELECT * FROM users', function (error, result, field) {

        if (error) return res.status(500).json({ message: error })

        res.status(200).json({ data: result })
    })
})


// DELETE
app.delete('/delete/:id', function (req, res, next) {
    /**
     * Ambil data dari Parameter
     * Paramter disini bersifat dinamis, yang artinya kita data dapat berubah-ubah sesuai kebutuhan
     * Sebagai contoh disini kita ingin hapus data berdasarkan id user, maka kita ambil di parameter dengan id user
     *
     *  */
    const id = req.params.id


    connection.query('DELETE FROM users WHERE id=?', id, function (error, result, field) {
        if (error) return res.status(500).json({ message: error })
        res.status(200).json({ data: result })
    })

    console.log(req.params.id)
})


// UPDATE
app.put('/update/:id', async function (req, res, next) {
    // ambil id user berdasarkan params/paramter
    const id = req.params.id

    // Ambil input user | Destruc
    const { nama, username, no_hp, email, password, alamat } = req.body

    // Validasi sederhana
    if (!nama || !username || !no_hp || !email || !password || !alamat) return res.status(400).json({ message: "Semua input harus diisi" })

    // hashing / enkripsi data password sebelum ke save di database
    const hashPassword = await bcryptjs.hash(password, 10)

    // buat object untuk menampung data kedalam database
    const newData = {
        nama, // nama:nama
        username,
        no_hp,
        email,
        password: hashPassword,
        alamat
    }

    connection.query('UPDATE users SET ? WHERE id=?', [newData, id], function (error, result, field) {
        if (error) return res.status(500).json({ message: error })
        res.status(200).json({ data: 'Berhasil update data' })
    })
})



app.listen(3000, () => console.log('Server running at port 3000'))
