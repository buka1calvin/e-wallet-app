"use client";
import { TransactionProps, UpdateTransaction } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransactionService,
} from "@/services/requests/transactionsService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface TransactionsContextType {
  transactions: TransactionProps[] | [];
  transaction: TransactionProps | null;
  isLoading: boolean;
  isError: unknown;
  createNewTransaction: (data: TransactionProps) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, data: UpdateTransaction) => void;
  fetchTransaction: (id: string) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "TransactionsContext must be used within a TransactionsProvider"
    );
  }
  return context;
};

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    data: transactions,
    isError,
    isLoading,
  } = useQuery<TransactionProps[]>({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const { data: transaction, refetch } = useQuery<TransactionProps | null>({
    queryKey: selectedTransactionId
      ? ["transaction", selectedTransactionId]
      : ["transaction"],
    queryFn: ({ queryKey }) => getTransaction(queryKey[1] as string),
    enabled: !!selectedTransactionId,
  });
  const createMutation = useMutation({
    mutationFn: (data: TransactionProps) => createTransaction(data),
    onSuccess: (data) => {
      toast.success("transaction Created successfully!");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      console.log("data", data);
      router.refresh();
    },
    onError: (error) => {
      toast.error("failed to create Transaction!");
      console.log(error);
    },
  });

  const createUserTransaction = (data: TransactionProps) => {
    createMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error: any) => {
      console.error("Error deleting transaction", error);
    },
  });

  const deleteTransactionHandler = (id: string) => {
    deleteMutation.mutate(id);
  };

  const updateTransactionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTransaction }) =>
      updateTransactionService(id, data),
    onSuccess: (data) => {
      refetch()
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const updateTransactionHandler = (id: string, data: UpdateTransaction) => {
    updateTransactionMutation.mutate({ id, data });
  };
  const fetchTransaction = (id: string) => {
    setSelectedTransactionId(id);
  };
  return (
    <TransactionsContext.Provider
      value={{
        transactions: transactions || [],
        transaction: transaction || null,
        isLoading,
        isError,
        createNewTransaction: createUserTransaction,
        deleteTransaction: deleteTransactionHandler,
        updateTransaction: updateTransactionHandler,
        fetchTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
