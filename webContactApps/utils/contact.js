const fs = require('fs');

if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

if (!fs.existsSync('./data/contacts.json')) {
    fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
}

const loadFile = function() {
    const file = fs.readFileSync('./data/contacts.json');
    const contacts = JSON.parse(file);
    return contacts;
}

const save = function(contacts) {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

const addContact = function(contact) {
    const contacts = loadFile();
    contacts.push(contact);

    save(contacts);
}

function findContact(noHP) {
    const file = loadFile();

    for (let i = 0; i < file.length; i++) {
        if (noHP === file[i].noHP) return file[i];
    }

    return undefined;
}

module.exports = {
    loadFile,
    findContact,
    addContact,
}
