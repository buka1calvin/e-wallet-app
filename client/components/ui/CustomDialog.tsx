import React, { FC, ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
interface DialogProps{
    button:string,
    children:ReactNode,
    customStyle:string

}
const CustomDialog:FC<DialogProps> = ({children,customStyle,button}) => {
  return (
    <Dialog>
    <DialogTrigger className={cn("text-white h-10 rounded-md px-4 text-sm w-fit",customStyle)}>{button}</DialogTrigger>
    <DialogContent>
        {children}
    </DialogContent>
  </Dialog>
  )
}

export default CustomDialog