import {instanceMethod, InstanceType, pre, prop, Typegoose} from "typegoose";
import * as bcrypt from 'bcryptjs';

enum Role {
  ADMIN = 'admin',
  REGULAR = 'regular',
}

@pre<User>('save', async function (next) {
  try {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password.trim(), salt);
    next();
  } catch (e) {
    return next(e);
  }
})

export class User extends Typegoose {
  @prop({unique: true, required: true})
  username?: string;

  @prop({unique: true, required: true})
  email?: string;

  @prop()
  password?: string;

  @prop({enum: Role, default: Role.REGULAR})
  role?: string;

  @instanceMethod
  comparePassword(this: InstanceType<User>, candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
  }
}


export const UserModel = new User().getModelForClass(User);
