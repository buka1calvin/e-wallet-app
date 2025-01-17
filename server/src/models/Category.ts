import { Document, model, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
  type: "income" | "expense";
  subCategories: string[];
  userId: Schema.Types.ObjectId;
}

const categorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["expense", "income"],
    },
    subCategories: {
      type: [String],
      required: true,
      default: [],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);
