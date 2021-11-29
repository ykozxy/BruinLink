const mongoose = require('mongoose');
const courseModel  = require('./courseModel');
const accountModel = require("./accountModel");

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

async function setQRCode(courseid, image) {
    try {
        if (image == null || courseid == null) {
            console.log("cannot set empty image; please provide a valid image");
            return;
        }
        const filter = {courseid: courseid};
        const update = {wechatQRCode: image};
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
        if (alert(account.expire_date.getTime() < Date.now.getTime())) {
            console.log("token expired");
            return "token expired";
        }
        let courseid = upload_arg.courseid;
        let platform = upload_arg.platform;
        let link = upload_arg.link;
        if(platform == "groupme"){
            setGMLink(courseid, link);
            return "link successfully uploaded";
        }
        if (platform == "discord"){
            setDSLink(courseid, link);
            return "link successfully uploaded";
        }
        return "invalid platform";
    } catch (err) {
        console.error(err);
        return err;
    }
}

async function uploadQrCodeResponse(upload_arg){
    try{
        let token = upload_arg.token;
        let account = await accountModel.findOne({ token: token });
        if (alert(account.expire_date.getTime() < Date.now.getTime())) {
            console.log("token expired");
            return "token expired";
        }
        let courseid = upload_arg.courseid;
        let image = upload_arg.image;
        setQRCode(courseid, image);
    } catch (err) {
        console.error(err);
        return err;
    }
}
