import { db } from "@/lib/prisma"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { CreateAccountDialog } from "../modals/create-account"

export default async function AccountDataTable() {
  const data = await db.compte.findMany({
    select: {
      rank: true,
      tier: true,
      lastTimeTaken: true,
      login: true,
      name: true,
      id: true,
      password: true,
      owner: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div className="container mx-auto flex flex-col gap-6">
      <CreateAccountDialog />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
