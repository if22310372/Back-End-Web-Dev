const http = require('http');
const moment = require('moment');
const {users} = require('./users');
const express = require('express');
const app = express();
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const routers = require('./routers')
const path = require("path")
const cors = require("cors")



//middleware
const log = (req, res, next) => {
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + " " + req.originalUrl + " " + req.ip);
    next();
};


app.use(express.static(path.join(__dirname, "public")));


app.use(morgan("tiny"));

app.use(log);

app.use(errorhandler());

app.use(express.urlencoded({ extended: true}))
app.use(express.json()) //INI CARA KEDUA PAKE RAW JSON DI POSTMAN 

app.use(cors({
    origin: "http://127.0.0.1:5500",
    method: {"GET"};
}))
//penambahan object2 di cors, supaya tidak semua origin bisa akses

app.use(routers);

app.use((err, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan pada server",
    });
});

app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Resources tidak ditemukan",
    });
});

const hostname = "127.0.0.1";
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});