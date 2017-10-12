var express = require('express'),
    router = express.Router(),
    Place = require('../models/place');


router.get('/', function(req, res) {
    Place.find({}, function (err, places) {
       if(err){
           console.log(err);
       } else {
           res.render('./places/index', {places: places});
       }
    });
});

router.get('/new', isLoggedIn, function (req, res) {
   res.render('./places/new');
});

router.post('/', isLoggedIn, function (req, res) {
    var author = {
       id: req.user._id,
       username: req.user.username
    };
    var newPlace = {
        name: req.body.name,
        photo: req.body.photo,
        info: req.body.info,
        author: author
    };
    Place.create(newPlace, function (err, newPlace) {
        if(err){
            console.log(err);
        } else {
            res.redirect('/places');
        }
    });
});

router.get('/:id', function (req, res) {
    Place.findById(req.params.id).populate('comments').exec( function (err, foundPlace) {
        res.render('./places/show', {place: foundPlace});
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
