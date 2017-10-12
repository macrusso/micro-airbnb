var express = require('express'),
    router = express.Router({mergeParams: true}),
    Place = require('../models/place'),
    Comment = require('../models/comment');


router.get('/new', isLoggedIn, function (req, res) {
    Place.findById(req.params.id, function (err, foundPlace) {
        if(err){
            console.log(err);
        } else {
            res.render('./comments/new', {place:foundPlace});
        }
    });
});

router.post('/', isLoggedIn, function (req, res){
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
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.save();
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