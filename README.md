This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First install dependencies and then run the development server:

```bash
npm install
# then
npm run dev
```

The project includes an API mock for the `/api/sign-in` end-point.

The code in this repository was developed using `Node v12.19.0`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the login form demo.

## Running Tests

```bash
npm run test
# then
npm run test:watch
```

The project doesn't have to be running to run the tests, they're independent. The tests use [MSW](https://mswjs.io/) for API mocking.

## Resources and Notes

Test runner [Jest](https://jestjs.io/).

Auxiliary testing library for React [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

DOM assertions library [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom).

User events simulation library [user-event](https://testing-library.com/docs/ecosystem-user-event).

API mocking with [Mocking Service Worker](https://mswjs.io/).

[React hooks testing utilities](https://react-hooks-testing-library.com/)

### Articles

[Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)

[Avoid the Test User](https://kentcdodds.com/blog/avoid-the-test-user)

[The Merits of Mocking](https://kentcdodds.com/blog/the-merits-of-mocking)

[Static vs Unit vs Integration vs E2E Testing for Frontend Apps](https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests)

[Fix the "not wrapped in act(...)" warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning)

[Write tests. Not too many. Mostly integration.](https://kentcdodds.com/blog/write-tests)

### Snapshot Testing

To keep snapshots short, prefer `toMatchInlineSnapshot` over `toMatchSnapshot`.

```js
  it("renders its heading centered (snapshot)", () => {
    render(<LoginForm />);

    const heading = screen.getByRole("heading", {
      name: /Sign in to your account/i,
    });

    expect(heading).toMatchInlineSnapshot(`
      <h2
        class="mt-6 text-center text-3xl font-extrabold text-gray-900"
      >
        Sign in to your account
      </h2>
    `);
  });
```

When using [toMatchInlineSnapshot](https://jestjs.io/docs/snapshot-testing#inline-snapshots) you'll need to install `prettier`, which is used to format the argument passed to `toMatchInlineSnapshot` automatically for you.
