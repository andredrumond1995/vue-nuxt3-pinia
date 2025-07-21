// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to clear localStorage
       * @example cy.clearLocalStorage()
       */
      clearLocalStorage(): Chainable<void>
      
      /**
       * Custom command to wait for page load
       * @example cy.waitForPageLoad()
       */
      waitForPageLoad(): Chainable<void>
    }
  }
}

// Clear localStorage before each test
Cypress.Commands.add('clearLocalStorage', () => {
  cy.window().then((win) => {
    win.localStorage.clear()
  })
})

// Wait for page to be fully loaded
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.window().its('document').its('readyState').should('eq', 'complete')
})

export {} 