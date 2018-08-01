import express from 'express';
import * as todo from '../controllers/todo';

const router = express.Router();

router.post("/", (req, res) => {
    todo.create(req, res);
});

export default router;