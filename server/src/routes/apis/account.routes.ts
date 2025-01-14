import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import { createAccount, deleteAccount, getAllUserAccounts, updateAccount } from "../../controllers/accounts.controller";


const router=Router()

router.post('/',extractToken,createAccount)
router.get('/',extractToken,getAllUserAccounts)
router.put('/:id',extractToken,updateAccount)
router.delete('/:id',extractToken,deleteAccount)

export default router