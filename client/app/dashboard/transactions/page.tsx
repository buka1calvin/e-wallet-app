"use client";
import AllTransactionsList from "@/components/dashboard/transactions/AllTransactionsList";
import TransactionsHeader from "@/components/dashboard/transactions/TransactionsHeader";
import { useTransactions } from "@/contexts/TransactionsProvider";
import React, { useEffect, useState } from "react";

const TransactionsPage = () => {
  const {transactions,deleteTransaction}=useTransactions()
  const [perPage, setPerPage] = useState(6);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const handleFilter = (filter: string) => {
    if (filter === "all") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter((transaction) => transaction.type === filter)
      );
    }
  };

  useEffect(()=>{
    setFilteredTransactions(transactions)
  },[transactions])
  const handleDelete=(id:string)=>{
    if(confirm("Are you sure you want to delete this transaction?")){
      deleteTransaction(id)
    }
  }
  return (
    <main>
      <TransactionsHeader handleActive={handleFilter} />
      <AllTransactionsList items={filteredTransactions} deleteTransaction={handleDelete} />
    </main>
  );
};

export default TransactionsPage;
