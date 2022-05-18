const express = require("express")
const {engine} = require("express-handlebars")

const PORT = 8080
const rutaProductos = require("./routes/productos")

const app = express()
//Configuracion Handlebars
app.set("view engine","hbs")
app.set("views","./viewsHandle")
app.engine("hbs", engine({
    extname:".hbs",
    layoutsDir: __dirname + "/viewsHandle/layouts",
    defaultLayout:"main.hbs",
    partialsDir: __dirname+"viewsHandle/partials"

}))

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
    console.log("servidor corriendo con HBS")
})

