"use server"

import { getCurrentUser } from "./Auth"

type FormData = {
  name: string
}

export async function addList(data: FormData) {
  try {
    const currentUser = await getCurrentUser()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, user_id: currentUser?.id }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { status: "error", message: errorData.error }
    }

    return { status: "success" }
  } catch (error) {
    console.log(error)
    return { status: "error" }
  }
}

export async function deleteList(list_id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/lists/${list_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!res.ok) {
      const errorData = await res.json()
      return { status: "error", message: errorData.error }
    }

    return { status: "success" }
  } catch (error) {
    console.log(error)

    return { status: "error" }
  }
}

export async function getLists() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lists`, {
      cache: "no-store",
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { status: "error", message: errorData.error }
    }

    return res.json()
  } catch (error) {
    console.log(error)

    return null
  }
}

export async function getUserLists(user_id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/lists/${user_id}`,
      {
        cache: "no-store",
      }
    )

    if (!res.ok) {
      const errorData = await res.json()
      return { status: "error", message: errorData.error }
    }

    return res.json()
  } catch (error) {
    console.log(error)

    return null
  }
}
