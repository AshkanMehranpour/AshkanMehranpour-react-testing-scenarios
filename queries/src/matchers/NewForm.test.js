import { render, screen } from "@testing-library/react";
import NewForm from "./NewForm";
import { toContainElementsWithQuantity } from "./custom-matchers/CustomMatchers";

// Extending Jest's expect with our custom matcher
// This allows us to use .toContainElementsWithQuantity() in our assertions
// Custom matchers help create more readable and reusable test assertions
expect.extend({ toContainElementsWithQuantity });

// Test demonstrating the use of a custom Jest matcher
// Custom matchers are useful when you have complex or repeated assertion logic
// that you want to make more readable and reusable across tests
test("display new form with 2 buttons", () => {
  render(<NewForm />);

  // Get the form element that contains the buttons we want to count
  const formElement = screen.getByRole("form");

  // Using our custom matcher to assert that the form contains exactly 2 buttons
  // This is more readable than using standard Jest matchers for this specific assertion
  // Custom matcher syntax: expect(element).toCustomMatcher(parameters)
  expect(formElement).toContainElementsWithQuantity("button", 2);

  // Without custom matcher, this would require more verbose code like:
  // const buttons = within(formElement).getAllByRole("button");
  // expect(buttons).toHaveLength(2);
});

// Benefits of custom matchers:
// 1. More readable test code - intention is clear from the matcher name
// 2. Reusable logic - can be used across multiple test files
// 3. Better error messages - custom messages when assertions fail
// 4. Encapsulation - complex assertion logic is hidden in the matcher
