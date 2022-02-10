const express = require('express');
const app = express();

const morgan = require('morgan');

const port = 3000;

// gunakan ejs ye
app.set('view engine', 'ejs');

// 3rd party middleware
app.use(morgan('dev'));

// built-in middleware
app.use(express.static('asset'));

// application level middleware
app.use((req, res, next) => {
    console.log('time : ', Date.now());
    // jangan lupa next klo ga dia hanging
    next();
})

// next dia akan jalankan middleware selanjutnya yang req mesg sesuai

// app.use((req, res, next) => {
//     console.log('mid 2nd');
//     // jangan lupa next klo ga dia hanging
//     next();
// })

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

// app.use((req, res, next) => {
//     console.log('mid 3rd');
//     // jangan lupa next klo ga dia hanging
//     next();
// })

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