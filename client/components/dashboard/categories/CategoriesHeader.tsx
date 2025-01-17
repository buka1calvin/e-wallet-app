"use client";
import CustomDialog from "@/components/ui/CustomDialog";
import { Input } from "@/components/ui/input";
import { filters } from "@/constants/requests";
import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";

interface CatFilter {
  handleActive: (filter: string) => void;
}
const CategoriessHeader: FC<CatFilter> = ({ handleActive }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    handleActive(filter);
  };
  return (
    <div className="bg-white w-full h-12 flex items-center justify-between border rounded-md">
      <div className="h-full">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={cn(
              "text-black h-full px-5",
              activeFilter === filter.value
                ? "border-b-2 border-secondary"
                : "border-none"
            )}
            onClick={() => handleFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Input type="text" placeholder="Search any Category..." />
        <CustomDialog
          customStyle="bg-primary w-full"
          button="Create Category +"
        >
          <div className=""></div>
        </CustomDialog>
      </div>
    </div>
  );
};

export default CategoriessHeader;
