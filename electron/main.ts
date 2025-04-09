import { app, BrowserWindow } from "electron";
import * as path from "path";
import { spawn } from "child_process";
import express from "express";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  // Cargar la UI servida en localhost:3000
  mainWindow.loadURL("http://localhost:3000");
}

function startFrontendStaticServer() {
  // if (expressServerStarted) return; // ✅ evita múltiples instancias
  // expressServerStarted = true;
  
  const appExpress = express();
  const frontendPath = path.join(__dirname, "..", "front", "out");
  appExpress.use(express.static(frontendPath));

  appExpress.listen(3000, () => {
    console.log("🟢 Frontend servido en http://localhost:3000");
  });
}

 function startBackend() {
   const backendPath = path.join(__dirname, "..", "electron", "backend-dist", "server.js");

  const backend = spawn("node", [backendPath], {
    cwd: path.dirname(backendPath),
    stdio: "inherit",
     detached: true,
     windowsHide: true,
  });
  backend.unref(); // 🔥 clave para que no lo cierre al cerrar Electron
  
// const backend = spawn(process.execPath, [backendPath], {
//   cwd: path.dirname(backendPath),
//   stdio: "ignore",
//   detached: true,
//   windowsHide: true,
// });
// backend.unref();


  backend.stderr?.on("data", (data) => {
    console.error(`🛑 Backend error: ${data}`);
  });

  backend.on("close", (code) => {
    console.log(`🔴 Backend exited with code ${code}`);
  });

  process.on("exit", () => backend.kill());
}


app.whenReady().then(() => {
  startBackend();
  startFrontendStaticServer();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});




// //!este es el funcional

// import { app, BrowserWindow } from "electron";
// import * as path from "path";
// import { spawn } from "child_process";
// import express from "express";

// let mainWindow: BrowserWindow | null = null;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1280,
//     height: 800,
//     webPreferences: {
//       contextIsolation: true,
//     },
//   });

//   // Cargar la UI servida en localhost:3000
//   mainWindow.loadURL("http://localhost:3000");
// }

// function startFrontendStaticServer() {
//   const appExpress = express();
//   const frontendPath = path.join(__dirname, "..", "front", "out");
//   appExpress.use(express.static(frontendPath));

//   appExpress.listen(3000, () => {
//     console.log("🟢 Frontend servido en http://localhost:3000");
//   });
// }

// function startBackend() {
//   const backendPath = path.join(__dirname, "..", "electron", "backend-dist", "server.js");

//   const backend = spawn("node", [backendPath], {
//     cwd: path.dirname(backendPath), // ✅ Esto es clave
//     stdio: "inherit",
//   });

//   backend.stderr?.on("data", (data) => {
//     console.error(`🛑 Backend error: ${data}`);
//   });

//   backend.on("close", (code) => {
//     console.log(`🔴 Backend exited with code ${code}`);
//   });

//   process.on("exit", () => backend.kill());
// }


// app.whenReady().then(() => {
//   startBackend();
//   startFrontendStaticServer();
//   createWindow();

//   app.on("activate", () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });
