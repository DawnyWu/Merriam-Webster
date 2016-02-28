"use strict";

let menuHandler = {};

menuHandler.create = () => {
  let remote = require('remote');
  let Menu = remote.require('menu');
  let shell = require('shell');
  let template = [
    {
      label: 'Merriam-Webster',
      submenu: [
        {
          label: 'About Merriam-Webster',
          selector: 'orderFrontStandardAboutPanel:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          selector: 'terminate:'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+Command+I',
          click: () => {
            remote.getCurrentWindow().toggleDevTools();
          }
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        {
          label: 'Close',
          accelerator: 'Command+W',
          selector: 'performClose:'
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'GitHub Repository',
          click: () => {
            shell.openExternal('https://github.com/DawnyWu/Merriam-Webster');
          }
        },
        {
          type: 'separator'
        },{
          label: 'GitHub Issues',
          click: () => {
            shell.openExternal('https://github.com/DawnyWu/Merriam-Webster/issues');
          }
        }
      ]
    }
  ];

  let menu = Menu.buildFromTemplate(template);

  if (remote.process.platform == "darwin") {
    Menu.setApplicationMenu(menu);
  }
};

module.exports = menuHandler;
