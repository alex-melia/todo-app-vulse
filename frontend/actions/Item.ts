"use server"

export type FormData = {
  description: string
  list_id: string
}

export async function addItem(data: FormData) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export async function deleteItem(item_id: String) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/items/${item_id}`,
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

export async function setComplete(itemId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/items/${itemId}/complete`,
      {
        method: "PATCH",
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

export async function setIncomplete(itemId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/items/${itemId}/incomplete`,
      {
        method: "PATCH",
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
