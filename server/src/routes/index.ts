import express from "express";
import userAuth from "./apis/auth.routes"
import account from "./apis/account.routes"
import category from './apis/category.routes'
import transaction from "./apis/transaction.routes"
import budget from "./apis/budget.routes"
import report from "./apis/report.routes"

const routes = express.Router();
routes.use("/users", userAuth);
routes.use("/accounts",account);
routes.use('/categories',category)
routes.use('/transactions',transaction)
routes.use('/budgets',budget)
routes.use('/reports',report)


export default routes;