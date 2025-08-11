const express = require('express')
const path = require('path')
const multer = require('multer')
const { sendFile } = require('../controller/uploadApp.js')
const { signupUser } = require('../controller/signupUser.js')

const router = express.Router()
const upload = multer({ dest: 'server/uploads/' })

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

module.exports = router
