const express = require("express")


const PORT = 8080
const rutas = require("./routes/productos")

const app = express()
app.use(express.urlencoded());
app.use(express.json())
app.use("/",express.static("public"))
app.use("/api", rutas)
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ status: 404, message: `la req debe hacerse tipo objeto. Ejemplo {"id":"1"}`}); // Bad request
    }
    next();})


app.listen(PORT, () => {
    console.log("todo ok")
})

