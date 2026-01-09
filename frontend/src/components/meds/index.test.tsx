import { render, screen } from "@testing-library/react"

import Meds from "."

beforeEach(() => {
  render(<Meds className="" />)
})

describe("Meds", () => {
  it("should display medication input box", () => {
    expect(
      screen.queryByPlaceholderText("Enter medication..."),
      "User input box not found"
    ).toBeInTheDocument()
  })

  it("should display user input box", () => {
    expect(
      screen.queryByPlaceholderText("Enter strength..."),
      "User input box not found"
    ).toBeInTheDocument()
  })

  it("should display Add button", () => {
    expect(
      screen.queryByRole("button", { name: "Add" }),
      "Add button not found"
    ).toBeInTheDocument()
  })
})
