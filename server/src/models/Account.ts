import { model, Schema, Types } from "mongoose";

const accountSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["bank", "cash", "momo"],
      required: true,
    },
    accountNumber:{
        type:String,
        required:function(this:{type:string}){
            return this.type !== "cash";
        },
        unique:function(this:{type:string}){
            return this.type !== "cash";
        },
    },
    balance: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Account=model("Account",accountSchema)
