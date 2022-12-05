'use strict';
const { element, browser } = require("protractor");
const { DriverProvider } = require("protractor/built/driverProviders");
const { Key } = require("selenium-webdriver");
const CommonPage = require("./commonPage")

class CareerPage extends CommonPage {
    constructor() {
        super();
        this.searchForm = element(by.css('#jobSearchFilterForm'));
        this.searchButton = this.searchForm.element(by.css('.recruiting-search__submit'));

        this.cookieAcceptButton = element(by.css("[id=onetrust-accept-btn-handler]"))

        this.locationFilterBox = this.searchForm.element(by.css(".recruiting-search__location"))
        this.getLocation = location => this.locationFilterBox.element(by.cssContainingText("title=Debrecen]", location));

        this.skillsSelect = this.searchForm.element(by.css('.multi-select-filter'));
        this.getSkillsCheckbox = skill => this.skillsSelect.element(by.cssContainingText("span.checkbox-custom-label", skill));
        this.selectedSkills = element.all(by.css('.selected-items'));

    }
    selectedLocation(location) {
        return this.locationFilterBox.element(by.css(`[title=${location}`))
    }

    acceptCookies() {
        browser.wait(ec.textToBePresentInElement(this.cookieAcceptButton, "Accept All"), 5000)
        this.cookieAcceptButton.click();
    }


    selectLocation(location) {
        element(by.css(".select2-selection")).sendKeys(location, Key.RETURN);
    }

    getSelectedLocation(location) {
        return this.selectedLocation(location).getText();
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

}

module.exports = CareerPage;