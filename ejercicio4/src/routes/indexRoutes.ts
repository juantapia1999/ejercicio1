import { Router, Request, Response } from 'express';
class IndexRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void {
		this.router.get('/', (req: Request, res: Response) => {
			req.session.auth=false;
			req.session.user={};
			res.render("partials/principal");
		});
	}
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;