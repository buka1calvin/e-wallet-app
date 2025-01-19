"use client"
import { BudgetProps, updateBudget,} from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBudget, deleteBudget, getBudget, getBudgets, updateBudgetService } from "@/services/requests/budgetsServices";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface BudgetsContextType {
  budgets: BudgetProps[] | [];
  budget:BudgetProps | null;
  isLoading: boolean;
  isError: unknown;
  createBudget: (data: BudgetProps) => void;
  deleteBudget: (id: string) => void;
  updateBudget: (id: string, data: updateBudget) => void;
  fetchBudget: (id: string) => void;
}

const BudgetsContext = createContext<BudgetsContextType | undefined>(
  undefined
);

export const useBudgets = () => {
  const context = useContext(BudgetsContext);
  if (!context) {
    throw new Error(
      "BudgetsContext must be used within a BudgetsProvider"
    );
  }
  return context;
};

export const BudgetssProvider = ({ children }: { children: ReactNode }) => {
  const router=useRouter()
  const queryClient = useQueryClient();
    const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);
  const {
    data: budgets,
    isError,
    isLoading,
  } = useQuery<BudgetProps[]>({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

    const { data: budget ,refetch} = useQuery<BudgetProps | null>({
      queryKey: selectedBudgetId ? ['budget', selectedBudgetId] : ['budget'],
      queryFn: ({ queryKey }) => getBudget(queryKey[1] as string),
      // enabled: !!selectedBudgetId,
    });
  const createMutation = useMutation({
    mutationFn: (data: BudgetProps) => createBudget(data),
    onSuccess: (data) => {
      refetch()
      console.log("data", data);
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast.success("Budget Created SuccessFully!")
      router.refresh()
    },
    onError: (error) => {
      toast.success("Failed to create Budget")
      console.log(error);
    },
  });

  const createUserBudget = (data: BudgetProps) => {
    createMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      refetch()
      toast.success("budget Deleted Successfully!")
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error: any) => {
      console.error("Error deleting transaction", error);
    },
  });

  const deleteBudgetHandler = (id: string) => {
    deleteMutation.mutate(id);
  };

  const updateBudgetMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: updateBudget }) =>
      updateBudgetService(id, data),
    onSuccess: (data) => {
      refetch()
      toast.success("budget updated Successfully!")
      queryClient.invalidateQueries({ queryKey: ["Budgets"] });
      console.log(data);
    },
    onError: (error) => {
      toast.error("Failed to Update Budget!")
      console.log(error);
    },
  });
  const updateBudgetHandler = (id: string, data: updateBudget) => {
    updateBudgetMutation.mutate({ id, data });
  };
  const fetchBudget=(id:string)=>{
    setSelectedBudgetId(id)
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets: budgets || [],
        budget: budget || null,
        isLoading,
        isError,
        createBudget: createUserBudget,
        deleteBudget: deleteBudgetHandler,
        updateBudget: updateBudgetHandler,
        fetchBudget
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
