import Link from "next/link";
import React from "react";

const ButttonTwo = ({text}:{text:string}) => {
  return (
    <Link
      href="/dashboard/balances/create"
      className="inline-flex items-center justify-center w-full px-4 py-1 text-sm font-bold leading-6 text-white bg-secondary border border-transparent md:w-auto hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seondary"
    >
        {text} +
    </Link>
  );
};

export default ButttonTwo;
