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

module.exports = injectBundle;
