import * as restify from 'express-restify-mongoose';
import User from "./user/user.model";

export default function setRestify(router) {
    restify.defaults({
        prefix: '',
        version: '',
        private: ['__v']
    });

    restify.serve(router, User, {private:['password', '__v']});
}