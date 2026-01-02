import { render, screen } from "@testing-library/react"

import Meds from "."

beforeEach(() => {
  render(<Meds />)
})

describe("Meds", () => {
  // TODO
  it("should display label", () => {
    expect(screen.queryByText("TODO"), "Label not found").toBeInTheDocument()
  })
})
