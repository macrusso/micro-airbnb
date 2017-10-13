const   express = require('express'),
        app = express(),
        path = require('path'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        passport = require('passport'),
        LocalStrategy = require('passport-local'),
        Comment = require('./models/comment'),
        Place = require('./models/place'),
        User = require('./models/user'),
        seed = require('./seeds'),
        methodOverride = require('method-override'),
        flash = require('connect-flash');

// import routes
const   index = require('./routes/index'),
        places = require('./routes/places'),
        comments = require('./routes/comments');

// seed();  // seed the DB


// mongoose
mongoose.connect('mongodb://localhost/test2', {
    useMongoClient: true,
    promiseLibrary: global.Promise
});

// passport config
app.use(require('express-session')({
    secret: 'Faficzki robia robote',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// locals
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// general config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// routes
app.use('/', index);
app.use('/places', places);
app.use('/places/:id/comments', comments);


// module.exports = app;

app.listen(3000);
