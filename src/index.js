const express = require("express")
const app = express()
const {socket} = require("./app/sockets.js")
const knex = require("./config/knex/knexDB.js")
const {knexMensajes} = require("./config/knex/knexMensajes.js")

const {engine} = require("express-handlebars")
path = require('path')

const rutaProductos = require("./routes/productos")
let mensajes = []

// Server
const PORT = 8081
const http = require("http")
const server = http.createServer(app)




//Middles
app.use(express.static(path.join(__dirname,"../public")))
app.use(express.urlencoded());
app.use(express.json())

// Handlebars
app.set("view engine","hbs")
app.set("views","./views")
app.engine("hbs", engine({
    extname:".hbs",
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout:"index.hbs",
    partialsDir: __dirname+"/views/partials"

}))
console.log(__dirname + "/views/layouts")
//socket
socket(server)

//Rutas
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"../public/index.html"))
})
app.use("/productos", rutaProductos)
app.get("/chat", (req,res) => {
    console.log("chat")
    res.sendFile(path.join(__dirname,"../public/chat.html"))
})



//Manejo error
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ status: 404, message: `la req debe hacerse tipo objeto. Ejemplo {"id":"1"}`}); // Bad request
    }
    next();})
    
    

server.listen(PORT, () => {
    console.log("Servidor con handleBars corriendo")
})

