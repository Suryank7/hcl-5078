# Tesing
1.Unit testing
2. Integrated Testing
3. End to End Testing

NodeJs bydefault support inbuild testing framework from node>=23 version
>node-test > create simple node app
>npm init -y

update package.json

create app.js in node-test

//bugs occur while coding- forgot to import describe and mock.

## Components

Test React components to check whether they render correctly. Verify props, text, buttons, and user actions using Testing Library.

## Hooks

Test custom hooks like useCounter. Check initial values and actions such as increment, decrement, and reset.

## Utils

Test utility functions like add, subtract, and multiply. Use Jest expect functions to compare actual and expected results.

## Bugs Encountered

- Forgot to import describe and mock.
- @babel/preset-react was missing or incompatible.
- Used useCounter.js instead of useCounter.test.js.
- Subtract function was missing the return statement.