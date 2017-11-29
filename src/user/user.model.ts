import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import {Document, Model, model} from 'mongoose';

export interface IUser {
    username?: string;
    email?: string;
    password?: string;
    role?: string;
}

export interface IUserModel extends IUser, Document {
    comparePassword(candidatePassword: string): boolean;
}

const UserSchema = new mongoose.Schema({
    username: String,
    email: {type: String, unique: true, lowercase: true, trim: true},
    password: String,
    role: String
});

// Before saving the user, hash the password
UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword): boolean {
    return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);

export default User;
