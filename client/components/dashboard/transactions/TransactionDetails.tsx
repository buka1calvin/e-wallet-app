"use client";

import { useTransactions } from "@/contexts/TransactionsProvider";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import TransactionForm from "./TransactionForm";
import { MoonLoader } from "react-spinners";

const TransactionDetails = ({ id }: { id: string }) => {
  const { transaction, fetchTransaction } = useTransactions();

  console.log("transaction===", transaction);
  useEffect(() => {
    if (id) {
      fetchTransaction(id);
    }
  }, [id, fetchTransaction]);

  if (!transaction) {
    return (
      <div className="h-full flex items-center justify-center">
        <MoonLoader color="#FB8C00" />
      </div>
    );
  }

  return (
    <section className="w-full h-full flex flex-col gap-6 mb-5">
      <h1 className="text-lg text-neutral-500">Transaction Details</h1>

      <div className="bg-white border shadow-lg rounded-lg p-5">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <div>
            <p className="text-sm text-neutral-500">Account</p>
            <h1 className="font-bold text-lg">{transaction.accountId.name}</h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Category</p>
            <h1 className="font-bold text-lg">
              {transaction.categoryId?.name}
            </h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Amount</p>
            <h1
              className={`font-bold ${
                transaction.type === "income"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              ${transaction.amount}
            </h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Date</p>
            <h1 className="font-bold">
              {format(new Date(transaction.date), "MMM dd, yyyy")}
            </h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Type</p>
            <h1
              className={`w-fit px-1 ${
                transaction.type === "income"
                  ? "text-green-700 bg-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
              {transaction.type}
            </h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Description</p>
            <h1>{transaction.description}</h1>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <CustomDialog
          button="Update Transaction"
          customStyle="bg-primary text-white w-fit"
        >
          <TransactionForm  transaction={transaction}/>
        </CustomDialog>
      </div>
    </section>
  );
};

export default TransactionDetails;
