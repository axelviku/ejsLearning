require('dotenv').config();
const express = require('express');
const path = require('path');
const ejs = require('ejs')
const bodyParser = require("body-parser");
const cookieParsar = require("cookie-parser");
const session = require('express-session');


const port = process.env.PORT || 5000;
require("./db/conn");

const app = express();

const publicPath = path.join(__dirname, "./public");
const partials_path = path.join(__dirname, "/views/partials");
app.use(express.json());
app.use(cookieParsar());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(publicPath));
app.set("view engine", "ejs");
//session middleware
const oneDay = 200000;
app.use(session({
    secret: "thisismysecrctekeyvikufgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));


const router = require('./router');
app.use(router);


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})