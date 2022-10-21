describe("google.com", () => {
  beforeEach(() => {
    cy.visit("https://google.com");
  })

  it("can search for Noroff", () => {
    cy.get("input[title='Search']").type("Noroff{enter}");
    cy.get('.main').contains("Noroff is an educational institution in Norway, consisting of University College, Higher Vocational College and Online Studies.")
  })

  it("can do a barrel roll", () => {
    cy.get("input[title='Search']").type("do a barrel roll{enter}");
  })
})