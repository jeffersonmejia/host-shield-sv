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

  // Configurar eventos de drag and drop
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

  // Función para manejar la selección de archivo
  function handleFileSelect() {
    errorMessage.textContent = ''
    uploadResult.style.display = 'none'

    if (fileInput.files.length === 0) return

    const file = fileInput.files[0]
    currentFile = file

    // Validar el archivo
    if (!file.name.toLowerCase().endsWith('.zip')) {
      showError('Solo se permiten archivos .zip')
      return
    }

    if (file.size > 50 * 1024 * 1024) {
      // 50MB límite
      showError('El archivo no puede ser mayor a 50MB')
      return
    }

    // Mostrar información del archivo
    fileInfo.textContent = `Archivo seleccionado: ${
      file.name
    } (${formatFileSize(file.size)})`

    // Simular subida al servidor
    simulateUpload(file)
  }

  function simulateUpload(file) {
    progressContainer.style.display = 'block'

    // Simular progreso de subida
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress > 100) progress = 100
      progressBar.style.width = progress + '%'
      progressBar.textContent = Math.round(progress) + '%'

      if (progress === 100) {
        clearInterval(interval)

        // Simular respuesta del servidor
        setTimeout(() => {
          const response = {
            success: true,
            message: 'Archivo subido correctamente',
            file: {
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: new Date(file.lastModified).toLocaleString(),
            },
          }

          showUploadResult(response)
          progressContainer.style.display = 'none'
        }, 500)
      }
    }, 200)
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
