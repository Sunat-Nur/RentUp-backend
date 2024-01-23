console.log("web serverni boshladik");
const express = require("express");
const app = express();
const router = require("./router");
const router_adminka = require("./router_adminka");
const cors = require("cors");
const cookieParser = require("cookie-parser");


let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: "session",
});

//1: Kirish code
app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('js'));
app.use(cors({credentials: true, origin: true,}));
app.use(cookieParser()); //

// 2: Session code
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 59,
        },
        store: store,
        resave: true,
        saveUninitialized: true,
    })
);

app.use(function (req, res, next) {
    res.locals.member = req.session.member;
    next();
})

// 3: Views code

app.set("views", "views");
app.set("view engine", "ejs",);

//4: routing code

app.use("/resto", router_adminka);
app.use("/", router);


module.exports = app;