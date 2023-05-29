const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Minggu Ke - 3  Operasi CRUD Pada Array
 * 
 * OUR TODO :
 * 
 * 1.) Implementasi sederhana CRUD menggunakan Array
 * 2.) Membuat endpoint yang disertakan validasi
 * 3.) Memahami Http Status Code 
 * 
 */


// Membuat Array | Fake Database
const users = [
    {
        id: "4e9b81c0- e63e - 4e0d - b397 - 4c2ac0a832be",
        email: "adcom@gmail.com",
        password: "nawasena",
        date: new Date()
    },
    {
        id: "8da87e87-e25b-4ab0-bee3-b138dcbe25d8",
        email: "22@gmail.com",
        password: "theBest",
        date: new Date()
    },
];


// CREATE Endpoint  => http://localhost:3000/register
app.post('/register', function (req, res, next) {
    // Ambil Input user dengan lakukan destructuring object
    const { email, password } = req.body

    /*
     * Validasi
     * 1.) Jika input kosong maka berikan pesan : "Semua input harus diisi"
     * 2.) Jika terdapat email yang sama maka berikan pesan : "Email sudah digunakan"
     * 
    */

    // Validasi 1.
    if (!email || !password) return res.status(400).json({
        code: 400, data: {
            message: "Semua input harus diisi"
        }
    })

    // Validasi 2
    const checkEmail = users.find(user => user.email === email)
    if (checkEmail) return res.status(400).json({
        code: 400, data: {
            message: 'Email sudah digunakan'
        }
    })

    // Buat Variabel untuk menampung data user 
    const newUser = {
        // email:email, Karena property dan value nya sama maka kita bisa singkat seperti ini :
        email, // Equal: email:email
        password // Equal = password:password
    }

    // Push user kedalam array / Database kita
    users.push(newUser)
})

// READ Endpoint    => http://localhost:3000/get
app.get('/get', function (req, res, next) {
    res.status(200).json({
        code: 200, data: {
            message: 'Data user',
            data: users
        }
    })

})

// EDIT             => http://localhost:3000/edit/:id
app.put('/edit/:id', function (req, res, next) {
    // Ambil id dari parameter
    const id = req.params.id
    // Ambil input user lalu lakukan destruc
    const { email, password } = req.body


    // Lakukan check apakah user terdapat di database
    const checkUser = users.find((user) => user.id === id);
    if (!checkUser) return res.status(404).json({
        code: 404, data: {
            message: "User tidak ditemukan"
        }
    })

    // Lalu update data dengan sesuai input user
    if (email) checkUser.email = email
    if (password) checkUser.password = password


    // Berikan responses
    res.status(200).json({
        code: 200, data: {
            message: `User dengan id ${id} berhasil di update`,
            data: checkUser

        }
    })
})

// DELETE           => http://localhost:3000/delete/:id
app.delete('/delete/:index', (req, res, next) => {
    // Ambil index data dari parameter
    const { index } = req.params;
    // tampung kedalam variabel data tersebut yang didalam database kita
    const user = users[req.params.index];

    // Jika tidak ditemukan index
    if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    // Lakukan hapus data
    users.splice(index, 1);
    res.json({ message: 'Berhasil dihapus' })

})




// Listen port untuk server
app.listen(3000, () => console.log('Server up and running'))