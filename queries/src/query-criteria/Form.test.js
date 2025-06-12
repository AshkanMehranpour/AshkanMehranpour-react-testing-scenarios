import { render, screen } from "@testing-library/react";
import Form from "./Form";

test("select elements with diffrent queries", () => {
  render(<Form />);

  // ------** we can use both the matched string like 'Fill the form' or regex form like /fill/i for all of them **------
  const selectedElements = [
    screen.getByRole("button"), // at most cases is better to use this
    screen.getByText("Fill the form"), // we can use this to for easy to find


    screen.getByText(/fill/i),
    screen.getByLabelText("Email"),
    screen.getByPlaceholderText("enter color name"),
    screen.getByPlaceholderText(/color name/i),
    screen.getByDisplayValue("ashkan@gmail.com"),
    screen.getByAltText("test"),
    screen.getByTitle("click me for submit"),


    screen.getByTestId("image tag wrapper"), // the last priority for select elements
  ];


  const notInTheDomElements = [
    screen.queryByRole("paragraph"),
  ]

  for (const item of selectedElements) {
    expect(item).toBeInTheDocument();
  }

  for (const notInDomItem of notInTheDomElements) {
    expect(notInDomItem).not.toBeInTheDocument();
  }
});
