import { OverviewProps } from "@/types";
import React, { FC } from "react";

const OverViewCard: FC<OverviewProps> = ({ title, total, children, unit }) => {
  return (
    <div className="bg-orange-100 w-full min-h-40 h-52 shadow-inner p-3 relative overflow-hidden border">
      
      <div className="flex justify-between">
        <p className="font-bold">
          {unit}
          {total.toLocaleString()}
        </p>
        <h1 className="text-sm font-bold text-neutral-500">{title}</h1>
      </div>
      <div className="w-full h-full flex flex-col">{children}</div>
    </div>
  );
};

export default OverViewCard;
