const express = require('express')
const path = require('path')
const session = require('express-session')
const routes = require('./routes')

const app = express()
const PORT = 3000

app.use(
  session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
)

app.use('/home.html', (req, res, next) => {
  if (req.session && req.session.user) {
    next()
  } else {
    res.redirect('/')
  }
})

app.use(express.static(path.join(__dirname, '../public')))

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
