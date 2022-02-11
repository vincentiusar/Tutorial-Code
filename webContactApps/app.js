const express = require('express');
const app = express();

const { body, validationResult, check } = require('express-validator');

const contact = require('./utils/contact');

const port = 3000;

// gunakan ejs ye
app.set('view engine', 'ejs');

// built-in middleware
// accessable directory
app.use(express.static('asset'));

// encode url
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.json({
        nama: "Saya",
        umur: "sehat",
    });
    // res.sendFile('./semutsialan.gif', {root : __dirname});
})

app.get('/index', function(req, res) {
    const mahasiswa = [
        {
            nama: 'vincetius',
            nim: '1301190221'
        },
        {
            nama: 'magic',
            nim: '1301102121'
        }
    ]
    res.render('index', { title: 'index.html', nama: 'vincentius', mahasiswa: mahasiswa });
})

app.get('/about', function(req, res) {
    res.render('about', { title: "about.html" });
})

app.get('/contact', function(req, res) {
    const contacts = contact.loadFile();
    res.render('contact', { title: "contact.html", contacts: contacts });
})

// add new contact
app.get('/contact/add', function(req, res) {
    res.render('add-contact', {
        title: "add-data.html",
        errors: undefined,
    })
})

// process add contact
app.post('/contact', [
    // check (param, error msg)
    body('email').custom( function(value) {
        if (value === undefined) return true;
        else return check('email', 'Email is not valid').isEmail()
    }),
    check('noHP', 'No HP is not valid').isMobilePhone('id-ID'), 
    body('noHP').custom( function(value) {
        const dupli = contact.findContact(value);
        if (dupli !== undefined) 
            throw new Error("No HP is already in the list");
        return true;
    } )
    ],
    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('add-contact', {
                title: "add-data.html",
                errors : errors.array(),
            })
        } else {
            contact.addContact(req.body);
            res.redirect('/contact');
        }
    }
)

// delete contact use params
app.get('/contact/delete/:noHP', function(req, res) {
    const contacts = contact.findContact(req.params.noHP);

    if (contacts === undefined) {
        res.status(404);
        res.send("<h1>No Such No HP</h1>");
    }
    contact.deleteContact(req.params.noHP);
    res.redirect('/contact');
})

app.get('/contact/edit/:noHP', function(req, res) {
    const contacts = contact.findContact(req.params.noHP);
    if (contacts === undefined) {
        res.send("<h1>Not so Fast Ferguso</h1>")
    } else {
        res.render('edit-contact', {
            contacts: contacts,
            title: 'edit-contact.html',
            errors: undefined,
        })
    }
})

// edit data
app.post('/contact/update', [
    // check (param, error msg)
    body('email').custom( function(value) {
        if (value === undefined) return true;
        else return check('email', 'Email is not valid').isEmail()
    }),
    check('noHP', 'No HP is not valid').isMobilePhone('id-ID'), 
    ],
    function(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('edit-contact', {
                title: "edit-data.html",
                contacts: req.body,
                errors : errors.array(),
            })
        } else {
            contact.editContact(req.body.tmpKey, req.body);
            res.redirect('/contact');
        }
    }
)

app.get('/contact/:noHP', function(req, res) {
    const contacts = contact.findContact(req.params.noHP);
    res.render('detail', { title: "detail.html", contacts: contacts });
})

app.use((req, res) => {
    res.status(404);
    res.send('<h1>Error: page not found</h1>');
})

app.listen(port, '127.0.0.1', function() {
    console.log('app listening port 3000');
})