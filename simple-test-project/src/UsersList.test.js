import { render, within, screen } from "@testing-library/react";
import UsersList from "./UsersList";

const renderComponent = () => {
  // Test data: Create an array of user objects to pass as props
  const users = [
    { name: "ashkan", email: "ashkan@ashkan.com" },
    { name: "shayan", email: "shayan@shayan.com" },
  ];

  // Render the UsersList component with the users array as props
  render(<UsersList usersList={users} />);

  return {
    users,
  };
};

test("render the UsersList component with users lists", () => {
  // renderComponent is a helper function that sets up the component with test data
  renderComponent();

  /* Alternative approach: Render and destructure container for direct DOM queries
   * const { container } = render(<UsersList usersList={users} />);
   * This gives you access to the DOM container for CSS selector queries
   */

  // Method 1: Get table rows using React Testing Library's semantic approach
  // First, find the element with test-id "users-list", then search within it for rows
  // The 'within' helper scopes the search to only look inside the specified element with test-id
  const rows = within(screen.getByTestId("users-list")).getAllByRole("row");

  /* Method 2: Alternative CSS selector approach using container
   * const rows = container.querySelectorAll("tbody tr");
   * This directly queries the DOM for table rows in the tbody element
   * Less semantic but more direct for specific HTML structure testing
   */

  // Assertion: Verify that the number of rendered rows matches our test data
  // We expect 2 rows because we passed 2 users in our test data array
  expect(rows).toHaveLength(2);
});

test("render the user content for each row", () => {
  // renderComponent sets up the component with test data
  // and returns the users array for further assertions
  const { users } = renderComponent();

  // Loop through each user to verify their data is rendered correctly
  // This approach tests that each individual piece of data appears in the DOM
  users.forEach((user) => {
    // Find the table cell containing the user's name
    // getByRole("cell") looks for HTML <td> elements with specific text content
    // The 'name' option specifies the accessible name (text content) to search for
    const name = screen.getByRole("cell", {
      name: user.name,
    });

    // Find the table cell containing the user's email
    // Using the same approach to locate the email cell
    const email = screen.getByRole("cell", {
      name: user.email,
    });

    // Assertions: Verify that each user's name and email are rendered correctly
    // toBeInTheDocument() checks that the element exists in the DOM
    // This ensures the component properly displays all user data
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  /* Alternative approach: Test specific text content without role-based queries
   * users.forEach((user) => {
   *   expect(screen.getByText(user.name)).toBeInTheDocument();
   *   expect(screen.getByText(user.email)).toBeInTheDocument();
   * });
   * This is simpler but less semantic than using role-based queries
   */
});
