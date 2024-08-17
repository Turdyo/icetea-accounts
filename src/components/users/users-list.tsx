"use client"

import { Prisma } from "@prisma/client"
import Image from "next/image"
import { Button } from "../ui/button"
import { approveUser, rejectUser } from "@/lib/actions/user"

export function UserApprove({
  user,
}: {
  user: Prisma.UserGetPayload<{
    select: {
      id: true
      name: true
      image: true
    }
  }>
}) {
  return (
    <div className="flex items-center gap-4 font-bold">
      <Image
        src={user.image!}
        height={36}
        width={36}
        className="rounded-full"
        alt={user.name!}
      />
      <p>{user.name}</p>
      <Button onClick={() => approveUser(user.id)}>Approve</Button>
      <Button variant={"destructive"} onClick={() => rejectUser(user.id)}>
        Reject
      </Button>
    </div>
  )
}
