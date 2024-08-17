import { db } from "@/lib/prisma"
import { UserApprove } from "./users-list"

export async function NonApprovedUsers() {
  const randoms = await db.user.findMany({
    where: {
      role: {
        equals: "random",
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  })

  if (randoms.length === 0) return <div>Pas de comptes à approuver</div>

  return (
    <div className="flex h-fit flex-col gap-2 rounded border p-6">
      {randoms.map((user) => (
        <UserApprove user={user} key={user.id} />
      ))}
    </div>
  )
}
