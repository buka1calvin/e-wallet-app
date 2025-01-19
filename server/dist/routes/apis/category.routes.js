"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkUserWithToken_1 = __importDefault(require("../../middlewares/checkUserWithToken"));
const categories_controller_1 = require("../../controllers/categories.controller");
const router = (0, express_1.Router)();
router.post('/', checkUserWithToken_1.default, categories_controller_1.createCategory);
router.get('/', checkUserWithToken_1.default, categories_controller_1.getAlluserCategories);
router.put("/:id", checkUserWithToken_1.default, categories_controller_1.updateCategory);
exports.default = router;
