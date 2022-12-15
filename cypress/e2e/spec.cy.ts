describe("Delete test user", () => {
  it("delete test user", () => {
    cy.visit("http://localhost:5173/signin");
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get(".MuiButton-root").click();
    cy.wait(5000);
    cy.get("a > .MuiButtonBase-root").click();
    cy.get(".MuiButton-containedError").click();
    cy.get(":nth-child(8) > :nth-child(1)").click();
  });
});

describe("When signup with two different password", () => {
  it("should show 'wrong password' prompt", () => {
    cy.visit("http://localhost:5173/signup");
    cy.get('[type="email"]').type("test@test.com");
    cy.get('[type="text"]').type("batman");
    cy.get('[placeholder="password"]').type("test");
    cy.get('[placeholder="confirm password"]').type("tes");

    cy.get(".bg-red-600").should("be.visible");
  });
});

describe("When signup with an existing user", () => {
  it("Should prompt the user already exist", () => {
    cy.visit("http://localhost:5173/signup");
    cy.get('[type="email"]').type("test@test.com");
    cy.get('[type="text"]').type("batman");
    cy.get('[placeholder="password"]').type("test");
    cy.get('[placeholder="confirm password"]').type("test");
    cy.get("button").click();

    cy.get("form > :nth-child(4)").should("be.visible");
  });
});

describe("When signup is good", () => {
  it("Should prompt the user already exist", () => {
    cy.visit("http://localhost:5173/signup");
    cy.get('[type="email"]').type("test@test.com");
    cy.get('[type="text"]').type("test");
    cy.get('[placeholder="password"]').type("test");
    cy.get('[placeholder="confirm password"]').type("test");
    cy.get("button").click();

    cy.wait(500);

    cy.url().should("include", "http://localhost:5173/signin");
  });
});

describe("When login with a false username", () => {
  it("shouldn't login", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[href="/signin"] > .MuiButtonBase-root').click();
    cy.get("#username").type("tes");
    cy.get("#password").type("test");
    cy.submit;

    cy.url().should("include", "http://localhost:5173/signin");
  });
});
describe("When login with a false password", () => {
  it("shouldn't login", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[href="/signin"] > .MuiButtonBase-root').click();
    cy.get("#username").type("test");
    cy.get("#password").type("tes");
    cy.get(".MuiButton-root").click();
    cy.wait(500);

    cy.url().should("include", "http://localhost:5173/signin");
  });
});
describe("When login with good credential", () => {
  it("should login", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[href="/signin"] > .MuiButtonBase-root').click();
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get(".MuiButton-root").click();
    cy.wait(5000);
    cy.url().should("include", "http://localhost:5173/user/");
  });
});
describe("When going to the report with good credential", () => {
  it("should go to report", () => {
    cy.visit("http://localhost:5173/signin");
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get(".MuiButton-root").click();
    cy.wait(5000);
    cy.get(":nth-child(6) > :nth-child(1)").click();

    cy.url().should("include", "http://localhost:5173/report/");
  });
});
describe("When going to the settings with good credential", () => {
  it("should go to report", () => {
    cy.visit("http://localhost:5173/signin");
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get(".MuiButton-root").click();
    cy.wait(5000);
    cy.get("a > .MuiButtonBase-root").click();
    cy.wait(1500);
    cy.url().should("include", "http://localhost:5173/settings/");
    cy.get(
      '[for="firstname"] > .MuiFormControl-root > .MuiInputBase-root > #outlined-basic'
    ).type("poulet");
    cy.get(".MuiButton-containedPrimary").click();
    cy.get(
      ':nth-child(2) > [for="email"] > .MuiFormControl-root > .MuiInputBase-root > #outlined-basic'
    ).should("be.visible");
    cy.get(
      '[for="password"] > .MuiFormControl-root > .MuiInputBase-root > #outlined-basic'
    ).type("test");
    cy.get(".MuiButton-containedPrimary").click();
    cy.wait(500);
    cy.get(
      ':nth-child(5) > [for="firstname"] > .MuiFormControl-root > .MuiInputBase-root > #outlined-basic'
    ).should("be.visible");
  });
});
