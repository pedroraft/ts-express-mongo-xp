import * as express from 'express';
import {AuthController} from "./user/auth.controller";
import {attachControllers} from "@decorators/express";
import setRestify from "./restify";

export default function setRoutes(app) {
  const router = express.Router();

  attachControllers(app, [
    AuthController
  ]);

  setRestify(router);
  app.use(router);
}
