"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useUsers } from "@/contexts/AuthProvider";
import Image from "next/image";

type FormType = "sign-up" | "sign-in";

const AuthFormSchema = (formType: FormType) => {
  return z.object({
    firstName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
    lastName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
    email: z.string().email(),
    telephone:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = AuthFormSchema(type);
  const { Signup, isError, isLoading, login } = useUsers();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      telephone: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        Signup({
          firstName: values.firstName,
          lastName: values.lastName,
          telephone: values.telephone,
          email: values.email,
          password: values.password,
        });
      } else {
        login(values.email, values.password);
      }
    } catch (error) {
      console.log("error===", error);
    }
  };
  return (
    <div className="w-full md:h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center h-full gap-3"
        >
          <h1 className="md:text-3xl text-xl font-bold text-primary">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <div className="flex gap-4">
            {type === "sign-up" && (
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="">
                      <FormLabel className="font-semibold text-black">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your First Name"
                          className=""
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
            )}
            {type === "sign-up" && (
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div>
                      <FormLabel className="font-semibold text-black">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Last Name"
                          className=""
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormLabel className="font-semibold text-black">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Email"
                      className=""
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="" />
              </FormItem>
            )}
          />
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <div className="">
                    <FormLabel className="font-semibold text-black">
                      Telephone
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Telephone Number"
                        className=""
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormLabel className="font-semibold text-black">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Your Password"
                      className=""
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="" />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-primary mt-4" disabled={isLoading}>
            {type === "sign-up" ? "Sign Up" : "Sign In"}
            {isLoading && (
              <Image
                src="/icons/loader.svg"
                alt=""
                width={20}
                height={20}
                className="ml-1 animate-spin"
              />
            )}
          </Button>
          <div className="text-sm flex justify-center">
            <p className="text-neutral-500">
              {type === "sign-in"
                ? "Don't Have An Account"
                : "Already have An Account"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-secondary"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
