"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkUserWithToken_1 = __importDefault(require("../../middlewares/checkUserWithToken"));
const budget_controller_1 = require("../../controllers/budget.controller");
const router = (0, express_1.Router)();
router.post('/', checkUserWithToken_1.default, budget_controller_1.createBudget);
router.get('/', checkUserWithToken_1.default, budget_controller_1.getAllBudgets);
router.put('/:id', checkUserWithToken_1.default, budget_controller_1.updateBudget);
router.delete('/:id', checkUserWithToken_1.default, budget_controller_1.deleteBudget);
router.patch("/:id/spent", checkUserWithToken_1.default, budget_controller_1.updateSpendingBudget);
exports.default = router;
