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
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/contexts/CategoriesProvider";
import Image from "next/image";
import { UpdateCategory } from "@/types";

const CategoryFormSchema = () => {
  return z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    type: z.string(),
    subCategories: z
      .array(z.string().min(1, "Subcategory cannot be empty"))
      .min(1, "At least one subcategory is required"),
  });
};
const CategoryForm = ({ category }: { category?: UpdateCategory }) => {
  const { createCategory, isLoading, updateCategory } = useCategories();
  const formSchema = CategoryFormSchema();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name || "",
      type: category.type || "",
      subCategories: category.subCategories || [],
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        type: category.type,
        subCategories: category.subCategories,
      });
    }
  }, [category, form]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (category) {
        updateCategory(category._id, values);
      }
      createCategory({
        name: values.name,
        type: values.type,
        subCategories: values.subCategories,
      });
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
          <h1 className="text-center font-semibold">Create Account</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Category Name" {...field} />
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
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategories"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter Subcategories (comma-separated)"
                    onChange={(e) => {
                      const value = e.target.value
                        .split(",")
                        .map((s) => s.trim());
                      field.onChange(value);
                    }}
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
            {category ? "Update Category" : "Create Category"}
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

export default CategoryForm;
