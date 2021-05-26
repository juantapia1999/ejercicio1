import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export async function validationSingUp(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    //console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.render("partials/signupForm", { error: errors.array() });
    }
    next();
}