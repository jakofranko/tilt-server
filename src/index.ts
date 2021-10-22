import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(bodyParser.raw());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/tilt-data', (req, res) => {
    // tslint:disable-next-line:no-console
    console.log('Headers:', req.headers);
    // tslint:disable-next-line:no-console
    console.log('Body:', req.body);
    res.send(`Data recieved: ${req.body}`);
});

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
