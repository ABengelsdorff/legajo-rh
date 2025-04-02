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
  const appExpress = express();
  const frontendPath = path.join(__dirname, "..", "front", "out");
  appExpress.use(express.static(frontendPath));

  appExpress.listen(3000, () => {
    console.log("🟢 Frontend servido en http://localhost:3000");
  });
}

function startBackend() {
  const backendPath = path.join(__dirname, "..", "back", "dist", "server.js");
  const backend = spawn("node", [backendPath], {
    stdio: "inherit",
  });

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
