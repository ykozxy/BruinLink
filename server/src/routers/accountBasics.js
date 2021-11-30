const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {v4: uuidv4} = require('uuid');
const sgMail = require('@sendgrid/mail');
const config = require('../config');
const accountModel = require('./accountModel');
const courseModel = require("./courseModel");
const verificationModel = require('./verificationModel');
// import accountModel from './accountModel';
// import verificationModel from './accountModel';

const API_KEY = config.API_KEY;
sgMail.setApiKey(API_KEY);

var accountBasics = {};
accountBasics.loginResponse = loginResponse;
accountBasics.registerResponse = registerResponse;
accountBasics.changeEmailResponse = changeEmailResponse;
accountBasics.changePasswordResponse = changePasswordResponse;
accountBasics.resetPasswordResponse = resetPasswordResponse;
accountBasics.verificationCodeResponse = verificationCodeResponse;
accountBasics.getEmailResponse = getEmailResponse;
accountBasics.subscribecourse = subscribecourse;
module.exports = accountBasics;

/** @param {String} email
 @param {String} password
 */

async function setPassword(email, old_password, new_password) {
    try {
        if (email == null || old_password == null || new_password == null) {
            console.log("email or password cannot be empty");
            return false;
        }
        const filter = {email: email, password: old_password};
        const update = {password: new_password};
        const options = {runValidators: true, upsert: true};
        let account = await accountModel.updateOne(filter, {$set: update}, options);
        if (account == null) {
            console.log("account not found or old password incorrect");
            return false;
        } else {
            console.log("set password to " + new_password);
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

/** @param {String} uid
 @param {String} password
 @param {String} newemail
 */

async function setEmail(old_email, password, new_email, unique, code) {
    try {
        if (old_email == null || new_email == null || password == null) {
            console.log("password or email address cannot be empty");
            return false;
        }
        let verify = await verificationModel.findOne({ unique: unique });
        if (code != verify.code) {
            console.log("verification code not match");
            return false;
        }
        const filter = {email: old_email, password: password};
        const update = {email: new_email};
        const options = {runValidators: true, upsert: true};
        let account = await accountModel.updateOne(filter, {$set: update}, options);
        if (account == null) {
            console.log("account not found or password incorrect");
            return false;
        } else {
            console.log("set new email to " + new_email);
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}


/** @param {String} token
 */

async function getEmail(token) {
    try {
        let account = await accountModel.findOne({ token: token });
        if (account.expire_date.getTime() < Date.now()) {
            console.log("token expired");
            return null;
        }
        email = account.email;
        if (email == null) {
            console.log("token: " + token + " not found");
            return null;
        }
        console.log("email successfully found: " + email);
        return email;
    } catch (err) {
        console.log(err);
        return null;
    }
}

/** @param {String} email
 @param {String} password
 */

async function login(email, password) {
    try {
        let account = await accountModel.findOne({email: email, password: password});
        if (account == null) {
            console.log("incorrect email or password");
            return {
                email: "",
                succeed: false
            };
        }
        console.log("successfully logged in");
        token = uuidv4();
        var expire_date = new Date();
        expire_date.setDate(expire_date.getDate() + 5);
        account.set({ token: token, expire_date: expire_date });
        account.save();
        return {
            email: account.email,
            succeed: true,
            token: token
        };
    } catch (err) {
        console.log(err);
        return {
            email: "",
            succeed: false
        };
    }
}

/** @param {String} uid
 @param {String} password
 @param {String} email
 @param {String} unique
 @param {String} code
 */

async function register(password, email, unique, code) {
    try {
        const newAccount = new accountModel({
            password: password,
            email: email
        });
        let verify = await verificationModel.findOne({unique: unique});
        if (code != verify.code) {
            console.log("verification code not match");
            return false;
        }
        let saveAccount = await newAccount.save();
        if (saveAccount == null) {
            console.log("unable to create new account");
            return false;
        }
        console.log("successfully registered");
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/** @param {String} email
 */

async function verificationCode(email) {
    try {
        let format = /.*@(g.ucla.edu)|(ucla.edu)$/;
        return format.test(email);
    } catch (err) {
        console(err);
        return false;
    }
}

async function loginResponse(account_arg) {
    let email = account_arg.email;
    let password = account_arg.password;
    logged = await login(email, password);
    return logged;
}

async function registerResponse(account_arg) {
    try {
        let email_get = await getEmail(account_arg.email);
        if (email_get == null) {
            let email = account_arg.email;
            let password = account_arg.password;
            let unique = account_arg.unique;
            let code = account_arg.code;
            let registered = await register(password, email, unique, code);
            if (registered) {
                return "successfully registered";
            }
            return "failed to register";
        }
        return "email already exist";
    } catch (err) {
        console.error(err);
        return err;
    }
}

async function changePasswordResponse(account_arg) {
    try {
        let token = account_arg.token;
        let old_password = account_arg.old_password;
        let new_password = account_arg.new_password;
        let account = await accountModel.findOne({ token: token });
        if (alert(account.expire_date.getTime() < Date.now.getTime())) {
            console.log("token expired");
            return "failed to change password";
        }
        let email = account.email;
        let changePassword = await setPassword(email, old_password, new_password);
        if (changePassword) {
            return "successfully changed password";
        }
        return "failed to change password";
    } catch (err) {
        return err;
    }
}

async function resetPasswordResponse(account_arg) {
    try {
        let email = account_arg.email;
        let new_password = account_arg.new_password;
        let unique = account_arg.unique;
        let code = account_arg.code;
        let verify = await verificationModel.findOne({ unique: unique });
        if (code != verify.code) {
            console.log("verification code not match");
            return "verification code not match";
        }
        let account = await accountModel.findOne({ email: email });
        let old_password = account.password;
        let resetPassword = await setPassword(email, old_password, new_password);
        if (resetPassword) {
            return "successfully reset password";
        }
        return "failed to reset password";
    } catch (err) {
        return err;
    }
}

async function changeEmailResponse(account_arg) {
    try {
        let token = account_arg.token;
        let new_email = account_arg.new_email;
        let account = await accountModel.findOne({ token: token });
        if (alert(account.expire_date.getTime() < Date.now.getTime())) {
            console.log("token expired");
            return "failed to change email";
        }
        let old_email = account.email;
        let password = account.password;
        let unique = account_arg.unique;
        let code = account_arg.code;
        let changeEmail = await setEmail(old_email, password, new_email, unique, code);
        if (changeEmail) {
            return "successfully changed email";
        }
        return "failed to change email";
    } catch (err) {
        return err;
    }
}

async function verificationCodeResponse(account_arg) {
    try {
        let email = account_arg.email;
        let verification = verificationCode(email);
        if (verification) {
            unique = uuidv4();
            code = Math.floor(Math.random() * 1000000);
            const newVerification = new verificationModel({
                unique: unique,
                code: code
            });
            newVerification.save();
            const msg = {
                to: email, // Change to your recipient
                from: 'xcjsam@outlook.com', // Change to your verified sender
                subject: 'BruinLink Registration Verification Code',
                text: 'Your verification code is: ' + code,
            };
            sgMail.send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((err) => {
                    console.error(err);
                });
            return {
                unique: unique,
                code: code
            };
        }
        return {
            unique: "",
            code: ""
        };
    } catch (err) {
        console.error(err);
        return {
            unique: "",
            code: ""
        };
    }
}

async function getEmailResponse(account_arg) {
    try {
        let token = account_arg.token;
        let email = await getEmail(token);
        return {
            email: email,
            succeed: true
        }
    } catch (e) {
        console.log(e);
        return {
            email: "",
            succeed: false
        };
    }
}

async function subscribecourse(account_arg){
    try{
        let token = account_arg.token
        let courseid = account_arg.course
        let course = await courseModel.findOne({ courseid: courseid });
        let account = await accountModel.findOne({ token: token });
        if (account.expire_date.getTime() < Date.now.getTime()) {
            console.log("token expired");
            return "failed to subscribe, time out";
        }
        account.courses_subscribed.push(course)
        course.users_subscribed.push(account)
    }catch (err) {
        console.log(err);
        return err;
    }
}