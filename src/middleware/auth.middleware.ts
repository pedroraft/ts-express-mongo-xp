import {NextFunction} from "@decorators/socket/src/middleware";
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {Middleware} from "@decorators/express";

export default class AuthMiddleware implements Middleware {
    public use(req: express.Request, res: express.Response, next: NextFunction): void {
        try {
            jwt.verify(req.headers.authorization, process.env.SECRET_TOKEN);
            next();
        } catch (err) {
            res.status(403).json().end();
        }
    }
}
