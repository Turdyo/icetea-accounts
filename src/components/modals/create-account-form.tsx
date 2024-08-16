"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { createAccount } from "@/lib/actions/account"
import { Rank, Tier } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useState } from "react"

const createCompteSchema = z.object({
  login: z.string(),
  name: z.string(),
  password: z.string(),
  rank: z.nativeEnum(Rank).optional(),
  tier: z.nativeEnum(Tier),
})

export function CustomForm() {
  const [isloading, setIsLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof createCompteSchema>>({
    resolver: zodResolver(createCompteSchema),
  })

  async function onSubmit(values: z.infer<typeof createCompteSchema>) {
    setIsLoading(true)
    await createAccount(values)
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pseudo in game</FormLabel>
                  <FormControl>
                    <Input placeholder="Faker#EUW" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="Login" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="tier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tier</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Tier" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(Tier).map((tier) => (
                            <SelectItem value={tier} key={tier}>
                              {tier}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="rank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rank</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Rank" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(Rank).map((rank) => (
                            <SelectItem value={rank} key={rank}>
                              {rank}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button className="self-end" type="submit" disabled={isloading}>
            {isloading ? "Chargement..." : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
