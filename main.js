require("reflect-metadata");


const { app: electronApp, BrowserWindow } = require('electron');
const path = require('path');
// Importamos la app y la función de inicialización de la base de datos
const { app: expressApp, PORT } = require('./back/dist/server');
const { initializeDatabase } = require('./back/dist/server');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      devTools: true,
      preload: path.join(__dirname, 'preload.js') // Opcional
    }
  });
  // Cargar la URL del servidor Express (en este ejemplo, localhost)
  if (process.env.NODE_ENV === 'development') {
    win.loadURL(`http://127.0.0.1:${PORT}`);
  } else {
    win.loadFile(path.join(__dirname, 'front', 'out', 'index.html'));
    win.webContents.openDevTools();
  }  
}

electronApp.whenReady().then(async () => {
  try {
    // Inicializar la base de datos
    await initializeDatabase();
    // Iniciar el servidor Express
    expressApp.listen(PORT, '127.0.0.1', () => {
      console.log(`🚀 Servidor Express escuchando en http://127.0.0.1:${PORT}`);
      createWindow();
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
  }
});

electronApp.on('window-all-closed', () => {
  if (process.platform !== 'darwin') electronApp.quit();
});
