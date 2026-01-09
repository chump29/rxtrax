import { useForm } from "react-hook-form"

import { PlayCircleIcon } from "@heroicons/react/24/outline"

import type FormValues from "../../interfaces/FormValues"

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any, e: any) {
    ;(e as Event).preventDefault()
    localStorage.setItem("rxName", (data as FormValues).rxName)
    window.location.reload()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="text-center mt-10">
        <input
          type="text"
          {...register("rxName", { required: true })}
          placeholder="Enter your name"
          title="Enter your name"
          className="rounded-md px-3 py-1.5 text-white outline-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500"
        />
        <button
          type="submit"
          title="Submit"
          className="ml-2 rounded-md outline-1 outline-green-500 cursor-pointer px-3 py-1.5 font-bold text-white">
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
