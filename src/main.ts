import {app, BrowserWindow} from "electron";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile(__dirname + "/index.html");

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});