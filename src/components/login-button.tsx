"use client"

import { signInAction, signOutAction } from "@/lib/actions/auth"
import { Button } from "./ui/button"

export function LoginButton() {
  return <Button onClick={() => signInAction()}>Login</Button>
}
