const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const accountRouter = require("./routers/accountRouter");
const courseRouter = require("./routers/courseRouter");
app.use("/account", accountRouter);
app.use("/course", courseRouter);

console.log("Listening at port 3031...")
app.listen(3031)
