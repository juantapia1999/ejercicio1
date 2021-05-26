import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';
import { body } from 'express-validator';
import { registerSchema } from '../schema/register-schema';
import { validationSingUp } from '../middlewares/validationSignup';

class UserRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            //res.render("partials/principal")
            res.send('Main!!!')
        });

        /* this.router.get('/signin', (req: Request, res: Response) => {
            res.send('Sign In!!!');//res.render("partials/principal");
        }); */

        this.router.get('/signin', userController.signin);
        this.router.post('/signin', userController.login);
        this.router.get('/signup', userController.signup);
        this.router.post('/signup',registerSchema,validationSingUp,userController.addUser);//metodo perteneciente al ejercicio2

        /* this.router.get('/home', (req: Request, res: Response) => {
            res.send('Bienvenido!!!')
        }); */
        this.router.get('/home', userController.home);

        //CRUD
        this.router.get('/list', userController.list);
        this.router.get('/find/:id', userController.find);
        this.router.post('/add', userController.addUser);
        this.router.put('/update/:id', userController.update);
        this.router.delete('/delete/:id', userController.delete);
        // Fin de CRUD

        this.router.get('/control', userController.control);
        this.router.post('/procesar', userController.procesar);

        this.router.get('/salir',userController.endSession);
        this.router.get('/error',userController.showError);

        this.router.get('/delete/:id',userController.delete);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;