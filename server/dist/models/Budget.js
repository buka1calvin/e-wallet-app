"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
const mongoose_1 = require("mongoose");
const budgetSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    accountId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
        required: false
    },
    isGlobal: {
        type: Boolean,
        required: true,
        default: true
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
    status: {
        type: String,
        enum: ["active", "expired", "completed", "canceled"],
        default: "active",
    }
}, { timestamps: true });
exports.Budget = (0, mongoose_1.model)('Budget', budgetSchema);
