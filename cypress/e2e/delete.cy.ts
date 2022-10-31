describe("Create Room Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("deletes a room", () => {
    cy.getByData("room-item").should("have.length", 18);
    cy.getByData("delete-icon").eq(0).click();
    cy.getByData("room-item").should("have.length", 17);
    cy.getByData("success-alert").should("exist");
  });
});

export {};
