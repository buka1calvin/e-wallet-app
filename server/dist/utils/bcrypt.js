"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
class BcryptUtil {
    static hash(string) {
        const pasSalt = (0, bcryptjs_1.genSaltSync)(10);
        const pasHash = (0, bcryptjs_1.hashSync)(string, pasSalt);
        return pasHash;
    }
    static compare(value1, value2) {
        const validPass = (0, bcryptjs_1.compareSync)(value1, value2);
        return validPass;
    }
}
exports.default = BcryptUtil;
