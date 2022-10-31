describe("Create Room Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("updates a room", () => {
    cy.getByData("room-item").should("have.length", 18);
    cy.getByData("edit-icon").eq(0).click();
    cy.wait(1000);
    cy.get("[value='RM']").click();
    cy.get("[value='pc']").click();
    cy.getByData("number-input").clear().type("1");
    cy.getByData("capacity-input").clear().type("50");
    cy.getByData("submit-button").click();
    cy.getByData("success-alert").should("exist");
    cy.visit("/");
    cy.getByData("room-item").should("have.length", 18);
    cy.getByData("room-item").contains(/RM1/);
  });
});

export {};
