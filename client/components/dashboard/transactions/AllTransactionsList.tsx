"use client";
import React, { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { TransactionProps } from "@/types";
import CustomDropDown from "@/components/ui/CustomDropDown";
import { TransDropDowns } from "@/constants/requests";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import CustomDialog from "@/components/ui/CustomDialog";
import TransactionForm from "./TransactionForm";

const AllTransactionsList = ({ items,deleteTransaction }: { items: TransactionProps[],deleteTransaction:(id:string)=>void }) => {
  const [perPage, setPerPage] = useState(6);
  const loadMore = () => {
    setPerPage((prevType) => prevType + 6);
  };
  return (
    <section className="w-full h-full">
    <h1 className="text-neutral-500 my-5">Transactions History</h1>

    <div className="flex flex-col bg-white rounded-lg">
      <Table className=" bg-white p-4 rounded-lg shadow-inner min-w-[36rem] min-h-[24rem] overflow-x-scroll">
        <TableHeader className="bg-neutral-400">
          <TableRow>
            <TableHead className="font-bold text-neutral-700">Trans. Id</TableHead>
            <TableHead className="font-bold text-neutral-700">Account</TableHead>
            <TableHead className="font-bold text-neutral-700">Category</TableHead>
            <TableHead className="font-bold text-neutral-700">Description</TableHead>
            <TableHead className="font-bold text-neutral-700">Type</TableHead>
            <TableHead className="font-bold text-neutral-700">Amount</TableHead>
            <TableHead className="font-bold text-neutral-700">Date</TableHead>
            <TableHead className="font-bold text-neutral-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-neutral-500 text-lg">
                    No transactions available
                  </h2>
                  <p className="text-neutral-400 text-sm">
                    Click the "Add Transaction +" button to create a new transaction.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            items.slice(0, perPage).map((transaction: TransactionProps, i: number) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{transaction.accountId.name}</TableCell>
                <TableCell>{transaction.categoryId.name}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>
                  {format(new Date(transaction.date), "yyy/MM/dd")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical className="text-neutral-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="flex items-center justify-start">
                        <Link
                          className="flex justify-center items-center w-full"
                          href={`/dashboard/transactions/${transaction._id}`}
                        >
                          View Transaction
                        </Link>
                      </DropdownMenuItem>
                      <div className="hover:bg-neutral-100 rounded flex items-center justify-start">
                        <CustomDialog
                          customStyle="text-black self-start"
                          button="Edit Transaction"
                        >
                          <TransactionForm />
                        </CustomDialog>
                      </div>
                      <DropdownMenuItem
                      onClick={()=>deleteTransaction(transaction._id || "")}
                       className="flex items-center justify-start px-4">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {items.length > perPage && (
        <Button
          onClick={loadMore}
          className="bg-primary text-white w-full mt-4 hover:bg-neutral-800"
        >
          Load More +
        </Button>
      )}
    </div>
  </section>
  );
};

export default AllTransactionsList;
