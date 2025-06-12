import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";

test("show 2 inputs and 1 button", async () => {
  // Test Purpose: Verify that the UserForm component renders the expected UI elements
  // This is a basic structure test to ensure all form elements are present

  // Render the component without any props (using default values)
  render(<UserForm />);

  // Find all text input elements using ARIA role
  // findAllByRole is async and waits for elements to appear in the DOM
  const inputs = await screen.findAllByRole("textbox");

  // Find the submit button using ARIA role
  const button = await screen.findByRole("button");

  // Assertions: Verify the correct number of inputs and button presence
  expect(inputs).toHaveLength(2); // Should have exactly 2 text inputs (name and email)
  expect(button).toBeInTheDocument(); // Button should be rendered in the DOM
});

test("should call handleSubmit function that comes from App file", async () => {
  // Test Purpose: Verify that the form correctly calls the parent component's submit handler
  // with the proper data when the form is submitted

  // Create a mock function to track if handleSubmit is called and with what arguments
  const mockFunction = jest.fn();

  // Render the component with our mock function as the handleSubmit prop
  render(<UserForm handleSubmit={mockFunction} />);

  // Find inputs using accessible names (label text) - this is the recommended approach
  // The /Name/i regex searches for "Name" text (case-insensitive) in associated labels
  const nameInput = screen.getByRole("textbox", {
    name: /Name/i, // Looks for <label htmlFor="name">Name</label>
  });

  const emailInput = screen.getByRole("textbox", {
    name: /Email/i, // Looks for <label htmlFor="email">Email</label>
  });

  /* Alternative approach (not recommended):
   * const [nameInput, emailInput] = await screen.findAllByRole("textbox");
   * This is fragile because adding new inputs would break the test
   */

  // Simulate user interactions: clicking and typing in the name input
  userEvent.click(nameInput); // Focus on the name input
  userEvent.keyboard("Ali");   // Type "Ali" into the focused input

  // Simulate user interactions: clicking and typing in the email input
  userEvent.click(emailInput);      // Focus on the email input
  userEvent.keyboard("Ali@ali.com"); // Type email address into the focused input

  // Find and click the submit button
  const addButton = screen.getByRole("button");
  userEvent.click(addButton); // This should trigger form submission

  // Assertions: Verify that the mock function was called correctly
  expect(mockFunction).toHaveBeenCalled(); // Function should be called once
  expect(mockFunction).toHaveBeenCalledWith({
    name: "Ali",
    email: "Ali@ali.com",
  }); // Function should receive the correct user data object
});

test("empty inputs when the form submitted", () => {
  // Test Purpose: Verify that form inputs are cleared after successful submission
  // This ensures good user experience by resetting the form for the next entry

  // Render component with an empty function (we don't need to test the callback here)
  render(<UserForm handleSubmit={() => {}} />);

  // Find the form inputs using their accessible names
  const nameInput = screen.getByRole("textbox", {
    name: /Name/i, // Match the "Name" label text (case-insensitive)
  });

  const emailInput = screen.getByRole("textbox", {
    name: /Email/i, // Match the "Email" label text (case-insensitive)
  });

  // Simulate filling out the form with test data
  userEvent.click(nameInput);        // Focus on name input
  userEvent.keyboard("Ali");         // Type name

  userEvent.click(emailInput);       // Focus on email input
  userEvent.keyboard("Ali@ali.com"); // Type email

  // Submit the form by clicking the button
  const addButton = screen.getByRole("button");
  userEvent.click(addButton);

  // Assertions: Verify that both inputs are cleared after submission
  expect(nameInput).toHaveValue("");  // Name input should be empty
  expect(emailInput).toHaveValue(""); // Email input should be empty
});
