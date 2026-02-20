import { type JSX } from "react"

import { PlayCircleIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"

export default function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // biome-ignore lint/suspicious/noExplicitAny: for react-hook-form
  // biome-ignore lint/nursery/useExplicitType: for react-hook-form
  const onSubmit = (data: any, e: any): void => {
    e.preventDefault()
    localStorage.setItem("rxName", data.rxName)
    window.location.reload()
  }

  return (
    <>
      <form className="text-center mt-10" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("rxName", { required: true })}
          className="rounded-md px-3 py-1.5 text-white outline-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500"
          placeholder="Enter your name"
          title="Enter your name"
        />
        <button
          className="ml-2 rounded-md outline-1 outline-green-500 cursor-pointer px-3 py-1.5 font-bold text-white"
          title="Submit"
          type="submit"
        >
          <PlayCircleIcon className="size-6 text-green-500 inline align-bottom mr-1" />
          Submit
        </button>
        {errors.rxName && (
          <span className="block text-red-500 font-bold">
            &#xbb; Name is required &#xab;
          </span>
        )}
      </form>
    </>
  )
}
