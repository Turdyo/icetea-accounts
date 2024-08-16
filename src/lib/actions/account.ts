"use server"

import { Prisma } from "@prisma/client"
import { db } from "../prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function createAccount(
  account: Prisma.CompteCreateWithoutOwnerInput,
) {
  const session = await auth()
  await db.compte.create({
    data: {
      ...account,
      owner: {
        connect: {
          id: session?.user?.id,
        },
      },
    },
  })
  revalidatePath("/")
}

export async function deleteAccount(id: string) {
  await db.compte.delete({
    where: {
      id,
    },
  })
  revalidatePath("/")
}
