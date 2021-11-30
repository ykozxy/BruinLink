const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    coursename: {type: String, required: true},
    courseid: {type: String, required: true},
    profname: {type: String, required: true},
    department: {type: String, required: true},
    division: {type: String, required: true},
    groupmeLink: {type: String},
    discordLink: {type: String},
    wechatQRCode: { image: {type: Buffer}, content_type: {type: String}},
    users_subscribed: [{ type: String }]
});
const courseModel = mongoose.model('Course', courseSchema);
module.exports = courseModel;