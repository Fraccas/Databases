import * as express from 'express';
import db from './db';

const router = express.Router();


router.get('/api/blogs', async (req, res) => {
    try {
        res.json(await db.Blogs.getBlogs());
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.get('/api/blog/alltags', async (req, res) => { 
    try {
        res.json(await db.Blogs.getAllTags()); 
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.get('/api/blog/:id', async (req, res) => {
    try {
        res.json(await db.Blogs.getBlogByID(req.params.id));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

// get author name by id
router.get('/api/author/name/:id', async (req, res) => {
    try {
        res.json(await db.Blogs.getAuthorById(req.params.id));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

// get author id by name
router.get('/api/author/:name', async (req, res) => {
    try {
        res.json(await db.Blogs.getAuthorByName(req.params.name));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.post('/api/author/new/:name', async (req, res) => {
    try {
        res.json(await db.Blogs.createAuthor(req.params.name));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});


router.post('/api/blog/post/:title/:content/:authorid/:tagid', async (req, res) => {
    try {
        // grab insertID and insert tag with this insertID into DB
        let insertID = await db.Blogs.postBlog(req.params.title, req.params.content, req.params.authorid);
        res.sendStatus(200);

        // Insert Tag info into DB
        try {
            res.json(await db.Blogs.postBlogTag(insertID.toString(), req.params.tagid));
        } catch (e) {

        }
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.put('/api/blog/update/:title/:content/:blogid', async (req, res) => {
    try {
        res.json(await db.Blogs.updateBlog(req.params.title, req.params.content, req.params.blogid));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.delete('/api/blog/delete/:blogid', async (req, res) => {
    try {
        res.json(await db.Blogs.deleteBlog(req.params.blogid));
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

router.get('/api/blog/tags/:id', async (req, res) => {
    try {
        res.json(await db.Blogs.getBlogTags(req.params.id)); 
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

export default router;