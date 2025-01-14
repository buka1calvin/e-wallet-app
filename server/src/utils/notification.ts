import { io } from "..";
import { Notification } from "../models/Notification";

export const notifyUser=async(userId:string,message:string)=>{
    const notification = await Notification.create({ userId, message });
    io.to(userId).emit("new_notification", {
        id: notification._id,
        message: notification.message,
        isRead: notification.isRead,
      });
}