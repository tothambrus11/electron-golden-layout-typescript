"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var mainWindow;
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile(__dirname + "/index.html");
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map