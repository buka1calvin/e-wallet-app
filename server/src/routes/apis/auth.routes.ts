import { createUser,getUser,loginUser, logOut, userUpdate } from "../../controllers/auth.controller";
import { Router } from "express";
import userExist from "../../middlewares/userCheck";
import extractToken from "../../middlewares/checkUserWithToken";
import { refreshTokenMiddleWare } from "../../middlewares/refreshToken";

const router = Router();

router.post("/signup", userExist, createUser);
router.post("/login",loginUser)
router.post('/logout',logOut)
router.post("/token",refreshTokenMiddleWare)
router.put("/update",extractToken,userUpdate)
router.get("/me",extractToken,getUser)


export default router;