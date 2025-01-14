import { Server } from "socket.io";

declare global {
    namespace Express {
      interface Request {
        user?: UserPayload | null;
        io?:Server
      }
    }
  }
  type PartialUpdate={
    [P in keyof T]?:T[P]
  }

export type UserPayload={
    _id?:string,
    firstName:string,
    lastName:string,
    email:string,
    role?:'user' | 'admin',
    password:string,
    telephone:string
}


export type LoginPayload={
    email:string,
    password:string
}
export type TokenPayload={
    _id: string,
    firstName: string,
    email: string,
    role: string
}

//types for the Account

export type AccountPayload={
    userId:string;
    name:string;
    type:'cash' | 'bank' | 'momo';
    accountNumber?:string
    balance: number;  
}

export type UpdateAccountPayload=PartialUpdate<AccountPayload>


//types for Category

export type CategoryPayload={
    name: string;
    type: "income" | "expense";
    subCategories: string[];
    userId: string;
}
export type UpdateCategoryPayload=PartialUpdate<CategoryPayload>

// Types for Transaction

export type TransactionPayload={
    amount:number;
    date:Date;
    categoryId:Schema.Types.ObjectId;
    accountId:Schema.Types.ObjectId;
    userId:Schema.Types.ObjectId;
    type:'income' | 'expense';
    description:string
}

export type UpdatedTransactionPayload=PartialUpdate<TransactionPayload>


//types for Buddget

export type BudgetPayload={
    userId: string;
    name:string;
    description:string;
    categoryId: string;
    accountId?: string; 
    isGlobal: boolean;
    amount: number;
    startDate: Date;
    endDate: Date;
    status?: "active" | "expired" | "completed" | "canceled";
}

export type UpdateBudgetPayload=PartialUpdate<BudgetPayload>