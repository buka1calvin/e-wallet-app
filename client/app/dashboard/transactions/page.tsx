"use client";
import AllTransactionsList from "@/components/dashboard/transactions/AllTransactionsList";
import TransactionsHeader from "@/components/dashboard/transactions/TransactionsHeader";
import { dummyTransactions } from "@/constants/requests";
import React, { useState } from "react";

const TransactionsPage = () => {
  const [perPage, setPerPage] = useState(6);
  const [filteredTransactions, setFilteredTransactions] =
    useState(dummyTransactions);
  const handleFilter = (filter: string) => {
    if (filter === "all") {
      setFilteredTransactions(dummyTransactions);
    } else {
      setFilteredTransactions(
        dummyTransactions.filter((transaction) => transaction.type === filter)
      );
    }
  };
  return (
    <main>
      <TransactionsHeader handleActive={handleFilter} />
      <AllTransactionsList items={filteredTransactions} />
    </main>
  );
};

export default TransactionsPage;
