"use client";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError, FormSuccess } from "../FormNotify";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NewPasswordSchema } from "@/app/schemas";
import { newPassword } from "@/app/auth/actions/new-password";

const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const router = useRouter()
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("")
  const [success,setSuccess] = useState<string | undefined>("")

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      newPassword(token, values ).then((data) => {
        setError(data?.error)
        if(data.success){
          setSuccess(data.message)

          setTimeout(() => {
            router.push("/auth/login")
          }, 4000);
        }
      })
    });
  };

  return (
    <CardWrapper

      headerLabel="Enter a new Password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="123456"
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
          <Button disabled={isPending} type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm