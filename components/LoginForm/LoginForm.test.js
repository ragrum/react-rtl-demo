import { rest } from "msw";
import { setupServer } from "msw/node";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "./LoginForm";

describe("LoginForm rendering", () => {
  it("renders without crashing", () => {
    expect(false).toBe(true);
  });

  it("renders its heading", () => {
    expect(false).toBe(true);
  });

  it("renders its heading centered", () => {
    expect(false).toBe(true);
  });

  it("renders its heading centered (snapshot)", () => {
    expect(false).toBe(true);
  });

  it("renders email and password fields", () => {
    expect(false).toBe(true);
  });

  it("renders remember me checkbox unchecked", () => {
    expect(false).toBe(true);
  });

  it("renders forgot your password link", () => {
    expect(false).toBe(true);
  });

  it("renders submit button", () => {
    expect(false).toBe(true);
  });

  it("renders alternative login links", () => {
    expect(false).toBe(true);
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
    expect(false).toBe(true);
  });

  it("onSubmit handler gets called when signing in", async () => {
    expect(false).toBe(true);
  });

  it("goes into the signing-in status when submitting the form", async () => {
    apiServer.use(
      rest.post("/api/sign-in", (req, res, ctx) => {
        return res.networkError("Failed to connect");
      })
    );

    expect(false).toBe(true);
  });

  it("goes into the error (400) status when submitting the form without email and password", async () => {
    expect(false).toBe(true);
  });

  it("goes into the error (400) status when submitting the form without email", async () => {
    expect(false).toBe(true);
  });

  it("goes into the error (400) status when submitting the form without password", async () => {
    expect(false).toBe(true);
  });

  it("goes into the error (401) status when submitting the wrong email", async () => {
    expect(false).toBe(true);
  });

  it("goes into the error (401) status when submitting the wrong password", async () => {
    expect(false).toBe(true);
  });

  it("goes into the error (401) status when submitting the wrong email and password", async () => {
    expect(false).toBe(true);
  });

  it("goes into the success status when submitting the correct email and password", async () => {
    expect(false).toBe(true);
  });

  it("has remember me checkbox checked after clicking it", async () => {
    expect(false).toBe(true);
  });
});
