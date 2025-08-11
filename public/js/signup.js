const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(data)
    })
    const result = await response.json()
    if (response.ok) {
      alert(result.message)
      form.reset()
    } else {
      alert(result.error || 'Error en el registro')
    }
  } catch (error) {
    alert('Error al conectar con el servidor')
  }
})
