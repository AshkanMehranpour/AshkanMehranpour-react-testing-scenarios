import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("dipslays the repositories information", () => {
  const mockRepositoryData = {
    language: "Javascript",
    stargazers_count: 50,
    open_issues: 3,
    forks: 11,
  };

  render(<RepositoriesSummary repository={mockRepositoryData} />);

  for (let key in mockRepositoryData) {
    const value = mockRepositoryData[key];
    const element = screen.getByText(new RegExp(value));

    expect(element).toBeInTheDocument();
  }
});
