const express = require('express');
const app = express();

const port = 3000;

// gunakan ejs ye
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.json({
        nama: "Saya",
        umur: "sehat",
    });
    // res.sendFile('./semutsialan.gif', {root : __dirname});
})

app.get('/index', function(req, res) {
    // res.sendFile('./index.html', {root : __dirname});
    // render(file dalam views, adt mengirim variable)
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

app.get('/product/:id/category/:idCat', (req, res) => {
    res.send(`Product ID : ${req.params.id} <p> Category : ${req.params.idCat}`);
})

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <p> Category : ${req.query.category}`);
})

app.use((req, res) => {
    res.status(404);
    res.send('<h1>Error: page not found</h1>');
})

app.listen(port, '127.0.0.1', function() {
    console.log('app listening port 3000');
})