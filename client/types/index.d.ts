import { ReactNode } from "react";

type OverviewProps={
    title:string;
    total:number;
    children:ReactNode
    unit?:string
}

type AccountProps={
    id?:string;
    name:string;
    type:string;
    accountNumber:string | null;
    balance:number
}

type TransactionProps={
    userId: string;
    accountId: string;
    categoryId: string;
    type: 'all' | 'expense' | 'income'
    amount: number,
    description: string,
    date: string,
}

type CategoryProps={
    name:string;
    type:'all' | 'expense' | 'income',
    subCategories:string[],
    
}