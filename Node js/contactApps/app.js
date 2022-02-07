const contacts = require('./contact.js');
const yargs = require('yargs');
const chalk = require('chalk');
const { argv } = require('yargs');

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

// add contact
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
}).demandCommand();
// node app add help

// CLI input
yargs.command({
    command: 'manual',
    describe: 'manually add new contact',
    builder: {},
    handler() {
        main();
    },
})

// show list
yargs.command({
    command: 'list',
    describe: 'Show All List Contact',
    builder: {},
    handler() {
        console.log(chalk.bgCyan.black('Daftar Contact'));
        contacts.listContact();
    }
})

// show detail of contact on name
yargs.command({
    command: 'detail',
    describe: 'show detail of contact based on name',
    builder: {
        nama: {
            describe: 'Nama',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    }
})

yargs.command({
    command: 'remove',
    describe: 'delete data berdasarkan noHP',
    builder: {
        noHP: {
            describe: 'Nama',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        contacts.deleteContact(argv.noHP);
    }
})

yargs.parse();