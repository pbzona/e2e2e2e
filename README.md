# Fun with Server Actions and Cypress (🚧 WIP)

This is a sandbox project to explore the ways one might instrument an app's server actions with [Cypress](https://docs.cypress.io/app/get-started/why-cypress). The question that prompted me to investigate this was roughly:

> How can we test a server action that is triggered when a component on a page mounts, unprompted by user input?

The question is a bit trickier than it first seems, but before digging in...

> [!IMPORTANT]
> Server actions are for side effects and mutations, not data fetching

It's somewhat uncommon to see a server action invoked this way ([but not unheard of](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#useeffect)). Server actions are not meant to fetch data and they should not be used to do so, even if it is technically possible. Many of the problems I work around in this project could be solved by using [route handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) instead.

If you are fetching data from your own application on the client, using a route handler is usually the best option. Another great option is evaluating whether you can move the request to a server component, and doing that if possible.

For more info on server actions and how to use them as intended, see the [Next.js docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).

## How do server actions work?

A server action is a POST request, made to the same URL that the action was invoked on. They can be invoked from the server as well, but I'll focus on client requests in these examples.

Wait... if the request is made to the same route it was invoked from, does that mean each route can only have one server action?

Nope! Each request includes a `Next-Action` header whose value is the ID of that server action. This allows requests to be routed to the correct handler on the backend. Previously, this value was a hash of the source code location. As of Next 15, this ID is now a random, unguessable value for [enhanced security](https://nextjs.org/blog/next-15#enhanced-security-for-server-actions).

Prior to the change, we could (theoretically) precompute the hash and use this as a very hacky workaround to the question of identifying a server action request. Emphasis on "very hacky" - this should never be used except as an educational exercise to observe the behaviors of server actions.

## Testing with Cypress

Testing a network connection is always challenging, so we can say right off the bat that we will probably want to stub our responses somehow. Beyond that, there's a lot of open endedness.

Cypress tests can be found in the `cypress/e2e` directory. We set up a logging prefix before each test to make reading the output easier, but there is nothing complex going on here.

### Server actions triggered by click handlers

To observe the behavior of a server action invoked by a click handler, go to `/button-click`, click the "Like" button, and observe the network tab. You'll see a POST request to the same URL, with a payload containing a boolean value representing state.

The first test in `button-click.cy.ts` shows how one would normally intercept a network request during an e2e test. Some key considerations here are:

- Make sure the interception is set up *before* navigating to the page
- Since the server action is an async request, the stubbed response should be of type `Promise<T>` where `T` is the return type of your server action.
- Creating an alias for your server action allows you to easily `wait` for it later, meaning you don't need to rely on retries or watch for secondary effects like changes to the UI.

### Server actions triggered on form submission

WIP

### Server actions triggered in a useEffect callback on initial render

WIP

## Reproduction

1. Clone the project and install dependencies.
2. Optionally, start the dev server using `npm run dev` to test the expected behavior manually
3. When ready to test, run `npm run test`
