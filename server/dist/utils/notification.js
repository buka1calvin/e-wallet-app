"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyUser = void 0;
const __1 = require("..");
const Notification_1 = require("../models/Notification");
const notifyUser = async (userId, message) => {
    const notification = await Notification_1.Notification.create({ userId, message });
    __1.io.to(userId).emit("new_notification", {
        id: notification._id,
        message: notification.message,
        isRead: notification.isRead,
    });
};
exports.notifyUser = notifyUser;
