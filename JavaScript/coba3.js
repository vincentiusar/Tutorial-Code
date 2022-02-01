const say = require("./code2");

function sayHello() {
    return 'hello world';
}

const x = 8;

var mahasiswa = {
    nama : 'vincentius',
    nim : '1301190221',
    Info() {
        return `saya ${this.nama} dengan nim ${this.nim}`;
    },
}

class Mahasiswa {
    id = 0;
    nama = "";

    constructor(id, nama) {
        this.setId(id);
        this.setName(nama);
    }

    setName(nama) {
        this.nama = nama;
    }

    getName() {
        return this.nama;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }
}

module.exports.sayHello = sayHello;
module.exports.x = x;
module.exports.mahasiswa = mahasiswa;
module.exports.Mahasiswa = Mahasiswa;

// alternative

// module.exports = {
//     sayHello = sayHello,
//     x = x,
//     mahasiswa = mahasiswa,
//     Mahasiswa = Mahasiswa
// }