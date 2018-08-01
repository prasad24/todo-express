import express from 'express';
import * as todo from '../controllers/todo';

const router = express.Router();

router.get("/", (req, res) => {
    todo.getAll(req, res);
});

router.post("/", (req, res) => {
    todo.create(req, res);
});

export default router;