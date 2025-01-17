import CustomCard from "@/components/ui/CustomCard";
import { dummyCategories } from "@/constants/requests";
import { cn } from "@/lib/utils";
import { CategoryProps } from "@/types";
import React from "react";

const CategoriesList = ({ items }: { items: any }) => {
  return (
    <section className="w-full h-full">
      <h1 className="text-neutral-500 text-xl my-5">Accounts</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {items.map((category: CategoryProps, i: number) => (
          <CustomCard key={i}>
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-bold text-lg ">{category.name}</h1>
              <p className={cn(` px-2`,category.type === "income" ? "bg-secondary/10 text-secondary":"bg-orange-200 text-orange-500")}>{category.type}</p>
            </div>
            <ul className="grid md:grid-cols-2 grid-cols-1 text-neutral-500">
              {category.subCategories.map((subCat: string,i:number) => (
                <li className="" key={i}>{subCat}</li>
              ))}
            </ul>
          </CustomCard>
        ))}
      </div>
    </section>
  );
};

export default CategoriesList;
