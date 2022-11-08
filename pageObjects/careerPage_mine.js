'use strict';
const { element } = require("protractor");
const { Key } = require("selenium-webdriver");

class CareerPage {
    constructor() {
        this.logo = element(by.css('.header__logo-container'));
        this.searchForm = element(by.css('#jobSearchFilterForm'));
        this.searchButton = this.searchForm.element(by.css('.recruiting-search__submit'));

        this.locationFilterBox = this.searchForm.element(by.css(".recruiting-search__location"))
        this.selectedLocation = this.locationFilterBox.element(by.css("[title=Debrecen]"))
        this.getLocation = location => this.locationFilterBox.element(by.cssContainingText("title=Debrecen]", location));

        this.skillsSelect = this.searchForm.element(by.css('.multi-select-filter'));
        this.getSkillsCheckbox = skill => this.skillsSelect.element(by.cssContainingText("#jobSearchFilterForm > div:nth-child(3) > div > div.multi-select-dropdown-container > div > ul:nth-child(2) > li:nth-child(1) > label > span", skill));
        this.selectedSkills = this.skillsSelect.all(by.css('.selected-items'));
                                                                    
        const SEARCH_RESULT_ITEM_SELECTOR = '.search-result__list';
        this.searchResultItems = element.all(by.css(SEARCH_RESULT_ITEM_SELECTOR));
        this.nameOfPosition = position => position.element(by.css('li.search-result__item:nth-child(1) > div:nth-child(1) > h5:nth-child(1) > a:nth-child(1)'));
        this.locationOfPosition = position => position.element(by.css('li.search-result__item:nth-child(1) > div:nth-child(1) > strong:nth-child(2)'));
        this.applyLinkOfPosition = position => position.element(by.css('li.search-result__item:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)'));
        this.jobDescription = element(by.css('li.search-result__item:nth-child(1) > p:nth-child(2)'));

        this.getResultByPosition = name => this.searchResultItems.filter(item => {
            return this.nameOfPosition(item).getText().then(position => position.trim() === name);
        }).first();
    }

    selectLocation(location) {
        element(by.css(".select2-selection")).sendKeys(location, Key.RETURN);
    }

    getSelectedLocation() {
        return this.selectedLocation.getText();
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

    async search () {
        await this.searchButton.click();
    }
}

module.exports = CareerPage;