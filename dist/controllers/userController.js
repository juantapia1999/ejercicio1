"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.signin = function (req, res) {
        console.log(req.body);
        //res.send('Sign In!!!');
        res.render("partials/signinForm");
    };
    UserController.prototype.login = function (req, res) {
        console.log(req.body);
        //res.send('Datos recibidos!!!');
        //res.send({ "Recibido": req.body });
        if (req.body.usuario == "Pepe" && req.body.password == "123456")
            res.redirect("./home");
        //res.redirect("https://www.google.com");
        else //Falta enviar el resultado estilizado a traves de una vista
            res.send({ "Usuario no registrado Recibido": req.body });
    };
    //registro
    UserController.prototype.signup = function (req, res) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    };
    UserController.prototype.addUser = function (req, res) {
        console.log(req.body);
        res.send('Datos recibidos!!!');
    };
    UserController.prototype.home = function (req, res) {
        console.log(req.body);
        res.send('Bienvenido!!!');
    };
    return UserController;
}());
var userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map