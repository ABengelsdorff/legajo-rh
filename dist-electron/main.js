"use strict";
// import { app, BrowserWindow } from "electron";
// import * as path from "path";
// import { spawn } from "child_process";
// import express from "express";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
// // function startFrontendStaticServer() {
// //   const appExpress = express();
// //   const frontendPath = path.join(__dirname, "..", "front", "out");
// //   appExpress.use(express.static(frontendPath));
// //   appExpress.listen(3000, () => {
// //     console.log("🟢 Frontend servido en http://localhost:3000");
// //   }).on("error", (err: any) => {
// //     if (err.code === "EADDRINUSE") {
// //       console.warn("⚠️ Puerto 3000 ya está en uso. No se pudo iniciar el servidor frontend.");
// //     } else {
// //       console.error("🛑 Error al iniciar el servidor frontend:", err);
// //     }
// //   });
// // }
// // Inicia el backend de Electron
// function startBackend() {
//   // const backendPath = path.join(__dirname, "..", "electron", "backend-dist", "server.js");
//   // const backend = spawn("node", [backendPath], {
//   //   stdio: "inherit",
//   // });
//   const backendPath = path.join(__dirname, "..", "electron", "backend-dist", "server.js");
//   const backend = spawn(process.execPath, [backendPath], {
//     cwd: path.dirname(backendPath),
//     stdio: "inherit",
//     // detached: true,
//     windowsHide: true
//   });
//   // backend.unref();
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
// import { app, BrowserWindow } from "electron";
// import * as path from "path";
// import { spawn } from "child_process";
// import express from "express";
// import http from "http";
// let mainWindow: BrowserWindow | null = null;
// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 1280,
//     height: 800,
//     webPreferences: {
//       contextIsolation: true,
//     },
//   });
//   mainWindow.loadURL("http://localhost:3000");
// }
// function startFrontendStaticServer() {
//   const appExpress = express();
//   const frontendPath = path.join(__dirname, "..", "front", "out");
//   appExpress.use(express.static(frontendPath));
//   appExpress.listen(3000, () => {
//     console.log("🟢 Frontend servido en http://localhost:3000");
//   }).on("error", (err: any) => {
//     if (err.code === "EADDRINUSE") {
//       console.warn("⚠️ Puerto 3000 ya está en uso.");
//     } else {
//       console.error("🛑 Error al iniciar el servidor frontend:", err);
//     }
//   });
// }
// function startBackend() {
//   const backendPath = path.join(__dirname, "..", "electron", "backend-dist", "server.js");
//   const backend = spawn(process.execPath, [backendPath], {
//     cwd: path.dirname(backendPath),
//     stdio: "inherit",
//     windowsHide: true,
//   });
//   backend.stderr?.on("data", (data) => {
//     console.error(`🛑 Backend error: ${data}`);
//   });
//   backend.on("close", (code) => {
//     console.log(`🔴 Backend exited with code ${code}`);
//   });
//   process.on("exit", () => backend.kill());
// }
// function waitForBackend(url: string, maxRetries = 20, interval = 500): Promise<void> {
//   let attempts = 0;
//   return new Promise((resolve, reject) => {
//     const check = () => {
//       http.get(url, (res) => {
//         console.log("✅ Backend está disponible.");
//         resolve();
//       }).on("error", () => {
//         attempts++;
//         if (attempts >= maxRetries) {
//           reject(new Error("❌ Backend no respondió después de varios intentos."));
//         } else {
//           setTimeout(check, interval);
//         }
//       });
//     };
//     check();
//   });
// }
// app.whenReady().then(async () => {
//   startBackend();
//   startFrontendStaticServer();
//   try {
//     await waitForBackend("http://localhost:3001/auth/login"); // cualquier endpoint que tengas
//     createWindow();
//   } catch (error) {
//     console.error(error);
//     app.quit();
//   }
//   app.on("activate", () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });
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
const electron_1 = require("electron");
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const express_1 = __importDefault(require("express"));
let mainWindow = null;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
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
    const appExpress = (0, express_1.default)();
    const frontendPath = path.join(__dirname, "..", "front", "out");
    appExpress.use(express_1.default.static(frontendPath));
    appExpress.listen(3000, () => {
        console.log("🟢 Frontend servido en http://localhost:3000");
    });
}
function startBackend() {
    const backendPath = path.join(__dirname, "..", "electron", "backend-dist", "server.js");
    const backend = (0, child_process_1.spawn)("node", [backendPath], {
        cwd: path.dirname(backendPath),
        stdio: "ignore",
        detached: true,
        windowsHide: true,
    });
    backend.unref(); // 🔥 clave para que no lo cierre al cerrar Electron
    backend.stderr?.on("data", (data) => {
        console.error(`🛑 Backend error: ${data}`);
    });
    backend.on("close", (code) => {
        console.log(`🔴 Backend exited with code ${code}`);
    });
    process.on("exit", () => backend.kill());
}
electron_1.app.whenReady().then(() => {
    startBackend();
    startFrontendStaticServer();
    createWindow();
    electron_1.app.on("activate", () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
