import OverViewCard from "@/components/ui/OverViewCard";
import React from "react";

const OverViewHeader = () => {
  return (
    <div className="flex gap-4 items-center justify-center w-full">
      <div className="w-full">
        <h1 className="text-neutral-500 font-semibold mb-1">Total Balance</h1>
        <OverViewCard title="Total Balance" total={20000} unit="$">
          <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-r from-[#e4e2e7] to-green-600 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-14 h-14 bg-gradient-to-r from-[#e4e2e7] to-orange-600 rounded-full blur-2xl" />
          <div className="w-full h-full">
            <h1 className="text-xl font-bold">account Type:</h1>
            <ul className="list-disc list-inside pl-5 text-sm text-neutral-500">
              <li className="">Bank</li>
              <li className="">Mobile Money</li>
              <li className="">Cash</li>
            </ul>
          </div>
        </OverViewCard>
      </div>
      <div className="w-full">
        <h1 className="text-neutral-500 font-semibold mb-1">
          Total Transactions
        </h1>
        <OverViewCard title="Total Transaction" total={20000} unit="$">
          <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-r from-[#e4e2e7] to-green-600 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-14 h-14 bg-gradient-to-r from-[#e4e2e7] to-orange-600 rounded-full blur-2xl" />
          <div className="w-full h-full mt-2">
            <div className="shadow-inner text-sm bg-neutral-100 mb-2 flex justify-between py-2 px-2 rounded">
              <h1 className="font-semibold">Expenses</h1>
              <p className="text-neutral-500">10000rwf</p>
            </div>
            <div className="shadow-inner text-sm bg-neutral-100 flex justify-between py-2 px-2 rounded">
              <h1 className="font-semibold">Income</h1>
              <p className="text-neutral-500">10000rwf</p>
            </div>
          </div>
        </OverViewCard>
      </div>
      <div className="w-full">
        <h1 className="text-neutral-500 font-semibold mb-1">Total Budgets</h1>
        <OverViewCard title="Total Balance" total={20000} unit="">
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
              <p className="text-neutral-400 text-xs">start:17 May - 18 jun</p>
            </div>
            <div className="bg-white border p-2 rounded">$150</div>
          </div>
        </OverViewCard>
      </div>
    </div>
  );
};

export default OverViewHeader;
