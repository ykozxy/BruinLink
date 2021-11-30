const express = require("express");
const router = express.Router();
const accountBasics = require('./accountBasics');

router.post('/subscribe', usersubscribecourse);
router.post("/unsubscribe", userunsubscribecourse);
router.post("/getSubscriptions", getusersubscription);
module.exports = router;

async function usersubscribecourse(req, res){
    try {
        let response = await accountBasics.subscribecourse(req.body);
        console.log(response);
        if (response) {
            res.send({
                status: "success",
                courselist: response
            });
        }
        else {
            res.send({
                status: "failed",
                message: "failed to subscribe"
            })
        }
    } catch (err) {
        console.error(err);
        res.send({
            status: "error",
            message: err
        });
    }
}

async function userunsubscribecourse(req, res){
    try {
        let response = await accountBasics.unsubscribecourse(req.body);
        console.log(response);
        if (response) {
            res.send({
                status: "success",
                courselist: response
            });
        }
        else {
            res.send({
                status: "failed",
                message: "failed tounsubscribe"
            })
        }
    } catch (err) {
        console.error(err);
        res.send({
            status: "error",
            message: err
        });
    }
}

async function getusersubscription(req, res){
    try {
        let response = await accountBasics.getsubscription(req.body);
        console.log(response);
        if (response) {
            res.send({
                status: "success",
                courselist: response
            });
        }
        else {
            res.send({
                status: "failed",
                message: "failed to list"
            })
        }
    } catch (err) {
        console.error(err);
        res.send({
            status: "error",
            message: err
        });
    }
}

