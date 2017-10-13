const   express = require('express'),
        router = express.Router(),
        Place = require('../models/place'),
        middleware = require('../middleware');


router.get('/', function(req, res) {
    Place.find({}, function (err, places) {
       if(err){
           res.redirect('back');
       } else {
           res.render('./places/index', {places: places});
       }
    });
});

router.get('/new', middleware.isLoggedIn, function (req, res) {
   res.render('./places/new');
});

router.post('/', middleware.isLoggedIn, function (req, res) {
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
            res.redirect('back');
        } else {
            req.flash('success', 'Location created!');
            res.redirect('/places');
        }
    });
});

router.get('/:id', function (req, res) {
    Place.findById(req.params.id).populate('comments').exec( function (err, foundPlace) {
        res.render('./places/show', {place: foundPlace});
    });
});

router.get('/:id/edit', middleware.checkPlaceOwnership, function (req, res) {
    Place.findById(req.params.id, function (err, foundPlace) {
        res.render('./places/edit', {place: foundPlace});
    });
});

router.put('/:id', middleware.checkPlaceOwnership, function (req, res) {
    const updatedPlace = {
        name: req.body.name,
        photo: req.body.photo,
        info: req.body.info
    };
    Place.findByIdAndUpdate(req.params.id, updatedPlace, function (err, foundPlace) {
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', 'Location edited!');
            res.redirect('/places/' + req.params.id);
        }
    });
});

router.delete('/:id', middleware.checkPlaceOwnership, function (req, res) {
    Place.findByIdAndRemove(req.params.id, function (err, foundPlace) {
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', 'Location deleted!');
            res.redirect('/places');
        }
    });
});


module.exports = router;
