const   express = require('express'),
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
    const author = {
       id: req.user._id,
       username: req.user.username
    };
    const newPlace = {
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

router.get('/:id/edit', checkPlaceOwnership, function (req, res) {
    Place.findById(req.params.id, function (err, foundPlace) {
        res.render('./places/edit', {place: foundPlace});
    });
});

router.put('/:id', checkPlaceOwnership, function (req, res) {
    const updatedPlace = {
        name: req.body.name,
        photo: req.body.photo,
        info: req.body.info
    };
    Place.findByIdAndUpdate(req.params.id, updatedPlace, function (err, foundPlace) {
        if(err){
            console.log(err);
        } else {
            res.redirect('/places/' + req.params.id);
        }
    });
});

router.delete('/:id', checkPlaceOwnership, function (req, res) {
    Place.findByIdAndRemove(req.params.id, function (err, foundPlace) {
        if(err){
            console.log(err);
        } else {
            res.redirect('/places');
        }
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkPlaceOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Place.findById(req.params.id, function (err, foundPlace) {
            if(err){
                res.redirect('back');
            } else {
                if(foundPlace.author.id.equals(req.user._id)){
                    return next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}


module.exports = router;
