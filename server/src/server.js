const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

const userRouter = require("./routers/user.js");
app.use("/user", userRouter);

app.listen(3031)
