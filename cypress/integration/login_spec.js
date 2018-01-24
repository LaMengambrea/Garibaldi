const STAGE_URL = 'http://localhost:3000/';

const testUser = {
    username: 'lucechal_@hotmail.com',
    password: 'lucechal'
}

describe('Garibaldi v1.0.0', () => {
    it('logins successfully', () => {
        cy.visit(STAGE_URL)

        cy.get('#username')
            .type(testUser.username)
            .should('have.value', testUser.username)

        cy.get('#password')
            .type(testUser.password)
            .should('have.value', testUser.password)

        cy.get('div.loginBtn').click()

        cy.url()
            .should('include', '/home')
    })
})
