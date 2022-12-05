'use strict';
const { browser } = require("protractor");
const {After, Status} = require('cucumber');
const fs = require("fs");

After(async function (testCase) {
    if (testCase.result.status === Status.FAILED) {
      let screenshot = await browser.takeScreenshot();
      fs.writeFileSync(`screenshots/report.png`,screenshot,{encoding:"base64"});
    }
  });
    