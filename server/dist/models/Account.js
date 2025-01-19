"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: {
        type: String,
        enum: ["bank", "cash", "momo"],
        required: true,
    },
    accountNumber: {
        type: String,
        required: function () {
            return this.type !== "cash";
        },
        unique: function () {
            return this.type !== "cash";
        },
    },
    balance: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Account = (0, mongoose_1.model)("Account", accountSchema);
