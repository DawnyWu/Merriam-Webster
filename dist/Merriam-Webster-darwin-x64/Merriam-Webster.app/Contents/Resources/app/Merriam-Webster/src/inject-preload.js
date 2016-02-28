"use strict";
const ipcRenderer = require('electron').ipcRenderer;
const menu = require('./menu.js');

const lock = (object, key, value) => Object.defineProperty(object, key, {
  get: () => value,
  set: () => {
  }
});

lock(window, 'console', window.console);

window.injectBundle = {};

menu.create();
