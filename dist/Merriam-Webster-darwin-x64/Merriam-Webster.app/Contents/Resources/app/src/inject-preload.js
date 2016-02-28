"use strict";
const ipcRenderer = require('electron').ipcRenderer;
const menu = require('./menu.js');
const remote = require('remote');
const Menu = remote.require('menu');
const MenuItem = remote.MenuItem;

const lock = (object, key, value) => Object.defineProperty(object, key, {
  get: () => value,
  set: () => {
  }
});

lock(window, 'console', window.console);

window.injectBundle = {};

injectBundle.createCtxMenu = () => {
  var menu = new Menu();
  menu.append(new MenuItem({ label: 'copy', role: 'copy' }));

  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow());
  }, false);  
}

menu.create();
