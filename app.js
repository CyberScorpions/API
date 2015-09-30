var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;

// ENV 'Test' is set in the gulp file
if (process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://localhost/API_test');
else
    db = mongoose.connect('mongodb://localhost/API');

// Defines the Book schema in Mongoose
var Book = require('./models/bookModel');

// This is an express Web application
var app = express();

var port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/REST/books', bookRouter);

app.get('/', function (req, res) {
    res.send('welcome to my api');
});

app.listen(port, function () {
    console.log('Running on port: ' + port);
});

// this allows supertest to execute the app
module.exports = app;