const http = require('http')
// const {hello, greetings} = require('./helloWorld')
const moment = require('moment')
const express = require('express')
const app = express()
const morgan = require("morgan")
const errorhandler = require("errorhandler")
const users = require('./users')


// const log = (req, res, next) => {
//     console.log(
//         moment().format('LL')
//     )
//     next();
// }


// // app.use(log);
// app.use(morgan("tiny"));


app.get('/', (req, res) => res.send('This is the home page'))

app.get('/about', (req, res) => res.status(200).json({
        status : 'success',
        message : 'response success',
        Description : 'Excercise #02',
        Date : moment().format('MMMM Do YYYY, h:mm:ss a')
    }))

app.get('/users', (req, res) => res.status(200).json(users))


// app.get("/post/:name", (req, res) => {
//     const name = users.find(req.params.name === users.name)
//     if(name){
//         res.send(name)
//     } else{
//         res.status(404).send({ message: "User not found" });
//     }
    
// })

app.get("/post/:name", (req, res) => {
    const user = users.find(user => user.name === req.params.name); // Perbaikan callback find()

    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: "User not found" });
    }
});


app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "resource tidak ditemukan"
    })
})




const hostname = "127.0.0.1"
const port = 3000
app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}`))
