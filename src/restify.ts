import * as restify from 'express-restify-mongoose';
import User from "./user/user.model";
import AuthMiddleware from "./middleware/auth.middleware";

export default function setRestify(router) {
    restify.defaults({
        prefix: '/api',
        version: '',
        private: ['__v'],
        preMiddleware: (req, res, next) => {
            const authMiddleware = new AuthMiddleware();
            authMiddleware.use(req, res, next)
        }
    });

    restify.serve(router, User, {
        private: ['password', '__v']
    });
}