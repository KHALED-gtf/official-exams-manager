const { autoUpdater } = require("electron-updater");

// (Optional) Set the update feed URL (if using a custom server)
// autoUpdater.setFeedURL('https://your-update-server.com');

autoUpdater
  .checkForUpdatesAndNotify()
  .then(() => {
    // Handle update download and restart logic here
    autoUpdater.on("update-downloaded", () => {
      const dialog = require("electron").dialog;

      dialog
        .showMessageBox({
          type: "info",
          buttons: ["Restart", "Later"],
          title: "Update Available",
          message: "A new update is available. Do you want to restart now?",
        })
        .then((result) => {
          if (result.response === 0) {
            autoUpdater.quitAndInstall();
          }
        });
    });
  })
  .catch((error) => {
    console.error("Error checking for updates:", error);
  });
