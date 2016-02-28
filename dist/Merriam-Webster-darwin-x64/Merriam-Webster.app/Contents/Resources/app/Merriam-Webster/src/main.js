'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const shell =require('shell');
const Menu = require('menu')
const Tray = require('tray');
const path = require('path')

const injectBundle = require('./inject-onload.js');
// const messageHandler = require('./message.js');

const WINDOW_TITLE = 'Merriam-Webster';

var browserWindow = null;
var iconPath = path.join(__dirname, '..', 'assets', 'mw.png');

let createWindow = () => {
  browserWindow = new BrowserWindow({
    title: WINDOW_TITLE,
    width: 1000,
    height: 600,
    // maxWidth: 760,
    resizable: true,
    center: true,
    show: true,
    frame: true, 
    icon: 'icon.png',
    // titleBarStyle: 'hidden-inset',
    'web-preferences': {
      javascript: true,
      plugins: true,
      nodeIntegration: false,
      webSecurity: false,
      preload: __dirname + '/inject-preload.js'
    }
  });

  browserWindow.webContents.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36");
  browserWindow.webContents.openDevTools();

  // browserWindow.loadURL("https://wx.qq.com/");
  browserWindow.loadURL("http://www.merriam-webster.com/dictionary/hello");


  browserWindow.webContents.on('will-navigate', (ev, url) => {
    if (url == 'http://www.merriam-webster.com/'){
      ev.preventDefault();
      browserWindow.webContents.loadURL("http://www.merriam-webster.com/dictionary/hello");
    }

  });

  browserWindow.on('closed', () => {
    browserWindow = null;
  });

  browserWindow.on('page-title-updated', (ev) => {
    ev.preventDefault();
  });

  browserWindow.webContents.on('dom-ready', () => {
    browserWindow.webContents.insertCSS(injectBundle.mwCSS);
  });

  browserWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
};

var appIcon; 

app.on('ready', () => {
  createWindow();
  appIcon = new Tray(iconPath);

  var contextMenu = Menu.buildFromTemplate([
    { label: '打开词典',
      click: function () {
        console.log(browserWindow)
        if (browserWindow == null){
          createWindow();
        } else {
          browserWindow.show();
        }
      }
    },
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
});

// app.on('browserWindow-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (browserWindow == null) {
    createWindow();
  }
});

// ipcMain.on('badge-changed', (event, num) => {
//   if (process.platform == "darwin") {
//     app.dock.setBadge(num);
//   }
// });

ipcMain.on('log', (event, message) => {
  console.log(message)
});

