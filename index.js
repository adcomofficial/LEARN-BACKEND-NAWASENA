// Buat variabel untuk menampung package
const express = require("express");
const app = express();

// Middleware untuk express dapat menerima request dari user
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Port
app.listen(3000, () => console.log("Server berjalan pada port 3000"));
