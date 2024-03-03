import { FileUploadWidget } from './FileUploadWidget';

describe('<FileUploadWidget />', () => {
  it('renders', () => {
    cy.mount(
      <FileUploadWidget
        uploadFilesApiUrl="/api/multi-upload"
        uploadedFilesListApiUrl="/api/files"
      />
    );
  });

  it('upload a file', () => {
    cy.mount(
      <FileUploadWidget
        uploadFilesApiUrl="/api/multi-upload"
        uploadedFilesListApiUrl="/api/files"
      />
    );
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
});