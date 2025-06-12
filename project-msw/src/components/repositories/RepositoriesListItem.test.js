/**
 * Test Suite for RepositoriesListItem Component
 *
 * This file demonstrates testing patterns for React components that:
 * - Use React Router's Link component (requires MemoryRouter wrapper)
 * - Render child components with async state updates (FileIcon)
 * - Display external links and navigation links
 * - Handle repository data structure
 *
 * Key Testing Concepts Covered:
 * - Component rendering with required providers (MemoryRouter)
 * - Async component testing with findByRole
 * - Testing accessibility attributes (aria-label, role)
 * - Testing component props and href attributes
 * - Mocking external dependencies (commented example)
 * - Using act() for handling state updates in tests
 */

import { render, screen, act } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

/**
 * ABOUT ACT UTILITY:
 * 
 * The `act` function from React Testing Library ensures that all state updates,
 * effects, and other React work are completed before assertions run.
 * 
 * When to use act():
 * - Manual state updates (setState calls)
 * - Timer-based operations (setTimeout, setInterval)
 * - Manual async operations that trigger state changes
 * - Any code that causes React component updates outside of user interactions
 * 
 * When NOT to use act():
 * - Testing Library methods (render, fireEvent, etc.) already wrap operations in act
 * - findBy* queries handle async operations automatically
 * - User interactions via fireEvent are already wrapped
 * 
 * Example use cases:
 * - await act(async () => { await someAsyncFunction(); });
 * - act(() => { mockTimerFunction(); });
 * 
 * In this file, act() is commented out because:
 * - We use findByRole() which handles async waiting automatically
 * - FileIcon's async state update is handled by React Testing Library internally
 */

// MOCKING EXAMPLE: Uncomment to mock FileIcon component
// This prevents async state updates that can cause test timing issues
// jest.mock("../tree/FileIcon", () => {
//   return () => {
//     return "File Icon Component";
//   };
// });

/**
 * Helper function to render RepositoriesListItem with required context
 *
 * NOTE: MemoryRouter is required because RepositoriesListItem uses Link component
 * from react-router-dom, which needs router context to function properly
 */
const renderMainComponent = () => {
  // Mock repository data matching GitHub API structure
  const fakeRepositoryData = {
    full_name: "Facebook/react",
    language: "Javascript",
    description: "its a mock data",
    owner: {
      login: "Facebook",
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={fakeRepositoryData} />
    </MemoryRouter>
  );

  return { fakeRepositoryData };
};

/**
 * Test: GitHub Repository External Link
 *
 * Verifies that:
 * - FileIcon renders with correct language name (async operation)
 * - External GitHub link has correct href attribute
 * - Link has proper accessibility label
 */
test("show github repository icon with link", async () => {
  const { fakeRepositoryData } = renderMainComponent();

  // ALTERNATIVE APPROACH WITH ACT (currently commented out):
  // This shows how you could manually handle async operations with act()
  // However, findByRole() is preferred as it handles waiting automatically
  // await act(async () => {
  //   await pause(); // Wait for FileIcon's async state update
  // });

  // TIMING NOTE: FileIcon component has async state update via useEffect
  // We use findByRole to wait for the icon to appear after async operation
  // This is preferred over act() + pause() because it's more reliable
  await screen.findByRole("img", {
    name: "Javascript",
  });

  // Test external GitHub link
  const githubRepositoryLink = screen.getByRole("link", {
    name: /repository link/i,
  });

  expect(githubRepositoryLink).toHaveAttribute(
    "href",
    fakeRepositoryData?.html_url
  );
});

/**
 * Test: FileIcon CSS Class Application
 *
 * Verifies that FileIcon component:
 * - Applies language-specific CSS classes (js-icon for Javascript)
 * - Handles async icon loading properly
 */
test("show correct repository icon", async () => {
  renderMainComponent();

  // Wait for FileIcon's async state update to complete
  const icon = await screen.findByRole("img", {
    name: "Javascript",
  });

  // Verify language-specific CSS class is applied
  expect(icon).toHaveClass("js-icon");
});

/**
 * Test: Internal Navigation Link
 *
 * Verifies that:
 * - Link component renders correctly with router context
 * - Internal navigation uses correct route pattern
 * - Link text includes repository owner name
 */
test("show link to repository editor", async () => {
  const { fakeRepositoryData } = renderMainComponent();

  // Wait for FileIcon to load (ensures component is fully rendered)
  await screen.findByRole("img", {
    name: "Javascript",
  });

  // Find internal navigation link by owner name
  const link = await screen.findByRole("link", {
    name: new RegExp(fakeRepositoryData.owner.login),
  });

  // Verify internal route structure
  expect(link).toHaveAttribute(
    "href",
    `/repositories/${fakeRepositoryData.full_name}`
  );
});

// Utility for adding delays in tests (used with act() for manual timing control)
// Useful for debugging timing issues with async components
// Example usage: await act(async () => { await pause; });
const pause = new Promise((resolve) => setTimeout(resolve, 100));
