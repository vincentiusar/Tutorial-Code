// call file (bukan import)
require('./code1');

console.log('hello saya');

const fs = require('fs');   // core module
const say = require('./code2');

console.log(say('tius'));

var coba3 = require('./coba3');
console.log(coba3);

console.log(
    coba3.sayHello(),
    '\n', coba3.x,
    '\n' + coba3.mahasiswa.Info()
);
var mhs = new coba3.Mahasiswa(1301190221, 'vincentius');
console.log(mhs.getId());
console.log(mhs.getName());