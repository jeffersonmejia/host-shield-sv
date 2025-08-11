async function handleLoginSubmit(event) {
  event.preventDefault()
  console.log('ok')
  const form = event.target
  const email = form.querySelector('input[type="text"]').value?.trim() || ''
  const password =
    form.querySelector('input[type="password"]').value?.trim() || ''

  if (!email || !password) {
    alert('Por favor, completa todos los campos')
    return
  }

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email, password }),
      credentials: 'same-origin',
    })

    const data = await res.json()

    if (res.ok) {
      window.location.href = 'home.html'
    } else {
      alert(data.error || 'Error en el login')
    }
  } catch {
    alert('Error en la conexión')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  if (form) form.addEventListener('submit', handleLoginSubmit)
})
