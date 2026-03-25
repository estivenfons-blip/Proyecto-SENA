const connection = require("./conection");

//OBTENER todos los productos
const obtenerInventario = async (req, res) => {
    if (!req.session.usuario) {
        res.status(401).send('No Autorizado');
        return;
    }
    try {
        const [results] = await connection.query(
            "SELECT * FROM `inventario`",
        );
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error en el servidor");
    }
};

//REGISTRAR un producto nuevo
const registrarProducto = async (req, res) => {
    if (!req.session.usuario) {
        res.status(401).send('No Autorizado');
        return;
    }
    const { nombre, categoria, cantidad, precio } = req.query;

    if (!nombre || !categoria || cantidad === undefined || precio === undefined) {
        res.status(400).send("Faltan datos del producto");
        return;
    }
    try {
        const [results] = await connection.query(
            "INSERT INTO `inventario` (`id`, `nombre`, `categoria`, `cantidad`, `precio`) VALUES (NULL, ?, ?, ?, ?);",
            [nombre, categoria, cantidad, precio]
        );
        if (results.affectedRows > 0) {
            res.status(200).send("Producto registrado correctamente");
        } else {
            res.status(400).send("No se pudo registrar el producto");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error en el servidor");
    }
};

//ELIMINAR un producto por ID
const eliminarProducto = async (req, res) => {
    if (!req.session.usuario) {
        res.status(401).send('No Autorizado');
        return;
    }
    const { id } = req.query;

    if (!id) {
        res.status(400).send("Falta el ID del producto");
        return;
    }
    try {
        const [results] = await connection.query(
            "DELETE FROM `inventario` WHERE `inventario`.`id` = ?",
            [id]
        );
        if (results.affectedRows > 0) {
            res.status(200).send("Producto eliminado correctamente");
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error en el servidor");
    }
};

//ACTUALIZAR STOCK de un producto por ID
const actualizarStock = async (req, res) => {
    if (!req.session.usuario) {
        res.status(401).send('No Autorizado');
        return;
    }
    const { id, cantidad } = req.query;

    if (!id || cantidad === undefined) {
        res.status(400).send("Faltan datos para actualizar el stock");
        return;
    }
    try {
        const [results] = await connection.query(
            "UPDATE `inventario` SET `cantidad` = ? WHERE `id` = ?",
            [cantidad, id]
        );
        if (results.affectedRows > 0) {
            res.status(200).send("Stock actualizado correctamente");
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error en el servidor");
    }
};

module.exports = { obtenerInventario, registrarProducto, eliminarProducto, actualizarStock };