const   express = require('express'),
        router = express.Router(),
        Place = require('../models/place'),
        middleware = require('../middleware'),
        geocoder = require('geocoder');


router.get('/', function(req, res) {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Place.find({name: regex}, function (err, foundPlace) {
            if(err){
                res.redirect('back');
            } else {
                res.render('./places/index', {places: foundPlace});
            }
         });
    } else {
        Place.find({}, function (err, allPlaces) {
            if(err){
                res.redirect('back');
            } else {
                res.render('./places/index', {places: allPlaces});
            }
         });
    }
});

router.get('/new', middleware.isLoggedIn, function (req, res) {
   res.render('./places/new');
});

router.post('/', middleware.isLoggedIn, function (req, res) {
    const author = {
       id: req.user._id,
       username: req.user.username
    };
    geocoder.geocode(req.body.location, function (err, data) {
        const newPlace = {
            name: req.body.name,
            photo: req.body.photo,
            info: req.body.info,
            price: req.body.price,
            location: data.results[0].formatted_address,
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
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
    geocoder.geocode(req.body.location, function (err, data) {
        const updatedPlace = {
            name: req.body.name,
            photo: req.body.photo,
            info: req.body.info,
            price: req.body.price,
            location: data.results[0].formatted_address,
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
        };
        Place.findByIdAndUpdate(req.params.id, updatedPlace, function (err, foundPlace) {
            if(err){
                req.flash("error", err.message);
                res.redirect('back');
            } else {
                req.flash('success', 'Location updated!');
                res.redirect('/places/' + req.params.id);
            }
        });
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
