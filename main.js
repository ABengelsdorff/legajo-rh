require("reflect-metadata");

const { app: electronApp, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');

// Tus importaciones existentes:
const { app: expressApiApp, PORT: apiPort, initializeDatabase } = require('./back/dist/server');

// Configura un nuevo servidor estático para tu frontend
const staticApp = express();
const FRONTEND_PORT = 3000; // Puedes usar otro puerto que esté disponible

// Sirve la carpeta 'out' generada por Next.js
staticApp.use('/', serveStatic(path.join(__dirname, 'front', 'out')));

// Inicialización de Electron con ambos servidores
async function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (process.env.NODE_ENV === 'development') {
    // Desarrollo: cargas tu API local y Next.js directamente
    win.loadURL(`http://127.0.0.1:${apiPort}`);
  } else {
    // Producción: carga desde el servidor estático local
    win.loadURL(`http://127.0.0.1:${FRONTEND_PORT}`);
    win.webContents.openDevTools();
  }
}

electronApp.whenReady().then(async () => {
  try {
    await initializeDatabase();

    // Inicia servidor Express (API)
    expressApiApp.listen(apiPort, '127.0.0.1', () => {
      console.log(`🚀 API Express escuchando en http://127.0.0.1:${apiPort}`);
    });

    // Inicia servidor estático (Frontend Next.js)
    staticApp.listen(FRONTEND_PORT, '127.0.0.1', () => {
      console.log(`🌐 Frontend servido en http://127.0.0.1:${FRONTEND_PORT}`);
      createWindow();
    });

  } catch (error) {
    console.error('Error al iniciar:', error);
  }
});

electronApp.on('window-all-closed', () => {
  if (process.platform !== 'darwin') electronApp.quit();
});
