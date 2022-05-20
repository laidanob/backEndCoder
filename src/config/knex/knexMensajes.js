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

// knexMensajes.from("mensajes")
//     .select("*")
//     .then((data) => {
//         mensajes = data 
//         console.log("mensajes knex",mensajes) 
//     })
//     .catch((err) => {
//         console.log(err)
//     })


module.exports = {knexMensajes, mensajes}