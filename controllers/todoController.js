import pool from '../lib/database';
import * as utils from '../lib/utils';

//Update todo by id
export const update = ((req, res) => {

    const {id} = req.params;
    const {message, completed, completeBy} = req.body;
    const todo = {};

    if(!id) {
        return res.status(400).json({error: true, message: 'Invalid id'});
    }

    if(!message && !completed && !completeBy) {
        return res.status(400).json({error:true, message: 'Invalid data'});
    }

    if(message !== "undefined") {
        if(message.trim() === '') {
            return res.status(400).json({error:true, message: 'Invalid message'});
        } else {
            todo.message = message;
        }
    }

    if(completed !== "undefined") {
        todo.completed = completed;
    }

    if(completeBy !== "undefined") {
        if(utils.isValidDate(completeBy)) {
            todo.completeBy = completeBy;
        } else {
            return res.status(400).json({error: true, message: 'Invalid completeBy date'});
        }
    }

    pool.query("update todo set ? where id = ?", [todo, id], (error, result, field) => {
            if(result.affectedRows === 0) {
                return res.status(400).json({error: true, message: 'Cannot find todo!'});
            }
            res.status(200).json({error: false});
    });
});

//remove todo by id
export const remove = ((req, res) => {

    const {id} = req.params;

    if(!id) {
        return res.status(400).json({error: true, message: 'Invalid id'});
    }

    pool.query("delete from todo where id = ?", id, (error, result, field) => {
            if(result.affectedRows === 0) {
                return res.status(400).json({error: true, message: 'Cannot find todo!'});
            }
            res.status(200).json({error: false});
    });
});

//Get todo by id
export const getById = ((req, res) => {

    const {id} = req.params;

    pool.query("select * from todo where id = ?", id, (error, result, field) => {
            res.status(200).json({error: false, data: result});
    });
});


//Get all todos.
export const getAll = ((req, res) => {
    pool.query("select * from todo", (error, result, field) => {
            res.status(200).json({error: false, data: result});
    });
});


//Add a new todo
export const create = ((req, res) => {

    const todo = req.body;

    if(!todo) {
        return res.status(400).json({error:true, message: 'Invalid data'});
    }

    if(!todo.message.trim()) {
        return res.status(400).json({error:true, message: 'Invalid message'});
    }

    //If complete is not provided, set it as false
    if(!todo.completed) {
        todo.completed = false;
    }

    pool.query("insert into todo SET ?", todo, (error, result, field) => {
            res.status(201).json({error: false, id: result.insertId});
    });
    //OR by creating a new connection
    // pool.getConnection((error, connection) => {
    //     if(error) {
    //         throw error;
    //     }
    //     connection.query("insert into todo SET ?", todo, (error, result, field) => {
    //         console.log(error, result, field);
    //         res.status(201).json({error: false, id: result.insertId});

    //         //release the connection
    //         connection.release();
    //     });
    // });
});
