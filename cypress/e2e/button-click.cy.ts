// import { actions } from "@/app/actions";

describe('Server action tests for /button-click page', () => {
  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      win.console.log = (...args) => {
        console.log('Application log:', ...args);
      };
    });
  })

  // Basic request interception
  it('intercepts server action on button click and returns mock response', () => {
    // Set this up before visiting the page to ensure it's prepared to receive requests
    cy.intercept('POST', '/button-click', async req => ({
      statusCode: 200,
      body: JSON.stringify({ liked: false })
    })).as('serverActionToggleLike')
    cy.visit('/button-click')

    const btn = cy.get('#likeButton')
    btn.should('contain.text', 'Like')
    btn.click()

    cy.wait('@serverActionToggleLike').then(interception => {
      console.log("Response body:", interception.response?.body)

      expect(interception.response?.statusCode).to.equal(200)
      btn.should('contain.text', 'Unlike')
    })
  })


  // This doesn't work and gives the error:
  // Uncaught (in promise) TypeError: _app_actions__WEBPACK_IMPORTED_MODULE_2__.actions.toggleLike is not a function
  // I think this is related to serialization during Next compilation, need to investigate further
  //
  //
  // it ('stubs the server action instead of monitoring the network and intercepting', () => {
  //   cy.visit('/button-click')
  //   cy.stub(actions, 'toggleLike').as('serverActionToggleLike').resolves({ liked: true })

  //   const btn = cy.get('#likeButton')
  //   btn.should('contain.text', 'Like')
  //   btn.click()

  //   cy.wait('@serverActionToggleLike')
  //   btn.contains('Unlike')
  // })

  // Using custom command - quite possible the implementation here is incorrect, so ignoring for now
  // it('toggles like status', () => {
  //   cy.stubServerAction('toggleLike', cy.stub().as('toggleLikeStub')
  //     .callsFake((liked: boolean) => ({ liked: !liked })))

  //   cy.visit('/button-click')

  //   cy.get('#likeButton').click()

  //   cy.get('@toggleLikeStub').should('have.been.calledWith', false)
  //   cy.get('#likeButton').should('contain', 'Unlike')

  //   cy.get('#likeButton').click()

  //   cy.get('@toggleLikeStub').should('have.been.calledWith', true)
  //   cy.get('#likeButton').should('contain', 'Like')
  // })
})