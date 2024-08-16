"use client"

import { Prisma } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/fr"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Copy, ExternalLink, MoreHorizontal } from "lucide-react"
import { deleteAccount, updateLatestUse } from "@/lib/actions/account"
import { useState } from "react"
import { toast } from "sonner"
import { coypToClipboard } from "@/lib/utils"
import Link from "next/link"

dayjs.extend(relativeTime)

export type Row = Prisma.CompteGetPayload<{
  select: {
    rank: true
    tier: true
    lastTimeTaken: true
    login: true
    name: true
    id: true
    password: true
    owner: {
      select: {
        name: true
      }
    }
  }
}>

export const columns: ColumnDef<Row>[] = [
  {
    header: "Owner",
    accessorKey: "owner.name",
  },
  {
    header: "Name",
    cell: ({ row }) => (
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => {
          coypToClipboard(row.original.name)
          toast("Copied", {
            position: "bottom-center",
          })
        }}
      >
        {row.original.name}
        <Copy className="h-4 w-4" />
      </div>
    ),
  },
  {
    header: "Login",
    cell: ({ row }) => (
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => {
          coypToClipboard(row.original.login)
          toast("Copied", {
            position: "bottom-center",
          })
        }}
      >
        {row.original.login}
        <Copy className="h-4 w-4" />
      </div>
    ),
  },
  {
    header: "Elo",
    cell: ({ row }) => (
      <div>
        {row.original.tier} {row.original.rank}
      </div>
    ),
  },
  {
    header: "Password",
    cell: ({ row }) => {
      const [hasCopied, setHasCopied] = useState<boolean>(false)
      return (
        <Button
          onClick={() => {
            coypToClipboard(row.original.password)
            setHasCopied(true)
            toast("Copied", {
              position: "bottom-center",
            })
            updateLatestUse(row.original.id)
          }}
        >
          {hasCopied ? "Copied!" : "Copy Password"}
        </Button>
      )
    },
  },
  {
    accessorKey: "lastTimeTaken",
    header: "Dernière utilisation",
    cell: ({ row }) => (
      <div>{dayjs(row.getValue("lastTimeTaken")).locale("fr").fromNow()}</div>
    ),
  },
  {
    header: "OPGG",
    cell: ({ row }) => (
      <Link
        href={`https://www.op.gg/summoners/euw/${row.original.name.replace("#", "-")}`}
        target="_blank"
      >
        <ExternalLink color="#5383e8" />
      </Link>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const account = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => deleteAccount(account.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
