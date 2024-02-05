class PropertiesPage {
  noResults = ".ZeroResults__HeaderText-sc-193ko9u-3";
  searchResultCountElement = 'h1[data-testid="search-h1"]';
  successfulResults = "(//picture[contains(@data-testid, 'card-img')])[1]";
  filterOption = '[data-testid="open-filters-modal"]';
  keywordSearchTextField = '[data-testid="terms-input-text"]';
  filterResultsButton = '[data-testid="filters-modal-show-results-button"]';
  descriptionContent = 'div[data-testid="description"]';

  getSearchResultCount() {
    return cy.get(this.searchResultCountElement);
  }

  clickFilterMenuOption() {
    return cy.get(this.filterOption).click();
  }

  getKeywordSearchTextField() {
    return cy.get(this.keywordSearchTextField);
  }

  inputGarageText(text) {
    return cy.get(this.keywordSearchTextField).should("exist").type(text);
  }

  selectSearchResult() {
    return cy.xpath(this.successfulResults).should("be.visible").click();
  }

  getKeyword() {
    return cy.get(this.descriptionContent);
  }

  clickFilterResultsButton() {
    cy.intercept("POST", "https://gateway.daft.ie/old/v1/listings").as(
      "getListings"
    );
    cy.get(this.filterResultsButton).click();
    cy.wait("@getListings").its("response.statusCode").should("eq", 200);
    this.validateResultCountExists();
  }

  validateResultCountExists() {
    return cy
      .get(this.searchResultCountElement)
      .should("be.visible")
      .then((element) => {
        const text = element.text();
        cy.resultExistCount(text);
        cy.get(this.noResults).should("not.exist");
      });
  }
}

export default PropertiesPage;
