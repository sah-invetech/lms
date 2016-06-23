var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
      type:String,
      enum:['admin','vp','rm','tm']
    },
    age: Number,
    website: String,
    created_at: Date,
    updated_at: Date
});

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
