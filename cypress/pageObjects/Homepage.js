class Homepage {
  homepageHeader = 'h1[data-testid="homepage-tagline"]';
  homepageSearchBox = 'input[data-testid="county-area-filter"]';
  noResults = ".ZeroResults__HeaderText-sc-193ko9u-3";
  searchResultCountElement = 'h1[data-testid="search-h1"]';
  successfulResults = 'div[data-testid="agent-branding-top"]';

  getHomepageHeader() {
    return cy.get(this.homepageHeader);
  }

  inputSearchText(word) {
    cy.intercept("POST", "https://gateway.daft.ie/old/v1/autocomplete").as(
      "autocomplete"
    );
    cy.get(this.homepageSearchBox).type(word);
    cy.wait("@autocomplete").its("response.statusCode").should("eq", 200);
    return cy.get(this.homepageSearchBox).type("{enter}");
  }
}

export default Homepage;
