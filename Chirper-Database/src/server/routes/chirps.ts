import * as express from 'express';
import * as chirpsStore from '../chirpstore';
import db from '../db';

let router = express.Router();

// display chirps: all, or one by id
router.get('/:id?', (req, res) => {
    let id: string = req.params.id;
    if(id) {
        res.json(db.Chirpr.getChirpById(id));
    } else {
        res.send(db.Chirpr.getChirps());
    }
});

// get id of user by username
router.get('/users/:username?', (req, res) => res.json(db.Chirpr.getIdByUsername(req.params.username)));

// store new user by username
router.get('/users/add/:username?', (req, res) => res.json(db.Chirpr.storeNewUser(req.params.username)));

// update chirp based on id
router.put('/update/:id?', (req, res) => {
    let id: string = req.params.id;
    if(id) {
        let newChirp = req.body;
        if (newChirp) {
            db.Chirpr.updateChirp(id, newChirp.ChirpText);
            res.sendStatus(200);
        }
        else res.sendStatus(500);
    } else {
        res.sendStatus(500);
    }
});

// delete chirp based on id
router.delete('/delete/:id?', (req, res) => {
    let id: string = req.params.id;
    if(id) {
        db.Chirpr.deleteChirp(id);
        res.sendStatus(200); 
    } else {
        res.sendStatus(500);
    }
});

// send new chirp
router.post('/post/', (req, res) => {
    db.Chirpr.postChirp(req.body.UserID, req.body.ChirpText);
    res.sendStatus(200);
});

export default router;