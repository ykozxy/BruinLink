const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require('./config');

const app = express();
const db_username = config.DB_USERNAME;
const db_userpassword = config.DB_USERPASSWORD;
const db_name = config.DB_NAME;

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
// app.use(formidable());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const accountRouter = require("./routers/accountRouter");
const courseRouter = require("./routers/courseRouter");
const uploadRouter = require("./routers/uploadRouter");
const subscriptionRouter = require("./routers/subscriptionRouter");
app.use("/account", accountRouter);
app.use("/course", courseRouter);
app.use("/upload", uploadRouter);
app.use("/subscription",subscriptionRouter);

async function main() {
    console.log("Connecting to database...")
    await mongoose.connect("mongodb+srv://" + db_username + ":" + db_userpassword + "@bruinlink.b9irv.mongodb.net/" + db_name + "?retryWrites=true&w=majority")
        .then(() => {
            console.log("Database connected.");
        }).catch((e) => {
            throw e;
        });

    console.log("Listening at port 3031...")
    app.listen(3031)
}

main()
