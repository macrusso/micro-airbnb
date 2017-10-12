var express = require('express');
var router = express.Router();
var Place = require('../models/place');
var Comment = require('../models/comment');


router.get('/:id/comments/new', isLoggedIn, function (req, res) {
    Place.findById(req.params.id, function (err, foundPlace) {
        if(err){
            console.log(err);
        } else {
            res.render('./comments/new', {place:foundPlace});
        }
    });
});

router.post('/:id/comments', isLoggedIn, function (req, res){
    Place.findById(req.params.id, function (err, foundPlace) {
       if(err) {
           console.log(err);
           res.redirect('/places');
       } else {
           var newComment = {
               text: req.body.text,
               author: req.body.author
           };
           Comment.create(newComment, function (err, comment) {
              if(err){
                  console.log(err);
              } else {
                  foundPlace.comments.push(comment);
                  foundPlace.save();
                  res.redirect('/places/' + foundPlace._id);
              }
           });
       }
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;