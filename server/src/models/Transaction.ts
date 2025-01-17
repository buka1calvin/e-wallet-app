import { Document, model, Schema, Types } from "mongoose";

interface ITransaction extends Document {
  amount: number;
  date: Date;
  categoryId: Schema.Types.ObjectId;
  accountId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  type: "income" | "expense";
  description: string;
}

const transactionSchema: Schema<ITransaction> = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    accountId: { type: Types.ObjectId, ref: "Account", required: true },
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: { type: Number, required: true },
    description: { type: String, trim: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export const Transaction = model<ITransaction>(
  "Transaction",
  transactionSchema
);
