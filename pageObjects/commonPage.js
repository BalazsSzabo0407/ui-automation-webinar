'use strict';
const { element, browser } = require("protractor");
const { DriverProvider } = require("protractor/built/driverProviders");

class CommonPage{
    constructor() {
    this.logo = element(by.css('.header__logo-container'));
    }
    load() {
        browser.get('https://www.epam.com/careers');
        return browser.wait(ec.elementToBeClickable(this.logo), GLOBAL_TIMEOUT);

    }
}

module.exports = CommonPage;