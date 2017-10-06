var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var places = require('./routes/places');
var comments = require('./routes/comments');
var seed = require('./seeds');

seed();
var app = express();


// mongoose
mongoose.connect('mongodb://localhost/test2', {
    useMongoClient: true,
    promiseLibrary: global.Promise
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use('/', index);
app.use('/places', places);
app.use('/places', comments);









module.exports = app;
