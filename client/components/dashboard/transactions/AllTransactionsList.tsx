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
const AllTransactionsList = ({ items }: { items: any }) => {
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
              <TableHead className="font-bold text-neutral-700">
                Trans. Id
              </TableHead>
              <TableHead className="font-bold text-neutral-700">
                Account
              </TableHead>
              <TableHead className="font-bold text-neutral-700">
                Category
              </TableHead>
              <TableHead className="font-bold text-neutral-700">
                Description
              </TableHead>
              <TableHead className="font-bold text-neutral-700">Type</TableHead>
              <TableHead className="font-bold text-neutral-700">
                Amount
              </TableHead>
              <TableHead className="font-bold text-neutral-700">Date</TableHead>
              <TableHead className="font-bold text-neutral-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items
              .slice(0, perPage)
              .map((transaction: TransactionProps, i: number) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{transaction.accountId}</TableCell>
                  <TableCell>{transaction.categoryId}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <CustomDropDown items={TransDropDowns} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination>
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
      </div>
    </section>
  );
};

export default AllTransactionsList;
