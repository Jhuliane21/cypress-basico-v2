// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe("Central de Atendimento TAT", function(){
    beforeEach(() => {
        cy.visit('./src/index.html');
    })
    it("Verifica o titulo da aplicação", function(){
        cy.visit('./src/index.html');
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it("Preenche todos os campos e envia o formulario", function(){
        cy.get('#firstName').should('be.visible').type("Jhuliane Beatriz").should('have.value', 'Jhuliane Beatriz')
        cy.get('#lastName').should('be.visible').type("Spineli").should('have.value', 'Spineli')
        cy.get('#email').should('be.visible').type('jhu.spineli@gmail.com').should('have.value', 'jhu.spineli@gmail.com')
        cy.get('#phone').should('be.visible').type('33333333').should('have.value', '33333333')
        cy.get('#open-text-area').should('be.visible').type('Obrigada! Tudo certo.').should('have.value', 'Obrigada! Tudo certo.')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it("Exibe uma mensagem de erro ao submeter um form com email inavlido", function(){
        cy.get('#firstName').should('be.visible').type("Jhuliane Beatriz").should('have.value', 'Jhuliane Beatriz')
        cy.get('#lastName').should('be.visible').type("Spineli").should('have.value', 'Spineli')
        cy.get('#email').should('be.visible').type('jhu.spineli,gmail.com').should('have.value', 'jhu.spineli,gmail.com')
        cy.get('#phone').should('be.visible').type('33333333').should('have.value', '33333333')
        cy.get('#open-text-area').should('be.visible').type('Obrigada! Tudo certo.').should('have.value', 'Obrigada! Tudo certo.')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it("Campo telefone deve ser vazio ao digitar caracteres que não são números", function(){
        cy.get('#firstName').should('be.visible').type("Jhuliane Beatriz").should('have.value', 'Jhuliane Beatriz')
        cy.get('#lastName').should('be.visible').type("Spineli").should('have.value', 'Spineli')
        cy.get('#email').should('be.visible').type('jhu.spineli@gmail.com').should('have.value', 'jhu.spineli@gmail.com')
        cy.get('#phone').should('be.visible').type('abcdefghi').should('have.value', '')
        cy.get('#open-text-area').should('be.visible').type('Obrigada! Tudo certo.').should('have.value', 'Obrigada! Tudo certo.')
        cy.contains('button', 'Enviar').click()
    })
    it("Tentar enviar o formulario sem preencher o telefone", function(){
        cy.get('#firstName').should('be.visible').type("Jhuliane Beatriz").should('have.value', 'Jhuliane Beatriz')
        cy.get('#lastName').should('be.visible').type("Spineli").should('have.value', 'Spineli')
        cy.get('#email').should('be.visible').type('jhu.spineli@gmail.com').should('have.value', 'jhu.spineli@gmail.com')
        cy.get('#open-text-area').should('be.visible').type('Obrigada! Tudo certo.').should('have.value', 'Obrigada! Tudo certo.')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it("preenche e limpa os campos nome, sobrenome, email e telefone", function(){
        cy.get('#firstName').should('be.visible').type("Jhuliane Beatriz").should('have.value', 'Jhuliane Beatriz')
        cy.get('#lastName').should('be.visible').type("Spineli").should('have.value', 'Spineli')
        cy.get('#email').should('be.visible').type('jhu.spineli@gmail.com').should('have.value', 'jhu.spineli@gmail.com')
        cy.get('#phone').should('be.visible').type('33333333').should('have.value', '33333333')
        
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone').clear().should('have.value', '')
    
    })
    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
        const data = {
            firstName: "Jhuliane",
            lastName: "Spineli",
            email: "jhu.spineli@gmail.com",
            text: "Testes"
        }
        cy.fillMandatoryFieldsAndSubmit(data)
    })
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').each(() =>{
            typeOfService =>{
                cy.wrap(typeOfService)
                .check()
                .should('be.checked')
            }
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it("seleciona um arquivo da pasta fixtures", function(){
        cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it("seleciona um arquivo simulando um drag-and-drop", function(){
        cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function(){
        cy.contains('Política de Privacidade').should('have.attr', 'target', '_blank')
    })
    it.only("acessa a página da política de privacidade removendo o target e então clicando no link", function(){
        cy.contains('Política de Privacidade').invoke('removeAttr', 'target')
        cy.contains('Política de Privacidade').click()
    })
 
})
