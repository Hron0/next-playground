'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RegisterSchema } from '@/schemas/index'
import { useState, useTransition } from "react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormError,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormSuccess,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CardWrapper from "@/app/ui/CardWrapperComps/CardWrapper"
import { Register } from "@/lib/actions"
import { redirect } from "next/navigation"


const Page = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const handleRegister = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            Register(values)
                .then((data) => { 
                    setError(data?.error)
                    setSuccess(data?.success)
                    setTimeout(() => {
                        window.location.href = '/auth/login'
                    }, 2500)
                 })
        })
    }

    return (
        <CardWrapper label="Регистрация">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleRegister)}
                    className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Your UserName"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="email@mail.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success}/>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default Page