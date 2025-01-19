"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AccountProps, UpdateAccount } from "@/types";
import {
  createAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  updateAccount,
} from "@/services/requests/accountsService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AccountsContextType {
  accounts: AccountProps[] | [];
  account: AccountProps | null;
  isLoading: boolean;
  isError: unknown;
  createAccount: (data: AccountProps) => void;
  deleteAccount: (id: string) => void;
  updateAccount: (id: string, data: UpdateAccount) => void;
  fetchAccount: (id: string) => void;
}

const AccountsContext = createContext<AccountsContextType | undefined>(
  undefined
);

export const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error("AccountsContext must be used within a AccountsProvider");
  }
  return context;
};

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const router=useRouter()
  const queryClient = useQueryClient();
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const {
    data: accounts,
    isError,
    isLoading,
  } = useQuery<AccountProps[]>({
    queryKey: ["accounts"],
    queryFn: getAccounts,
  });
  const { data: account ,refetch} = useQuery<AccountProps | null>({
    queryKey: selectedAccountId ? ['account', selectedAccountId] : ['account'],
    queryFn: ({ queryKey }) => getAccount(queryKey[1] as string),
    enabled: !!selectedAccountId,
  });

  const createMutation = useMutation({
    mutationFn: (data: AccountProps) => createAccount(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast.success("Account Created SuccessFully!")
      console.log("data", data);
      router.refresh()
    },
    onError: (error) => {
      toast.error("Failed to Create Account")
      console.log(error);
    },
  });

  const createUserAccount = (data: AccountProps) => {
    createMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      refetch()
      toast.success("account Deleted Successfully!")
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error: any) => {
      console.error("Error deleting Account", error);
    },
  });

  const deleteAccountHandler = (id: string) => {
    deleteMutation.mutate(id);
  };

  const updateAccountMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAccount }) =>
      updateAccount(id, data),
    onSuccess: (data) => {
      refetch()
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["account",data._id] });
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const updateAccountHandler = (id: string, data: UpdateAccount) => {
    updateAccountMutation.mutate({ id, data });
  };

  const fetchAccount=(id:string)=>{
    setSelectedAccountId(id)
  }

  return (
    <AccountsContext.Provider
      value={{
        accounts: accounts || [],
        account: account || null,
        isLoading,
        isError,
        createAccount: createUserAccount,
        deleteAccount: deleteAccountHandler,
        updateAccount: updateAccountHandler,
        fetchAccount,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
