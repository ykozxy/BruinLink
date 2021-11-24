const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const sgMail = require('@sendgrid/mail');
const config = require('../config');

const API_KEY = config.API_KEY;
const db = mongoose.connect("mongodb+srv://samxu:xcjsam789789@bruinlink.b9irv.mongodb.net/BruinLink?retryWrites=true&w=majority");
sgMail.setApiKey(API_KEY);

var accountBasics = {};
accountBasics.loginResponse = loginResponse;
accountBasics.registerResponse = registerResponse;
accountBasics.changeEmailResponse = changeEmailResponse;
accountBasics.changePasswordResponse = changePasswordResponse;
accountBasics.verificationCodeResponse = verificationCodeResponse;
module.exports = accountBasics;

const accountSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    //courseList: [courseSchema],
    //clubList: [clubSchema]
});

const verificationSchema = new Schema({
    createdAt: { type: Date, expires: 300, default: Date.now },
    unique: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
});

const accountModel = mongoose.model('Account', accountSchema);
const verificationModel = mongoose.model('Verification', verificationSchema);

/** @param {String} email 
    @param {String} password
 */

async function setPassword(email, password) {
    try {
        if (email == null || password == null) {
            console.log("email or password cannot be empty");
            return false;
        }
        const filter = { email: email };
        const update = { password: password };
        const options = { runValidators: true, upsert: true };
        let account = await accountModel.updateOne(filter, { $set: update }, options);
        if (account == null) {
            console.log("account not found");
            return false;
        } else {
            console.log("set password to " + password);
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

async function setEmail(uid, password, newemail) {
    try {
        if (uid == null || password == null || email == null) {
            console.log("user id or password or email address cannot be empty");
            return false;
        }
        const filter = { uid: uid, password: password };
        const update = { email: newemail };
        const options = { runValidators: true, upsert: true };
        let account = await accountModel.updateOne(filter, { $set: update }, options);
        if (account == null) {
            console.log("account not found or password incorrect");
            return false;
        } else {
            console.log("set new email to " + password);
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

/** @param {String} email
 */

async function getEmail(email) {
    try {
        let email_get = await accountModel.findOne({ email: email }, 'email');
        if (email_get == null) {
            console.log("email: " + email + " not found");
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
        let account = await accountModel.findOne({ email: email, password: password });
        if (account == null) {
            console.log("incorrect email or password");
            return {
                email: "",
                succeed: false
            };
        }
        console.log("successfully logged in");
        return {
            email: account.email,
            succeed: true
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
        let verify = await verificationModel.findOne({ unique: unique });
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
        let email = account_arg.email;
        let password = account_arg.password;
        let changePassword = await setPassword(email, password);
        if (changePassword) {
            return "successfully changed password";
        }
        return "failed to change password";
    } catch (err) {
        return err;
    }
}

async function changeEmailResponse(account_arg) {
    try {
        let uid = account_arg.uid;
        let email = account_arg.email;
        let password = account_arg.password;
        let changeEmail = await setEmail(uid, password, email);
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
