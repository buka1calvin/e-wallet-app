"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./apis/auth.routes"));
const account_routes_1 = __importDefault(require("./apis/account.routes"));
const category_routes_1 = __importDefault(require("./apis/category.routes"));
const transaction_routes_1 = __importDefault(require("./apis/transaction.routes"));
const budget_routes_1 = __importDefault(require("./apis/budget.routes"));
const routes = express_1.default.Router();
routes.use("/users", auth_routes_1.default);
routes.use("/accounts", account_routes_1.default);
routes.use('/categories', category_routes_1.default);
routes.use('/transactions', transaction_routes_1.default);
routes.use('/budgets', budget_routes_1.default);
exports.default = routes;
