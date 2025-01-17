import React, { FC, ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
interface dropDownProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface itemsProps {
  items: dropDownProps[];
}
const CustomDropDown = ({ items }: itemsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="text-neutral-500"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item: dropDownProps, index) => (
          <DropdownMenuItem
            onClick={item.onClick}
            key={index}
            className="cursor-pointer"
          >
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <p className="">{item.label}</p>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropDown;
