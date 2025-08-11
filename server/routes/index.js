const express = require('express')
const path = require('path')
const multer = require('multer')
const mysql = require('mysql2/promise')
const { sendFile } = require('../controller/uploadApp.js')

const router = express.Router()
const upload = multer({ dest: 'server/uploads/' })

const dbConfig = {
  host: '172.27.50.4',
  port: 3306,
  user: 'Lisseth',
  password: 'Miasoledad06',
  database: 'hosting_admin',
}

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

router.post('/upload-app', upload.single('zipfile'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded')
  await sendFile(req.file.path, res)
})

router.post('/register', express.urlencoded({ extended: true }), async (req, res) => {
  const { nombre, email, dominio, plan, password } = req.body
  console.log('Datos recibidos:', { nombre, email, dominio, plan, password })
  if (!nombre || !email || !dominio || !plan || !password) {
    console.log('Faltan campos obligatorios')
    return res.status(400).json({ error: 'Faltan campos obligatorios' })
  }
  try {
    const connection = await mysql.createConnection(dbConfig)
    const sql = `INSERT INTO usuarios 
      (nombre_usuario, correo, contraseña_hash, rol, estado) 
      VALUES (?, ?, ?, ?, ?)`
    await connection.execute(sql, [nombre, email, password, 'user', 'activo'])
    await connection.end()
    res.json({ success: true, message: 'Usuario registrado correctamente' })
  } catch (error) {
    console.error('Error al guardar en la base de datos:', error)
    res.status(500).json({ error: 'Error al guardar en la base de datos' })
  }
})

module.exports = router
