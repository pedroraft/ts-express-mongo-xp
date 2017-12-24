import * as restify from 'express-restify-mongoose';
import {UserModel} from "./user/user.model";
import AuthMiddleware from "./middleware/auth.middleware";
import {PostModel} from "./post/post.model";

export class Restify {
  static setRestify(router) {
    restify.defaults({
      prefix: '/api',
      version: '',
      private: ['__v'],
      preMiddleware: (req, res, next) => new AuthMiddleware().use(req, res, next)
    });

    restify.serve(router, UserModel, {
      private: ['password', '__v']
    });

    restify.serve(router, PostModel);
  }
}
