
const knex = require("knex")({
 client:"mysql",
 connection:{
     host: "192.168.64.2",
     port:3306,
     user:"bruno",
     password:"",
     database:"rabbitFotolibros",
 },
 pool:{ min: 2, max: 8}
 
})
module.exports = knex