const express = require("express")
const {engine} = require("express-handlebars")
const app = express()

const rutaProductos = require("./routes/productos")
// Server
const PORT = 8081
const http = require("http")
const server = http.createServer(app)
const productos = require ("./productos.json")

// Configuracion Handlebars
app.set("view engine","hbs")
app.set("views","./viewsHandle")
app.engine("hbs", engine({
    extname:".hbs",
    layoutsDir: __dirname + "/viewsHandle/layouts",
    defaultLayout:"main.hbs",
    partialsDir: __dirname+"/viewsHandle/partials"

}))

//Middles
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded());
app.use(express.json())

//Mensajes
let mensajes = []


app.get("/", (req,res) => {
    console.log("chat")
    res.sendFile(__dirname+"/public/not.html")
})
app.use("/productos", rutaProductos)

// Socket
const {Server} = require("socket.io")
const io = new Server(server)

// SocketConeccion 


io.on("connection",(socket) => {
    const actulizaMensajes = (data) => {
        io.sockets.emit("mensajes",data)
    }
    console.log(socket.id)
    socket.emit("mensajeRespuesta", "hola estas conectado con el back")
    socket.on("mensajeCliente", (data) => {
        console.log(data)
    })
    actulizaMensajes(mensajes)
    socket.on("datosMensajes", (data) => {
        mensajes.push(data)
        console.log(mensajes)
        actulizaMensajes(mensajes)
    })
    socket.emit("id", socket.id)
    io.sockets.emit("productos",productos)
})



app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ status: 404, message: `la req debe hacerse tipo objeto. Ejemplo {"id":"1"}`}); // Bad request
    }
    next();})
    
    
app.get("/chat", (req,res) => {
    console.log("chat")
    res.sendFile(__dirname+"/public/chat.html")
})
server.listen(PORT, () => {
    console.log("Servidor con handleBars corriendo")
})

