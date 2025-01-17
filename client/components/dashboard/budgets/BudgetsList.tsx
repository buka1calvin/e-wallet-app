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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import OverlayModel from "@/components/ui/OverlayModel";
import CustomDialog from "@/components/ui/CustomDialog";
import CreateAccountForm from "../accounts/createAccount/CreateAccountForm";
import OverViewCard from "@/components/ui/OverViewCard";
import { Input } from "@/components/ui/input";

const BudgetsList = () => {
  const [perPage, setPerPage] = useState(6);
  const [showModel, setShowModel] = useState(false);

  const loadMore = () => {
    setPerPage((PrevItem: any) => PrevItem + 3);
  };
  return (
    <section className="w-full h-full flex flex-col gap-5 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-neutral-500 text-xl">Accounts</h1>
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
            button="Create Account +"
          >
            <CreateAccountForm />
          </CustomDialog>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {dummyAccounts.slice(0, perPage).map((account, i) => (
          <OverViewCard title="Total Balance" total={20000} unit="" key={i}>
            <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-r from-[#e4e2e7] to-green-600 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-14 h-14 bg-gradient-to-r from-[#e4e2e7] to-orange-600 rounded-full blur-2xl" />
            <div className="flex items-center justify-between h-full w-full mt-5">
              <div className="bg-neutral-200 px-2 rounded-lg flex flex-col items-center">
                <p className="text-xs text-neutral-500">May</p>
                <h1 className="font-extrabold text-lg">15</h1>
              </div>
              <div className="flex flex-col text-sm">
                <h1 className="text-neutral-500">Figma</h1>
                <p className="font-bold text-lg">Figma-Monthly</p>
                <p className="text-neutral-400 text-xs">
                  start:17 May - 18 jun
                </p>
              </div>
              <div className="bg-white border p-2 rounded">$150</div>
            </div>
          </OverViewCard>
        ))}
      </div>
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
      <OverlayModel isOpen={showModel} onClose={() => setShowModel(false)}>
        <CreateAccountForm />
      </OverlayModel>
    </section>
  );
};

export default BudgetsList;
