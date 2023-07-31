import {
  app,
  BrowserWindow,
  contextBridge,
  ipcMain,
  Menu,
  Notification,
  shell,
} from "electron";
import { release } from "node:os";
import { join } from "node:path";
import { update } from "./update";
import {
  closeConnection,
  createConnection,
  getConnection,
} from "../../src/backend/mysql";
import { expressApp } from "../../express/server";

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId("Mundo dos Bichos");

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

Menu.setApplicationMenu(null);

async function createWindow() {
  win = new BrowserWindow({
    title: "Mundo dos Bichos",
    icon: join(__dirname, "../../icon.ico"),
    resizable: false,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (url) {
    win.loadURL(url);
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
  // Apply electron-updater
  update(win);
}

const noti = () => {
  new Notification({
    title: "Aviso",
    body: "A aplicação Mundo dos Bichos foi iniciada!",
  }).show();
};

app.whenReady().then(() => {
  createWindow();
  noti();
  createConnection();

  expressApp.listen(3000);
});

//app.on('ready', createWindow)

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") {
    app.quit();
    closeConnection();
  }
});

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

ipcMain.on("fetch-clients", (event) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  fetch("http://localhost:3000/api/customers", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      event.sender.send("fetchClientsResponse", data);
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao buscar os clientes:", error);
    });
});

ipcMain.on("fetch-clients-test", (event) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  fetch("http://localhost:8080/api/customers", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      event.sender.send("fetchClientsResponse-test", data);
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao buscar os clientes:", error);
    });
});

ipcMain.on("fetch-schedules", (event) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  fetch("http://localhost:3000/api/schedules", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      event.sender.send("fetchSchedulesResponse", data);
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao buscar os clientes:", error);
    });
});


// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
