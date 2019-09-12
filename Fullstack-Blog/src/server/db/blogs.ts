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
        Connection.query('SELECT * FROM blogs WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const getAuthorByName = async (name: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('SELECT id FROM authors WHERE name = ?', [name], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const getAuthorById = async (id: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('SELECT name FROM authors WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const createAuthor = async (name: string) => {
    return new Promise((resolve, reject) => {
        let email = name + '@blog.com';
        Connection.query('INSERT INTO authors (name, email) VALUES (?, ?)', [name, email], (err, results) => {
            if (err) return reject(err);
            resolve(results.insertId);
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

export const getAllTags = async () => {
    return new Promise((resolve, reject) => {
        console.log('grabbing tags');
        Connection.query('SELECT id, name FROM tags', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}


export default {
    getBlogs, getBlogByID,
    postBlog, updateBlog, deleteBlog,
    getBlogTags, postBlogTag, getAllTags,
    getAuthorByName, getAuthorById, createAuthor
}