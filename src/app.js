const express = require("express");
const app = express();
const PUERTO = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const clientes = [
    {id: "1", nombre: "Lionel", apellido:"Messi"},
    {id: "2", nombre: "Angel", apellido:"Di Maria"},
    {id: "3", nombre: "Alexis", apellido:"McAlister"},
    {id: "4", nombre: "Julian", apellido:"Alvarez"}
];

app.get("/", (req, res) => {
    res.send(clientes);
});

app.get("/contacto", (req, res) => {
    res.send("Contactanos")
});

app.get("/nosotros", (req, res) => {
    res.send("Todo sobre nosotros.")
})

app.get("/paquetes", (req, res) => {
    res.send("Aca veras todas nuestras promociones")
})

app.get("/:id", (req, res) => {
    let {id} = req.params;
    const clienteEncontrado = clientes.find( cliente => cliente.id == id)
    if(clienteEncontrado) {
        res.send(clienteEncontrado);
    } else {
        res.send("No se encontro el cliente con ese ID");
    };
})

app.post("/", (req, res) => {
    const nuevoCliente = req.body;
    clientes.push(nuevoCliente);
    console.log(clientes);
    res.send({status: "success", message: "Cliente agregado correctamente"})
})

app.put("/:id", (req, res) => {
    let {id} = req.params;
    const {nombre, apellido} = req.body;
    const clienteIndex = clientes.findIndex(cliente => cliente.id == id);
    if(clienteIndex !== -1) {
        clientes[clienteIndex].nombre = nombre;
        clientes[clienteIndex].apellido = apellido;
        console.log(clientes);
        res.send({status:"success", message: "Cliente actualizado con exito"})
    } else {
        res.status(404).send({status: "error", message:"Cliente no encontrado"})
    }
})

app.delete("/:id", (req, res) => {
    const {id} = req.params;
    const clienteIndex = clientes.findIndex(cliente => cliente.id == id);
    if(clienteIndex !== -1) {
        clientes.splice(clienteIndex, 1);
        console.log(clientes);
        res.send({status: "success", message: "Cliente eliminado"})
    } else {
        res.status(404).send({status: "error", message: "Cliente no encontrado"})
    }
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`)
});