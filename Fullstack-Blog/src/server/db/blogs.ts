import { Connection } from './index';

export const getBlogs= async () => {
    return new Promise((resolve, reject) => {
        Connection.query('SELECT * FROM blogs', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const getBlogByID = async (id: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('SELECT * FROM blogs WHERE ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const postBlog = async (title: string, content: string, authorid: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('INSERT INTO blogs (title, content, authorid) VALUES (?, ?, ?)', [title, content, authorid], (err, results) => {
            if (err) return reject(err);
            resolve(results.insertId);
        });
    });
}

export const updateBlog = async (title: string, content: string, blogid: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, blogid], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const deleteBlog = async (blogid: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('DELETE FROM blogs WHERE id = ?', [blogid], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

// GET all Blogtags for a blogid
export const getBlogTags = async (blogid: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('CALL spBlogTags(?)', [blogid], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const postBlogTag = async (blogid: string, tagid: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('INSERT INTO blogtags (blogid, tagid) VALUES (?, ?)', [blogid, tagid], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}


export default {
    getBlogs, getBlogByID,
    postBlog, updateBlog, deleteBlog,
    getBlogTags, postBlogTag
}