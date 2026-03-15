import { type ChangeEvent, type JSX, useState } from "react"

import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"

import { handleX, setVisible } from "../../helpers/handle"
import type Med from "../../interfaces/Med"

const api_url: string = import.meta.env.VITE_API_URL || ""

const Meds = ({ className }: { className: string }): JSX.Element => {
  const [name, setName] = useState<string>("")
  const [strength, setStrength] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === "rxName" && document.getElementById("rxStrength")!.dataset.state === "valid") {
      setName(e.target.value)
      setVisible("txtStrength")
    } else if (e.target.id === "rxStrength" && e.target.value.length > 0) {
      setStrength(e.target.value)
      setVisible("btnAdd")
    } else {
      setVisible("txtStrength", false)
      setVisible("btnAdd", false)
    }
  }

  const handleAdd = (): void => {
    fetch(api_url + "/api/add", {
      body: JSON.stringify({
        medication: name,
        name: localStorage.getItem("rxName"),
        strength: strength
      } as Med),
      method: "POST",
      signal: AbortSignal.timeout(3000),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`)
        }
        window.location.reload()
      })
      .catch(console.error)
  }

  return (
    <>
      <div className={className} id="compMeds">
        <div className="text-center mt-10">
          <input
            className="border-2 border-green-500 w-100 rounded-md text-white text-center"
            id="rxName"
            onBlur={handleChange}
            placeholder="Enter medication..."
            type="text"
          />{" "}
          &nbsp;
          <button
            className="cursor-pointer"
            onClick={(): void => handleX("rxName")}
            title="Clear medication"
            type="button">
            <TrashIcon className="size-6 text-red-500 inline align-bottom" />
          </button>
        </div>
        <div className="text-center mt-10 invisible" id="txtStrength">
          <input
            className="border-2 border-green-500 w-100 rounded-md text-white text-center"
            id="rxStrength"
            onBlur={handleChange}
            placeholder="Enter strength..."
            type="text"
          />{" "}
          &nbsp;
          <button
            className="cursor-pointer"
            onClick={(): void => handleX("rxStrength")}
            title="Clear strength"
            type="button">
            <TrashIcon className="size-6 text-red-500 inline align-bottom" />
          </button>
        </div>
        <div className="text-center mt-10 invisible" id="btnAdd">
          <button
            className="cursor-pointer border-1 border-green-500 rounded-md text-white px-2 py-1 font-bold"
            onClick={handleAdd}
            title="Add medication and strength"
            type="button">
            <PlusCircleIcon className="size-6 inline text-green-500" /> Add
          </button>
        </div>
      </div>
    </>
  )
}

export default Meds
