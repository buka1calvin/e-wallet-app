"use client";
import React, { useEffect, useState } from "react";
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
import { useAccounts } from "@/contexts/AccountsProvider";
import Image from "next/image";
import { UpdateAccount } from "@/types";

const AccountFormSchema = () => {
  return z.object({
    name: z.string().min(2).max(50),
    type: z.string(),
    accountNumber: z.string().optional(),
    balance: z.number().default(0),
  });
};
const CreateAccountForm = ({ account }: { account?: UpdateAccount }) => {
  const { createAccount, isLoading, isError, updateAccount } = useAccounts();
  const [accType, setAccType] = useState(account?.type || "");
  const formSchema = AccountFormSchema();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: account?.name || "",
      type: account?.type || "",
      accountNumber: account?.accountNumber || "",
      balance: account?.balance || 0,
    },
  });

  useEffect(() => {
    if (account) {
      form.reset({
        name: account?.name,
        type: account?.type,
        accountNumber: account?.accountNumber,
        balance: account?.balance,
      });
    }
  }, [account, form]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.type === "cash") {
        delete values.accountNumber;
      }
      if (account) {
        updateAccount(account._id, values);
      }
      createAccount({
        name: values.name,
        type: values.type,
        accountNumber: values.accountNumber || null,
        balance: values.balance,
      });
      form.reset({
        name: "",
        type: "",
        accountNumber: "",
        balance: 0,
      });
      setAccType("");
    } catch (error: any) {
      throw new Error(error);
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
          <h1 className="text-center font-semibold">
            {account ? "Update Account" : "Create Account"}
          </h1>
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
                    <Select
                      onValueChange={(value) => {
                        setAccType(value);
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
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
          {accType !== "cash" && (
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
          )}
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
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-primary mt-4"
            disabled={isLoading}
          >
            {account ? "Update Account" : "Create Account"}
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
        </form>
      </Form>
    </div>
  );
};

export default CreateAccountForm;
