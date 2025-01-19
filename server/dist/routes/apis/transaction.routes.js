"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkUserWithToken_1 = __importDefault(require("../../middlewares/checkUserWithToken"));
const transactions_controller_1 = require("../../controllers/transactions.controller");
const router = (0, express_1.Router)();
router.post("/", checkUserWithToken_1.default, transactions_controller_1.createTransaction);
router.get("/", checkUserWithToken_1.default, transactions_controller_1.AllTransactions);
router.get("/:id", checkUserWithToken_1.default, transactions_controller_1.getTransaction);
router.patch("/:id", checkUserWithToken_1.default, transactions_controller_1.updateTransaction);
router.delete("/:id", checkUserWithToken_1.default, transactions_controller_1.deleteTransaction);
exports.default = router;
