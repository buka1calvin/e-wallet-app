import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import {
  AllTransactions,
  createTransaction,
  deleteTransaction,
  getTransaction,
  updateTransaction,
} from "../../controllers/transactions.controller";

const router = Router();

router.post("/", extractToken, createTransaction);
router.get("/", extractToken, AllTransactions);
router.get("/:id", extractToken, getTransaction);
router.patch("/:id", extractToken, updateTransaction);
router.delete("/:id", extractToken, deleteTransaction);
export default router;
