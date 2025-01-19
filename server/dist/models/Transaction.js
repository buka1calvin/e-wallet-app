"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    accountId: { type: mongoose_1.Types.ObjectId, ref: "Account", required: true },
    categoryId: { type: mongoose_1.Types.ObjectId, ref: "Category", required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: { type: Number, required: true },
    description: { type: String, trim: true },
    date: { type: Date, required: true, default: Date.now },
}, { timestamps: true });
exports.Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
