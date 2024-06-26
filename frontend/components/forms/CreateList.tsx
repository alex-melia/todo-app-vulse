"use client"

import { addList } from "@/actions/List"
import { FormEvent, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"

export default function CreateListForm() {
  const [name, setName] = useState("")
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const data = { name }
    setName("")
    startTransition(async () => {
      const { status, message } = await addList(data)

      if (status !== "success") {
        toast.error(message)
      } else {
        router.refresh()
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 lg:gap-4 items-center border shadow-lg bg-white rounded-xl p-2 lg:p-8 z-30 max-w-96 max-h-64 h-full w-full mx-auto"
    >
      <span className="font-bold text-2xl lg:text-4xl mb-4">Create List</span>

      <label className="flex flex-col gap-1 text-left">
        Name
        <input
          className="border rounded-xl p-2"
          type="text"
          id="name"
          placeholder="e.g Weekend Tasks"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <button
        className={cn(
          "bg-green-700 text-white font-bold p-2 rounded-xl",
          isPending && "disabled"
        )}
      >
        Create
      </button>
    </form>
  )
}
