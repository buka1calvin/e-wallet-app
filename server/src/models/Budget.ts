import { model, Schema } from "mongoose";

interface IBudget extends Document{
    userId:Schema.Types.ObjectId,
    name:string,
    description?:string,
    categoryId:Schema.Types.ObjectId,
    accountId?:Schema.Types.ObjectId,
    isGlobal: boolean;
    amount:number,
    spent:number,
    startDate:Date,
    endDate:Date,
    status: "active" | "expired" | "completed" | "canceled"
}

const budgetSchema:Schema<IBudget>=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    accountId:{
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:false
    },
    isGlobal:{
        type:Boolean,
        required:true,
        default:true
    },
    amount: {
        type: Number,
        required: true,
      },
      spent: {
        type: Number,
        default: 0,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      status:{
        type: String,
        enum: ["active", "expired", "completed", "canceled"],
        default: "active",
      }
},{timestamps:true})

export const Budget=model<IBudget>('Budget',budgetSchema)