import * as express from 'express';
import * as chirpsStore from '../chirpstore';

let router = express.Router();

// display chirps: all, or one by id
router.get('/:id?', (req, res) => {
    let id: string = req.params.id;
    if(id) {
        res.json(chirpsStore.GetChirp(id));
    } else {
        res.send(chirpsStore.GetChirps());
    }
});

// update chirp based on id
router.put('/update/:id?', (req, res) => {
    let id: string = req.params.id;
    if(id) {
        let newChirp = req.body;
        if (newChirp) {
            chirpsStore.UpdateChirp(id, newChirp);
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
        chirpsStore.DeleteChirp(id);
        res.sendStatus(200); 
    } else {
        res.sendStatus(500);
    }
});

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    console.log(req.body);
    res.sendStatus(200);
});

export default router;