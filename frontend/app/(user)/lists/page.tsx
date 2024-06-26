import { redirect } from "next/navigation"
import { getCurrentUser } from "@/actions/Auth"
import { getUserLists } from "@/actions/List"
import ListCard from "@/components/lists/ListCard"
import { List } from "@/types"
import { cn } from "@/lib/utils"

export default async function ListsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/signup")
  }

  const userLists = await getUserLists(currentUser.id)

  return (
    <div
      className={cn(
        "flex flex-col sm:grid grid-cols-3 lg:grid-cols-4 gap-4 mt-12",
        !userLists.length && "sm:flex"
      )}
    >
      {userLists.length ? (
        userLists.map((list: List) => <ListCard list={list} />)
      ) : (
        <div className="flex flex-col text-center">
          <p className="text-3xl font-bold">You have no lists</p>
          <p className="text-base font-light">Create a list on the homepage</p>
        </div>
      )}
    </div>
  )
}
