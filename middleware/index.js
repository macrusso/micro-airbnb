const   Place = require('../models/place'),
        Comment = require('../models/comment');

const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};

middlewareObj.checkPlaceOwnership = function(req, res, next) {
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
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
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
};


module.exports = middlewareObj;