"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = void 0;
var express_validator_1 = require("express-validator");
exports.checkLogin = function () {
    return [express_validator_1.body('username').isLength({ min: 2 })];
};
//# sourceMappingURL=login.js.map