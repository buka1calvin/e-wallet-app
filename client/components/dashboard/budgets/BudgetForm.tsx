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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useBudgets } from "@/contexts/BudgetsProvider";
import { useCategories } from "@/contexts/CategoriesProvider";
import { useAccounts } from "@/contexts/AccountsProvider";
import { updateBudget } from "@/types";
import { format } from "date-fns";

const BudgetFormSchema = () => {
  return z.object({
    name: z.string().min(2, "Name is required").max(50),
    description: z.string().optional(),
    categoryId: z.string().min(1, "Category is required"),
    accountId: z.string().optional(),
    isGlobal: z.boolean(),
    amount: z.number().min(1, "Amount must be greater than 0"),
    spent: z.number().default(0),
    startDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Invalid start date",
    }),
    endDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Invalid end date",
    }),
    status: z.string(),
  });
};
const CreateBudgetForm = ({ budget }: { budget?: any }) => {
  const { createBudget, isLoading, updateBudget } = useBudgets();
  const { categories } = useCategories();
  const { accounts } = useAccounts();
  const formSchema = BudgetFormSchema();
  console.log("budget==",budget)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: budget?.name || "",
      description: budget?.description || "",
      categoryId: budget?.categoryId._id || "",
      accountId: budget?.accountId._id || "",
      isGlobal: budget?.isGlobal || false,
      amount: budget?.amount || 0,
      spent: budget?.spent || 0,
      startDate: budget?.startDate
        ? format(new Date(budget?.startDate), "yyyy-MM-dd")
        : "",
      endDate: budget?.endDate
        ? format(new Date(budget?.endDate), "yyyy-MM-dd")
        : "",
      status: budget?.status || "active",
    },
  });

  useEffect(() => {
    if (budget) {
      form.reset({
        name: budget.name,
        description: budget.description,
        categoryId: budget.category,
        accountId: budget.account,
        isGlobal: budget.isGlobal,
        amount: budget.amount,
        spent: budget.spent,
        startDate: format(new Date(budget?.startDate), "yyyy-MM-dd"),
        endDate: format(new Date(budget?.endDate), "yyyy-MM-dd"),
        status: budget.status,
      });
    }
  }, [budget, form]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (budget) {
        console.log("accesible")
        updateBudget(budget._id, values);
      }
      createBudget(values);
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
          <h1 className="text-center font-semibold">{budget ? "Update Budget":"Create Budget"}</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Budget Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Budget Description (Optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          value={category._id || ""}
                          key={category._id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem value={account._id || ""} key={account._id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Budget Amount"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isGlobal"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <Checkbox
                    id="isGlobal"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                  <label
                    htmlFor="isGlobal"
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Make Global
                  </label>
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
            {budget ? "Update Budget":"Create Budget"}
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

export default CreateBudgetForm;
