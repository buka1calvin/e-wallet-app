"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/CustomDialog";
import CreateAccountForm from "@/components/dashboard/accounts/createAccount/CreateAccountForm";
import { useAccounts } from "@/contexts/AccountsProvider";
import { MoonLoader } from "react-spinners";
import { useTransactions } from "@/contexts/TransactionsProvider";
import { format } from "date-fns";

const AccountDetails = ({ id }: { id: string }) => {
  const { account, fetchAccount } = useAccounts();
  const { transactions } = useTransactions();
  const [perPage, setPerPage] = useState(6);
  useEffect(() => {
    if (id) {
      fetchAccount(id);
    }
  }, [id, fetchAccount]);
  console.log("transactions===",transactions)
  const accountTransactions = transactions?.filter(
    (transaction) => transaction?.accountId?._id === account?._id
  );
  console.log("accountss=", accountTransactions);
  const loadMore = () => {
    setPerPage((prevType) => prevType + 6);
  };
  <div className="h-full w-full">
    <MoonLoader color="#FB8C00" />
  </div>;
  return (
    <section className="w-full h-full flex flex-col mb-5">
      <h1 className="text-neutral-500 mb-5">Account Details</h1>
      <div className="w-full bg-white border shadow-lg shadow-neutral-200 p-2 mb-5 flex flex-col">
        <div className=" grid md:grid-cols-4 grid-cols-2 items-center">
          <div className="">
            <p className="text-sm text-neutral-500">Account Name</p>
            <h1 className="font-bold">{account?.name}</h1>
          </div>
          <div className="">
            <p className="text-sm text-neutral-500">Account Type</p>
            <h1 className="font-bold">{account?.type}</h1>
          </div>
          <div className="">
            <p className="text-sm text-neutral-500">Account Balance</p>
            <h1 className="font-bold">{account?.balance}</h1>
          </div>
          <div className="">
            <p className="text-sm text-neutral-500">Account Number</p>
            <h1 className="font-bold">{account?.accountNumber || "N/A"}</h1>
          </div>
        </div>
        <div className="mt-4 flex gap-4 items-start">
          <CustomDialog
            button="Edit Account"
            customStyle="bg-secondary self-start w-fit"
          >
            <CreateAccountForm account={account}/>
          </CustomDialog>
          <Button
            variant="outline"
            className="text-red-700 border-red-500 py-1 hover:bg-red-100 hover:text-red-700"
          >
            Remove Account
          </Button>
        </div>
      </div>
      <div className="">
        <h1 className="text-neutral-500 mb-5">Transactions History</h1>
        <div className="flex flex-col">
          <Table className=" bg-white p-4 rounded-lg shadow-inner min-w-[36rem] overflow-x-scroll">
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
                <TableHead className="font-bold text-neutral-700">
                  Type
                </TableHead>
                <TableHead className="font-bold text-neutral-700">
                  Amount
                </TableHead>
                <TableHead className="font-bold text-neutral-700">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, perPage).map((transaction, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{transaction.accountId.name}</TableCell>
                  <TableCell>{transaction.categoryId.name}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    {format(new Date(transaction.date), "MMM dd,yyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex w-full justify-center items-center bg-neutral-100 sticky bottom-0">
          <Button className="self-center mt-4" size="lg" onClick={loadMore}>
            Load More
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountDetails;
