// Buat variabel untuk menampung package
const express = require("express");
const bcryptjs = require("bcryptjs");
const app = express();

// Middleware untuk express dapat menerima request dari user
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fake Database
const database = require("./app/config/database");

// Minggu 2
app.use("/auth", require("./app/api/auth/router"));

// 1.) Membuat index route
app.get("/", function (req, res, next) {
  res.json({
    message: "Hello world dari express",
  });
});

app.post("/create", function (req, res, next) {
  const { username, email, password } = req.body;

  console.log("Ini secara destruc");
  console.log(username);
  console.log(email);
  console.log(password);

  // Membuat enter
  console.log();

  console.log("Ini secara native");
  console.log(req.body.username);
  console.log(req.body.email);
  console.log(req.body.password);

  res.json({
    message: "Sukses",
    data: req.body,
  });

  // username
  // email
  // password,

  //   res.json({
  //     message: "Ini pesan",
  //     data: req.body,
  //   });
});

// Endpoint register and simple validate
app.post("/register", function (req, res, next) {
  const { name, email, password } = req.body;

  // DRY =  DONT REPEAT YOURSELF

  // Simple 1
  if (name == "" || email == "" || password == "") {
    res.status(400).json({
      message: "Harap semua data diisi",
    });
  } else {
    res.status(201).json({
      message: "Berhasil mendaftar",
    });
  }

  // Simple 2
  if (!name || !email || !password)
    return res.status(400).json({
      message: "Harap isi semua data",
    });
  res.status(201).json({
    message: "Berhasil mendaftar",
  });

  // Simple 3
  if (name == "") {
    res.status(400).json({
      message: "Harap field nama disi",
    });
  } else if (email == "") {
    res.status(400).json({
      message: "Harap field email disi",
    });
  } else if (password == "") {
    res.status(400).json({
      message: "Harap field password disi",
    });
  } else {
    res.status(201).json({
      message: "Registrasi berhasil",
    });
  }

  /**
   * name
   * email
   * password
   */
  // console.log(req.body);

  // Semisal name kosong '' Pesan : Harap filed name diisi
  // Jika email : Harap filed email diisi
  // Jika password : Harap filed password diisi

  // Memberikan responses kembali kepada user
  // res.json({
  //   message: "Sukses",
  //   data: req.body,
  // });
});

// Implementasi Endpoint Registrasi Menggunakan Array
app.post("/auth/v1/register", async function (req, res, next) {
  /**
   * 1.) Kita ambil request dari user
   * 2.) Lakukan validasi form
   * 3.) Lakukan validasi terhadap email, Jika terdapat email maka berikan http code bad request dan message email sudah terdaftar
   * // 4.) Enkripsi passworsd sebelum disimpan kedalam database
   * 5.) Kita masukkan kedalam database
   *
   */

  /**
   * Enkripsi
   * Refactoring
   */

  // 1.) Ambil input user
  const { email, password } = req.body;

  // 2.)
  if (!email || !password)
    return res.status(400).json({ message: "All input are required" });

  // 3.)
  const checkEmail = database.find((user) => user.email === email);
  if (checkEmail) {
    res.status(400).json({ message: "Email already in used" });
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  // 4.)
  const new_data = {
    email,
    password: hashPassword,
  };
  database.push(new_data);
  res.status(201).json({ message: "Berhasil mendaftar", data: database });
});

// Port
app.listen(3000, () => console.log("Server berjalan pada port 3000"));
