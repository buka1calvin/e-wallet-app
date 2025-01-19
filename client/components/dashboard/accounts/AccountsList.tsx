"use client";
import React, { useState } from "react";
import AccountCard from "@/components/ui/AccountCard";
import { dummyAccounts } from "@/constants/requests";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateAccountForm from "./createAccount/CreateAccountForm";
import CustomDialog from "@/components/ui/CustomDialog";
import { useAccounts } from "@/contexts/AccountsProvider";

const AccountsList = () => {
  const { accounts } = useAccounts();
  console.log("accounts===", accounts);
  const [perPage, setPerPage] = useState(6);

  const loadMore = () => {
    setPerPage((PrevItem: any) => PrevItem + 3);
  };

  return (
    <section className="w-full h-full flex flex-col gap-5 pb-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-neutral-500 text-xl">Accounts</h1>
        <div className="flex items-center gap-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Account Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="bank">Bank</SelectItem>
              <SelectItem value="momo">Mobile Money</SelectItem>
            </SelectContent>
          </Select>
          <CustomDialog
            customStyle="bg-primary w-full"
            button="Create Account +"
          >
            <CreateAccountForm />
          </CustomDialog>
        </div>
      </div>
      {accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <h2 className="text-neutral-500 text-lg">No accounts available</h2>
          <p className="text-neutral-400 text-sm">
            Click the "Create Account +" button to add a new account.
          </p>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {accounts.slice(0, perPage).map((account) => (
              <AccountCard
                key={account._id}
                _id={account._id}
                name={account.name}
                type={account.type}
                balance={account.balance}
                accountNumber={account.accountNumber}
              />
            ))}
          </div>
          {accounts.length > perPage && (
            <button
              className="bg-primary text-white w-full min-h-28 hover:bg-neutral-800 mt-4"
              onClick={loadMore}
            >
              Load More +
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default AccountsList;
