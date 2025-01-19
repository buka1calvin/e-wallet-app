"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkUserWithToken_1 = __importDefault(require("../../middlewares/checkUserWithToken"));
const accounts_controller_1 = require("../../controllers/accounts.controller");
const router = (0, express_1.Router)();
router.post('/', checkUserWithToken_1.default, accounts_controller_1.createAccount);
router.get('/', checkUserWithToken_1.default, accounts_controller_1.getAllUserAccounts);
router.get('/:id', checkUserWithToken_1.default, accounts_controller_1.getAccount);
router.put('/:id', checkUserWithToken_1.default, accounts_controller_1.updateAccount);
router.delete('/:id', checkUserWithToken_1.default, accounts_controller_1.deleteAccount);
exports.default = router;
