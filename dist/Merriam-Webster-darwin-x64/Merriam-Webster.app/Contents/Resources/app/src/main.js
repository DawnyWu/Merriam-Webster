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

const WINDOW_TITLE = 'Merriam-Webster';

var browserWindow = null;
var iconPath = path.join(__dirname, '..', 'assets', 'mw.png');

let createWindow = () => {
  browserWindow = new BrowserWindow({
    title: WINDOW_TITLE,
    width: 560,
    height: 640,
    maxWidth: 760,
    resizable: true,
    center: true,
    show: true,
    frame: true, 
    icon: 'icon.png',
    'web-preferences': {
      javascript: true,
      plugins: true,
      nodeIntegration: false,
      webSecurity: false,
      preload: __dirname + '/inject-preload.js'
    }
  });

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
    browserWindow.webContents.executeJavaScript(`injectBundle.createCtxMenu()`);
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
    { label: 'Open Dictionary',
      click: function () {
        if (browserWindow == null){
          createWindow();
        } else {
          browserWindow.show();
        }
      }
    },{
      label: 'Quit Dictionary',
      click: function () {
        app.quit();
      }
    }
  ]);

  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
});

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

ipcMain.on('log', (event, message) => {
  console.log(message)
});

