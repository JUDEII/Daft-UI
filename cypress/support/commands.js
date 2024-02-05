/// <reference types="cypress-xpath" />

import "cypress-xpath";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//


/*** validate texts method */
Cypress.Commands.add("validateText", (val, elem) => {
  elem.then((element) => {
    const text = element.text();
    expect(text.toLowerCase()).to.include(val.toLowerCase());
  });
});

Cypress.Commands.add("resultExistCount", (text) => {
  cy.log("the text is =>" + text);
  const parts = text.split(" ");
  const firstVal = parts[0];
  const numVal = parseInt(firstVal.replace(",", ""), 10);
  expect(numVal).to.be.gt(0);
});
