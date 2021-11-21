const mongoose = require('mongoose');
const schema = mongoose.Schema;

const db = mongoose.connect("mongodb+srv://samxu:xcjsam789789@bruinlink.b9irv.mongodb.net/BruinLink?retryWrites=true&w=majority");

var accountBasics = {};
accountBasics.loginResponse = loginResponse;
accountBasics.registerResponse = registerResponse;
accountBasics.changeEmailResponse = changeEmailResponse;
accountBasics.changePasswordResponse = changePasswordResponse;
accountBasics.verificationCodeResponse = verificationCodeResponse;
module.exports = accountBasics;

const accountSchema = new schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //courseList: [courseSchema],
    //clubList: [clubSchema]
});

const accountModel = mongoose.model('Account', accountSchema);

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
        let email = await accountModel.findOne({ email: email }, 'email');
        if (email == null) {
            console.log("email: " + email + " not found");
            return email;
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
                uid: "",
                succeed: false
            };
        }
        console.log("successfully logged in");
        return {
            uid: account.uid,
            succeed: true
        };
    } catch (err) {
        console.log(err);
        return {
            uid: "",
            succeed: false
        };
    }
}

/** @param {String} uid
    @param {String} password
    @param {String} email
 */

async function register(uid, password, email) {
    try {
        const newAccount = new accountModel({
            uid: uid,
            password: password,
            email: email
        });
        let saveAccount = await newAccount.save();
        if (saveAccount == null) {
            console.log("unable to create new account:");
            return false;
        }
        console.log("successfully registered");
        return true;
    } catch (err) {
        console(err);
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
            let uid = account_arg.uid;
            let email = account_arg.email;
            let password = account_arg.password;
            let registered = await register(uid, password, email);
            if (registered) {
                return "successfully registered";
            }
            return "failed to register";
        }
        return "email already exist";
    } catch (err) {
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
            return "successfully sent verification code";
        }
        return "failed to send verification code";
    } catch (err) {
        return err;
    }
}
