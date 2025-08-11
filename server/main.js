const mysql = require('mysql2')

const conexion = mysql.createConnection({
  host: '172.27.50.4',
  port: 3306,
  user: 'Lisseth',
  password: 'Miasoledad',
  database: 'hosting_admin',
})

conexion.connect((error) => {
  if (error) {
    console.error('Error de conexión:', error)
    return
  }
  console.log('Conectado a hosting_admin')
  conexion.query('SHOW TABLES', (err, resultados) => {
    if (err) {
      console.error('Error en la consulta:', err)
      return
    }
    console.log('Tablas en hosting_admin:', resultados)
    conexion.end()
  })
})
