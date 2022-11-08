"use strict";

const { expect } = require("chai");
const CareerPage = require("../../pageObjects/careerPage_mine");
const careerPage = new CareerPage();



describe("Search for job", function () {
    this.timeout(GLOBAL_TIMEOUT);

    beforeEach(() => {
        return careerPage.load();
    });

    describe("Careers page", () => {
        it("should be opened", () => {
            return expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
        });
    });

    describe("Search form", () => {
        it("should be displayed", () => {
            return expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;

        });

        describe("Location filter box", () => {
            beforeEach(() => {
                return careerPage.selectLocation("Debrecen");
            });

            it("should be able to filter to a given location", () => {
                return expect(careerPage.getSelectedLocation()).to.eventually.equal("Debrecen");

            });
        });

        describe("Skills filter box", () => {
            beforeEach(() => {
                return careerPage.selectLocation("Debrecen");
            });
            beforeEach(() => {
                return careerPage.toggleSkills("Software, System, and Test Engineering");
            });

            it("should be able to filter to a given skillset", () => {
                 return expect(careerPage.selectedSkills.getText()).to.eventually.contain("Software, System, and Test Engineering");

            });
        });
        describe("Searching", () => {
            let position

            beforeEach(() => {
                careerPage.selectLocation("Debrecen");
                careerPage.toggleSkills("Software, System, and Test Engineering");
                return careerPage.search().then(() => {
                    position = careerPage.getResultByPosition("Software, System, and Test Engineering");
                });
            });

            it("should have fitting job found", () => {

            });

            it("should have job with proper location", () => {
                return expect(careerPage.locationOfPosition(position).getText().then("Hungary")).to.eventually.equal("Hungary");
            });

            it("should have apply button", () => {

            });

            describe("Apply for a job", () => {
                it("should have proper position name in description", () => {

                });

                it("should have proper location in description", () => {

                });
            });
        });

    });

});
