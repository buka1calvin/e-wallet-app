import { AccountProps } from '@/types'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { FC } from 'react'


const AccountCard:FC<AccountProps> = ({name,type,balance,accountNumber,id}) => {
  return (
<div className="bg-white p-2 text-sm text-neutral-700 border flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="font-bold">{name}</h1>
              <p
                className={`${
                  type === "cash"
                    ? "bg-secondary/15 text-secondary"
                    : type === "bank"
                    ? "text-cyan-700 bg-cyan-700/15"
                    : "text-yellow-700 bg-yellow-700/15"
                } px-2`}
              >
                {type}
              </p>
            </div>
            <div className="">
              <h1 className="font-bold">
                {type !== "cash" ? accountNumber : "N/A"}
              </h1>
              <p className="text-xs text-neutral-500">Account Number</p>
            </div>
            <div className="">
              <h1 className="font-bold">{balance} $</h1>
              <p className="text-xs text-neutral-500">Total Amount</p>
            </div>
            <div className="flex justify-between">
              <button className="text-red-600">Remove</button>
              <Link href={`/dashboard/balances/${id}`} className="flex items-center bg-secondary text-white px-2 text-sm py-1">
                Details{" "}
                <ChevronRight className="text-sm" size={20} />
              </Link>
            </div>
          </div>
  )
}

export default AccountCard
