"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = __importDefault(require("../controllers/userController"));
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
        this.router.post('/signup', userController_1.default.addUser);
        /* this.router.get('/home', (req: Request, res: Response) => {
            res.send('Bienvenido!!!')
        }); */
        this.router.get('/home', userController_1.default.home);
    };
    return UserRoutes;
}());
var userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map