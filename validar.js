const validar = (req, res) => {
  if (req.session.usuario) {
    res.status(200).send('Sesion Validada')
  } else {
    res.status(401).send('No Autorizado')
  }
}

module.exports = validar;