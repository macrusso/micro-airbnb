const   express = require('express'),
        router = express.Router({mergeParams: true}),
        Place = require('../models/place'),
        Comment = require('../models/comment'),
        middleware = require('../middleware');


router.get('/new', middleware.isLoggedIn, function (req, res) {
    Place.findById(req.params.id, function (err, foundPlace) {
        if(err){
            res.redirect('/places');
        } else {
            res.render('./comments/new', {place: foundPlace});
        }
    });
});

router.post('/', middleware.isLoggedIn, function (req, res){
    Place.findById(req.params.id, function (err, foundPlace) {
       if(err) {
           req.flash('error', 'Item not found');
           res.redirect('/places');
       } else {
           const newComment = {
               text: req.body.text,
               author: req.body.author
           };
           Comment.create(newComment, function (err, comment) {
              if(err){
                  res.redirect('/places');
              } else {
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.save();
                  foundPlace.comments.push(comment);
                  foundPlace.save();
                  req.flash('success', 'Comment added!');
                  res.redirect('/places/' + foundPlace._id);
              }
           });
       }
    });
});

router.get('/:comment_id/edit', middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if(err){
            res.redirect('back');
        } else {
            res.render('./comments/edit', {place_id: req.params.id, comment: foundComment});
        }
    });
});

router.put('/:comment_id', middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, {text: req.body.text}, function (err, foundComment) {
        if(err){
            req.flash("error", err.message);
            res.redirect('back');
        } else {
            req.flash('success', 'Comment updated!');
            res.redirect('/places/' + req.params.id);
        }
    });
});

router.delete('/:comment_id', middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err, foundComment){
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', 'Comment deleted!');
            res.redirect('/places/' + req.params.id);
        }
    });
});


module.exports = router;
