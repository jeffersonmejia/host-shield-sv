const fs = require('fs')
const path = require('path')
const SMB2 = require('@awo00/smb2')

async function sendFile(zipPath, res, originalName) {
  let smbClient

  try {
    if (!fs.existsSync(zipPath)) {
      throw new Error(`Archivo local no encontrado: ${zipPath}`)
    }

    smbClient = new SMB2.Client()
    smbClient.host = '172.27.74.54'

    const session = await smbClient.authenticate({
      domain: process.env.SMB_DOMAIN || 'WORKGROUP',
      username: process.env.SMB_USER || 'guest',
      password: process.env.SMB_PASS || '',
    })

    const tree = await session.connectTree('Archivos')

    const fileBuffer = fs.readFileSync(zipPath)

    if (!originalName.toLowerCase().endsWith('.zip')) {
      throw new Error('El archivo debe tener extensión .zip')
    }

    const remotePath = path.posix.join('projects', originalName)
    const exists = await tree.exists(remotePath)

    // if (exists) {
    //   throw new Error(`El proyecto con nombre ${originalName} ya existe en el servidor`);
    // }

    if (exists) {
      await tree.removeFile(remotePath)
      console.log(
        `Archivo existente ${originalName} borrado antes de subir nuevo.`
      )
    }

    await tree.createFile(remotePath, fileBuffer)

    fs.unlinkSync(zipPath)

    res?.send('Archivo zip subido exitosamente (reemplazando si ya existía)')
  } catch (error) {
    console.error('Error en transferencia SMB:', {
      message: error.message,
      code: error.code || 'NO_CODE',
      stack: error.stack,
    })
    res?.status(500).send(`Error: ${error.message}`)
  } finally {
    if (smbClient) {
      await smbClient.close()
      console.log('Conexión SMB finalizada')
    }
  }
}

module.exports = { sendFile }
