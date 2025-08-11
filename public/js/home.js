document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('fileInput')
  const uploadBtn = document.getElementById('uploadBtn')
  const fileInfo = document.getElementById('fileInfo')
  const errorMessage = document.getElementById('errorMessage')
  const dropZone = document.getElementById('dropZone')
  const progressContainer = document.getElementById('progressContainer')
  const progressBar = document.getElementById('progressBar')
  const uploadResult = document.getElementById('uploadResult')
  const signOutBtn = document.getElementById('sign-out')

  let currentFile = null

  uploadBtn.addEventListener('click', () => fileInput.click())
  fileInput.addEventListener('change', handleFileSelect)
  ;['dragover', 'dragenter'].forEach((event) => {
    dropZone.addEventListener(event, (e) => {
      e.preventDefault()
      dropZone.style.backgroundColor = '#f0f8ff'
      dropZone.style.borderColor = '#2980b9'
    })
  })
  ;['dragleave', 'dragend'].forEach((event) => {
    dropZone.addEventListener(event, () => {
      dropZone.style.backgroundColor = ''
      dropZone.style.borderColor = '#3498db'
    })
  })

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault()
    dropZone.style.backgroundColor = ''
    dropZone.style.borderColor = '#3498db'

    if (e.dataTransfer.files.length > 0) {
      fileInput.files = e.dataTransfer.files
      handleFileSelect()
    }
  })

  function handleFileSelect() {
    errorMessage.textContent = ''
    uploadResult.style.display = 'none'

    if (fileInput.files.length === 0) return

    const file = fileInput.files[0]
    currentFile = file

    if (!file.name.toLowerCase().endsWith('.zip')) {
      showError('Solo se permiten archivos .zip')
      return
    }

    if (file.size > 50 * 1024 * 1024) {
      showError('El archivo no puede ser mayor a 50MB')
      return
    }

    fileInfo.textContent = `Archivo seleccionado: ${
      file.name
    } (${formatFileSize(file.size)})`

    uploadFile(file)
  }

  async function uploadFile(file) {
    progressContainer.style.display = 'block'
    progressBar.style.width = '0%'
    progressBar.textContent = '0%'

    const formData = new FormData()
    formData.append('zipfile', file)

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress > 95) progress = 95
      progressBar.style.width = progress + '%'
      progressBar.textContent = Math.round(progress) + '%'
    }, 200)

    try {
      const response = await fetch('/upload-app', {
        method: 'POST',
        body: formData,
        headers: {
          'X-File-Type': 'zip',
        },
      })

      clearInterval(interval)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Server error: ${response.status} - ${errorText}`)
      }

      const result = await response.text()

      progressBar.style.width = '100%'
      progressBar.textContent = '100%'

      showUploadResult({ success: true, message: result, file })
    } catch (error) {
      showError(`Error subiendo el archivo: ${error.message}`)
    } finally {
      setTimeout(() => {
        progressContainer.style.display = 'none'
      }, 500)
    }
  }

  function showUploadResult(result) {
    uploadResult.style.display = 'block'

    console.log('Resultado de la subida:', result)

    if (result.success) {
      alert('¡Tu aplicación web se ha subido correctamente!')
    } else {
      showError(result.message || 'Error al procesar el archivo')
    }
  }

  function showError(message) {
    errorMessage.textContent = message
    fileInfo.textContent = 'No se ha seleccionado ningún archivo'
    console.error('Error:', message)
    progressContainer.style.display = 'none'
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  signOutBtn.addEventListener('click', function (e) {
    e.preventDefault()
    window.location.href = '../index.html'
  })
})
