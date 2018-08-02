import express from 'express';
import * as user from '../controllers/userController';

const router = express.Router();

//Add a new user
router.post('/', (req, res) => {
    user.create(req, res);
});

//Login user
router.post('/login', (req, res) => {
    user.login(req, res);
});


export default router;