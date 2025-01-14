import { model, Schema } from "mongoose";

interface INotification extends Document{
    userId:Schema.Types.ObjectId,
    message:string,
    isRead:boolean
}

const notificationSchema:Schema<INotification>=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    isRead:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Notification=model<INotification>('Notification',)