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

//Para Ingresar
app.get('/login', login)

//Para Verificar
app.get('/validar', validar)

//Para Registrar
app.get('/registro', registro)

//Para Lista Usuarios
app.get('/usuarios', obtenerUsuarios)

//Para Eliminar Usuarios
app.delete('/usuarios', eliminarUsuarios)

//Cargo
app.get('/position', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})