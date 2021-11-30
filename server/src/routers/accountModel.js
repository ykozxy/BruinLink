const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    expire_date: { type: Date, default: null},
    courses_subscribed: [{ type: String, unique: true}]
    //clubList: [clubSchema]
});

const accountModel = mongoose.model('Account', accountSchema);
module.exports = accountModel;