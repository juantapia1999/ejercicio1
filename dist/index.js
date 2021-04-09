"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var path_1 = __importDefault(require("path"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        //Configuraciones
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('views', path_1.default.join(__dirname, 'views')); //indicamos que views esta en dist y no en el modulo principal
        this.app.engine('.hbs', express_handlebars_1.default({
            defaultLayout: 'main',
            layoutsDir: path_1.default.join(this.app.get('views'), 'layouts'),
            partialsDir: path_1.default.join(this.app.get('views'), 'partials'),
            extname: 'hbs',
            helpers: require('./lib/handlebars') //definimos donde estan los helpers
        }));
        this.app.set('view engine', '.hbs'); //ejecutamos el modulo definido
        //Middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default()); //iniciamos cors
        this.app.use(express_1.default.json()); //habilitamos el intercambio de objetos json entre aplicaciones
        this.app.use(express_1.default.urlencoded({ extended: true })); //habilitamos para recibir datos a traves de formularios html.
        //Variables globales
    };
    Server.prototype.routes = function () {
        this.app.use(indexRoutes_1.default);
        this.app.use("/user", userRoutes_1.default); //user sera un objeto existene en la app.
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log("Sever escuchando" + _this.app.get('port'));
        });
    };
    return Server;
}());
var server = new Server();
server.start(); //Ejecutamos el metodo start en inica el server
//# sourceMappingURL=index.js.map