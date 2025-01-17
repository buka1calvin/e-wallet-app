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
import { Textarea } from "@/components/ui/textarea";

const AccountFormSchema = () => {
  return z.object({
    accountId: z.string().min(2).max(50),
    categoryId: z.string().min(2).max(50),
    type: z.string(),
    amount: z.number().min(4),
    description: z.string().min(6),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  });
};
const TransactionForm = () => {
  const [loading, setLoading] = useState(false);
  const formSchema = AccountFormSchema();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountId: "",
      categoryId: "",
      type: "",
      amount: 0,
      description: "",
      date: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      console.log("values===", values);
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormControl>
                    <Textarea
                      placeholder="Enter Descrition"
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
            name="accountId"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="z-[2000]">
                        <SelectValue placeholder="Select Account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account7">account7</SelectItem>
                        <SelectItem value="account8">account8</SelectItem>
                        <SelectItem value="account9">account9</SelectItem>
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
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="z-[2000]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="category7">category7</SelectItem>
                        <SelectItem value="category8">category8</SelectItem>
                        <SelectItem value="category9">category9</SelectItem>
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
            name="amount"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Transaction Account"
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
            name="date"
            render={({ field }) => (
              <FormItem>
                <div className="">
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Enter Transaction Date"
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
            Create Transaction
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TransactionForm;
