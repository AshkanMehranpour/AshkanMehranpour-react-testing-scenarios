import { render, screen } from "@testing-library/react";
import ColorList from "./ColorList";

// Test demonstrating the behavior of getBy, queryBy, and findBy when searching for elements that don't exist
// This is a key concept in React Testing Library - understanding when each query method should be used
test("getBy, queryBy, findBy finding 0 element", async () => {
  render(<ColorList />);

  // getBy* methods: Throw an error immediately if element is not found
  // Use when you expect the element to be present - good for assertions
  // If more than 1 element is found, getBy* will also throw an error
  // Since ColorList doesn't have a textbox, this will throw an error
  expect(() => screen.getByRole("textbox")).toThrow();

  // queryBy* methods: Return null if element is not found (no error thrown)
  // Use when you want to assert that an element does NOT exist
  // Perfect for negative assertions - checking absence of elements
  // If more than 1 element is found, queryBy* will also throw an error
  expect(screen.queryByRole("textbox")).toEqual(null);

  // findBy* methods: Return a Promise that rejects if element is not found after timeout
  // Use when you expect an element to appear asynchronously (after API calls, user interactions, etc.)
  // If more than 1 element is found, findBy* will also reject with an error
  // Since ColorList doesn't have a textbox and it won't appear, this will reject
  let hasError = false;
  try {
    await screen.findByRole("textbox");
  } catch (err) {
    hasError = true;
  }

  expect(hasError).toEqual(true);
});

// Summary of when to use each query method:
// - getBy*: Element should be there immediately (will throw if not found)
// - queryBy*: Checking if element is NOT there (returns null if not found)
// - findBy*: Element will appear later asynchronously (returns Promise)

test("getAllBy, queryAllBy, findAllBy", async () => {
  render(<ColorList />);

  // getAllBy* methods: Throw an error immediately if element is not found
  // Use when you expect the element to be present - good for assertions
  expect(screen.getAllByRole("listitem")).toHaveLength(3);

  // queryAllBy* methods: Return [] if element is not found (no error thrown)
  // Use when you want to assert that an element does NOT exist
  // Perfect for negative assertions - checking absence of elements
  expect(screen.queryAllByRole("listitem")).toHaveLength(3);

  // findAllBy* methods: Return a Promise that rejects if element is not found after timeout
  // Use when you expect an element to appear asynchronously (after API calls, user interactions, etc.)
  expect(await screen.findAllByRole("listitem")).toHaveLength(3);
});

test("use getBy* or getAllBy* for prove element exist", () => {
  render(<ColorList />);

  const element = screen.getByRole("list");

  expect(element).toBeInTheDocument()
});

test("use queryBy* or queryAllBy* for prove element not exist", () => {
  render(<ColorList />);

  const element = screen.queryByRole("textbox");

  expect(element).not.toBeInTheDocument()
});
