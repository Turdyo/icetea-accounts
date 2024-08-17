"use server"

import { revalidatePath } from "next/cache"
import { db } from "../prisma"
import { auth } from "@/auth"

export async function approveUser(userId: string) {
  const session = await auth()

  if (session?.user.role !== "approved") return "pas autorisé"

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      role: "approved",
    },
  })
  revalidatePath("/")
}

export async function rejectUser(userId: string) {
  const session = await auth()

  if (session?.user.role !== "approved") return "pas autorisé"

  await db.user.delete({
    where: {
      id: userId,
    },
  })
  revalidatePath("/")
}
