import { getLists } from "@/actions/List"
import CreateListForm from "@/components/forms/CreateList"
import ListCard from "@/components/lists/ListCard"
import { List } from "@/types"

export default async function DashboardPage() {
  const lists = await getLists()

  return (
    <div className="flex flex-col justify-center w-full py-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <CreateListForm />
        <div className="flex flex-col sm:grid grid-cols-3 lg:grid-cols-4 gap-4 w-full place-items-start">
          {lists && lists.map((list: List) => <ListCard list={list} />)}
        </div>
      </div>
    </div>
  )
}
