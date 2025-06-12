import { render, screen } from "@testing-library/react"
import LoadableColorList from "./LoadableColorList"

test("use findBy* or findAllBy* for finding elements that renders async", async() => {
    render(<LoadableColorList />)

    // throw an error
    // const elements = screen.getAllByRole("listitem");

    const elements = await screen.findAllByRole("listitem");

    expect(elements).toHaveLength(3)
})