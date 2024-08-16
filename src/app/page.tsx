import { auth } from "@/auth"
import AccountDataTable from "@/components/accounts/accounts"

export const dynamic = "force-dynamic"

export default async function Home() {
  const session = await auth()
  if (!session?.user) return <NotLoggedIn />
  return (
    <main>
      {session.user.role === "approved" ? (
        <AccountDataTable />
      ) : (
        <div>Compte en statut random, doit etre approved</div>
      )}
    </main>
  )
}

function NotLoggedIn() {
  return <div>Login toi</div>
}
