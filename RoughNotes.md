Week 6 Lesson

- Think about different ways to implement a test database

- QA process, you must implement a CI strategy that provides an optimal level of confidence while taking into consideration test duration and infrastructure costs.

- Generally, it is desired to run tests with each pushed commit, but it may not be necessary to do so for all browsers.

- Complete tests

- npm install --save-dev cross-env

https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order

-env test MONGODB_URI=mongodb+srv://test:test@cluster0.x08wt.mongodb.net/rooms_test?retryWrites=true&w=majority

- set up base url

- Set up CI

Week 5 lesson

- introduction to integration/acceptance testing
- set up Cypress
  - consider database environment (What options do we have here)?

## Installing Cypress

[Install Cypress via npm:](https://docs.cypress.io/guides/getting-started/installing-cypress)

- In your project's root directory run: `npm install cypress --save-dev`

- That's it, you can now run cypress: `npx cypress open`.

- To make life easier, for future runs, create an npm script in `package.json`:

```json
...
 "scripts": {

...
    "cypress:open": "cypress open"


...
  }

```

> > `package.json`

- You should see the following screen:

- Go through the steps (no need to change anything). Cypress should set up some config files for you

### Let's test the home page

- On the cypress dashboard: Click on the “Create a new empty spec” button. Name the spec `home`.

- Cypress should have created the file `cypress/e2e/home.cy.ts` for you. Open it up and update the contents of the file to:

```js
describe("home page", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/"); // this assumes your room finder application is running on port 3000
  });

  if("shows a table containing a list of rooms", () => {
      cy.visit("http://localhost:3000/");

  })
});
```

- set up tests for the home page and add room
- add room tests
  - install formic
  - add and test error checking

## Side Tutorial

**Updating filter**

- Add hook form to filter
- Add watch
- Update data
- Create controller (not needed)
- Create API
- Update Model

- Move Data Across
- Install react query
- Create a mutation
- Create an error success / message
- Submit
- Create a delete and edit icon
- Add delete
- Add edit
- Create state for rooms
- Add delete

**Tutorial set up**

- Update Missing Form (add before the tutorial has started)
- Add updated alert
