const express = require("express");
const router = express.Router();
const accountBasics = require('./accountBasics');

router.post('/login', accountLogin);
router.post('/register', accountRegister);
router.put('/changeEmail', accountChangeEmail);
router.put('/changePassword', accountChangePassword);
module.exports = router;

async function accountLogin(req, res) {
    try {
        let response = await accountBasics.loginResponse(req.body);
        if (response == "successfully logged in") {
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