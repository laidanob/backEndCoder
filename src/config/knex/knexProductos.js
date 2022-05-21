const knexProductos = require("../knex/knexDB.js")

let productos = ""
 
knexProductos.schema.createTableIfNotExists("productos", (table) => {
    table.increments("id").primary()
    table.string("titulo")
    table.integer("precio")
    table.string("img")
})
.then(() => {
    console.log("Tabla `Productos` ok")
})
.catch((error) => {
    console.log("error tabla",error)
})

const obtenerProductos = async () => {

try {
const datos = await knexProductos.from("productos").select("*")
    return datos
    }
catch {
    return error
}
}

module.exports = {knexProductos,obtenerProductos}