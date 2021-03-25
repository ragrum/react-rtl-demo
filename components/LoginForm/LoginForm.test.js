import { rest } from "msw";
import { setupServer } from "msw/node";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("renders properly initially", () => {
    render(<LoginForm />);

    const heading = screen.getByRole("heading", {
      name: /Sign in to your account/i,
    });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-center");
    expect(heading).toMatchInlineSnapshot(`
      <h2
        class="mt-6 text-center text-3xl font-extrabold text-gray-900"
      >
        Sign in to your account
      </h2>
    `);
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Remember me")).not.toBeChecked();
    expect(
      screen.getByRole("link", { name: /Forgot your password/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Sign in with Facebook/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Sign in with Twitter/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Sign in with GitHub/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/idle/i)).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("Remember me"));
    expect(screen.getByLabelText("Remember me")).toBeChecked();
  });
});

describe("LoginForm", () => {
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

  it("goes into the signing-in status and onSubmit handler gets called when submitting the form", async () => {
    apiServer.use(
      rest.post("/api/sign-in", (req, res, ctx) => {
        return res.networkError("Failed to connect");
      })
    );
    const promise = Promise.resolve();
    const onSubmitHandler = jest.fn(() => promise);
    render(<LoginForm onSubmit={onSubmitHandler} />);

    userEvent.click(screen.getByRole("button", { name: /Sign in/ }));
    expect(await screen.findByText(/signing-in/i)).toBeInTheDocument();
    await act(() => promise);
    expect(onSubmitHandler).toHaveBeenCalledTimes(1);
    expect(onSubmitHandler).toHaveBeenCalledWith("", "");
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
});
