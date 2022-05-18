const express = require("express")


const PORT = 8082
const rutaProductos = require("./routes/productos")

const app = express()
//Configuracion Pug
app.set("view engine","pug")
app.set("views","./viewsPug")


//Middles
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json())

app.use("/productos", rutaProductos)

app.get("/", (res,req) => {
    res.sendFile(__dirname + "/public/index.hml")
})

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ status: 404, message: `la req debe hacerse tipo objeto. Ejemplo {"id":"1"}`}); // Bad request
    }
    next();})


app.listen(PORT, () => {
    console.log("servidor corriendo con PUG")
})

