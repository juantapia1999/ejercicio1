import { body,check } from 'express-validator';

const schema = [
    check('nombre').notEmpty().withMessage("nombre es obligatorio").isLength({ min: 4, max: 12 }).withMessage("nombre debe contener entre 4 y 12 caracteres"),
    check('password').notEmpty().withMessage("password es obligatorio").isLength({ min: 8, max: 12 }).withMessage("password debe contener entre 8 y 12 caracteres"),
    check('email').notEmpty().withMessage("email es requerido").isEmail().withMessage("email debe ser un email"),
    //check('repassword').notEmpty().withMessage("repetir contraseña es requerido").equals("").withMessage("las contreseñas deben coincidir"),
    //ver como comparar las contraseñas
];

export { schema as registerSchema };