"use client";

import { useBudgets } from "@/contexts/BudgetsProvider";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import CreateBudgetForm from "./BudgetForm";

const BudgetDetails = ({ id }: { id: string }) => {
  const { budget, fetchBudget } = useBudgets();
  console.log("budget===",budget)
  useEffect(() => {
    if (id) {
      fetchBudget(id);
    }
  }, [id, fetchBudget]);

  if (!budget) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-neutral-500 text-lg">Loading budget details...</p>
      </div>
    );
  }

  return (
    <section className="w-full h-full flex flex-col gap-6 mb-5">
      <h1 className="text-lg text-neutral-500">Budget Details</h1>

      <div className="bg-white border shadow-lg rounded-lg p-5">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <div>
            <p className="text-sm text-neutral-500">Name</p>
            <h1 className="font-bold text-lg">{budget.name}</h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Category</p>
            <h1 className="font-bold text-lg">{budget.category?.name}</h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Description</p>
            <h1 className="text-neutral-700">{budget.description}</h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Owner</p>
            <h1 className="font-bold text-lg">
              {budget.userId.firstName} {budget.userId.lastName}
            </h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Start Date</p>
            <h1 className="font-bold">
              {format(new Date(budget.startDate), "MMM dd, yyyy")}
            </h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">End Date</p>
            <h1 className="font-bold">
              {format(new Date(budget.endDate), "MMM dd, yyyy")}
            </h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Budget Amount</p>
            <h1 className="font-bold text-green-600">${budget.amount}</h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Spent</p>
            <h1 className="font-bold text-red-500">${budget.spent}</h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Global</p>
            <h1 className="font-bold">
              {budget.isGlobal ? "Yes" : "No"}
            </h1>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Status</p>
            <h1
              className={`bg-green-100 w-fit px-1 ${
                budget.status === "active"
                  ? "text-green-700"
                  : "text-neutral-500"
              }`}
            >
              {budget.status.charAt(0).toUpperCase() + budget.status.slice(1)}
            </h1>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <CustomDialog
            button="Edit Budget"
            customStyle="bg-secondary text-white self-start w-fit"
          >
            <CreateBudgetForm budget={budget}/>
          </CustomDialog>
        </div>
      </div>

      <div className="bg-white border shadow-lg rounded-lg p-5 mb-5">
        <h1 className="text-xl font-bold mb-4 text-neutral-700">
          Subcategories
        </h1>
        <div className="flex flex-wrap gap-4">
          {budget.categoryId?.subCategories.map((sub:any,i:number) => (
            <span
              key={i}
              className="bg-tertiary text-secondary px-3 py-1 rounded-full text-sm font-medium"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BudgetDetails;
