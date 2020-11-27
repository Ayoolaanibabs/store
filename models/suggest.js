const mongoose = require('mongoose');
const Schema = mongoose.Schema

const suggestSchema = new Schema({
    itemName:{
        type: String,
        required: true
    },
    itemDescription:{
        type: String,
        required: true
    },
    itemCategory: {
        type: String,
        rewuired: true,
        enum: ['electronics','furniture','grocery']
    },
    reason: {
        type: String
    }
})

const Suggest = mongoose.model('Suggest', suggestSchema);
module.exports = Suggest;