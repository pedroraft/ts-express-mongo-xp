import * as restify from 'express-restify-mongoose';
import AuthMiddleware from "./middleware/auth.middleware";
import {UserModel} from "./user/user.model";
//import {Post, Comment} from "./post/post.model";

export default function setRestify(router) {
    restify.defaults({
        prefix: '/api',
        version: '',
        private: ['__v'],
/*        preMiddleware: (req, res, next) => {
            const authMiddleware = new AuthMiddleware();
            authMiddleware.use(req, res, next)
        }*/
    });

    restify.serve(router, UserModel, {
        private: ['password', '__v']
    });

    //restify.serve(router, Post);
    //restify.serve(router, Comment);
}