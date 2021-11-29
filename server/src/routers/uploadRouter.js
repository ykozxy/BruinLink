const express = require("express");
const router = express.Router();
const uploadBasics = require('./uploadBasics');

const multer = require('multer');
const upload = multer();

router.post('/link', uploadLink);
router.post('/qrcode', upload.single("image"), uploadQrCode);

module.exports = router;

async function uploadLink(req, res) {
    try {
        let response = await uploadBasics.uploadLinkResponse(req.body);
        console.log(response);
        if (response == "link successfully uploaded") {
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
        console.error(err);
        res.send({
            status: "error",
            message: response
        });
    }
}


async function uploadQrCode(req, res) {
    try {
        let response = await uploadBasics.uploadQrCodeResponse(req.body, req.file);
        console.log(response);
        if (response == "QR Code successfully uploaded") {
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
        console.error(err);
        res.send({
            status: "error",
            message: response
        });
    }
}
