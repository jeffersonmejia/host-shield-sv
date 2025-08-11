const express = require('express')
const path = require('path')
const multer = require('multer')
const { sendFile } = require('../controller/uploadApp.js')

const router = express.Router()
const upload = multer({ dest: 'server/uploads/' })

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

router.post('/upload-app', upload.single('zipfile'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded')
  await sendFile(req.file.path, res)
})

module.exports = router
