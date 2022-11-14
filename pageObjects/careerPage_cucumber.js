'use strict';
const { element, browser } = require("protractor");
const { Key } = require("selenium-webdriver");

class CareerPage {
    constructor() {
        this.logo = element(by.css('.header__logo-container'));
        this.searchForm = element(by.css('#jobSearchFilterForm'));
        this.searchButton = this.searchForm.element(by.css('.recruiting-search__submit'));

        this.cookieAcceptButton = element(by.css("[id=onetrust-accept-btn-handler]"))

        this.locationFilterBox = this.searchForm.element(by.css(".recruiting-search__location"))
        //this.selectedLocation = this.locationFilterBox.element(by.css("[title=Debrecen]")
        this.getLocation = location => this.locationFilterBox.element(by.cssContainingText("title=Debrecen]", location));

        this.skillsSelect = this.searchForm.element(by.css('.multi-select-filter'));
        this.getSkillsCheckbox = skill => this.skillsSelect.element(by.cssContainingText("span.checkbox-custom-label", skill));
        this.selectedSkills = element.all(by.css('.selected-items'));

        const SEARCH_RESULT_ITEM_SELECTOR = '.search-result__list .search-result__item';
        this.searchResultItems = element.all(by.css(SEARCH_RESULT_ITEM_SELECTOR));
        this.nameOfPosition = position => position.element(by.css('.search-result__item-name'));
        this.locationOfPosition = position => position.element(by.css('.search-result__location'));
        this.applyLinkOfPosition = position => position.element(by.css('.search-result__item-apply'));
        this.jobDescription = element(by.css('.recruiting-page__top-description'));
        
        this.applyForJob = element(by.css("div.button__wrapper:nth-child(3) > a:nth-child(1) > span:nth-child(1)"))

        this.searchList = element(by.css(".search-result__list"))

        //this.getResultByPosition = () => element(by.css("li.search-result__item:last-child"));

        //this.getResultByPosition = name => this.searchResultItems.filter(item => {
        //    return this.nameOfPosition(item).getText().then(position => position.trim() === name);
        //}).first();
    }
    selectedLocation(location) {
        return this.locationFilterBox.element(by.css(`[title=${location}`))
    }

    acceptCookies() {
        //browser.manage().timeouts().implicitlyWait(3000);
        browser.wait(ec.textToBePresentInElement(this.cookieAcceptButton,"Accept All"),5000)
        this.cookieAcceptButton.click();
    }


    getFirstResultByPosition(name) {
        browser.wait(ec.textToBePresentInElement(this.searchList, name), 8000);
        return element(by.xpath(`//*[@class="search-result__item"][.//*[@class="search-result__item-name"][contains(normalize-space(.),"${name}")]]`));

    }

    selectLocation(location) {
        element(by.css(".select2-selection")).sendKeys(location, Key.RETURN);
    }

    getSelectedLocation(location) {
        return this.selectedLocation(location).getText();
    }

    load() {
        browser.get('https://www.epam.com/careers');
        return browser.wait(ec.elementToBeClickable(this.logo), GLOBAL_TIMEOUT);

    }

    toggleSkills(skill) {
        const skillsCheckbox = this.getSkillsCheckbox(skill);
        skillsCheckbox.isDisplayed().then(displayed => {
            if (!displayed) {
                this.skillsSelect.click();
            }
        }, e => this.skillsSelect.click());
        browser.wait(ec.visibilityOf(skillsCheckbox), GLOBAL_TIMEOUT);
        return skillsCheckbox.click();
    }

    search() {
        this.searchButton.click();
        return browser.wait(() => {
            return this.searchResultItems.count().then(n => n > 0);
        }, GLOBAL_TIMEOUT);
    }

    async applyForPosition(position) {
        this.applyLinkOfPosition(position).click();
        return browser.wait(ec.visibilityOf(this.jobDescription), GLOBAL_TIMEOUT);
    }
}

module.exports = CareerPage;