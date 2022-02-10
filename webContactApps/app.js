const express = require('express');
const app = express();

const contact = require('./utils/contact');

const port = 3000;

// gunakan ejs ye
app.set('view engine', 'ejs');

// built-in middleware
// accessable directory
app.use(express.static('asset'));

// encode url
app.use(express.urlencoded());

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
    })
})

// process add contact
app.post('/contact', function(req, res) {
    contact.addContact(req.body);
    res.redirect('/contact');
})

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