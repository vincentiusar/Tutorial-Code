const fs = require('fs');

// write file (sync)
fs.writeFileSync('export/app.txt', "coba aja deh sync");

// write file (asyn)
// uncomment if readline is unused
// fs.writeFile('export/app2.txt', 'halo mank', ex => { console.log(ex); } );

// read file (sync)
var text = fs.readFileSync('export/app.txt');
console.log(text);
console.log(text.toString());

// read file (async)
// uncomment if readline is unused
// var text = fs.readFile('export/app2.txt', 'utf-8', (ex, data) => {
//     if (ex) throw ex;
//     console.log(data);
// })

const readline = require('readline');
const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout,
} );

rl.question('Nama anda : ', (nama) => {
    rl.question('Nomor hape : ', (no) => {
        const contact = { nama, no };
        console.log(`thanks ${nama}, your number ${no}`);

        const file = fs.readFileSync('export/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);

        contacts.push(contact);

        fs.writeFileSync('export/contacts.json', JSON.stringify(contacts));
        rl.close();
    })
} )