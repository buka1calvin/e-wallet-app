"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenMiddleWare = void 0;
const Tokens_1 = require("../utils/Tokens");
const refreshTokenMiddleWare = async (req, res, next) => {
    const refreshTokenExist = req.cookies.refresh_token;
    if (!refreshTokenExist) {
        return res.status(401).json({ error: "No refresh token provided" });
    }
    const decoded = (0, Tokens_1.verifyRefreshToken)(refreshTokenExist);
    if (!decoded || typeof decoded === "string") {
        return res.status(403).json({ error: "Invalid or expired refresh token" });
    }
    const newAccessToken = (0, Tokens_1.generateToken)({
        _id: decoded.data._id,
        firstName: decoded.data.firstName,
        email: decoded.data.email,
        role: decoded.data.role,
    }, { expiresIn: "15m" });
    return res.status(200).json({ newAccessToken });
};
exports.refreshTokenMiddleWare = refreshTokenMiddleWare;
