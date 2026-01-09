import "@testing-library/jest-dom"
import { cleanup } from "@testing-library/react"
import "vitest-localstorage-mock"

afterEach(() => {
  cleanup()
})
