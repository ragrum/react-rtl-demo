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
