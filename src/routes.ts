import * as express from 'express';
import {AuthController} from "./user/auth.controller";
import {attachControllers} from "@decorators/express";
import {Restify} from "./restify";

export class Routes {
  static setRoutes(app: express.Express) {
    const router = express.Router();

    attachControllers(app, [
      AuthController
    ]);

    Restify.setRestify(router);
    app.use(router);
  }
}
