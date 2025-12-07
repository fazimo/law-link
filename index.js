const app = require('express')();
const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
// global.config = require('./../config');
const ejs = require("ejs")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")
const MongoStore = require("connect-mongo")(session)
const expressLayouts = require('express-ejs-layouts');

// Connect to DB
// mongoose.connect('mongodb://127.0.0.1:27017/nour' ,  { useFindAndModify: false } );
mongoose.connect('mongodb://127.0.0.1:27017/faezeh', {
    useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true
    // user:"",
    // pass:""
});

// connect to your database
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
// app.use(expressValidator());

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cookieParser("GWRr23$@E$#2q$R#245$2"))
app.use(session({
    secret: "GWRr23$@E$#2q$R#245$2",
    resave: false,
    saveUninitialized: true,
    cookie: { expires: new Date(Date.now() + 1000 * 60 * 60 * 60) },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(flash())

var server = app.listen(5000, function () {
    console.log('Server is running 5000');
});
const webRouter = require('./dir');

app.use('/', webRouter)