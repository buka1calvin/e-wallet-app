import { createUser,loginUser, userUpdate } from "../../controllers/auth.controller";
import { Router } from "express";
import userExist from "../../middlewares/userCheck";
import extractToken from "../../middlewares/checkUserWithToken";
import { refreshTokenMiddleWare } from "../../middlewares/refreshToken";

const router = Router();

router.post("/signup", userExist, createUser);
router.post("/login",loginUser)
router.post("/token",refreshTokenMiddleWare)
router.put("/update",extractToken,userUpdate)


export default router;