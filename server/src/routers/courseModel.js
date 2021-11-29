const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import accountModel from './accountModel';

const courseSchema = new Schema({
    coursename: {type: String, required: true, unique: true},
    courseid: {type: String, required: true, unique: true},
    profname: {type: String, required: true},
    department: {type: String, required: true},
    division: {type: String, required: true},
    groupmeLink: {type: String},
    discordLink: {type: String},
    wechatQRCode: {type: Buffer},
    users_subscribed: [{ type: Schema.Types.ObjectId, ref: 'Account' }]
});
const courseModel = mongoose.model('Course', courseSchema);
module.exports = courseModel;