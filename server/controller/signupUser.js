const mysql = require('mysql2/promise')
const config = require('../config')

async function signupUser({ nombre, email, dominio, plan, password }) {
  if (!nombre || !email || !dominio || !plan || !password) {
    throw new Error('Faltan campos obligatorios')
  }
  const connection = await mysql.createConnection(config)
  const sql = `INSERT INTO usuarios 
    (nombre_usuario, correo, contraseña_hash, rol, estado) 
    VALUES (?, ?, ?, ?, ?)`
  await connection.execute(sql, [nombre, email, password, 'user', 'activo'])
  await connection.end()
}

module.exports = { signupUser }
