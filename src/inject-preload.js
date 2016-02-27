"use strict";
const ipcRenderer = require('electron').ipcRenderer;
const menu = require('./menu.js');
// const tray = require('./tray.js');

const lock = (object, key, value) => Object.defineProperty(object, key, {
  get: () => value,
  set: () => {
  }
});

lock(window, 'console', window.console);

let angular = window.angular = {};
let angularBootstrapReal;
Object.defineProperty(angular, 'bootstrap', {
  get: () => angularBootstrapReal ? function (element, moduleNames) {
    const moduleName = 'webwxApp';
    if (moduleNames.indexOf(moduleName) >= 0) {
      let constants;
      angular.injector(['ng', 'Services']).invoke(['confFactory', (confFactory) => (constants = confFactory)]);
      angular.module(moduleName).config([
        '$httpProvider',
        ($httpProvider) => {
          $httpProvider.defaults.transformResponse.push((value) => {
            if (typeof value === 'object' && value !== null && value.AddMsgList instanceof Array) {
              value.AddMsgList.forEach((msg) => {
                switch (msg.MsgType) {
                  case constants.MSGTYPE_EMOTICON:
                    const rec = msg.Content.match(/^&lt;msg&gt;&lt;emoji.+cdnurl = "(.+?)".+thumburl = "(.+?)"/);
                    if (rec !== null) {
                      let actualContent = msg.Content;
                      lock(msg, 'MMActualContent', actualContent);
                      lock(msg, 'MMDigest', '[Emoticon resolved by Electronic WeChat]');
                      lock(msg, 'MsgType', constants.MSGTYPE_EMOTICON);
                    }
                    break;
                  case constants.MSGTYPE_RECALLED:
                    lock(msg, 'MsgType', constants.MSGTYPE_SYS);
                    lock(msg, 'MMActualContent', '阻止了一次撤回');
                    lock(msg, 'MMDigest', '阻止了一次撤回');
                    break;
                }
              });
            }
            return value;
          });
        }
      ]);
    }
    return angularBootstrapReal.apply(angular, arguments);
  } : angularBootstrapReal,
  set: (real) => (angularBootstrapReal = real)
});

window.injectBundle = {};
injectBundle.getBadgeJS = () => {
  $(".chat_list.scroll-content").bind('DOMSubtreeModified', () => {
    var count = 0;
    $(".icon.web_wechat_reddot_middle").each(function () {
      count += parseInt(this.textContent);
    });
    if (count > 0) {
      ipcRenderer.send("badge-changed", count.toString());
    } else {
      ipcRenderer.send("badge-changed", "");
    }
  })
};

injectBundle.getProfileNameJS = () => {
  let updateName = ()=> {
    let name = $('.display_name').text();
    ipcRenderer.send("profile-name-changed", name);
  };
  $('.display_name').ready(updateName).change(updateName);
};

injectBundle.getProfileNameJS = () => {
  let updateName = ()=> {
    let name = $('.display_name').text();
    ipcRenderer.send("profile-name-changed", name);
  };
  $('.display_name').ready(updateName).change(updateName);
};

// injectBundle.hideFooter = () => {
//   var footer = document.getElementsByClassName("footer-foot-content")
//   footer[0].style.display = 'none'
// }

menu.create();
// tray.create();

// var footer = document.getElementsByTagName("footer")
// footer[0].style.display = 'none'
