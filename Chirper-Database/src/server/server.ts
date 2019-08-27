import * as express from 'express';
import apiRouter from './routes/routes';
import * as path from 'path';

const app = express();

let p = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.static(p));
app.use(apiRouter);


app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`CHIRPER: Server listening on port: ${port}`));









