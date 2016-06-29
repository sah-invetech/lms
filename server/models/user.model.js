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
    role: {
        type: String,
        enum: ['admin', 'vp', 'rm', 'tm']
    },
    age: Number,
    website: String,
    createdAt: Date,
    updatedAt: Date,
    viewModules: [String],
    status: { type: String, emum: ['active', 'deactive'] },
    invetetionToken: String,
    google: {
        id: String,
        email: String,
        token: String,
        name: String,
        email: String
    }
});
userSchema.methods.validPassword = function(password) {
    if (this.password == password)
        return true;
    else
        return false;
};
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
