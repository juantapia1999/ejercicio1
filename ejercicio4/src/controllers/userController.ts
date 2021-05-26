import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import userModel from '../models/userModel';
import flash from "connect-flash";

class UserController {
    public signin(req: Request, res: Response) {
        console.log(req.body);
        //res.send('Sign In!!!');
        res.render("partials/signinForm");
    }

    public async login(req: Request, res: Response) {
        const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.buscarNombre(usuario);
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
            return;
        }
        if (result.nombre == usuario && result.password == password) {
            req.session.user = result;
            req.session.auth = true;
            res.redirect("./home");
            return;
        }
        res.send({ "Usuario y/o contraseña incorrectos": req.body });
        req.flash('error_session', 'Usuario y/o Password Incorrectos');
        res.redirect("./error");

    }

    //registro
    public signup(req: Request, res: Response) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    }

    //metodo del ejercicio2
    /* public addUser(req: Request, res: Response) {
        console.log(req.body);
        res.send('Datos recibidos!!!');
    } */

    public home(req: Request, res: Response) {
        if (!req.session.auth) {
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
            //res.redirect("/");
        }

        console.log(req.body);
        res.render("partials/home", { mi_session: true });
    }

    //CRUD
    public async list(req: Request, res: Response) {
        console.log(req.body);
        const usuarios = await userModel.listar();
        console.log(usuarios);
        return res.json(usuarios);
        //res.send('Listado de usuarios!!!');
    }

    public async find(req: Request, res: Response) {
        console.log(req.params.id);
        const { id } = req.params;
        const usuario = await userModel.buscarId(id);
        if (usuario)
            return res.json(usuario);
        res.status(404).json({ text: "User doesn't exists" });
    }

    public async addUser(req: Request, res: Response) {
        const usuario = req.body;
        delete usuario.repassword;
        console.log(req.body);
        //res.send('Usuario agregado!!!');

        //validaciones del form
        /* await check('nombre').notEmpty().withMessage("nombre es obligatorio").isLength({ min: 4, max: 12 }).withMessage("nombre debe contener entre 4 y 12 caracteres").run(req);
        await check('password').notEmpty().withMessage("password es obligatorio").isLength({ min: 8, max: 12 }).withMessage("password debe contener entre 8 y 12 caracteres").run(req);
        await check('email').notEmpty().withMessage("email es requerido").isEmail().withMessage("email debe ser un email").run(req);
        await check('repassword').notEmpty().withMessage("repetir contraseña es requerido").equals(usuario.password).withMessage("las contreseñas deben coincidir").run(req);

        const errors = validationResult(req);
        console.log(errors.array());

        if (!errors.isEmpty()) {
            return res.render("partials/signupForm", { error: errors.array() })
        } */

        //fin de validacion
        const busqueda = await userModel.buscarNombre(usuario.nombre);
        if (!busqueda) {
            const result = await userModel.crear(usuario);
            return res.json({ message: 'User saved!!' });
        }
        return res.json({ message: 'User exists!!' });
    }

    public async update(req: Request, res: Response) {
        console.log(req.body);
        const { id } = req.params;
        const result = await userModel.actualizar(req.body, id);
        //res.send('Usuario '+ req.params.id +' actualizado!!!');
        return res.json({ text: 'updating a user ' + id });
    }

    public async delete(req: Request, res: Response) {
        console.log(req.body);
        //res.send('Usuario '+ req.params.id +' Eliminado!!!');
        const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.eliminar(id);
        //return res.json({ text: 'deleting a user ' + id });
        res.redirect('../control');
    }
    //FIN CRUD

    public async control(req: Request, res: Response) {
        //res.send('Controles');

        if (!req.session.auth) {
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
            //res.redirect("/");
        }

        const usuarios = await userModel.listar();
        const users = usuarios;
        //const users=[]
        if (users.length > 0) {
            res.render('partials/controls', { users: usuarios, mi_session: true });

        } else {
            res.render('partials/controls', { users: {}, mi_session: true });
        }
    }

    public async procesar(req: Request, res: Response) {

        if (!req.session.auth) {
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
            //res.redirect("/");
        }

        //esto era parte de mi practica
        /* const { valores, prueba } = req.body;
        console.log("user -> ", valores);
        console.log("num -> ", prueba);

        for (let i = 0; i < valores.length; i++) {
            console.log(prueba[valores[i]]);
        } */

        //agregado
        let usuario = req.body.usuario;
        var usuarios: any = [];
        console.log(usuario);
        if (usuario.length > 0) {
            for (let elemento of usuario) {
                const encontrado = await userModel.buscarId(elemento);
                if (encontrado) {
                    usuarios.push(encontrado);
                    console.log(encontrado);
                }

            }
        }
        console.log(usuarios);
        //

        //res.send("procesado");
        res.render("partials/seleccion",{usuarios,home:req.session.user,mi_session:true});
    }

    public endSession(req: Request, res: Response) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }

    public showError(req: Request, res: Response) {
        //res.send({ "Usuario y/o contraseña incorrectos": req.body });
        res.render("partials/error");
    }
}

const userController = new UserController();
export default userController;