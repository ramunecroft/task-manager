describe("login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should log in successfully and redirect to the dashboard", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[name=email]").type("testuser@gmail.com");
    cy.get("input[name=password]").type("12341234");

    cy.get("button[type=submit]").click();

    cy.url().should("include", "/");
  });
});
