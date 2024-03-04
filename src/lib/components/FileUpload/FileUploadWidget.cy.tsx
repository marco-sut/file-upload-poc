import { composeStories } from '@storybook/react';
import * as FileUploadWidgetStories from './FileUploadWidget.stories';

const { Default, MultipleFiles } = composeStories(FileUploadWidgetStories);

describe('<FileUploadWidget />', () => {
  it('renders', () => {
    cy.mount(<Default />);
  });

  it('upload a file', () => {
    cy.mount(<Default />);
    cy.contains('label', 'Choose a file').should('exist');
    
    cy.get("input[type=file]").selectFile(
      {
        contents: Cypress.Buffer.from("file contents"),
        fileName: "cypress-test.txt",
        lastModified: Date.now(),
      },
      { force: true }
    );
    cy.contains('li', 'cypress-test.txt').should('be.visible');
  });

  it("upload multiple files", () => {
    cy.mount(<MultipleFiles />);
    cy.contains("label", "Choose a file").should("exist");

    cy.get("input[type=file]").selectFile(
      [
        {
          contents: Cypress.Buffer.from("file contents"),
          fileName: "cypress-test.txt",
          lastModified: Date.now(),
        },
        {
          contents: Cypress.Buffer.from("file contents 2"),
          fileName: "cypress-test-2.txt",
          lastModified: Date.now(),
        },
        {
          contents: Cypress.Buffer.from("file contents 3"),
          fileName: "cypress-test-3.txt",
          lastModified: Date.now(),
        },
      ],
      { force: true }
    );
    cy.contains("li", "cypress-test.txt").should("be.visible");
    cy.contains("li", "cypress-test-2.txt").should("be.visible");
    cy.contains("li", "cypress-test-3.txt").should("be.visible");
  });
});