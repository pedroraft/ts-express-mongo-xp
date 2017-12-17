/*
import * as mongoose from 'mongoose';
import {Document, Model, model} from 'mongoose';

interface CommentInterface {
    conteudo?: string;
}

interface AuthorInterface {
    name?: string;
    position?: string;
}

interface PostInterface {
    name?: string;
    author?: AuthorInterface;
    comments?: Comment[];
}

export interface CommentModel extends CommentInterface, Document {}
export interface PostModel extends PostInterface, Document {}

const PostSchema = new mongoose.Schema({
    name: String,
    author: {name: String, position: String},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

const CommentSchema = new mongoose.Schema({
    conteudo: String,
});

export const Post: Model<PostModel> = mongoose.model<PostModel>('Post', PostSchema);

export const Comment: Model<CommentModel> = mongoose.model<CommentModel>('Comment', CommentSchema);*/
