describe("Social Media App: Unauthenticated user", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  })

  it("CANNOT visit the profile page", () => {
    cy.visit("http://127.0.0.1:8080/profile.html");
    cy.url().should('not.include', 'profile');
    cy.url().should('include', 'login');
  })

  it("CANNOT visit the posts page", () => {
    cy.visit("http://127.0.0.1:8080/post.html");
    cy.url().should('not.include', 'post');
    cy.url().should('include', 'login');
  })

  it("CAN visit the register page", () => {
    cy.visit("http://127.0.0.1:8080/register.html");
    cy.url().should('include', 'register');
  })

  it("CAN visit the login page", () => {
    cy.visit("http://127.0.0.1:8080/login.html");
    cy.url().should('include', 'login');
  })

})

describe("Social Media App: Authenticated user", () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit("http://127.0.0.1:8080/");
    cy.get("input[type='email']").should("exist").type(`cypress@noroff.no`);
    cy.get("input[type='password']").should("exist").type(`cypresstestpassword{enter}`);
    cy.wait(1000)
  })

  it("CAN login", () => {
    cy.url().should('include', 'profile');
    cy.url().should('not.include', 'login');
    expect(localStorage.getItem('jwt')).to.not.be.null
  })

  it("CAN logout", () => {
    cy.get("li.dropdown-item").contains(/log[\s]?out/i).click({force: true}).should(() => {
      expect(localStorage.getItem('jwt')).to.be.null
    })
    cy.url().should('include', 'login');
  })

  it("CAN make a new post", () => {
    cy.visit("http://127.0.0.1:8080/post.html");
    cy.get("form.create-post-form").should("exist").within(() => {
      cy.get("input[name='title']").should("exist").type(`Cypress test post title`);
      cy.get("textarea[name='body']").should("exist").type(`Cypress test post body`);
      cy.get("input[name='tags']").should("exist").type(`Cypress, automated, testing`);
      cy.get("button[type='submit']").should("exist").click();
    })
  })

  it("CAN delete an existing post", () => {
    cy.visit("http://127.0.0.1:8080/profile.html");
    cy.wait(1000)
    cy.get(".get-posts-container > .card:first-child").within(() => {
      cy.get(".delete-post").should("exist").click({force: true});
    })
  })
})