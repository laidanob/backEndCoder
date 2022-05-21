
const socket = (server) => {
// Socket
const {Server} = require("socket.io")
const io = new Server(server)
const {obtenerProductos} = require("../config/knex/knexProductos.js")
const {obtenerMensajes,grabarMensajes} = require("../config/knex/knexMensajes.js")








    // SocketConeccion 
    io.on("connection",(socket) => {
        socket.emit("mensajeRespuesta", "hola estas conectado con el back")
        socket.on("mensajeCliente", (data) => {
            console.log("mensaje respuesta",data)
        })
        
        //Productos
        obtenerProductos().then((productos) => io.sockets.emit("productos",productos))
    
    //Mensajes
    const actulizaMensajes = () => {
        obtenerMensajes().then((mensajes) => io.sockets.emit("mensajes",mensajes))
    }
    console.log(socket.id)
    actulizaMensajes()
    socket.on("datosMensajes", (data) => {
        grabarMensajes(data)
        actulizaMensajes()
    })
    socket.emit("id", socket.id)
    // console.log("son los mensajes?",mensajes)
})
}

module.exports = {socket}