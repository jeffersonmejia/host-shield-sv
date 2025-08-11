const fs = require('fs')
const path = require('path')
const ftp = require('basic-ftp')

const SV_FILES = '172.27.74.54'
const SV_FILES_PORT = 445

async function sendFile(zipPath, res) {
  try {
    const fileName = path.basename(zipPath)
    const remotePath = `/projects/${fileName}`

    const client = new ftp.Client()
    await client.access({
      host: SV_FILES,
      port: SV_FILES_PORT,
      user: 'guest',
      password: '',
      secure: false,
    })

    await client.uploadFrom(zipPath, remotePath)
    client.close()

    fs.unlinkSync(zipPath)

    if (!res.headersSent) {
      res.send(
        'Archivo zip enviado y procesado correctamente en el servidor remoto por FTP'
      )
    }
  } catch (error) {
    console.error('Error enviando zip por FTP:', error)
    if (!res.headersSent) {
      res
        .status(500)
        .send('No se pudo enviar el archivo por FTP, intente más tarde')
    }
  }
}

module.exports = { sendFile }
