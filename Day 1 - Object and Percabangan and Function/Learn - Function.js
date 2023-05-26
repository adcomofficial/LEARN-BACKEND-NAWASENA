// FUNGSI

// OBJECT
// PERCABANGAN
// FUNCTION

const person = {
  name: "Farhan",
  age: 19,
  nilai: 90,
  favorite_books: {
    title: "E-Book Cara meluluhkan hati Ayang",
    author: "Bayu Junior Something",
    publisher: "PT MAHDA Cinta Sejati",
  },
};

// Combine semua yang telah dipelajari

function cekNilai(object) {
  if (object.nilai >= 90) {
    console.log(
      `Nilai dari ${object.name} ialah ${object.nilai} maka ia mendapat nilai A `
    );
  } else if (object.nilai >= 80) {
    console.log(
      `Nilai dari ${object.name} ialah ${object.nilai} maka ia mendapat nilai B `
    );
  } else if (nilai >= 70) {
    console.log(
      `Nilai dari ${object.name} ialah ${object.nilai} maka ia mendapat nilai B `
    );
  } else {
    console.log("Anda Gagal 😱");
  }
}

cekNilai(person);
