import { rest } from "msw";
import { setupServer } from "msw/node";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("renders properly initially", () => {
    expect(false).toBe(true);
  });
});

describe("LoginForm", () => {
  it("goes into the signing-in status and onSubmit handler gets called when submitting the form", async () => {
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
});
