const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verificationSchema = new Schema({
    createdAt: {type: Date, expires: 300, default: Date.now},
    unique: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
});

const verificationModel = mongoose.model('Verification', verificationSchema);
module.exports = verificationModel;