const express = require("express");
const router = express.Router();
const accountBasics = require('./accountBasics');

router.post('/login', accountLogin);
router.post('/register', accountRegister);
router.post('/changeEmail', accountChangeEmail);
router.post('/changePassword', accountChangePassword);
router.post('/resetPassword', accountResetPassword);
router.post('/emailVerify', sendVerificationCode);
module.exports = router;

async function accountLogin(req, res) {
    try {
        let response = await accountBasics.loginResponse(req.body);
        if (response.succeed) {
            res.send({
                status: "success",
                token: response.token,
                message: "successfully logged in"
            })
        }
        else {
            res.send({
                status: "failed",
                message: "login failed"
            })
        }
    } catch (err) {
        res.send({
            status: "failed",
            message: err
        })
    }
}

async function accountRegister(req, res) {
    try {
        let response = await accountBasics.registerResponse(req.body);
        if (response == "successfully registered") {
            res.send({
                status: "success",
                message: response
            })
        }
        else {
            res.send({
                status: "failed",
                message: response
            })
        }
    } catch (err) {
        res.send({
            status: "failed",
            message: err
        })
    }
}

async function accountChangeEmail(req, res) {
    try {
        let response = await accountBasics.changeEmailResponse(req.body);
        if (response == "successfully changed email") {
            res.send({
                status: "success",
                message: response
            })
        }
        else {
            res.send({
                status: "failed",
                message: response
            })
        }
    } catch (err) {
        res.send({
            status: "failed",
            message: err
        })
    }
}

async function accountChangePassword(req, res) {
    try {
        let response = await accountBasics.changePasswordResponse(req.body);
        if (response == "successfully changed password") {
            res.send({
                status: "success",
                message: response
            })
        }
        else {
            res.send({
                status: "failed",
                message: response
            })
        }
    } catch (err) {
        res.send({
            status: "failed",
            message: err
        })
    }
}

async function accountResetPassword(req, res) {
    try {
        let response = await accountBasics.resetPasswordResponse(req.body);
        if (response == "successfully reset password") {
            res.send({
                status: "success",
                message: response
            })
        }
        else {
            res.send({
                status: "failed",
                message: response
            })
        }
    } catch (err) {
        res.send({
            status: "failed",
            message: err
        })
    }
}

async function sendVerificationCode(req, res) {
    try {
        let response = await accountBasics.verificationCodeResponse(req.body);
        if (response.code != "") {
            res.send({
                status: "success",
                unique: response.unique
            })
        }
        else {
            res.send({
                status: "failed",
                message: "failded to send verification code"
            })
        } 
    } catch (err) {
        res.send({
            status: "failed",
            message: err
        })
    }
}

