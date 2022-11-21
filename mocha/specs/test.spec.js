"use strict";

const { expect } = require("chai");
const CareerPage = require("../../pageObjects/careerPage_updated");
const careerPage = new CareerPage();


const testData = require('../data.json');

testData.forEach(data => {
    describe("Search for a job: " + data.PositionName, function () {
        this.timeout(GLOBAL_TIMEOUT);
    })

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
                    return careerPage.selectLocation(data.Location);
                });

                it("should be able to filter to a given location", () => {
                    return expect(careerPage.getSelectedLocation(data.Location)).to.eventually.equal(data.Location);

                });
            });

            describe("Skills filter box", () => {
                beforeEach(() => {
                    return careerPage.selectLocation(data.Location);
                });
                beforeEach(() => {
                    return careerPage.toggleSkills(data.Skills);
                });

                it("should be able to filter to a given skillset", () => {
                    return expect(careerPage.selectedSkills.getText()).to.eventually.contain(data.Skills.toUpperCase());

                });
            });
            describe("Searching", () => {
                let position;

                beforeEach(() => {
                    careerPage.selectLocation(data.Location);
                    careerPage.toggleSkills(data.Skills);
                    return careerPage.search().then(() => {
                        position = careerPage.getFirstResultByPosition(data.PositionName);
                    });
                });

                it("should have fitting job found", () => {
                    return expect(careerPage.nameOfPosition(position).isDisplayed()).to.eventually.be.true;

                });

                it("should have job with proper location", () => {
                    return expect(careerPage.locationOfPosition(position).getText()).to.eventually.contain(data.Location.toUpperCase());
                });

                it("should have apply button", () => {
                    return expect(careerPage.applyLinkOfPosition(position).isDisplayed()).to.eventually.be.true;
                });

                describe("Apply for a job", () => {
                    beforeEach(() => {
                        return careerPage.applyForPosition(position);
                    });

                    it("should have proper position name in description", () => {
                        return expect(careerPage.jobDescription.getText()).to.eventually.contain(data.PositionName);
                    });

                    it("should be able to apply to job", () => {
                        return expect(careerPage.applyForJob.isDisplayed()).to.eventually.be.true;
                    });
                });
            });

        });

    });
});