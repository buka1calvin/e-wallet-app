import { ReactNode } from "react";
type PartialUpdate = {
  [P in keyof T]?: T[P];
};
type OverviewProps = {
  title: string;
  total: number;
  children: ReactNode;
  unit?: string;
};

type AccountProps = {
  _id?: string;
  name: string;
  type: string;
  accountNumber?: string | null;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type UpdateAccount = PartialUpdate<AccountProps>;

type TransactionProps = {
  _id?: string;
  amount: number;
  date: string;
  categoryId: Schema.Types.ObjectId;
  accountId: Schema.Types.ObjectId;
  userId?: Schema.Types.ObjectId;
  type: string;
  description: string;
};

type UpdateTransaction = PartialUpdate<TransactionProps>;

type CategoryProps = {
  _id?:string;
  name: string;
  type: string;
  subCategories: string[];
  userId?: Schema.Types.ObjectId;
};
type UpdateCategory = PartialUpdate<CategoryProps>;

type BudgetProps = {
  _id?: string;
  userId?: Schema.Types.ObjectId;
  name: string;
  description?: string;
  category?: Schema.Types.ObjectId;
  categoryId?: Schema.Types.ObjectId;
  remaining?:number
  accountId?: Schema.Types.ObjectId;
  isGlobal: boolean;
  amount: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: string;
};

type updateBudget = PartialUpdate<BudgetProps>;

type User = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  telephone?: string;
  password: string;
};
