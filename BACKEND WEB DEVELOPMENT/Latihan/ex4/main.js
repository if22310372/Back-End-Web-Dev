const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser')
const routers = require('./routers')

const morgan = require('morgan');
const errorhandler = require('errorhandler');

const path = require("path")
const cors = require("cors")
const fs = require("fs")
const multer = require("multer")


// MIDDLEWARE
//Menangani Log dengan Middleware
// const logMiddleware = (req, res, next) => {
//     console.log(Date.now() + " " + req.ip + " " + req.originalUrl);
//     next();
// };
// app.use(logMiddleware);

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("tiny"));

// middleware bdoy parser x-www-form-url-encode
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())


app.use(express.urlencoded({ extended: true}))
app.use(express.json()) //INI CARA KEDUA PAKE RAW JSON DI POSTMAN 

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET"] 
}));


// deklarasi routing
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
        message: "resource tidak ditemukan",
    })
})

app.use(errorhandler)

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))