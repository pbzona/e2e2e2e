/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    stubServerAction(actionName: string, stub: Function): Chainable<void>
  }
}