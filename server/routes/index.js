const express = require('express')
const path = require('path')
const multer = require('multer')
const { sendFile } = require('../controller/uploadApp.js')
const { signupUser } = require('../controller/signupUser.js')
const { signinUser } = require('../controller/signinUser.js')

const router = express.Router()
const upload = multer({ dest: 'server/uploads/' })

function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    console.log(req)
    next()
  } else {
    res.redirect('/')
  }
}

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

router.post('/upload-app', upload.single('zipfile'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded')
  await sendFile(req.file.path, res)
})

router.post(
  '/register',
  express.urlencoded({ extended: true }),
  async (req, res) => {
    try {
      await signupUser(req.body)
      res.json({ success: true, message: 'Usuario registrado correctamente' })
    } catch (error) {
      if (error.message === 'Faltan campos obligatorios') {
        return res.status(400).json({ error: error.message })
      }
      console.error(error)
      res.status(500).json({ error: 'Error al guardar en la base de datos' })
    }
  }
)

router.post(
  '/login',
  express.urlencoded({ extended: true }),
  async (req, res) => {
    try {
      const user = await signinUser(req.body.email, req.body.password)
      if (!user) {
        return res
          .status(401)
          .json({ error: 'Correo o contraseña incorrectos' })
      }
      req.session.user = { id: user.id, email: user.correo }
      return res.json({ success: true, message: 'Login exitoso' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Error en el servidor' })
    }
  }
)

module.exports = router
