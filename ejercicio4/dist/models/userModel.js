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
Object.defineProperty(exports, "__esModule", { value: true });
var promise_1 = require("mysql2/promise");
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.config(); //aplicamos la conexion con la BD.
    }
    UserModel.prototype.config = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, promise_1.createPool({
                                host: 'localhost',
                                user: 'root',
                                password: 'root',
                                database: 'estacionamiento',
                                connectionLimit: 10
                            })];
                    case 1:
                        _a.db = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.listar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usuarios;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.query('SELECT * FROM usuarios')];
                    case 1:
                        usuarios = _a.sent();
                        //console.log(usuarios[0]);
                        //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
                        return [2 /*return*/, usuarios[0]];
                }
            });
        });
    };
    //Devuelve un objeto cuya fila en la tabla usuarios coincide con id.
    //Si no la encuentra devuelve null
    UserModel.prototype.buscarId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var encontrado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.query('SELECT * FROM usuarios WHERE id = ?', [id])];
                    case 1:
                        encontrado = _a.sent();
                        //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
                        if (encontrado.length > 1)
                            return [2 /*return*/, encontrado[0][0]];
                        return [2 /*return*/, null];
                }
            });
        });
    };
    //Devuelve un objeto cuya fila en la tabla usuarios coincide con nombre.
    //Si no la encuentra devuelve null
    UserModel.prototype.buscarNombre = function (nombre) {
        return __awaiter(this, void 0, void 0, function () {
            var encontrado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre])];
                    case 1:
                        encontrado = _a.sent();
                        //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
                        if (encontrado.length > 1)
                            return [2 /*return*/, encontrado[0][0]];
                        return [2 /*return*/, null];
                }
            });
        });
    };
    //Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
    UserModel.prototype.crear = function (usuario) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.query('INSERT INTO usuarios SET ?', [usuario])];
                    case 1:
                        result = (_a.sent())[0].affectedRows;
                        console.log(result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    //Devuelve 1 si logro actualizar el usuario indicado por id
    UserModel.prototype.actualizar = function (usuario, id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.query('UPDATE usuarios SET ? WHERE ID = ?', [usuario, id])];
                    case 1:
                        result = (_a.sent())[0].affectedRows;
                        console.log(result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    //Devuelve 1 si logro eliminar el usuario indicado por id
    UserModel.prototype.eliminar = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.query('DELETE FROM usuarios WHERE ID = ?', [id])];
                    case 1:
                        user = (_a.sent())[0].affectedRows;
                        console.log(user);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return UserModel;
}());
//Exportamos el enrutador con 
var userModel = new UserModel();
exports.default = userModel;
//# sourceMappingURL=userModel.js.map