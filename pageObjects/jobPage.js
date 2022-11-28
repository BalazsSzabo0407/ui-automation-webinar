'use strict';
const { element, browser } = require("protractor");
const { DriverProvider } = require("protractor/built/driverProviders");
const SearchResultPage = require("./careerPage_updated");

class JobPage extends SearchResultPage {
    constructor() {
        super();
        
        this.applyLinkOfPosition = position => position.element(by.css('.search-result__item-apply'));
        this.jobDescription = element(by.css('.recruiting-page__top-description'));

        this.applyForJob = element(by.css("div.button__wrapper:nth-child(3) > a:nth-child(1) > span:nth-child(1)"))
    }

    async applyForPosition(position) {
        this.applyLinkOfPosition(position).click();
        return browser.wait(ec.visibilityOf(this.jobDescription), GLOBAL_TIMEOUT);
    }

}

module.exports = JobPage;