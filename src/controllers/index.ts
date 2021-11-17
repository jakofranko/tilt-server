import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
    res.render('index', { title: 'Tilt Data Server' });
});

export default router;
