const courseModel  = require('./courseModel');
const accountModel = require("./accountModel");
const sgMail = require('@sendgrid/mail');
const config = require('../config');

const API_KEY = config.API_KEY;
sgMail.setApiKey(API_KEY);

var uploadBasics = {};
uploadBasics.uploadLinkResponse = uploadLinkResponse;
uploadBasics.uploadQrCodeResponse = uploadQrCodeResponse;
module.exports = uploadBasics;

/**
 *  setgmlink with 2 inputs
 *
 *  @param {String} courseId
 *  @param {String} link
 *
 *  @return {boolean} whether setgmLink is successful or not
 */
 async function setGMLink(courseid, link) {
    try {
        if (link == null || courseid == null) {
            console.log("cannot set empty gmlink; please provide a valid gmlink");
            return;
        }
        const filter = {courseid: courseid};
        const update = {groupmeLink: link};
        const options = {runValidators: true, upsert: true};
        let user = await courseModel.updateOne(filter, {$set: update}, options);
        if (user == null) {
            console.log("unable to find the course; failed to set link");
            return false;
        } else {
            console.log("set link to " + link);
            return true;
        }
    } catch (err) {
        console.log("Error pops");
        return false;
    }
}

/**
 *  setdslink with 2 inputs
 *
 *  @param {String} courseId
 *  @param {String} link
 *
 *  @return {boolean} whether setdsLink is successful or not
 */
async function setDSLink(courseid, link) {
    try {
        if (link == null || courseid == null) {
            console.log("cannot set empty dslink; please provide a valid dslink");
            return;
        }
        const filter = {courseid: courseid};
        const update = {discordLink: link};
        const options = {runValidators: true, upsert: true};
        let user = await courseModel.updateOne(filter, {$set: update}, options);
        if (user == null) {
            console.log("unable to find the course; failed to set link");
            return false;
        } else {
            console.log("set link to " + link);
            return true;
        }
    } catch (err) {
        console.log("Error pops");
        return false;
    }
}

async function setQRCode(courseid, image, content_type) {
    try {
        if (image == null || courseid == null) {
            console.log("cannot set empty image; please provide a valid image");
            return;
        }
        const filter = {courseid: courseid};
        const update = {wechatQRCode: {image: image.buffer, content_type: content_type}};
        const options = {runValidators: true, upsert: true};
        let user = await courseModel.updateOne(filter, {$set: update}, options);
        if (user == null) {
            console.log("unable to find the course; failed to set qrcode");
            return false;
        } else {
            console.log("successfully set qrcode");
            return true;
        }
    } catch (err) {
        console.log("Error pops");
        return false;
    }
}

async function uploadLinkResponse(upload_arg){
    try{
        let token = upload_arg.token;
        let account = await accountModel.findOne({ token: token });
        if (account.expire_date.getTime() < Date.now()) {
            console.log("token expired");
            return "token expired";
        }
        let courseid = upload_arg.courseid;
        let platform = upload_arg.platform;
        let link = upload_arg.link;
        if(platform == "groupme"){
            setGMLink(courseid, link);
            subscriptionEmailSend(courseid, platform);
            return "link successfully uploaded";
        }
        if (platform == "discord"){
            setDSLink(courseid, link);
            subscriptionEmailSend(courseid, platform);
            return "link successfully uploaded";
        }
        return "invalid platform";
    } catch (err) {
        console.error(err);
        return err;
    }
}

async function subscriptionEmailSend(courseid, platform) {
    try{
        let course = await courseModel.findOne({ courseid: courseid });
        let coursename = course.coursename;
        for (i=0; i<course.users_subscribed.length;i++)
        {
            userID = course.users_subscribed[i];
            let account = await accountModel.findOne({ _id: userID });
            let email = account.email;
            const msg = {
                to: email,
                from: 'xcjsam@outlook.com',
                subject: 'BruinLink Subscription Notification',
                text: 'Your subscribed course ' + coursename + ' has updated its ' + platform + ' link/QR code.',
            };
            sgMail.send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((err) => {
                    console.error(err);
                });

        }
    }catch (err) {
        console.error(err);
        return err;
    }
}

async function uploadQrCodeResponse(upload_arg, file){
    try{
        let token = upload_arg.token;
        let account = await accountModel.findOne({ token: token });
        if (account.expire_date.getTime() < Date.now()) {
            console.log("token expired");
            return "token expired";
        }
        let courseid = upload_arg.courseid;
        let image = file;
        let content_type = file.mimetype;
        await setQRCode(courseid, image, content_type);
        subscriptionEmailSend(courseid, "wechat");
        return "QR Code successfully uploaded";
    } catch (err) {
        console.error(err);
        return err;
    }
}
