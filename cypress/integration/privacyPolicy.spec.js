
it("testa a página da política de privacidade de forma independente", function(){
    cy.visit('./src/privacy.html');
    cy.contains('h1', 'CAC TAT - Política de privacidade')
    cy.contains('p', 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
})