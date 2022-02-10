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

const listContact = function() {
    const contacts = loadFile();
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.noHP}`);
    })
}

const detailContact = function(nama) {
    const contacts = loadFile();

    // find module
    // const contact = contacts.find((contact) => contact.nama === nama)

    let found = false;
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].nama.toLowerCase() === nama.toLowerCase()) {
            console.log(`${contacts[i].nama} - ${contacts[i].email} - ${contacts[i].noHP}`); 
            found = true; 
        }
    }

    if (!found) console.log(chalk.bgRed.black('Data not Found'));
}

const deleteContact = function(noHP) {
    let contacts = loadFile();

    // filter
    // const newData = contacts.filter((contact) => contact.noHP !== noHP);

    let data = [];
    let found = false;
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].noHP !== noHP) {
            data.push(contacts[i]);
        } else if (contacts[i].noHP === noHP) found = true;
    }

    if (!found) {
        console.log(chalk.bgRed.black('Data not Found'));
        return;
    }

    console.log(chalk.bgCyanBright.black('Data Removed'));
    fs.writeFileSync('data/contacts.json', JSON.stringify(data));
}

const loadFile = function() {
    const file = fs.readFileSync('data/contacts.json');
    const contacts = JSON.parse(file);
    return contacts;
}

const save = (contact) => {
    
    // to loadFile func
    // const file = fs.readFileSync('data/contacts.json');
    // const contacts = JSON.parse(file);

    const contacts = loadFile();

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
            return false;
        }
    }

    if (!validator.isMobilePhone(contact.noHP, 'id-ID')) {
        console.log(chalk.bgRed.black('Not a Valid Phone Number'));
            return false;
    }

    if (dupli) {
        console.log(chalk.bgRed.black('Nomor sudah ada'));
        return false;
    } else {
        console.log(chalk.bgBlue.black(`thanks ${contact.nama}, your number ${contact.noHP}, your mail ${contact.email}`));  
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    rl.close();
} 

rl.close();
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
    listContact,
    detailContact,
    deleteContact,
    loadFile
}
