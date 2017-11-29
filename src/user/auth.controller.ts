import {Body, Controller, Post, Response} from "@decorators/express";
import {Injectable} from '@decorators/di';
import User from "./user.model";
import * as jwt from 'jsonwebtoken';

@Controller('/api')
@Injectable()
export class AuthController {

    @Post('/auth')
    async post(@Response() res, @Body('email') email: string, @Body('password')  password: string) {
        const user = await User.findOne({email: email});
        if (!user || !await user.comparePassword(password)) {
            return res.sendStatus(403);
        }
        const token = jwt.sign({user: user}, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({token: token});
    }
}
