"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CustomForm } from "./create-account-form"

export function CreateAccountDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit self-end">Ajouter un compte</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un compte</DialogTitle>
        </DialogHeader>
        <CustomForm />
      </DialogContent>
    </Dialog>
  )
}
