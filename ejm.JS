const express = require('express')
const app = express()
const port = 3000
//MySQL2
const mysql = require('mysql2/promise');
const cors = require('cors')
const session = require('express-session')

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(session({
  secret: 'yosoloqueriaterminarunañobien777'
}))

// Conceción con Database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'login',
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Para Ingresar
app.get('/login', async (req, res) => {
  const datos = req.query;
  //VERIFIACIÓN DE USUSARIOS
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?",
      [datos.usuario, datos.clave]
    );
    if (results.length > 0) {
      req.session.usuario = datos.usuario;
      res.status(200).send("Inicio de sesion correcto")
    } else {
      res.status(401).send("Datos Incorrectos")
    }

    console.log(results);
    console.log(fields);
  } catch (err) {
    console.log(err);
  }
})


//Para Verificar
app.get('/validar', (req, res) => {
  if (req.session.usuario) {
    res.status(200).send('Sesion Validada')
  } else {
    res.status(401).send('No Autorizado')
  }
})

//Cargo
app.get('/position', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
