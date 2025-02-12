const http = require('http')
const {hello, greetings} = require('./helloWorld')
const moment = require('moment')
const express = require('express')
const app = express()
const users = require('./users')

app.get('/', (req, res) => res.send('This is the home page'))

app.get('/about', (req, res) => res.status(200).json({
        status : 'success',
        message : 'response success',
        Description : 'Excercise #02',
        Date : moment().format('MMMM Do YYYY, h:mm:ss a')
    }))

app.get('/users', (req, res) => res.status(200).json(users))

app.get('', (req, res) => res.status(404).res.send('Not found'))

const hostname = "127.0.0.1"
const port = 3000
app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}`))
