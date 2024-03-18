describe("logout", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should log in successfully and redirect to the dashboard", () => {
    cy.visit("http://localhost:3000/login");

    cy.fixture("loginInfo").then(data => {
      cy.get("input[name=email]").type(data.email);
      cy.get("input[name=password]").type(data.password);
    });

    cy.get("button[type=submit]").click();

    cy.url().should("include", "/");

    cy.get('[data-cy="logout-icon"]').click();

    cy.url().should("include", "/");
  });
});
