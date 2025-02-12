Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data =>{
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#phone').should('be.visible').type('33333333').should('have.value', '33333333')
    cy.get('#open-text-area').type(data.text)
})

