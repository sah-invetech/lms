var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leadSchema = new Schema({
    name: {
        type: String,
        rquire: true
    },
    company: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true,
    },
    assignTo: {
        type: Schema.Types.ObectId,
        ref: 'User'
    },
    funtionType: {
        type: String,
        require: true,
        enum: ['Exchange', 'Bilateral', 'Smartech']
    },
    stage: {
        type: String,
        enum: ['Prospect', 'Contact', 'Offer', 'Negotiation', 'Closing']
    },
    closingType: {

        type: String,
        enum: ['Stale', 'Unavailable', 'Already Booked', 'Exceeded Budget', 'Newborn Reffred']
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        require: trues
    },
    lastUpdated: [String],
    todo: [{
        title: String,
        date: Date,
        time: Number, //store time in milliseconde
        option: {
            type: String,
            enum: ['email', 'call', 'meeting', 'other']
        }
    }],
    contact: [{
        name: String,
        designation: String,
        phone: Number,
        email: String,
        address: String,
        Organisation: String
    }],
    note: [String],
    file: [{
        name: String,
        filepath: String,
        uploadedBy: Schema.Types.ObjectId,
        UploadedOn: Date
    }],
    SourceName: [String]
});
var Lead = mongoose.model('Lead', leadSchema);

// make this available to our users in our Node applications
module.exports = Lead;
