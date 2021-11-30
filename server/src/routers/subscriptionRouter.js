const express = require("express");
const router = express.Router();
const accountBasics = require('./accountBasics');

router.post('/subscribe', usersubscribecourse);
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
