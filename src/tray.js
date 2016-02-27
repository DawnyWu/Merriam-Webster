// "use strict";

// let trayHandler = {};

// trayHandler.create = () => {
//   let remote = require('remote');
//   let app = remote.app;
//   let Menu = remote.require('menu');
//   let Tray =remote.require('tray');

//   var appIcon = null;
//   app.on('ready', function(){
//     appIcon = new Tray('../assets/mw.png');
//     var contextMenu = Menu.buildFromTemplate([
//       { label: 'Item1', type: 'radio' },
//       { label: 'Item2', type: 'radio' },
//       { label: 'Item3', type: 'radio', checked: true },
//       { label: 'Item4', type: 'radio' }
//     ]);
//     appIcon.setToolTip('This is my application.');
//     appIcon.setContextMenu(contextMenu);
//   });


// };

// module.exports = trayHandler;
