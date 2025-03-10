const express = require('express');
// const app = express();
const routers = express.Router()
const path = require("path")

const users = require("./users")
const fs = require("fs")
const multer = require("multer")
const upload = multer({dest : "public"})



routers.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    if (file) {
        const target = path.join(__dirname, "public", file.originalname);
        fs.renameSync(file.path, target); //rename file agar sama dengan original file
        res.send("file berhasil diupload")
    } else {
        res.send("file gagal diupload")
    }
})


//ROUTINGS

// bodyParser
routers.post('/login', (req, res) => {
    const {username, password} = req.body
    res.send(`Anda login dengan username ${username} dan password ${password}`)
})

routers.post("/loginjson", (req, res) => {
    const {username, password} = req.body;
    res.status(200).json({
        status: "success",
        message: "Login page",
        data: {
            username : username,
            password : password,
        }
    })

})

routers.get("/downloads", function (req, res) {
    const filename = "filkom.png";
    res.download(path.join(__dirname, 'assets', filename), "filkom.png")
});



//ROUTING DASAR
//app.METHOD(ROUTE, CALLBACK)

routers.get('/', (req, res) => {res.send('Hello World!')}) //res.send langsung menutup koneksi dan otomatis mengatur header
routers.get('/contoh', (req, res) => {res.send('request dengan method GET')})
routers.post('/contoh', (req, res) => {res.send('request dengan method POST')})
routers.put('/contoh', (req, res) => {res.send('request dengan method PUT')})
routers.delete('/contoh', (req, res) => {res.send('request dengan method DELETE')})

//HTTP Method all
//bisa diakses dengan method apapun baik GET/POST/PUT/DELETE. 
routers.all('/universal', function (req, res) {res.send('request dengan method' + req.method)})

//Routing Dinamis
routers.get('/post/:id', (req, res) => {
    res.send('Artikel -' + req.params.id)
})


routers.get("/foods", (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    res.write('Foods page: '+page+'\n')
    if (req.query.sort) res.write('Sort by: ' +req.query.sort+'\n')
    res.write('Sub :' + req.query.sub)
    res.send()
});

routers.post('/users', (req, res) => {
    res.status(404).json({
        message: "Masukkan data yang ingin diubah",
    })
})

routers.get('/users', (req, res) => {
    res.status(200).json(users)
})

routers.post('/users/:name', (req, res) => {
    res.status(404).json({
        status: "error",
        message: "Data user tidak ditemukan",
    });
});



routers.get('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const user = users.user.find(u => u.name.toLowerCase() === name);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({
            status: "error",
            message: "Data user tidak ditemukan",
        });
    }
});

routers.delete('/users/:name', (req, res) => {
    const name = req.params.name
    res.status(200).json({
        status: `Data ${name} deleted succesfully`,
        message: "Data user tidak ditemukan",
    });
});


module.exports = routers;
