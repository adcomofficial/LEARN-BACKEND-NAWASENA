// Buat variabel untuk menampung package
const express = require("express");
const app = express();


// Middleware untuk express dapat menerima request dari user
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


Minggu 2
app.use("/auth", require("./app/api/auth/router"));

// 1.) Membuat index route
app.get("/", function (req, res, next) {
  /**
   * TODO : Membuat Hello world from express pertama kita
   */

  res.json({
    message: "Hello world dari express",
  });
});

// create
app.post("/create", function (req, res, next) {
  const { username, email, password } = req.body;

  /**
   **
   * TODO : Menangkap semua request dari user
   * Menggunakan metode Destructuring Method dan cara Native
   **
   */

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
  K;
});

// Endpoint register and simple validate
app.post("/register", function (req, res, next) {
  const { name, email, password } = req.body;

  /**
   * TODO : Membuat validasi sederhana agar semua form diisikan
   * Introduction to simple validate method using if else
   */

  // Example 1
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

  // Example 2
  if (name == "" || email == "" || password == "") {
    res.status(400).json({
      message: "Harap semua data diisi",
    });
  } else {
    res.status(201).json({
      message: "Berhasil mendaftar",
    });
  }

  // Example 3
  if (!name || !email || !password)
    return res.status(400).json({
      message: "Harap isi semua data",
    });
  res.status(201).json({
    message: "Berhasil mendaftar",
  });
});

// Port
app.listen(3000, () => console.log("Server berjalan pada port 3000"));
