import {pre, prop, Ref, Typegoose} from "typegoose";
import {User} from "../user/user.model";

@pre<Post>('save', async function (next) {
  try {
    const post = this;
    if (!post.isModified('title')) return next();
    post.slug = post.title.toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/--+/g, '-')           // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text;
    next();
  } catch (e) {
    return next(e);
  }
})

export class Post extends Typegoose {
  @prop({unique: true, required: true})
  title?: string;

  @prop({unique: true})
  slug?: string;

  @prop({ref: User, required: true })
  author?: Ref<User>;

  @prop({required: true})
  content?: string;
}

export const PostModel = new Post().getModelForClass(Post);
