"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../../controllers/auth.controller");
const express_1 = require("express");
const userCheck_1 = __importDefault(require("../../middlewares/userCheck"));
const checkUserWithToken_1 = __importDefault(require("../../middlewares/checkUserWithToken"));
const refreshToken_1 = require("../../middlewares/refreshToken");
const router = (0, express_1.Router)();
router.post("/signup", userCheck_1.default, auth_controller_1.createUser);
router.post("/login", auth_controller_1.loginUser);
router.post("/token", refreshToken_1.refreshTokenMiddleWare);
router.put("/update", checkUserWithToken_1.default, auth_controller_1.userUpdate);
router.get("/me", checkUserWithToken_1.default, auth_controller_1.getUser);
exports.default = router;
