"use client"

import { FormEvent, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "@/actions/Auth"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"

export default function SignUpForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const data = { username, password }
    startTransition(async () => {
      if (!data.username || !data.password) {
        toast.error("You must enter a username and password")
        return
      }
      const { status, message } = await signUp(data)

      setUsername("")
      setPassword("")

      if (status !== "success") {
        toast.error(message)
      } else {
        router.push("/login")
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center border shadow-lg bg-white rounded-xl p-8 z-30 max-w-96 w-full mt-12"
    >
      <span className="font-bold text-4xl mb-4">Sign Up</span>

      <label className="flex flex-col gap-1 text-left">
        Username
        <input
          className="border rounded-xl p-2"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label className="flex flex-col gap-1 text-left">
        Password
        <input
          className="border rounded-xl p-2"
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button
        className={cn(
          "bg-black text-white font-bold p-2 rounded-xl",
          isPending && "disabled"
        )}
      >
        Sign Up
      </button>
      <span className="font-bold">
        <a href="/login">Got an account? Log in</a>
      </span>
    </form>
  )
}
