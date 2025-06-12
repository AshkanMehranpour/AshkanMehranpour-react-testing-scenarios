import { within } from "@testing-library/dom";

export const toContainElementsWithQuantity = (container, role, quantity = 1) => {
  const selectedElements = within(container).getAllByRole(role);

  if (selectedElements.length === quantity) {
    return {
      pass: true,
    };
  }

  return {
    pass: false,
    message: () =>
      `Expect ${quantity} ${role} but recive ${selectedElements.length}`,
  };
};


