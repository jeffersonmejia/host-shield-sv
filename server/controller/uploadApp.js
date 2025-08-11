const fs = require('fs')
const path = require('path')
const ftp = require('basic-ftp')

const SV_FILES = '172.27.74.54'
const SV_FILES_PORT = 445
const UPLOADS_DIR = path.join(__dirname, 'uploads')

async function sendFile(zipPath, res) {
  try {
    const fileName = path.basename(zipPath)
    const remotePath = `/projects/${fileName}`

    const client = new ftp.Client()
    await client.access({
      host: SV_FILES,
      port: SV_FILES_PORT,
      user: 'grupo2',
      password: 'archivos',
      secure: false,
    })

    await client.uploadFrom(zipPath, remotePath)
    client.close()

    fs.unlinkSync(zipPath)

    const fileToDelete = path.join(UPLOADS_DIR, fileName)
    if (fs.existsSync(fileToDelete)) {
      fs.unlinkSync(fileToDelete)
    }

    if (!res.headersSent) {
      res.send('Archivo zip enviado y archivo en uploads eliminado')
    }
  } catch (error) {
    console.error('Error enviando zip por FTP:', error)
    if (!res.headersSent) {
      res.status(500).send('Error al enviar o eliminar archivo')
    }
  }
}

module.exports = { sendFile }
