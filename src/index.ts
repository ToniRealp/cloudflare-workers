import { Router } from 'worktop';
import * as Cache from 'worktop/cache';
import {
    getPost,
    getPosts,
    postPost,
    putPost,
    getOptions,
    deletePost,
} from './routes/posts';

const API = new Router();

API.add('GET', '/posts', getPosts);
API.add('GET', '/posts/:postId', getPost);
API.add('POST', '/posts', postPost);
API.add('PUT', '/posts/:postId', putPost);
API.add('DELETE', '/posts/:postId', deletePost);
API.add('OPTIONS', '*', getOptions);

Cache.listen(API.run);
