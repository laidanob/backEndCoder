const knexMensajes = require("./knexDB.js")

let mensajes = ""
 
knexMensajes.schema.createTableIfNotExists("mensajes", (table) => {
    table.increments("id").primary()
    table.string("email")
    table.string("mensaje")
})
.then(() => {
    console.log("Tabla 'Mensajes' ok")
})
.catch((error) => {
    console.log("error tabla Mensajes",error)
})

const obtenerMensajes = async () => {
try {
const datos = await knexMensajes.from("mensajes").select("*")
    return datos
    }
catch {
    return "error"
}
}
const grabarMensajes = (data) => {
    knexMensajes("mensajes")
    .insert(data)
    .then(() => console.log("mensaje grabado OK") )
    .catch((err) => console.log(err))
    }


module.exports = {knexMensajes, mensajes,obtenerMensajes,grabarMensajes}