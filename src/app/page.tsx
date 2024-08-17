import { auth } from "@/auth"
import AccountDataTable from "@/components/accounts/accounts"
import { NonApprovedUsers } from "@/components/users/users"

export const dynamic = "force-dynamic"

export default async function Home() {
  const session = await auth()
  if (!session?.user) return <NotLoggedIn />
  if (session.user.role === "random") return <PendingApproval />
  if (session.user.role === "approved") return <Approved />
}

function NotLoggedIn() {
  return <div>Login toi</div>
}

function PendingApproval() {
  return <div>Compte en statut random, doit etre approved</div>
}

function Approved() {
  return (
    <div className="flex gap-4 p-10">
      <NonApprovedUsers />
      <AccountDataTable />
    </div>
  )
}
