import express from 'express';
import * as todo from '../controllers/todoController';

const router = express.Router();

router.get("/:id", (req, res) => {
    todo.getById(req, res);
});

router.get("/", (req, res) => {
    todo.getAll(req, res);
});

router.post("/", (req, res) => {
    todo.create(req, res);
});

router.delete("/:id", (req, res) => {
    todo.remove(req, res);
});

export default router;