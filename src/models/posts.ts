import { Post } from '../utils/types';
import { KV, paginate, read, write, remove } from 'worktop/kv';
import { uuid } from 'worktop/utils';

declare const POSTS: KV.Namespace;
const prefix = 'post::';

export async function find(id: string): Promise<Post | null> {
    const key = prefix + id;
    const body = await read<Post>(POSTS, key, { type: 'json' });
    if (body) {
        return {
            ...body,
        };
    }
    return null;
}

export async function list(limit = 10): Promise<string[]> {
    return await paginate<string[]>(POSTS, {
        prefix: prefix,
        limit: limit,
    });
}

export async function save(id: string, post: Post): Promise<boolean> {
    const key = prefix + id;
    return await write(POSTS, key, {
        id: post.id,
        username: post.username,
        title: post.title,
        content: post.content,
        upvotes: post.upvotes,
    });
}

export async function insert(post: Post): Promise<boolean> {
    const id = post.id ? post.id : uuid();
    return await save(id, post);
}

export async function update(id: string, post: Post): Promise<boolean> {
    return save(id, {
        id: post.id,
        username: post.username,
        title: post.title,
        content: post.content,
        upvotes: post.upvotes,
    });
}

export async function erase(id: string): Promise<boolean> {
    const key = prefix + id;
    return remove(POSTS, key);
}
