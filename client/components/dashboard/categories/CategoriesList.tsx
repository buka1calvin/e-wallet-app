import CustomCard from "@/components/ui/CustomCard";
import { dummyCategories } from "@/constants/requests";
import { cn } from "@/lib/utils";
import { CategoryProps } from "@/types";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import CustomDialog from "@/components/ui/CustomDialog";
import CategoryForm from "./CreateCategory";

const CategoriesList = ({ items }: { items: any }) => {
  return (
    <section className="w-full h-full">
      <h1 className="text-neutral-500 text-xl my-5">Categories</h1>
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <h2 className="text-neutral-500 text-lg">No categories available</h2>
          <p className="text-neutral-400 text-sm">
            Click the "Create Category +" button to add a new category.
          </p>
        </div>
      )}
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 bg-slate-50">
        {items.map((category: CategoryProps, i: number) => (
          <CustomCard key={i}>
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-bold text-lg ">{category.name}</h1>
              <p
                className={cn(
                  ` px-2`,
                  category.type === "income"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-orange-200 text-orange-500"
                )}
              >
                {category.type}
              </p>
            </div>
            <div className="flex w-full justify-between">
              <ul className="grid md:grid-cols-2 grid-cols-1 text-neutral-500 list-disc list-inside gap-2">
                {category.subCategories.map((subCat: string, i: number) => (
                  <li className="" key={i}>
                    {subCat}
                  </li>
                ))}
              </ul>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="text-neutral-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="hover:bg-neutral-100 rounded flex items-center justify-start">
                    <CustomDialog
                      customStyle="text-black self-start"
                      button="View Category"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h1 className="font-bold text-lg ">{category.name}</h1>
                        <p
                          className={cn(
                            ` px-2`,
                            category.type === "income"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-orange-200 text-orange-500"
                          )}
                        >
                          {category.type}
                        </p>
                      </div>
                      <div className="flex w-full justify-between">
                        <ul className="grid md:grid-cols-2 grid-cols-1 text-neutral-500 list-disc list-inside gap-2">
                          {category.subCategories.map(
                            (subCat: string, i: number) => (
                              <li className="" key={i}>
                                {subCat}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </CustomDialog>
                  </div>
                  <div className="hover:bg-neutral-100 rounded flex items-center justify-start">
                    <CustomDialog
                      customStyle="text-black self-start"
                      button="edit Category"
                    >
                      <CategoryForm category={category}/>
                    </CustomDialog>
                  </div>
                  <DropdownMenuItem className="flex items-center justify-start px-4">
                    Delete Category
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CustomCard>
        ))}
      </div>
    </section>
  );
};

export default CategoriesList;
