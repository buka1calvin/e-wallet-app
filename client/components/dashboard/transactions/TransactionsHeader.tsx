"use client";
import CustomDialog from "@/components/ui/CustomDialog";
import { Input } from "@/components/ui/input";
import { filters } from "@/constants/requests";
import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";
import TransactionForm from "./TransactionForm";

interface transFilter {
  handleActive: (filter: string) => void;
}
const TransactionsHeader: FC<transFilter> = ({ handleActive }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    handleActive(filter);
  };
  return (
    <div className="bg-white w-full h-12 flex items-center justify-between border rounded-md sticky -top-5">
      <div className="h-full">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={cn(
              "text-black h-full px-5",
              activeFilter === filter.value
                ? "border-b-2 border-secondary"
                : "border-none"
            )}
            onClick={() => handleFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Input type="text" placeholder="Search any Transaction..." />
        <CustomDialog
          customStyle="bg-primary w-full h-10 text-white"
          button="Create Transaction +"
        >
          <TransactionForm />
        </CustomDialog>
      </div>
    </div>
  );
};

export default TransactionsHeader;
