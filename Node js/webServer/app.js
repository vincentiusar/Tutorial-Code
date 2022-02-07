const http = require('http');
const fs = require('fs');

const ip = '127.0.0.1';
const port = 3000

const renderHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('<h1>Error: file not found</h1>');
        } else {
            res.write(data);
        }
        res.end();
    });
};

// bisa gini atau langsung listen
const server = http.createServer((req, res) => {
    const url = req.url;

    res.writeHead(200, {
        'Content-Type': 'text/html',
    })

    switch (url) {
        case ('/about') :
            // res.write(fs.readFileSync('./about.html', 'utf-8'));

            renderHTML('./about.html', res);
            break;
        case ('/index') :
            // res.write(fs.readFileSync('./index.html', 'utf-8'));

            renderHTML('./index.html', res);
            break;

        default :
            renderHTML('', res);
            break;
    }
});

server.listen(port, ip, () => {
    console.log('Listening localHost:3000');
});

// http
//     .createServer((req, res) => {
    
//         res.writeHead(200, {
//             'Content-Type': 'text/html',
//         });

//         const url = req.url;

//         if (url === '/about') {
//             renderHTML('./about.html', res);
//         } else {
//             renderHTML('./index.html', res);
//         }
//     })
//     .listen(port, () => { console.log('Listening localHost:3000');})