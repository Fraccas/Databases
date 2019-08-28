import * as express from 'express';
import chirpsRouter from './chirps';
import db from '../db';

let router = express.Router();

router.use('/api/chirps', chirpsRouter);
// get all chirps
router.get('/api/chirpr', async(req, res) => {
    try {
        res.json(await db.Chirpr.getChirps());
    } catch(e) {
        console.log(e); 
        res.sendStatus(500);
    }
});
// get one chirp by id
router.get('/api/chirpr/:id', async (req, res) => {
    try {
        res.json((await db.Chirpr.getChirpById(req.params.id)));
    } catch (e) {
        console.log(e); 
        res.sendStatus(500);
    }
});
// get id of user by username
router.get('/api/chirpr/user/:username', async (req, res) => {
    try {
        res.json((await db.Chirpr.getIdByUsername(req.params.username))); 
    } catch (e) {
        console.log(e); 
        res.sendStatus(500);
    }
});
// add new user by username
router.get('/api/chirpr/user/add/:username', async (req, res) => {
    try {
        res.json((await db.Chirpr.storeNewUser(req.params.username)));
    } catch (e) {
        console.log(e); 
        res.sendStatus(500);
    }
});
// add new chirp
router.post('/api/chirpr/post/', async (req, res) => {
    try {
        res.json((await db.Chirpr.postChirp(req.body.UserID, req.body.ChirpText))); 
    } catch (e) {
        console.log(e); 
        res.sendStatus(500);
    }
});
// update one chirp by id
router.put('/api/chirpr/update/:id', async (req, res) => {
    try {
        res.json((await db.Chirpr.updateChirp(req.params.id, req.body.ChirpText)))[0]; // it's an array, but only one result 
    } catch (e) {
        console.log(e); 
        res.sendStatus(500);
    }
});
// remove chirp by id
router.delete('/api/chirpr/delete/:id', async (req, res) => {
    try {
        res.json(await db.Chirpr.deleteChirp(req.params.id)); 
    } catch (e) {
        console.log(e); 
        res.sendStatus(500);
    }
});
// get all mentions
router.get('/api/chirpr/mentions/:userid', async (req, res) => {
    try {
        res.json(await db.Chirpr.getMentions(req.params.userid));
    } catch (e) {
        console.log(e); 
        res.sendStatus(500);
    }
});
// post a mention
router.get('/api/chirpr/mentions/post/:userid/:chirpid', async (req, res) => {
    try {
        res.json(await db.Chirpr.postMention(req.params.userid, req.params.chirpid));
    } catch (e) {
        console.log(e); 
        res.sendStatus(500);
    }
});

export default router; 