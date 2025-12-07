const connection = require("./conection");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registro = async (req, res) => {
    if (!req.session.usuario) {
        res.status(401).send('No Autorizado')
        return
    }
    const datos = req.query;
    //VERIFIACIÓN DE USUSARIOS
    try {
        const hash = bcrypt.hashSync(datos.clave, saltRounds);

        const [results, fields] = await connection.query(
            "INSERT INTO `usuarios` (`id`, `usuario`, `clave`) VALUES (NULL, ?, ?);",
            [datos.usuario, hash]
        );
        if (results.affectedRows > 0) {
            req.session.usuario = datos.usuario;
            res.status(200).send("Registro correcto")
        } else {
            res.status(401).send("No se pudo registrar el usuario")
        }

        console.log(results);
        console.log(fields);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error en el servidor")
    }
}

module.exports = registro;