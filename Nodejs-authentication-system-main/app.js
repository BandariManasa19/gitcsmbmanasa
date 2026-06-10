let express = require("express");
let authRouter = require("./routes/authRouter.js");

let app = express();


app.use(express.json());

app.use((req, res, next) => {
    console.log("This is a middleware");
    console.log(req.method, req.url);
    next();
});

app.use((req, res, next) => {
    console.log("Request Time:", new Date().toLocaleString());
    next();
});

app.use((req, res, next) => {
    req.college = "CMR Technical Campus,BTECH Engineering College";
    next();
});

app.use("/auth", authRouter);

app.use((err, req, res, next) => {
    console.log("Error Middleware Executed");

    res.status(500).json({
        status: "error",
        message: err.message
    });
});

module.exports = app;