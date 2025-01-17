"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AccountFormSchema = () => {
  return z.object({
    name: z.string().min(2).max(50),
    type: z.string(),
    accountNumber: z.string().min(4).optional(),
    balance: z.number().default(0),
  });
};
const CreateAccountForm = () => {
  const [loading, setLoading] = useState(false);
  const formSchema = AccountFormSchema();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      accountNumber: "",
      balance: 0,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
    } catch (error) {
    } finally {
    }
  };
  return (
    <div className="max-w-[36rem] w-full h-fit p-5 rounded-lg">
      <Form {...form}>
        <form
          action=""
          className="flex flex-col justify-center h-full gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
            <h1 className="text-center font-semibold">Create Account</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Account Name"
                      className=""
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="z-[2000]">
                        <SelectValue placeholder="Select Account Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash Account</SelectItem>
                        <SelectItem value="momo">Mobile Money</SelectItem>
                        <SelectItem value="bank">Bank Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Account Number"
                      className=""
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Account Balance"
                      className=""
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary mt-4" disabled={loading}>
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateAccountForm;
