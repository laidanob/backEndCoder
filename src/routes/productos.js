const express = require("express")
const fs = require("fs")
const {Router} = express
const {knexProductos} = require("../config/knex/knexProductos.js")


let router = new Router()
let dataP = "";
console.log("listaProductos")
    
router.get("/",(req,res) => {
        // console.log("este console",dataP)
        res.render("main",{data: dataP})
        // res.send(dataP)
 
})

router.get("/:id",(req,res) => {
    knexProductos.from("productos")
    .select("*")
    .where({id : req.params.id})
    .then((respuesta) => {
            res.send(respuesta) 
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post("/",(req,res) => {
    const productoNuevo = {
        titulo: req.body.title,
        precio: req.body.price,
        img: req.body.thumbnail
    }
    knexProductos("productos")
    .insert(productoNuevo)
    .then(() =>{
        console.log("producto agregado")
    })
    .catch((err) => {
        console.log(err)
    })
        res.redirect("/")
    })
router.delete("/:id", (req,res) => {
    knexProductos.from("productos")
    .where({id : req.params.id})
    .del()
    .then((respuesta) => {
            res.send(respuesta) 
        })
        .catch((err) => {
            console.log(err)
        })
})

router.put("/:id", (req, res) =>{
    knexProductos.from("productos")
    .where({id : req.params.id})
    .update({
        titulo: req.body.title,
        precio: req.body.price,
    })
    .then((respuesta) => {
            res.send(respuesta) 
        })
        .catch((err) => {
            console.log(err)
        })
    })                
module.exports = router