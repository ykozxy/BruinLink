const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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

async function main() {
    console.log("Connecting to database...")
    await mongoose.disconnect();
    await mongoose.connect("mongodb+srv://user:user0001@bruinlink.b9irv.mongodb.net/BruinLink?retryWrites=true&w=majority")
        .then(() => {
            console.log("Database connected.");
        }).catch((e) => {
            throw e;
        });

    console.log("Listening at port 3031...")
    app.listen(3031)
}

main()
    .catch((e) => {
        mongoose.disconnect().then(() => {
            console.log("Database disconnected.")
        });
        throw e;
    })
    .then(() => {
        mongoose.disconnect().then(() => {
            console.log("Database disconnected.")
        });
    })
