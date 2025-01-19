import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import { createCategory, deleteCategory, getAlluserCategories, getCategory, updateCategory } from "../../controllers/categories.controller";


const router=Router()

router.post('/',extractToken,createCategory)
router.get('/',extractToken,getAlluserCategories)
router.get("/:id",extractToken,getCategory)
router.put("/:id",extractToken,updateCategory)
router.delete('/:id',extractToken,deleteCategory)

export default router