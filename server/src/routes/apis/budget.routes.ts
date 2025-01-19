import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import { createBudget, deleteBudget, getAllBudgets, getBudget, updateBudget, updateSpendingBudget } from "../../controllers/budget.controller";


const router=Router()

router.post('/',extractToken,createBudget)
router.get('/',extractToken,getAllBudgets)
router.get('/:id',extractToken,getBudget)
router.put('/:id',extractToken,updateBudget)
router.delete('/:id',extractToken,deleteBudget)
router.patch("/:id/spent",extractToken,updateSpendingBudget)

export default router