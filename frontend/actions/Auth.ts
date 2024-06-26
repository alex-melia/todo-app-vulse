"use server"

import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { User } from "@/types"

export async function logIn(data: User) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      }
    )

    if (!res.ok) {
      const errorData = await res.json()
      return { status: "error", message: errorData.error }
    }

    const responseData = await res.json()

    cookies().set("session", responseData, {
      path: "/",
      domain: "localhost",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    })

    return { status: "success" }
  } catch (error) {
    return { status: "error" }
  }
}

export async function signUp(data: User) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

export async function signOut() {
  try {
    const cookieStore = cookies()
    cookieStore.set("session", "", { maxAge: -1 })

    return { status: "success" }
  } catch (error) {
    console.log(error)

    return { status: "error", message: "Error: Could not sign out" }
  }
}

interface CustomJwtPayload extends jwt.JwtPayload {
  id: string
  username: string
}

export async function getCurrentUser(): Promise<CustomJwtPayload | null> {
  try {
    const sessionCookie = cookies().get("session")?.value

    if (sessionCookie) {
      const decodedToken = jwt.decode(sessionCookie)
      if (decodedToken && typeof decodedToken !== "string") {
        const currentUser = decodedToken as CustomJwtPayload
        return currentUser
      }
    }
    return null
  } catch (error) {
    console.log("Error decoding token:", error)
    return null
  }
}
