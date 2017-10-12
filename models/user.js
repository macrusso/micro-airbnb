var mongoose = require('mongoose'),
    passportLocalMongoode = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
   username: String,
   password: String
});

UserSchema.plugin(passportLocalMongoode);

module.exports = mongoose.model('User', UserSchema);