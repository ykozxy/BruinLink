const express = require("express");
const router = express.Router();
const courseBasics = require('./courseBasics');

router.get('/search', getcourse);
router.post('/getDetail', getDetail);
router.post('/getDepartments', getDepartments);

module.exports = router;

async function getcourse(req, res) {
    try {
        let response = await courseBasics.findbyname(req.body);
        if (response) {
            res.send({
                status: "success",
                message: response
            });
        }
        else {
            res.send({
                status: "failed",
                message: response
            })
        }
    } catch (err) {
        res.send({
            status: "error",
            message: err
        });
    }
}

async function getDetail(req, res) {
    try {
        let response = await courseBasics.getCourse(req.body);
        if (response) {
            res.send({
                status: "success",
                message: response
            });
        }
        else {
            res.send({
                status: "failed",
                message: response
            })
        }
    } catch (err) {
        res.send({
            status: "error",
            message: err
        });
    }
}

async function getDepartments(req, res) {
    try {
        let response = await courseBasics.getDepartmentsResponse();
        if (response) {
            res.send({
                status: "success",
                departments: response
            });
        }
        else {
            res.send({
                status: "failed",
                message: "failed to get departments list"
            })
        }
    } catch (err) {
        res.send({
            status: "error",
            message: err
        });
    }
}