describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have a header", () => {
    cy.get('[data-cy="github-icon"]').click().should("be.visible");
  });
});
