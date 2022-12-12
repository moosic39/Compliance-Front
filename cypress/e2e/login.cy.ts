import { cyan } from "@mui/material/colors";
import { itIT } from "rsuite/esm/locales";
import { shouldDisplay } from "rsuite/esm/Picker";

describe("loggin with a false username", () => {
	it("shouldn't loggin", () => {
		cy.visit("http://localhost:5173/");
		cy.get('[href="/signin"] > .MuiButtonBase-root').click();
		cy.get("#username").type("batmn");
		cy.get("#password").type("iloverobin");
		cy.submit;

		cy.url().should("include", "http://localhost:5173/signin");
	});
});
describe("loggin with a false password", () => {
	it("shouldn't loggin", () => {
		cy.visit("http://localhost:5173/");
		cy.get('[href="/signin"] > .MuiButtonBase-root').click();
		cy.get("#username").type("batman");
		cy.get("#password").type("iloverobn");
		cy.get(".MuiButton-root").click();
		cy.wait(500);

		cy.url().should("include", "http://localhost:5173/signin");
	});
});
describe("loggin with good credential", () => {
	it("should loggin", () => {
		cy.visit("http://localhost:5173/");
		cy.get('[href="/signin"] > .MuiButtonBase-root').click();
		cy.get("#username").type("batman");
		cy.get("#password").type("iloverobin");
		cy.get(".MuiButton-root").click();
		cy.wait(500);

		cy.url().should("include", "http://localhost:5173/user/");
	});
});
