import * as express from 'express';
import db from './db';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/blogs', async (req, res) => {
    try {
        let blogs = await db.Blogs.all();
        res.json(blogs);
    } catch (e) {
        res.sendStatus(500);
        console.log(e);
    }
});

export default router;