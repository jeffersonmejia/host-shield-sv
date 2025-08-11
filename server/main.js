const express = require('express')
const path = require('path')
const mysql = require('mysql2')
const routes = require('./routes')

const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, '../public')))
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

const config = {
  host: '172.27.50.4',
  port: 3306,
  user: 'Lisseth',
  password: 'Miasoledad06',
  database: 'hosting_admin',
}

function connectDB() {
  return mysql.createConnection(config)
}

function showTables(connection) {
  connection.query('SHOW TABLES', (err, results) => {
    if (err) throw err
    console.log(`Connection successful to ${config.database}`)
    connection.end()
  })
}

const connection = connectDB()
connection.connect((err) => {
  if (err) throw err
  showTables(connection)
})
