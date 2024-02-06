class PropertiesPage {
  noResults = ".ZeroResults__HeaderText-sc-193ko9u-3";
  searchResultCountElement = 'h1[data-testid="search-h1"]';
  successfulResults =
    '[data-testid="results"] > li:nth-child(2) > a > [data-testid="card-wrapper"] > .Cardstyled__ContentWrapper-nngi4q-1 > .Cardstyled__FlexImages-nngi4q-7 > [data-testid="image-container"] > .OverviewImage__ImageWrapper-sw56xf-0 > [data-testid="card-img"] > img';
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
    return cy.get(this.successfulResults).click();
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
