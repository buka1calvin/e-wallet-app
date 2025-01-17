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

import OverlayModel from "@/components/ui/OverlayModel";
import CreateAccountForm from "./createAccount/CreateAccountForm";
import CustomDialog from "@/components/ui/CustomDialog";

const AccountsList = () => {
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
          <CustomDialog customStyle="bg-primary" button="Create Account +">
            <CreateAccountForm/>
          </CustomDialog>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {dummyAccounts.slice(0, perPage).map((account, i) => (
          <AccountCard
            key={i}
            id={i.toString()}
            name={account.name}
            type={account.type}
            balance={account.balance}
            accountNumber={account.accountNumber}
          />
        ))}
        <button
          className="bg-primary text-white w-full min-h-28 hover:bg-neutral-800"
          onClick={loadMore}
        >
          Load More +
        </button>
      </div>
      <OverlayModel isOpen={showModel} onClose={() => setShowModel(false)}>
        <CreateAccountForm />
      </OverlayModel>
    </section>
  );
};

export default AccountsList;
