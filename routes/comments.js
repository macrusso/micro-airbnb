const   express = require('express'),
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
           const newComment = {
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

router.get('/:comment_id/edit', checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if(err){
            res.redirect('back');
        } else {
            res.render('./comments/edit', {place_id: req.params.id, comment: foundComment});
        }
    });
});

router.put('/:comment_id', checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, {text: req.body.text}, function (err, foundComment) {
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/places/' + req.params.id)
        }
    });
});

router.delete('/:comment_id', checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err, foundComment){
        if(err){
            console.log(err);
        } else {
            res.redirect('/places/' + req.params.id);
        }
    });
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkCommentOwnership(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if(err){
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id)){
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