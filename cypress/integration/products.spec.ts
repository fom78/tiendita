import mock from '../../product/mocks/default.json'

describe("Products", () => {
    it("Deberia mostrar todos los productos", () => {
        cy.visit("/default")

        cy.get('[data-testid="product"]').should('have.length',mock.length)
    })    

    it("Muestra un mensaje cuando no hay productos", () => {
        cy.visit("/empty")

        cy.get('[data-testid="product"]').should('have.length',0)

        cy.contains('No hay productos!')
    }) 
})