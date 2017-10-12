var mongoose = require("mongoose"),
    Place = require("./models/place"),
    Comment = require("./models/comment");

var data = [{
        name: "Hotel 101",
        photo: "https://officesnapshots.com/wp-content/uploads/2015/11/airbnb-london-office-design-9.jpg",
        info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Floating Home",
        photo: "https://www.designboom.com/wp-content/uploads/2015/05/airbnb-floating-house-river-thames-london-designboom-05.jpg",
        info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Tower",
        photo: "https://www.destinationtips.com/wp-content/uploads/2015/05/water-tower-airbnb-London.jpg",
        info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

function seedDB() {
    Place.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed places!");
        data.forEach(function(seed) {
            Place.create(seed, function(err, place) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a place");
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            place.comments.push(comment);
                            place.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;
