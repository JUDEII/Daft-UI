/// <reference types="Cypress" />
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

import Homepage from "../pageObjects/Homepage";
import PropertiesPage from "../pageObjects/PropertiesPage";

describe("Keyword filter test", () => {
  beforeEach(function () {
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });

  it("garage keyword search for dublin county test case", function () {
    const homepage = new Homepage();
    const properties = new PropertiesPage();

    cy.visit(Cypress.env("daftUrl"), { failOnStatusCode: false });
    cy.validateText(this.data.homepageHeader, homepage.getHomepageHeader());
    homepage.inputSearchText(this.data.county);
    properties.validateResultCountExists();
    properties.clickFilterMenuOption();
    properties.inputGarageText(this.data.filterKeyword);
    properties.clickFilterResultsButton();
    properties.selectSearchResult();
    cy.validateText(this.data.filterKeyword, properties.getKeyword());
  });
});
