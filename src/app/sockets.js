
const socket = (server) => {
// Socket
const {Server} = require("socket.io")
const io = new Server(server)
const {knexProductos} = require("../config/knex/knexProductos.js")
const {knexMensajes} = require("../config/knex/knexMensajes.js")

let mensajes = ""
knexMensajes.from("mensajes")
    .select("*")
    .then((data) => {
        mensajes = data 
        console.log("mensajes knex",mensajes) 
    })
    .catch((err) => {
        console.log(err)
    })

let productos = ""
knexProductos.from("productos")
    .select("*")
    .then((data) => {
        productos = data  
    })
    .catch((err) => {
        console.log(err)
    })

// SocketConeccion 

io.on("connection",(socket) => {
    const actulizaMensajes = (data) => {
        io.sockets.emit("mensajes",data)
    }
    console.log(socket.id)
    socket.emit("mensajeRespuesta", "hola estas conectado con el back")
    socket.on("mensajeCliente", (data) => {
        console.log("mensaje respuesta",data)
    })
    actulizaMensajes(mensajes)
    socket.on("datosMensajes", (data) => {
        mensajes.push(data)
        actulizaMensajes(mensajes)
    })
    socket.emit("id", socket.id)
    io.sockets.emit("productos",productos)
    console.log("son los mensajes?",mensajes)
})
}

module.exports = {socket}