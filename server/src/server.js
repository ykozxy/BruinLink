const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

const accountRouter = require("./routers/accountRouter");
app.use("/account", accountRouter);

app.listen(3031)
