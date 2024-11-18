Cypress.Commands.add('stubServerAction', (actionName: string, stub: Function) => {
  cy.window().then((win) => {
    // @ts-ignore
    win.__NEXT_SERVER_ACTIONS__ = win.__NEXT_SERVER_ACTIONS__ || {}
    // @ts-ignore
    win.__NEXT_SERVER_ACTIONS__[actionName] = stub
  })
})