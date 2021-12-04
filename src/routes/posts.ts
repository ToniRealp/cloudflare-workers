import { ServerRequest } from 'worktop/request';
import { ServerResponse } from 'worktop/response';
import { Post } from '../utils/types';
import { erase, find, insert, list, update } from '../models/posts';

export async function getPost(
    req: ServerRequest,
    res: ServerResponse
): Promise<void> {
    const post = await find(req.params.postId);
    res.setHeader('Content-Type', 'application/json');
    if (post) {
        res.send(200, post);
    } else {
        res.send(404, { error: 'Not found' });
    }
}

export async function getPosts(
    req: ServerRequest,
    res: ServerResponse
): Promise<void> {
    const keys = await list();

    if (!keys) {
        res.send(500, { error: 'Something went wrong' });
        return;
    }
    const posts = await Promise.all(
        keys.map((key) => find(key.replace('post::', '')))
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    const filteredPosts = posts.filter(Boolean);

    if (filteredPosts) {
        res.send(200, filteredPosts);
    } else {
        res.send(404, { error: 'Not found' });
    }
}

export async function postPost(
    req: ServerRequest,
    res: ServerResponse
): Promise<void> {
    const post = await req.body.json<Post>();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!post) {
        res.send(400, { error: 'Bad request' });
        return;
    }

    const success = await insert(post);

    if (success) res.send(201, 'Success');
    else res.send(400, 'Bad request');
}

export async function putPost(
    req: ServerRequest,
    res: ServerResponse
): Promise<void> {
    const id = req.params.postId;
    const post = await req.body.json<Post>();
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (!post) {
        res.send(400, { error: 'Bad request' });
        return;
    }
    const success = await update(id, post);

    if (success) res.send(201, 'Success');
    else res.send(400, 'Bad request');
}

export async function getOptions(
    req: ServerRequest,
    res: ServerResponse
): Promise<void> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', 3600);
    res.send(200);
}

export async function deletePost(
    req: ServerRequest,
    res: ServerResponse
): Promise<void> {
    const success = await erase(req.params.postId);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (success) {
        res.send(200, 'Success');
    } else {
        res.send(500, { error: 'Something went wrong' });
    }
}
