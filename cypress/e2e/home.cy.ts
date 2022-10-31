describe("Home Page Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows a table containing a list of rooms", () => {
    cy.getByData("room-item").contains("HC208");
    cy.getByData("room-item").contains("RM202");
    cy.getByData("room-item").should("have.length", 18);
  });

  it("navigates to the add room form", () => {
    cy.getByData("add-room-button").click();
  });

  it("filters rooms by building", () => {
    cy.getByData("building-filter").check("RM");
    cy.getByData("room-item").contains(/RM*/);
    cy.getByData("room-item").should("not.contain", /JM*/);
    cy.getByData("room-item").should("not.contain", /CC*/);

    cy.getByData("building-filter").check("CC");
    cy.getByData("room-item").contains(/RM*/);
    cy.getByData("room-item").contains(/CC*/);

    // check that the form can be cleared
    cy.getByData("clear-link").click();
    cy.getByData("room-item").should("have.length", 18);
  });
});

export {}; // this is to fix typescript complaint
