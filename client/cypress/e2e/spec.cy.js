describe('ShopSmart E2E flow', () => {
  it('loads the homepage and displays products', () => {
    cy.visit('/')

    // Check main title
    cy.contains('h1', 'ShopSmart').should('be.visible')
    
    // Check Featured Products
    cy.contains('h2', 'Featured Products').should('be.visible')
    
    // Check if empty state or product cards are rendered
    cy.get('body').then(($body) => {
      if ($body.find('.product-card').length > 0) {
        cy.get('.product-card').first().within(() => {
          cy.get('.product-name').should('exist')
          cy.get('.product-price').should('exist')
          cy.contains('button', 'Buy Now').should('be.visible')
        })
      } else {
        cy.contains('No products available at the moment.').should('be.visible')
      }
    })
  })
})
