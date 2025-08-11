const mysql = require('mysql2/promise')
const config = require('../config')

async function signinUser(email, password) {
  if (!email || !password) throw new Error('Faltan campos obligatorios')
  const connection = await mysql.createConnection(config)
  const sql =
    'SELECT * FROM usuarios WHERE correo = ? AND contraseña_hash = ? AND estado = "activo"'
  const [rows] = await connection.execute(sql, [email, password])
  await connection.end()
  return rows.length ? rows[0] : null
}

module.exports = { signinUser }
