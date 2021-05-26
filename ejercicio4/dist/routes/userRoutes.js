"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = __importDefault(require("../controllers/userController"));
var register_schema_1 = require("../schema/register-schema");
var validationSignup_1 = require("../middlewares/validationSignup");
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    UserRoutes.prototype.config = function () {
        this.router.get('/', function (req, res) {
            //res.render("partials/principal")
            res.send('Main!!!');
        });
        /* this.router.get('/signin', (req: Request, res: Response) => {
            res.send('Sign In!!!');//res.render("partials/principal");
        }); */
        this.router.get('/signin', userController_1.default.signin);
        this.router.post('/signin', userController_1.default.login);
        this.router.get('/signup', userController_1.default.signup);
        this.router.post('/signup', register_schema_1.registerSchema, validationSignup_1.validationSingUp, userController_1.default.addUser); //metodo perteneciente al ejercicio2
        /* this.router.get('/home', (req: Request, res: Response) => {
            res.send('Bienvenido!!!')
        }); */
        this.router.get('/home', userController_1.default.home);
        //CRUD
        this.router.get('/list', userController_1.default.list);
        this.router.get('/find/:id', userController_1.default.find);
        this.router.post('/add', userController_1.default.addUser);
        this.router.put('/update/:id', userController_1.default.update);
        this.router.delete('/delete/:id', userController_1.default.delete);
        // Fin de CRUD
        this.router.get('/control', userController_1.default.control);
        this.router.post('/procesar', userController_1.default.procesar);
        this.router.get('/salir', userController_1.default.endSession);
        this.router.get('/error', userController_1.default.showError);
        this.router.get('/delete/:id', userController_1.default.delete);
    };
    return UserRoutes;
}());
var userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map