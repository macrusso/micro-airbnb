const mongoose = require('mongoose'),
    passportLocalMongoode = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
   username: String,
   password: String
});

UserSchema.plugin(passportLocalMongoode);

module.exports = mongoose.model('User', UserSchema);