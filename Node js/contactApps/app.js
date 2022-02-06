const contacts = require('./contact.js');
const yargs = require('yargs');

// can be written as
// const contacts { Question, save } = require('./contact.js');

const main = async() => {
    const nama = await contacts.Question('Enter Name : ');
    const email = await contacts.Question('Enter Mail : ');
    const noHP = await contacts.Question('Enter phone : ');

    const contact = { nama, email, noHP };

    contacts.save(contact);
}

// main();

// take argument from CLI
// yargs.command({'add', 'Add New Contact', () => {}, (argv) => {
//     console.log(argv.nama);
// })

yargs.command({
    command: 'add',
    describe: 'add new contact',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        }, 
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: 'No HP',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        if (argv.email === undefined) argv.email = "";
        const contact = {
            nama: argv.nama,
            email: argv.email,
            noHP: argv.noHP,
        }
        contacts.save(contact);
    },
})
// node app add help

yargs.command({
    command: 'manual',
    describe: 'manually add new contact',
    builder: {},
    handler() {
        main();
    },
})

yargs.parse();