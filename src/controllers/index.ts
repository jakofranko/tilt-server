import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
    res.render('index', {
        title: 'Hello World',
        data: [
            {
                date: new Date('1990'),
                value: 10
            },
            {
                date: new Date('1991'),
                value: 15
            },
            {
                date: new Date('1992'),
                value: 20
            },
            {
                date: new Date('1993'),
                value: 25
            },
            {
                date: new Date('1994'),
                value: -15
            },
            {
                date: new Date('1989'),
                value: -5
            },
            {
                date: new Date('1982'),
                value: 24
            },
            {
                date: new Date('1995'),
                value: 29
            }
        ]
    });
});

export default router;
