import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import { getReport } from "../../controllers/report.controller";


const router = Router();

router.get("/",extractToken,getReport)


export default router;