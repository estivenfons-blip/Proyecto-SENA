const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const session = require('express-session')
const md5 = require('md5');
const bcrypt = require('bcrypt');
const login=require('./login');
const registro=require('./registro');
const {obtenerUsuarios, eliminarUsuarios}=require('./usuarios');
const validar=require('./validar');
// control inventario
const {obtenerInventario, registrarProducto, eliminarProducto, actualizarStock}=require('./inventario');
const saltRounds = 10;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(session({
  secret: 'yosoloqueriaterminarunañobien777'
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Autentificación
app.get('/login', login)
app.get('/validar', validar)
app.get('/registro', registro)

//Usuarios
app.get('/usuarios', obtenerUsuarios)
app.delete('/usuarios', eliminarUsuarios)

//Inventario
app.get('/inventario', obtenerInventario)// Listar todos los productos
app.post('/inventario', registrarProducto)// Registrar producto nuevo
app.delete('/inventario', eliminarProducto) // Eliminar producto por ID
app.patch('/inventario/stock', actualizarStock)// Actualizar stock por ID

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})