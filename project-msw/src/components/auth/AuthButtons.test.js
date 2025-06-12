import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";

/**
 * Helper function to render the AuthButtons component with necessary providers
 * - Uses SWRConfig with a new Map provider to ensure test isolation
 * - Wraps component in MemoryRouter for routing context
 * - Waits for all links to be rendered before returning
 */
async function renderComponent() {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );
  await screen.findAllByRole("link");
}

/**
 * Test suite for when user is authenticated
 * 
 * The describe function creates a test suite that groups related tests.
 * This particular suite focuses on testing the component behavior when a user is logged in.
 * Jest will run all tests within this block with the shared context of an authenticated user.
 * 
 * These tests verify that:
 * 1. Sign In/Up buttons are not shown to logged-in users
 * 2. Sign Out button is properly displayed with correct link
 */
describe("when user is signed in", () => {
  // Mock server setup for authenticated user
  // Creates a test server that responds to GET '/api/user' with a mock user object
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: { id: 3, email: "asdf@asdf.com" } };
      },
    },
  ]);

  test("sign in and sign up are not visible", async () => {
    await renderComponent();

    // Query for sign in/up buttons - using query* since we expect them NOT to exist
    const signInButton = screen.queryByRole("link", {
      name: /sign in/i,
    });
    const signUpButton = screen.queryByRole("link", {
      name: /sign up/i,
    });

    // Verify the buttons don't appear in the document for logged-in users
    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
  });

  test("sign out is visible", async () => {
    await renderComponent();

    // Look for sign out button - using get* since we expect it to exist
    const signOutButton = screen.getByRole("link", {
      name: /sign out/i,
    });

    // Verify sign out button exists and has correct href attribute
    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute("href", "/signout");
  });
});

/**
 * Test suite for when user is not authenticated
 * 
 * The describe function creates a test suite that groups related tests.
 * This particular suite focuses on testing the component behavior when a user is not logged in.
 * Jest will run all tests within this block with the shared context of an unauthenticated user.
 * 
 * Using separate describe blocks with different server setups allows us to test
 * the component under different authentication states without test interference.
 * 
 * These tests verify that:
 * 1. Sign In/Up buttons are shown to logged-out users with correct links
 * 2. Sign Out button is not displayed for unauthenticated users
 */
describe("when user is not signed in", () => {
  // Mock server setup for unauthenticated user
  // Creates a test server that responds to GET '/api/user' with null user
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: null };
      },
    },
  ]);

  test("sign in and sign up are visible", async () => {
    await renderComponent();

    // Look for sign in/up buttons - using get* since we expect them to exist
    const signInButton = screen.getByRole("link", {
      name: /sign in/i,
    });
    const signUpButton = screen.getByRole("link", {
      name: /sign up/i,
    });

    // Verify both buttons appear with correct href attributes
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  test("sign out is not visible", async () => {
    await renderComponent();

    // Query for sign out button - using query* since we expect it NOT to exist
    const signOutButton = screen.queryByRole("link", {
      name: /sign out/i,
    });

    // Verify sign out button doesn't appear for logged-out users
    expect(signOutButton).not.toBeInTheDocument();
  });
});
