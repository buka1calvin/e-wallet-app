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
import { Textarea } from "@/components/ui/textarea";
import { useTransactions } from "@/contexts/TransactionsProvider";
import { useAccounts } from "@/contexts/AccountsProvider";
import { useCategories } from "@/contexts/CategoriesProvider";
import Image from "next/image";
import { UpdateTransaction } from "@/types";
import { format } from "date-fns";

const TransactionFormSchema = z.object({
  accountId: z.string().min(2).max(50),
  categoryId: z.string().min(2).max(50),
  type: z.string(),
  amount: z.number().min(4),
  description: z.string().min(6),
  date: z.string(),
});

const TransactionForm = ({
  transaction,
}: {
  transaction?: UpdateTransaction;
}) => {
  const { createNewTransaction, isLoading, updateTransaction } =
    useTransactions();
  const { accounts } = useAccounts();
  const { categories } = useCategories();

  console.log(transaction);
  const form = useForm({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      accountId: transaction?.accountId._id || "",
      categoryId: transaction?.categoryId._id || "",
      type: transaction?.type || "",
      amount: transaction?.amount || 0,
      description: transaction?.description || "",
      date: transaction?.date
        ? format(new Date(transaction?.date), "yyyy-MM-dd")
        : "",
    },
  });

  useEffect(() => {
    if (transaction) {
      form.reset({
        accountId: transaction.accountId._id,
        categoryId: transaction.categoryId._id,
        type: transaction.type,
        amount: transaction.amount,
        description: transaction.description,
        date: format(new Date(transaction?.date), "yyyy-MM-dd"),
      });
    }
  }, [transaction, form]);

  const onSubmit = async (values: z.infer<typeof TransactionFormSchema>) => {
    try {
      if (transaction) {
        updateTransaction(transaction._id, values);
      }
      createNewTransaction({
        accountId: values.accountId || null,
        categoryId: values.categoryId,
        type: values.type,
        amount: values.amount,
        description: values.description,
        date: values.date,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="max-w-[36rem] w-full h-fit p-5 rounded-lg">
      <Form {...form}>
        <form
          className="flex flex-col justify-center h-full gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-center font-semibold">Create Transaction</h1>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Enter Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Transaction Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
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
                        <SelectItem key={account._id} value={account._id || ""}>
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
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id || ""}>
                          {cat.name}
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
                    placeholder="Enter Transaction Amount"
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
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="Enter Transaction Date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-primary mt-4"
            disabled={isLoading}
          >
            {transaction ? "Update Transaction":"Create Transaction"}
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

export default TransactionForm;
