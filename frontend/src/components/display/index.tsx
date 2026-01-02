import { useEffect, useState } from "react"

import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { type Med, Meds } from "../meds"

const api_url = import.meta.env.VITE_API_URL || ""

export default function Display() {
  const [isAdding, setIsAdding] = useState(false)
  const [medications, setMedications] = useState<Med[]>([])

  function handleClick() {
    setIsAdding(!isAdding)
  }

  useEffect(() => {
    try {
      fetch(api_url + "/api/get", {
        method: "GET",
        signal: AbortSignal.timeout(3000)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Status: ${response.status}`)
          }
          return response.json()
        })
        .then((data: Med[]) => {
          setMedications(data)
        })
    } catch (e) {
      console.log(e)
    }
  }, [isAdding])

  return (
    <>
      <div className="mx-auto w-100 mt-10">
        <div className="grid grid-cols-2 gap-2 border-2 border-green-500 text-white rounded-md font-bold">
          {medications.map((medication: Med) => (
            <>
              <div className="text-left pl-2">{medication.medication}</div>
              <div className="text-right pr-2">{medication.strength}</div>
            </>
          ))}
        </div>
      </div>
      {!isAdding ? (
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={handleClick}
            title="Add medication"
            className="cursor-pointer border-1 border-green-500 rounded-md text-white px-2 py-1 font-bold">
            <PlusCircleIcon className="size-6 inline text-green-500" /> Add
            Medication
          </button>
        </div>
      ) : null}
      {isAdding ? (
        <div>
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={handleClick}
              title="Cancel"
              className="cursor-pointer border-1 border-red-500 rounded-md text-white px-2 py-1 font-bold">
              <XCircleIcon className="size-6 inline text-red-500" /> Cancel
            </button>
          </div>
          <Meds />
        </div>
      ) : null}
    </>
  )
}
