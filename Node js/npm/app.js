const validator = require('validator');
const chalk = require('chalk'); // vers 4.1.0
const cout = console.log;       // define cout console.log

cout(validator.isEmail('vincentius@gmail.com'));
cout(validator.isMobilePhone('087875263373', 'id-ID'));
cout(validator.isMobilePhone('077875263373', 'id-ID'));
cout(validator.isNumeric('09892'));

cout(chalk.bold.black.bgBlue("Hello world"));

const nama = "Nathan";
const pesan = chalk`hello {bgRed.blue.strikethrough work}, hello {bgGreen world}. nama saya ${nama}`;
cout(chalk(pesan));