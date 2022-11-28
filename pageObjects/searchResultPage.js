'use strict';
const { element, browser } = require("protractor");
const { DriverProvider } = require("protractor/built/driverProviders");
const CareerPage_updated = require("./careerPage_updated");

class SearchResultPage extends CareerPage_updated {
    constructor() {
        super();
        
        const SEARCH_RESULT_ITEM_SELECTOR = '.search-result__list .search-result__item';
        this.searchResultItems = element.all(by.css(SEARCH_RESULT_ITEM_SELECTOR));
        this.nameOfPosition = position => position.element(by.css('.search-result__item-name'));
        this.locationOfPosition = position => position.element(by.css('.search-result__location'));

        this.searchList = element(by.css(".search-result__list"))
    }
    getFirstResultByPosition(name) {
        browser.wait(ec.textToBePresentInElement(this.searchList, name), 8000);
        return element(by.xpath(`//*[@class="search-result__item"][.//*[@class="search-result__item-name"][contains(normalize-space(.),"${name}")]]`));

    }
    search() {
        this.searchButton.click();
        return browser.wait(() => {
            return this.searchResultItems.count().then(n => n > 0);
        }, GLOBAL_TIMEOUT);
    }

}

module.exports = SearchResultPage;