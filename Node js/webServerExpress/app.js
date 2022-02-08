const express = require('express');
const app = express();

const port = 3000;

app.get('/', function(req, res) {
    res.json({
        nama: "Saya",
        umur: "sehat",
    });
})

app.get('/index', function(req, res) {
    res.sendFile('./index.html', {root : __dirname});
})

app.get('/about', function(req, res) {
    res.sendFile('./about.html', {root : __dirname});
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

app.listen(port, function() {
    console.log('app listening port 3000');
})