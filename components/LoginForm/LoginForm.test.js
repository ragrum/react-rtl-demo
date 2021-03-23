import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("renders without crashing", () => {
    render(<LoginForm />);
  });

  it("renders its heading", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("heading", { name: /Sign in to your account/ })
    ).toBeInTheDocument();
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
      screen.getByRole("link", { name: /Forgot your password?/ })
    ).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<LoginForm />);

    expect(screen.getByRole("button", { name: /Sign in/ })).toBeInTheDocument();
  });

  it("renders alternative login links", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("link", { name: /Sign in with Facebook/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Sign in with Twitter/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Sign in with GitHub/ })
    ).toBeInTheDocument();
  });
});
