import {Body, Controller, Get, Post, Response} from "@decorators/express";
import {Injectable} from '@decorators/di';
import {UserModel} from "./user.model";
import * as jwt from 'jsonwebtoken';
import AuthMiddleware from "../middleware/auth.middleware";

@Controller('/api/auth')
@Injectable()
export class AuthController {

  @Post('')
  async login(@Response() res, @Body('email') email: string, @Body('password')  password: string) {
    const user = await UserModel.findOne({email: email});
    if (!user || !user.comparePassword(password)) {
      return res.sendStatus(403);
    }
    const token = jwt.sign({user: user}, process.env.SECRET_TOKEN);
    res.status(200).json({token: token});
  }

  // just check if token is valid
  @Get('', [AuthMiddleware])
  checkAuth(@Response() res) {
    res.status(200).json();
  }
}
