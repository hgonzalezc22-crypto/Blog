const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

console.log("App de node arrancada");

conexion();

//Crear servidor Node
const app = express();
const puerto = 3900;

//Configurar cors
app.use(cors());

//Convertir body a objeto js
app.use(express.json());  //Recibir datos con content-type app/json
app.use(express.urlencoded({extend:true}));

const rutas_articulo = require("./rutas/articulo");

app.use("/api", rutas_articulo);

app.get("/", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");
    return res.status(200).send([{
        nombre: "Carlos Arias",
        edad: "38",
        fecha: "28 Agosto 2002"
    },
    {
        nombre: "Carlos Arias",
        edad: "38",
        fecha: "28 Agosto 2002"
    }
    ])
})

//Crear servidor y escucha de peticiones 
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: " + puerto);
}
)

