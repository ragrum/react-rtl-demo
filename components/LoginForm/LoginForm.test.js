import { rest } from "msw";
import { setupServer } from "msw/node";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "./LoginForm";

describe("LoginForm rendering", () => {
  it("renders without crashing", () => {
    render(<LoginForm />);
  });

  it("renders its heading", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("heading", { name: /Sign in to your account/i })
    ).toBeInTheDocument();
  });

  it("renders its heading centered", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("heading", { name: /Sign in to your account/i })
    ).toHaveClass("text-center");
  });

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

  it("renders email and password fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders remember me checkbox unchecked", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Remember me")).not.toBeChecked();
  });

  it("renders forgot your password link", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("link", { name: /Forgot your password/i })
    ).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  it("renders alternative login links", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("link", { name: /Sign in with Facebook/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Sign in with Twitter/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Sign in with GitHub/i })
    ).toBeInTheDocument();
  });
});

describe("LoginForm working", () => {
  const apiServer = setupServer(
    rest.post("/api/sign-in", (req, res, ctx) => {
      const { email, password } = req.body;

      if (email === "pepe@example.com" && password === "12345") {
        return res(ctx.status(200));
      }

      if (email && password) {
        return res(ctx.status(401));
      }

      return res(ctx.status(400));
    })
  );

  beforeAll(() => {
    apiServer.listen();
  });
  afterEach(() => apiServer.resetHandlers());
  afterAll(() => apiServer.close());

  it("starts in the idle status", () => {
    render(<LoginForm />);

    expect(screen.getByText(/idle/i)).toBeInTheDocument();
  });

  it("onSubmit handler gets called when signing in", async () => {
    const promise = Promise.resolve();
    const onSubmitHandler = jest.fn(() => promise);
    render(<LoginForm onSubmit={onSubmitHandler} />);

    userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
    await act(() => promise);
    expect(onSubmitHandler).toHaveBeenCalledTimes(1);
    expect(onSubmitHandler).toHaveBeenCalledWith("", "");
  });

  it("goes into the signing-in status when submitting the form", async () => {
    apiServer.use(
      rest.post("/api/sign-in", (req, res, ctx) => {
        return res.networkError("Failed to connect");
      })
    );
    render(<LoginForm />);

    userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
    expect(await screen.findByText(/signing-in/i)).toBeInTheDocument();
  });

  it("goes into the error (400) status when submitting the form without email and password", async () => {
    render(<LoginForm />);

    userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
    expect(await screen.findByText(/error \(400\)/i)).toBeInTheDocument();
  });

  it("goes into the error (400) status when submitting the form without email", async () => {
    render(<LoginForm />);

    userEvent.type(screen.getByLabelText("Password"), "12345");
    userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
    expect(await screen.findByText(/error \(400\)/i)).toBeInTheDocument();
  });

  it("goes into the error (400) status when submitting the form without password", async () => {
    render(<LoginForm />);

    userEvent.type(screen.getByLabelText("Email address"), "pepe@example.com");
    userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
    expect(await screen.findByText(/error \(400\)/i)).toBeInTheDocument();
  });

  it("goes into the error (401) status when submitting the wrong email", async () => {
    render(<LoginForm />);

    userEvent.type(
      screen.getByLabelText("Email address"),
      "not-pepe@example.com"
    );
    userEvent.type(screen.getByLabelText("Password"), "12345");
    userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
    expect(await screen.findByText(/error \(401\)/i)).toBeInTheDocument();
  });

  it("goes into the error (401) status when submitting the wrong password", async () => {
    render(<LoginForm />);

    userEvent.type(screen.getByLabelText("Email address"), "pepe@example.com");
    userEvent.type(screen.getByLabelText("Password"), "01234");
    userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
    expect(await screen.findByText(/error \(401\)/i)).toBeInTheDocument();
  });

  it("goes into the error (401) status when submitting the wrong email and password", async () => {
    render(<LoginForm />);

    userEvent.type(
      screen.getByLabelText("Email address"),
      "not-pepe@example.com"
    );
    userEvent.type(screen.getByLabelText("Password"), "01234");
    userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
    expect(await screen.findByText(/error \(401\)/i)).toBeInTheDocument();
  });

  it("goes into the success status when submitting the correct email and password", async () => {
    render(<LoginForm />);

    userEvent.type(screen.getByLabelText("Email address"), "pepe@example.com");
    userEvent.type(screen.getByLabelText("Password"), "12345");
    userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
    expect(await screen.findByText(/success/i)).toBeInTheDocument();
  });

  it("has remember me checkbox checked after clicking it", async () => {
    render(<LoginForm />);

    userEvent.click(screen.getByLabelText("Remember me"));
    expect(screen.getByLabelText("Remember me")).toBeChecked();
  });
});
