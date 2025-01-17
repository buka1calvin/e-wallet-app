import { OverviewProps } from "@/types";
import React, { FC } from "react";

const OverViewCard: FC<OverviewProps> = ({ title, total, children, unit }) => {
  return (
    <div className="bg-white w-full min-h-40 rounded-xl shadow-inner p-3 relative overflow-hidden border-2 border-secondary/20">
      
      <div className="flex justify-between">
        <p className="font-medium">
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
