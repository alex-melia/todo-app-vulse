"use client"

import { useRouter } from "next/navigation"
import { FormEvent, startTransition, useState, useTransition } from "react"
import { addItem, deleteItem, setComplete, setIncomplete } from "@/actions/Item"
import { deleteList } from "@/actions/List"
import {
  FaRegCircle,
  FaRegCircleCheck,
  FaSpinner,
  FaTrash,
  FaXmark,
} from "react-icons/fa6"
import { Item, List } from "@/types"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

interface ListCardProps {
  list: List
}

export default function ListCard({ list }: ListCardProps) {
  const [itemName, setItemName] = useState("")
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const data = { description: itemName, list_id: list.id }
    setItemName("")
    startTransition(async () => {
      if (!data.description) {
        toast.error("Invalid data")
        return
      }
      const { status, message } = await addItem(data)

      if (status !== "success") {
        toast.error(message)
      } else {
        router.refresh()
      }
    })
  }

  function handleUpdate(item: Item) {
    startTransition(async () => {
      if (item.isComplete === false) {
        const { status, message } = await setComplete(item.id)

        if (status !== "success") {
          toast.error(message)
        } else {
          router.refresh()
        }
      } else if (item.isComplete === true) {
        const { status, message } = await setIncomplete(item.id)

        if (status !== "success") {
          toast.error(message)
        } else {
          router.refresh()
        }
      } else {
        return
      }
    })
  }

  function handleDelete(item: Item) {
    startTransition(async () => {
      const { status, message } = await deleteItem(item.id)

      if (status !== "success") {
        toast.error(message)
      } else {
        router.refresh()
      }
    })
  }

  function handleDeleteList() {
    startTransition(async () => {
      const { status, message } = await deleteList(list.id)

      if (status !== "success") {
        toast.error(message)
      } else {
        router.refresh()
      }
    })
  }

  return (
    <div
      key={list.id}
      className="relative flex flex-col border shadow-lg rounded-xl w-full h-fit min-h-64 max-h-[400px]"
    >
      <div className="flex items-center justify-between p-2">
        <p className="text-xl font-bold ">{list.name}</p>
        <FaTrash
          className="hover:cursor-pointer"
          fill="red"
          size={18}
          onClick={handleDeleteList}
        />
      </div>
      <div className="flex flex-col gap-1 p-2 overflow-y-auto h-full mb-14">
        {list.items &&
          list.items.map((item: Item) => (
            <div
              className="flex items-center justify-between w-full"
              key={item.id}
            >
              <div className="flex items-center gap-2">
                {!item.isComplete ? (
                  <>
                    <FaRegCircle
                      className="hover:cursor-pointer flex-shrink-0"
                      onClick={() => handleUpdate(item)}
                    />
                    <p className="break-all">{item.description}</p>
                  </>
                ) : (
                  <>
                    <FaRegCircleCheck
                      className="hover:cursor-pointer flex-shrink-0"
                      onClick={() => handleUpdate(item)}
                    />
                    <p className="line-through break-all">{item.description}</p>
                  </>
                )}
              </div>
              <FaXmark
                className="hover:cursor-pointer flex-shrink-0"
                onClick={() => handleDelete(item)}
              />
            </div>
          ))}
      </div>
      <form
        className="absolute flex w-full bottom-0 p-2"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2 w-full">
          <div className="border rounded-xl p-1 flex items-center gap-2 w-full">
            <input
              className="w-full p-1"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Add an item..."
            />
            <button
              className={cn(
                "p-1 text-white font-bold bg-green-700 rounded-xl mx-auto",
                isPending && "disabled"
              )}
            >
              {isPending ? <FaSpinner className="mx-auto" /> : "Send"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
