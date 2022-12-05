'use strict';

const { expect } = require('chai');
const { Given, When, Then, setDefaultTimeout } = require('cucumber');
const CareerPage = require('../../pageObjects/careerPage_cucumber');
const careerPage = new CareerPage();
const {After, Status} = require('cucumber');

setDefaultTimeout(GLOBAL_TIMEOUT);

Given(/the career page is opened/, () => {
    //expect(2).to.eql(3)
    return careerPage.load();
});
careerPage.acceptCookies();
When(/(.+) is selected in the location filter box/, (location) => {
    return careerPage.selectLocation(location);
});

When(/(.+) is selected in the skills filter box/, (skills) => {
    return careerPage.toggleSkills(skills);
});

When(/the search button is clicked on/, () => {
    return careerPage.search()
});

When(/the apply button of the (.+) position is clicked on/, (PositionName) => {
    PositionName = careerPage.getFirstResultByPosition(PositionName);
    return careerPage.applyForPosition(PositionName);
});

Then(/the logo should be visible/, () => {
    return expect(careerPage.logo.isDisplayed()).to.eventually.be.false;
});

Then(/the search form should be visible/, () => {
    return expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
});

Then(/(.+) should be selected in the location filter box/, (location) => {
    return expect(careerPage.getSelectedLocation(location)).to.eventually.equal(location);
});

Then(/(.+) should be selected in skills filter box/, (skills) => {
    return expect(careerPage.selectedSkills.getText()).to.eventually.contain(skills.toUpperCase());
});

Then(/there should be a job offer for (.+) position/, (PositionName) => {
    return expect(careerPage.getFirstResultByPosition(PositionName).isDisplayed()).to.eventually.be.true;
})

Then(/the location of the (.+) position should be (.+)/, (PositionName, location) => {
    PositionName = careerPage.getFirstResultByPosition(PositionName);
    return expect(careerPage.locationOfPosition(PositionName).getText()).to.eventually.contain(location.toUpperCase());
});

Then(/the apply button of the (.+) position should be visible/, PositionName => {
    PositionName = careerPage.getFirstResultByPosition(PositionName);
    return expect(careerPage.applyLinkOfPosition(PositionName).isDisplayed()).to.eventually.be.true;
});

Then(/the description of the job offer should contain (.+)/, PositionName => {
    return expect(careerPage.jobDescription.getText()).to.eventually.contain(PositionName);
});

Then(/there should be an apply button/,() =>{
    return expect(careerPage.applyForJob.isDisplayed()).to.eventually.be.true;
} )