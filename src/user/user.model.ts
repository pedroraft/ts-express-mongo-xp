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

UserSchema.pre('save', async (next) => {
    try {
        const user = this;
        if (!user.isModified('password')) return next();
        user.password = await bcrypt.hash(user.password.trim(), await bcrypt.genSalt(10));
        next();
    } catch (e) {
        return next(e);
    }
});

UserSchema.methods.comparePassword = (candidatePassword): boolean => {
    return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);

export default User;
