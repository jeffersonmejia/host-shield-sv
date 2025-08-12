const express = require('express');
const path = require('path');
const session = require('express-session');
const routes = require('./routes');
const { sendFile } = require('./controller/uploadApp'); // Importa el módulo actualizado

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: '123',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
    })
);

// Protección de ruta
app.use('/home.html', (req, res, next) => {
    req.session?.user ? next() : res.redirect('/');
});

// Archivos estáticos y rutas
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', routes);

// Iniciar servidor
app.listen(PORT, HOST, () => {
    console.log(`✅ Servidor activo en http://${HOST}:${PORT}`);
    console.log(`🌐 Acceso por ZeroTier: http://172.27.11.195:${PORT}`);
});