const router = require('express-promise-router')();
const coursebasics = require('coursebasics');

router.get('/course/search', getcourse);
router.post('/course/getDetail', getDetail);

module.exports = router;

async function getcourse(req, res) {
    try {
        let response = await coursebasics.findbyname(req.body);
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
        let response = await coursebasics.getCourse(req.body);
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