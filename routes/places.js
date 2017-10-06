var express = require('express');
var router = express.Router();
var Place = require('../models/place');



router.get('/', function(req, res) {
    Place.find({}, function (err, places) {
       if(err){
           console.log('Something went wrong ' + err);
       } else {
           res.render('./places/index', {places: places});
       }
    });
});


router.get('/new', function (req, res) {
   res.render('./places/new');
});


router.post('/', function (req, res) {
    var newPlace = {
        name: req.body.name,
        photo: req.body.photo,
        info: req.body.info
    };
    Place.create(newPlace, function (err, place) {
        if(err){
            console.log('Something went wrong ' + err);
        } else {
            res.redirect('/places');
        }
    });
});


router.get('/:id', function (req, res) {
    console.log(req.params.id);
    Place.findById(req.params.id, function (err, foundPlace) {
        res.render('./places/show', {place: foundPlace});
    });
});

module.exports = router;
