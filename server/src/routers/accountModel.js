const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseModel = require("./courseModel");

const accountSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    expire_date: { type: Date, default: null},
    courses_subscribed: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
    //clubList: [clubSchema]
});

const accountModel = mongoose.model('Account', accountSchema);
module.exports = accountModel;