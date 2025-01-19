"use client";
import React from "react";
import { useBudgets } from "@/contexts/BudgetsProvider";
import OverViewCard from "@/components/ui/OverViewCard";
import { useTransactions } from "@/contexts/TransactionsProvider";
import { useAccounts } from "@/contexts/AccountsProvider";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const OverViewHeader = () => {
  const { budgets } = useBudgets();
  const { transactions } = useTransactions();
  const { accounts } = useAccounts();

  const globalBudgets = budgets.filter((budget) => budget.isGlobal === true);
  const nonGlobalBudgets = budgets.filter((budget) => budget.isGlobal === false);
  const expenses = transactions.filter(transaction => transaction.type === "expense");
  const income = transactions.filter(transaction => transaction.type === "income");
  const totalTransactionsAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const expenseAmount = expenses.reduce((sum, transaction) => sum + transaction.amount, 0);
  const incomeAmount = income.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const BudgetSpendings = budgets.reduce((sum, budget) => sum + budget.spent, 0);

  const data = [
    { name: 'Expenses', amount: expenseAmount },
    { name: 'Income', amount: incomeAmount },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div>
        <OverViewCard title="Total Balance" total={totalBalance} unit="$">
          <div className="w-full flex flex-col justify-around h-full mt-4">
            <h1 className="text-lg font-semibold text-neutral-700">Account Breakdown</h1>
            <ul className="list-disc list-inside pl-5 text-sm text-neutral-500">
              <li>Bank</li>
              <li>Mobile Money</li>
              <li>Cash</li>
            </ul>
          </div>
        </OverViewCard>
      </div>

      <div>
        <OverViewCard title="Total Transactions" total={totalTransactionsAmount} unit="$">
          <div className="w-full h-full mt-2">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <div className="shadow-inner text-sm bg-neutral-100 mb-2 flex justify-between py-2 px-2 rounded">
                <h1 className="font-semibold">Expenses</h1>
                <p className="text-neutral-500">${expenseAmount}</p>
              </div>
              <div className="shadow-inner text-sm bg-neutral-100 flex justify-between py-2 px-2 rounded">
                <h1 className="font-semibold">Income</h1>
                <p className="text-neutral-500">${incomeAmount}</p>
              </div>
            </div>
          </div>
        </OverViewCard>
      </div>
      <div>
        <OverViewCard title="Total Budgets" total={budgets.length} unit="">
          <div className="w-full flex flex-col justify-between h-full mt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">All My Budgets</p>
                <p className="text-sm text-neutral-500">Total spent: ${BudgetSpendings}</p>
              </div>
              <div className="flex gap-2">
                <div className="bg-neutral-200 px-3 py-2 rounded-lg text-center">
                  <p className="text-xs text-neutral-500">Global</p>
                  <h1 className="font-extrabold text-lg">{globalBudgets.length}</h1>
                </div>
                <div className="bg-neutral-200 px-3 py-2 rounded-lg text-center">
                  <p className="text-xs text-neutral-500">Non-Global</p>
                  <h1 className="font-extrabold text-lg">{nonGlobalBudgets.length}</h1>
                </div>
              </div>
            </div>
          </div>
        </OverViewCard>
      </div>

      <div className="lg:col-span-2 xl:col-span-3">
        <div className="bg-white p-4 rounded-xl shadow-md border-2 border-secondary/20">
          <h2 className="font-bold text-lg mb-3 text-neutral-700">Transaction Statistics</h2>
          <table className="w-full table-auto text-sm">
            <thead>
              <tr>
                <th className="text-left p-2">Transaction Type</th>
                <th className="text-left p-2">Amount ($)</th>
                <th className="text-left p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-b hover:bg-neutral-100">
                  <td className="p-2">{transaction.type}</td>
                  <td className="p-2">${transaction.amount}</td>
                  <td className="p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverViewHeader;
