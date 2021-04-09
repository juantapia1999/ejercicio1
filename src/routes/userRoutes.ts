import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';

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
        this.router.post('/signup', userController.addUser);

        /* this.router.get('/home', (req: Request, res: Response) => {
            res.send('Bienvenido!!!')
        }); */
        this.router.get('/home',userController.home);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;