const { dataUser } = require("../../database");
const bcryptjs = require("bcryptjs");
const router = require("express").Router();

router.post("/login", function (req, res, next) {
  // Ambil inputan user
  const { email, password } = req.body;

  // check di database
  const foundUser = dataUser.find((data) => data.email === email);

  // Jika email tidak terdapat di database
  if (!foundUser)
    return res
      .status(404)
      .json({ code: 404, data: ["There is no data with that email"] });

  // Jika input password dan password yang tersimpan dalam database tidak sama
  if (foundUser.password !== password)
    return res.status(400).json({ code: 400, data: ["Invalid Credentials"] });

  // Jika berhasil
  res.status(200).json({ code: 200, data: ["OK"] });
});

router.post("/register", async function (req, res, next) {
  // Ambil input user
  const { email, password } = req.body;

  // Cek dahulu apakah email sudah terdaftar atau belum
  const checkEmail = dataUser.find((data) => data.email === email);
  if (checkEmail)
    return res
      .status(400)
      .json({ code: 400, data: ["Email already registered"] });

  // Jika tidak ada maka hashing password terlebih dahulu sebelum disimpan kedalam database
  const hash = await bcryptjs.hash(password, 10);

  // Buat object untuk menampung semua data
  const result = {
    email,
    password: hash,
  };
  // Push kedalam array
  dataUser.push(result);

  // Tampilkan responses apabila sukses
  res.status(200).json({
    code: 200,
    data: {
      message: "Oke",
      data: result,
    },
  });
});

module.exports = router;
