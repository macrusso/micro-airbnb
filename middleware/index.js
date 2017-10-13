const   Place = require('../models/place'),
        Comment = require('../models/comment');

const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
};

middlewareObj.checkPlaceOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Place.findById(req.params.id, function (err, foundPlace) {
            if(err){
                req.flash('error', 'Item not found');
                res.redirect('back');
            } else {
                if(foundPlace.author.id.equals(req.user._id)){
                    return next();
                } else {
                    req.flash('error', 'You do not have permission to do that');
                    res.redirect('/places/' + req.params.id);
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if(err){
                req.flash('error', 'Item not found');
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    return next();
                } else {
                    req.flash('error', 'You do not have permission to do that');
                    res.redirect('/places/' + req.params.id);
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('back');
    }
};


module.exports = middlewareObj;
