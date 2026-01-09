import { render, screen } from "@testing-library/react"

import Login from "."

beforeEach(() => {
  render(<Login />)
})

describe("Login", () => {
  it("should display user input box", () => {
    expect(
      screen.queryByRole("textbox", { name: "Enter your name" }),
      "User input box not found"
    ).toBeInTheDocument()
  })

  it("should display submit button", () => {
    expect(
      screen.queryByRole("button", { name: "Submit" }),
      "Submit button not found"
    ).toBeInTheDocument()
  })
})
