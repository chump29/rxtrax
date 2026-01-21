import { useState, type ChangeEvent } from "react"

import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"

import { handleX, setVisible } from "../../helpers/handle"
import type Med from "../../interfaces/Med"

const api_url = import.meta.env.VITE_API_URL || ""

export default function Meds({ className }: { className: string }) {
  const [name, setName] = useState("")
  const [strength, setStrength] = useState("")

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (
      e.target.id === "rxName" &&
      document.getElementById("rxStrength")!.dataset.state === "valid"
    ) {
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

  function handleAdd() {
    try {
      fetch(api_url + "/api/add", {
        method: "POST",
        signal: AbortSignal.timeout(3000),
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: localStorage.getItem("rxName"),
          medication: name,
          strength: strength
        } as Med)
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`)
        }
        window.location.reload()
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div id="compMeds" className={className}>
        <div className="text-center mt-10">
          <input
            type="text"
            id="rxName"
            placeholder="Enter medication..."
            onBlur={handleChange}
            className="border-2 border-green-500 w-100 rounded-md text-white text-center"
          />{" "}
          &nbsp;
          <button
            type="button"
            onClick={() => handleX("rxName")}
            title="Clear medication"
            className="cursor-pointer">
            <TrashIcon className="size-6 text-red-500 inline align-bottom" />
          </button>
        </div>
        <div id="txtStrength" className="text-center mt-10 invisible">
          <input
            type="text"
            id="rxStrength"
            placeholder="Enter strength..."
            onBlur={handleChange}
            className="border-2 border-green-500 w-100 rounded-md text-white text-center"
          />{" "}
          &nbsp;
          <button
            type="button"
            onClick={() => handleX("rxStrength")}
            title="Clear strength"
            className="cursor-pointer">
            <TrashIcon className="size-6 text-red-500 inline align-bottom" />
          </button>
        </div>
        <div id="btnAdd" className="text-center mt-10 invisible">
          <button
            type="button"
            onClick={handleAdd}
            title="Add medication and strength"
            className="cursor-pointer border-1 border-green-500 rounded-md text-white px-2 py-1 font-bold">
            <PlusCircleIcon className="size-6 inline text-green-500" /> Add
          </button>
        </div>
      </div>
    </>
  )
}
