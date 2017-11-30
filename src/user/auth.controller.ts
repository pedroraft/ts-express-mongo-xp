import {Body, Controller, Get, Post, Response} from "@decorators/express";
import {Injectable} from '@decorators/di';
import User from "./user.model";
import * as jwt from 'jsonwebtoken';
import AuthMiddleware from "../middleware/auth.middleware";

@Controller('/api')
@Injectable()
export class AuthController {

    @Post('/auth')
    async login(@Response() res, @Body('email') email: string, @Body('password')  password: string) {
        const user = await User.findOne({email: email});
        if (!user || !await user.comparePassword(password)) {
            return res.sendStatus(403);
        }
        const token = jwt.sign({user: user}, process.env.SECRET_TOKEN);
        res.status(200).json({token: token});
    }

    // just check if token is valid
    @Get('/auth', [AuthMiddleware])
    checkAuth(@Response() res) {
        res.status(200).json();
    }
}
