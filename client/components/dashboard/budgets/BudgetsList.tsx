"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OverlayModel from "@/components/ui/OverlayModel";
import CustomDialog from "@/components/ui/CustomDialog";
import CreateAccountForm from "../accounts/createAccount/CreateAccountForm";
import OverViewCard from "@/components/ui/OverViewCard";
import { Input } from "@/components/ui/input";
import { useBudgets } from "@/contexts/BudgetsProvider";
import { format } from "date-fns";
import CreateBudgetForm from "./BudgetForm";
import CustomDropDown from "@/components/ui/CustomDropDown";
import { BudgetDropDowns } from "@/constants/requests";
import { EllipsisVertical} from "lucide-react";
import Link from "next/link";

const BudgetsList = () => {
  const [perPage, setPerPage] = useState(6);
  const {budgets,deleteBudget}=useBudgets()
  const loadMore = () => {
    setPerPage((PrevItem: any) => PrevItem + 3);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      deleteBudget(id);
    }
  };
  return (
    <section className="w-full h-full flex flex-col gap-5 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-neutral-500 text-xl">Budgets</h1>
        <div className="flex items-center gap-3">
          <Input type="text" placeholder="Search any Category..." />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selet Account Type" />
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
            button="Create Budget +"
          >
            <CreateBudgetForm/>
          </CustomDialog>
        </div>
      </div>
      {
        budgets.length===0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-10">
          <h2 className="text-neutral-500 text-lg">No budgets available</h2>
          <p className="text-neutral-400 text-sm">
            Click the "Create Budget +" button to add a new Budget.
          </p>
        </div>
        ):(
          <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {budgets.map((budget, i) => (
          <OverViewCard title="amount" total={budget.amount} unit="$" key={i}>
            <div className="flex flex-col items-start justify-between gap-2 h-full w-full my-2">
              <div className="flex w-full justify-between">
              <div className="flex flex-col text-sm">
                <h1 className="text-neutral-700 font-bold">{budget.name}</h1>
                <p className="text-neutral-500">{budget.description}</p>
                <p className="text-neutral-400 text-xs">
                start: {format(new Date(budget.startDate), "MMM dd, yyyy")} - {format(new Date(budget.endDate), "MMM dd, yyyy")}
                </p>
              </div>
              <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical className="text-neutral-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                      <DropdownMenuItem className="flex items-center justify-start">
                          <Link
                          className="flex justify-start px-2 items-center w-full"
                            href={`/dashboard/budgets/${budget._id}`}
                          >
                            view Budget
                          </Link>
                        </DropdownMenuItem>
                        <div className="hover:bg-neutral-100 rounded flex items-center justify-start">
                          <CustomDialog
                            customStyle="text-black self-start"
                            button="edit Budget"
                          >
                            <CreateBudgetForm budget={budget}/>
                          </CustomDialog>
                        </div>
                        <div className="hover:bg-neutral-100 rounded flex items-center justify-start">
                          <CustomDialog
                            customStyle="text-black self-start"
                            button="Add Spending"
                          >
                            <CreateBudgetForm/>
                          </CustomDialog>
                        </div>
                        <DropdownMenuItem
                        onClick={()=>handleDelete(budget._id || "")}
                         className="flex items-center justify-start px-4">
                          Delete Budget
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
              </div>
              <div className="w-full flex flex-col h-fit bg-secondary">
                <div className="flex">
              <p className="w-full flex justifystart font-bold px-2">Remaining</p>
              <p className="w-full flex justify-end font-bold px-2">Spent</p>
              </div>
              <div className="flex rounded-r p-2 justify-between text-white bg-black w-full items-center mb-2">
              <div className="border border-white p-2 rounded bg-white/10 text-xs">${budget.remaining}</div>
                <div className="border border-white p-2 rounded bg-white/10 text-xs">${budget.spent}</div>
              </div>
              </div>
            </div>
          </OverViewCard>
        ))}
      </div>
      <Pagination className="sticky bottom-0 w-full bg-white py-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </>
        )
      }
      
    </section>
  );
};

export default BudgetsList;
