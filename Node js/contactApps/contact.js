const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const readline = require('readline');
const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout,
} );

if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

if (!fs.existsSync('./data/contacts.json')) {
    fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
}

// promise
// object representasi keberhasilan event async di masa depan
// states ( fulfulled / rejected / pending )
// callback ( resolve / reject / finally ) 
// action ( then / catch )

// let ditepati = false;
// const janji = new Promise((resolve, reject) => {
//     if (ditepati) resolve('janji ditepati');
//     else reject('ingkar janji');
// });

// janji
//     .then(response => console.log(`OK! : ${response}`))
//     .catch(response => console.log(`NOT OK! : ${response}`));

// used promise to solve callback hell

const Question = (argument) => {
    return new Promise((resolve, rejects) => {
        rl.question(argument, (nama) => {
            resolve (nama);
        });
    });
}

const save = (contact) => {

    const file = fs.readFileSync('data/contacts.json');
    const contacts = JSON.parse(file);

    // duplicate check
    let dupli = false;
    for (let i = 0; i < contacts.length && !dupli; i++) {
        if (contacts[i].noHP === contact.noHP) {
            dupli = true;
        }
    }

    if (contact.email != '') {
        if (!validator.isEmail(contact.email)) {
            console.log(chalk.bgRed.black('Not a Valid Email'));
            rl.close();
            return false;
        }
    }

    if (!validator.isMobilePhone(contact.noHP, 'id-ID')) {
        console.log(chalk.bgRed.black('Not a Valid Phone Number'));
            rl.close();
            return false;
    }

    if (dupli) {
        console.log(chalk.bgRed.black('Nomor sudah ada'));
        rl.close();
        return false;
    } else {
        console.log(chalk.bgBlue.black(`thanks ${contact.nama}, your number ${contact.noHP}, your mail ${contact.email}`));  
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    rl.close();
} 

// callback hell
// rl.question('Nama anda : ', (nama) => {
//     rl.question('Nomor hape : ', (no) => {
//         const contact = { nama, no };
//         console.log(`thanks ${nama}, your number ${no}`);

//         if (!fs.existsSync('./data')) {
//             fs.mkdirSync('./data');
//         }
        
//         if (!fs.existsSync('./data/contacts.json')) {
//             fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
//         }

//         const file = fs.readFileSync('data/contacts.json');
//         const contacts = JSON.parse(file);

//         contacts.push(contact);

//         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
//         rl.close();
//     })
// } )

module.exports = {
    Question,
    save,
}
