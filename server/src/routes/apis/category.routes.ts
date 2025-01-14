import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import { createCategory, getAlluserCategories, updateCategory } from "../../controllers/categories.controller";


const router=Router()

router.post('/',extractToken,createCategory)
router.get('/',extractToken,getAlluserCategories)
router.put("/:id",extractToken,updateCategory)

export default router