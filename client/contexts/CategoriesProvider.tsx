"use client";
import {
  CategoryProps,
  TransactionProps,
  UpdateCategory,
  UpdateTransaction,
} from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategoryService,
} from "@/services/requests/categoriesService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CategoriesContextType {
  categories: CategoryProps[] | [];
  category: CategoryProps | null;
  isLoading: boolean;
  isError: unknown;
  createCategory: (data: CategoryProps) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (id: string, data: UpdateCategory) => void;
  fetchCategory: (id: string) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error(
      "CategoriesContext must be used within a CategoriesProvider"
    );
  }
  return context;
};

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();
  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery<CategoryProps[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: category, refetch } = useQuery<CategoryProps | null>({
    queryKey: selectedCategoryId
      ? ["category", selectedCategoryId]
      : ["category"],
    queryFn: ({ queryKey }) => getCategory(queryKey[1] as string),
    enabled: !!selectedCategoryId,
  });
  const createMutation = useMutation({
    mutationFn: (data: CategoryProps) => createCategory(data),
    onSuccess: (data) => {
      toast.success("Category Created SuccessFully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error("Failed to create Category!");
      console.log(error);
    },
  });

  const createUserCategory = (data: CategoryProps) => {
    createMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      console.error("Error deleting transaction", error);
    },
  });

  const deleteCategoryHandler = (id: string) => {
    deleteMutation.mutate(id);
  };

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategory }) =>
      updateCategoryService(id, data),
    onSuccess: (data) => {
      toast.success("category Updated SuccessFully!");
      refetch();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const updateCategoryHandler = (id: string, data: UpdateCategory) => {
    updateCategoryMutation.mutate({ id, data });
  };

  const fetchCategory = (id: string) => {
    setSelectedCategoryId(id);
  };
  return (
    <CategoriesContext.Provider
      value={{
        categories: categories || [],
        category: category || null,
        isLoading,
        isError,
        createCategory: createUserCategory,
        deleteCategory: deleteCategoryHandler,
        updateCategory: updateCategoryHandler,
        fetchCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
