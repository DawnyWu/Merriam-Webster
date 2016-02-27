/**
 * Created by Zhongyi on 2/23/16.
 */
"use strict";

let injectBundle = {};

injectBundle.mwCSS = `
    div.home-top-creative-cont {
      display: none !important;
    }
    div.right-rail {
      display: none !important;
    }
    div.stickied {
      display: none !important;
    }
    div.central-abl-box {
      display: none !important;
    }
    div.seen-and-heard-block {
      display: none !important;
    }
    div.additional-content-area {
      display: none !important;
    }
    div.footer-subscribe-block {
      display: none !important;
    }
    div.footer-dictionaries {
      display: none !important;
    }
    div.follow-us {
      display: none !important;
    }
    footer {
      display: none !important;
    }
    // div.nav-btn-cnt {
    //   display: none !important;
    // }
    // div.since1828-cnt {
    //   display: none !important;
    // }
    // div.logo-cnt {
    //   display: none !important;
    // }
    div.definitions-center-creative-cont {
      display: none !important;
    }
    ul.s-dropdown li[data-ref="scrabble"] {
      display: none !important;
    }
    ul.s-dropdown li[data-ref="spanish"] {
      display: none !important;
    }
    ul.s-dropdown li[data-ref="learners"] {
      display: none !important;
    }
`;

injectBundle.wechatCSS = `
    img.custom_emoji {
      height: initial !important;
      width: 120px !important;
    }
    div.main {
      height: 100% !important;
      min-height: 0 !important;
      padding-top: 0 !important;
    }
    div.main_inner {
      max-width: none !important;
      min-width: 0 !important;
    }
    div.message_empty {
      margin-top: 50px;
    }
    div.img_preview_container div.img_opr_container {
      bottom: 50px !important;
    }
    p.copyright {
      display: none !important
    }
    a.web_wechat_screencut {
      display: none !important;
    }
    * {
      -webkit-user-select: none;
      cursor: default !important;
      -webkit-user-drag: none;
    }
    pre, input {
      -webkit-user-select: initial;
      cursor: initial !important;
    }
    div.header div.avatar img.img {
      width: 24px;
      height: 24px;
    }
    div.header {
      padding-top: 38px;
      padding-bottom: 7px;
    }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }`;

injectBundle.loginCSS = `
    div.login_box {
      top: initial;
      left: initial;
      margin-left: initial;
      margin-top: initial;
      width: 100%;
      height: 100%;
    }
    div.login {
      min-width: 0;
      min-height: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  `;

module.exports = injectBundle;
