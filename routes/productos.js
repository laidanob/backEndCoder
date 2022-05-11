const express = require("express")
const fs = require("fs")
const {Router} = express

let router = new Router()

let products = []
let dataP = "";



fs.readFile(`./productos.json`, "utf-8", (error, data) => {
    if(error){ 
        console.log("hay un error de escritura",error.message)
    }
    else{
        //si el archivo tiene contenido, parseo la data
        if(data != ""){
        
        dataP = JSON.parse(data)
        //lo muestro en consola
        }
        else{
            //si no tiene contenido muestro este mensaje
            console.log("El archivo existe pero esta vacio, no hay datos por traer/actualizar")
        }
        
    }


})

const save = (objeto) => {
    //chequeo si existe el archivo. Si no existe, lo creo
    fs.access(`./productos.json`,(error) => {
        if(error){
            console.log(error,"Archivo no creado, se procede a crear uno")
            //lo escribo sin contenido
            fs.writeFile(`./productos.json`, "", "utf-8", (error) => {
                error ? console.error(`Error para escribir`) : console.log(`Creado Correctamente`)
            })
        }
    })
    fs.readFile(`./productos.json` , "utf-8" , (err, data) => {
        //si el archivo esta vacio pusheo el objeto del parametro al array del construstor y lo escribo
        if(data == undefined || data == ""){
            products.push(objeto)
            //le asigno un ID al objeto con la longitus actual
            const id = products.length
            objeto = {...objeto,id}
            //vacio el array
            products = []
            //y vuevlo a pushear con el objeto con el id asignado
            products.push(objeto)
            //escribo el archivo con el array
            fs.writeFile(`./productos.json`,JSON.stringify(products, null, 5), "utf-8", (error) => {
                error ? console.error(`Error para escribir`) : console.log(` Escrito Correctamente3`)
                
            })
            
        }
        else{
            //si el archivo tiene contenido copio el contenido a un array nuevo, pusheo el objeto del parametro y lo escribo en el archivo
            let newArrayProducts = JSON.parse(data)
            //le asigno un ID al objeto
            const id = newArrayProducts.length
            objeto = {...objeto,id}
            newArrayProducts.push(objeto)
            //lo escribo con el array copiado y objeto pusheado
            fs.writeFile(`./productos.json`,JSON.stringify(newArrayProducts, null, 5), "utf-8", (error) => {
                error ? console.error(`Error para escribir`) : console.log(` Escrito Correctamente3`)
                
            })
            
        }
    })

}



router.get("/productoRandom",(req,res) => {
    const numeroRandom = Math.floor(Math.random()*5)
    res.send(dataP[numeroRandom])

})
router.get("/productos",(req,res) => {
    console.log("productos")
    res.sendFile(__dirname+"/public/index.html")
})

router.get("/productos/:id",(req,res) => {
    console.log("productos")
    const id = req.params.id
    const product = dataP.find(prod => {
        return prod.id == id
    })
    console.log(product)
    if(product != undefined){
        res.send(product)
    }
    else{
        res.send({ error : 'producto no encontrado' })
    }
})

router.post("/productos",(req,res) => {
    const producto = {title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail}
        save(producto)
        res.send(producto)
    })
router.delete("/productos/:id", (req,res) => {
    const id = req.params.id
    console.log(id)
    fs.readFile(`./productos.json`, "utf-8", (error, data) => {
        if(error){ 
            console.log(error.message)
        }
        else{
            //parseo la data
            const dataDelete = JSON.parse(data)
            //filtra la data creando un array nuevo sin el objeto que sea igual al ID del parametro. Lo muestro en consola
            if (dataDelete.some(prod => prod.id === id)) {
                res.send("se intentara borrar el producto")
                const newArrayFilter = dataDelete.filter(prod => {
                return prod.id !== id
            })
            console.table(newArrayFilter)
            //escribo el array nuevo
            fs.writeFile(`./productos.json`,JSON.stringify(newArrayFilter, null, 5), "utf-8", (error) => {
                error ? console.error(`Error para escribir productos`) : console.log(`productos Escrito Correctamente3`)
                
            }) 
              }
            else{
                res.send("{ error : 'producto no encontrado' }")
            }
            
        }
    })
})

router.put("/productos/:id", (req, res) =>{
    let{title, price, thumbnail} = req.body


    fs.readFile(`./productos.json`, "utf-8", (error, data) => {
            if(error){ 
                console.log(error.message)
            }
            else{
            const dataPut = JSON.parse(data)
            let modificaProducto = dataPut.find((i) => {
            return i.id == req.params.id
                })
        if (modificaProducto === undefined){
            res.json({ error: 'producto no encontrado' })
        } 
        else{
            modificaProducto.title = title
            modificaProducto.price = price
            modificaProducto.thumbnail = thumbnail

            fs.writeFile(`./productos.json`,JSON.stringify(dataPut, null, 5), "utf-8", (error) => {
                error ? console.error(`Error para escribir productos`) : console.log(`productos Escrito Correctamente3`)
                
            }) 
            res.send(`producto ${req.params.id} actualizado ` )
            
          }
        }
        })  
    })                
module.exports = router