import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import { createBudget, deleteBudget, getAllBudgets, updateBudget, updateSpendingBudget } from "../../controllers/budget.controller";


const router=Router()

router.post('/',extractToken,createBudget)
router.get('/',extractToken,getAllBudgets)
router.put('/:id',extractToken,updateBudget)
router.delete('/:id',extractToken,deleteBudget)
router.patch("/:id/spent",extractToken,updateSpendingBudget)

export default router