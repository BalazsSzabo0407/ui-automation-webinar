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
            careerPage.acceptCookies();
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
                 return expect(careerPage.selectedSkills.getText()).to.eventually.contain("SOFTWARE, SYSTEM, AND TEST ENGINEERING");

            });
        });
        describe("Searching", () => {
            let position;

            beforeEach(() => {
                careerPage.selectLocation("Debrecen");
                careerPage.toggleSkills("Software, System, and Test Engineering");
                return careerPage.search().then(() => {
                    position = careerPage.getFirstResultByPosition("Test Automation Engineer");
                    });
            });

            it("should have fitting job found", () => {
                return expect(careerPage.nameOfPosition(position).isDisplayed()).to.eventually.be.true;
                
            });

            it("should have job with proper location", () => {
                return expect(careerPage.locationOfPosition(position).getText()).to.eventually.contain("HUNGARY");
            });

            it("should have apply button", () => {
                return expect(careerPage.applyLinkOfPosition(position).isDisplayed()).to.eventually.be.true;
            });

            describe("Apply for a job", () => {
                beforeEach(() => {
                    return careerPage.applyForPosition(position); //sometimes cant click it (probably because of cookies come up)
                });

                it("should have proper position name in description", () => {
                    return expect(careerPage.jobDescription.getText()).to.eventually.contain("Test Automation Engineer");
                });

                it("should be able to apply to job", () => {
                    return expect(careerPage.applyForJob.isDisplayed()).to.eventually.be.true;
                });
            });
        });

    });

});
