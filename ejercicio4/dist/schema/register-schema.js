"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
var express_validator_1 = require("express-validator");
var schema = [
    express_validator_1.check('nombre').notEmpty().withMessage("nombre es obligatorio").isLength({ min: 4, max: 12 }).withMessage("nombre debe contener entre 4 y 12 caracteres"),
    express_validator_1.check('password').notEmpty().withMessage("password es obligatorio").isLength({ min: 8, max: 12 }).withMessage("password debe contener entre 8 y 12 caracteres"),
    express_validator_1.check('email').notEmpty().withMessage("email es requerido").isEmail().withMessage("email debe ser un email"),
];
exports.registerSchema = schema;
//# sourceMappingURL=register-schema.js.map