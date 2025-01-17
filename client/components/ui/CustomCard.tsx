import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";

const CustomCard = ({ children }: { children: ReactNode }) => {
  return <Card className="max-w-[350px] w-full p-4 text-sm">{children}</Card>;
};

export default CustomCard;
