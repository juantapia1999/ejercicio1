"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userModel_1 = __importDefault(require("../models/userModel"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.signin = function (req, res) {
        console.log(req.body);
        //res.send('Sign In!!!');
        res.render("partials/signinForm");
    };
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, usuario, password, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, usuario = _a.usuario, password = _a.password;
                        return [4 /*yield*/, userModel_1.default.buscarNombre(usuario)];
                    case 1:
                        result = _b.sent();
                        //console.log(result);
                        //validaciones del form
                        /* await check('usuario').notEmpty().withMessage("usuario es obligatorio").isLength({ min: 3, max: 8 }).withMessage("usuario debe contener entre 3 y 8 caracteres").run(req);
                        await check('password').notEmpty().withMessage("contraseña es obligatoria").isLength({ min: 6, max: 8 }).withMessage("contraseña debe contener entre 6 y 8 caracteres").run(req);
                
                        const errors = validationResult(req);
                
                        if (!errors.isEmpty()) {
                            return res.render('partials/signinForm', { error: errors.array() });
                        } */
                        //fin de validaciones
                        if (!result) {
                            //return res.send({ "Usuario no registrado Recibido": req.body });
                            req.flash('error_session', 'Usuario y/o Password Incorrectos');
                            res.redirect("./error");
                            return [2 /*return*/];
                        }
                        if (result.nombre == usuario && result.password == password) {
                            req.session.user = result;
                            req.session.auth = true;
                            res.redirect("./home");
                            return [2 /*return*/];
                        }
                        res.send({ "Usuario y/o contraseña incorrectos": req.body });
                        req.flash('error_session', 'Usuario y/o Password Incorrectos');
                        res.redirect("./error");
                        return [2 /*return*/];
                }
            });
        });
    };
    //registro
    UserController.prototype.signup = function (req, res) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    };
    //metodo del ejercicio2
    /* public addUser(req: Request, res: Response) {
        console.log(req.body);
        res.send('Datos recibidos!!!');
    } */
    UserController.prototype.home = function (req, res) {
        if (!req.session.auth) {
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
            //res.redirect("/");
        }
        console.log(req.body);
        res.render("partials/home", { mi_session: true });
    };
    //CRUD
    UserController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuarios;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body);
                        return [4 /*yield*/, userModel_1.default.listar()];
                    case 1:
                        usuarios = _a.sent();
                        console.log(usuarios);
                        return [2 /*return*/, res.json(usuarios)];
                }
            });
        });
    };
    UserController.prototype.find = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, usuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.params.id);
                        id = req.params.id;
                        return [4 /*yield*/, userModel_1.default.buscarId(id)];
                    case 1:
                        usuario = _a.sent();
                        if (usuario)
                            return [2 /*return*/, res.json(usuario)];
                        res.status(404).json({ text: "User doesn't exists" });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.addUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuario, busqueda, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usuario = req.body;
                        delete usuario.repassword;
                        console.log(req.body);
                        return [4 /*yield*/, userModel_1.default.buscarNombre(usuario.nombre)];
                    case 1:
                        busqueda = _a.sent();
                        if (!!busqueda) return [3 /*break*/, 3];
                        return [4 /*yield*/, userModel_1.default.crear(usuario)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, res.json({ message: 'User saved!!' })];
                    case 3: return [2 /*return*/, res.json({ message: 'User exists!!' })];
                }
            });
        });
    };
    UserController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body);
                        id = req.params.id;
                        return [4 /*yield*/, userModel_1.default.actualizar(req.body, id)];
                    case 1:
                        result = _a.sent();
                        //res.send('Usuario '+ req.params.id +' actualizado!!!');
                        return [2 /*return*/, res.json({ text: 'updating a user ' + id })];
                }
            });
        });
    };
    UserController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body);
                        id = req.params.id;
                        return [4 /*yield*/, userModel_1.default.eliminar(id)];
                    case 1:
                        result = _a.sent();
                        //return res.json({ text: 'deleting a user ' + id });
                        res.redirect('../control');
                        return [2 /*return*/];
                }
            });
        });
    };
    //FIN CRUD
    UserController.prototype.control = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuarios, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //res.send('Controles');
                        if (!req.session.auth) {
                            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
                            res.redirect("./error");
                            //res.redirect("/");
                        }
                        return [4 /*yield*/, userModel_1.default.listar()];
                    case 1:
                        usuarios = _a.sent();
                        users = usuarios;
                        //const users=[]
                        if (users.length > 0) {
                            res.render('partials/controls', { users: usuarios, mi_session: true });
                        }
                        else {
                            res.render('partials/controls', { users: {}, mi_session: true });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.procesar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuario, usuarios, _i, usuario_1, elemento, encontrado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.session.auth) {
                            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
                            res.redirect("./error");
                            //res.redirect("/");
                        }
                        usuario = req.body.usuario;
                        usuarios = [];
                        console.log(usuario);
                        if (!(usuario.length > 0)) return [3 /*break*/, 4];
                        _i = 0, usuario_1 = usuario;
                        _a.label = 1;
                    case 1:
                        if (!(_i < usuario_1.length)) return [3 /*break*/, 4];
                        elemento = usuario_1[_i];
                        return [4 /*yield*/, userModel_1.default.buscarId(elemento)];
                    case 2:
                        encontrado = _a.sent();
                        if (encontrado) {
                            usuarios.push(encontrado);
                            console.log(encontrado);
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log(usuarios);
                        //
                        //res.send("procesado");
                        res.render("partials/seleccion", { usuarios: usuarios, home: req.session.user, mi_session: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.endSession = function (req, res) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(function () { return console.log("Session finalizada"); });
        res.redirect("/");
    };
    UserController.prototype.showError = function (req, res) {
        //res.send({ "Usuario y/o contraseña incorrectos": req.body });
        res.render("partials/error");
    };
    return UserController;
}());
var userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map