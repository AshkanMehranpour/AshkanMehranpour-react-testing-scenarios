import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("add new user and show on the list", async () => {
  // Test Purpose: Integration test to verify the complete user flow
  // This tests that form submission adds a new user to the displayed list
  // It's an end-to-end test that verifies component communication

  // Render the entire App component (includes both UserForm and UsersList)
  render(<App />);

  // Find form inputs using their accessible labels
  // Using regex with 'i' flag for case-insensitive matching
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Simulate user filling out the form
  // Step 1: Enter name information
  userEvent.click(nameInput); // Focus on the name input field
  userEvent.keyboard("mamad"); // Type the name "mamad"

  // Step 2: Enter email information
  userEvent.click(emailInput); // Focus on the email input field
  userEvent.keyboard("mamad@mamad.com"); // Type the email address

  // Step 3: Submit the form
  const addButton = screen.getByRole("button");
  userEvent.click(addButton); // Click submit button to add user

  // Verify that the new user appears in the users list
  // Look for table cells containing the user data we just submitted
  const rowName = screen.getByRole("cell", { name: "mamad" });
  const rowEmail = screen.getByRole("cell", { name: "mamad@mamad.com" });

  // Assertions: Verify the user data is displayed in the list
  expect(rowName).toBeInTheDocument(); // Name should appear in a table cell
  expect(rowEmail).toBeInTheDocument(); // Email should appear in a table cell

  /* What this test verifies:
   * 1. Form inputs accept user input correctly
   * 2. Form submission triggers the add user functionality
   * 3. New user data is passed from UserForm to App component
   * 4. App component updates its state with the new user
   * 5. UsersList component receives and displays the updated user list
   * 6. The entire data flow works from form input to list display
   */
});
