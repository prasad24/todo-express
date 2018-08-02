import pool from '../lib/database';
import * as utils from '../lib/utils';
import * as responseStatus from '../lib/responseStatus';
import uuid from 'uuid/v1';

//Update todo by id
export const update = ((req, res) => {

    const {id} = req.params;
    const {message, completed, completeBy} = req.body;
    const {user} = req;
    const todo = {};

    if(!id) {
        return responseStatus.sendError(res, 'Invalid id');
    }

    if(!message && !completed && !completeBy) {
        return responseStatus.sendError(res, 'Invalid data');
    }

    if(message !== "undefined") {
        if(message.trim() === '') {
            return responseStatus.sendError(res, 'Invalid message');
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
            return responseStatus.sendError(res, 'Invalid completeBy date');
        }
    }

    todo.dateUpdated = new Date();

    pool.query("update todo set ? where uuid = ? and userUUID=?", [todo, id, user.uuid], (error, result, field) => {
        if(error) {
            console.log(`error updating todo {id}`, error);
            return responseStatus.sendError(res, 'Unable to update todo', 500);
        }

        if(result.affectedRows === 0) {
            return responseStatus.sendError(res, 'Cannot find todo');
        }
        res.status(200).json({error: false});
    });
});

//remove todo by id
export const remove = ((req, res) => {

    const {id} = req.params;
    const {user} = req;

    if(!id) {
        return responseStatus.sendError(res, 'Invalid id');
    }

    pool.query("delete from todo where uuid = ? and userUUID=?", [id, user.uuid], (error, result, field) => {
        if(error) {
            console.log(`error deleting todo {id}`, error);
            return responseStatus.sendError(res, 'Unable to delete todo', 500);
        }

        if(result.affectedRows === 0) {
            return responseStatus.sendError(res, 'Cannot find todo');
        }
        res.status(200).json({error: false});
    });
});

//Get todo by id
export const getById = ((req, res) => {

    const {id} = req.params;
    const {user} = req;

    console.log(id, user.uuid);

    pool.query("select * from todo where uuid = ? and userUUID=?", [id, user.uuid], (error, result, field) => {
        if(error) {
            console.log(`error getting todo {id}`, error);
            return responseStatus.sendError(res, 'Unable to get todo', 500);
        }
        const processedResult = result.map(todo => {
            delete todo.id;
            delete todo.userUUID;
            todo.completed = todo.completed ? true : false;
            return todo;
        })
        res.status(200).json({error: false, data: processedResult});
    });
});


//Get all todos.
export const getAll = ((req, res) => {
    const {user} = req;
    pool.query("select * from todo where userUUID=?", user.uuid, (error, result, field) => {
        if(error) {
            console.log(`error getting all todos`, error);
            return responseStatus.sendError(res, 'Unable to get todo', 500);
        }
        //remove the id from the result
        const processedResult = result.map(todo => {
            delete todo.id;
            delete todo.userUUID;
            todo.completed = todo.completed ? true : false;
            return todo;
        })
        res.status(200).json({error: false, data: processedResult});
    });
});


//Add a new todo
export const create = ((req, res) => {

    const todo = req.body;
    const {user} = req;

    if(!todo) {
        return responseStatus.sendError(res, 'Invalid data');
    }

    if(!todo.message.trim()) {
        return responseStatus.sendError(res, 'Invalid message');
    }

    //If complete is not provided, set it as false
    if(!todo.completed) {
        todo.completed = false;
    }

    //Generate a uuid for the todo
    todo.uuid = uuid();

    //Add user uuid to todo
    todo.userUUID = user.uuid;

    pool.query("insert into todo SET ?", todo, (error, result, field) => {
        if(error) {
            console.log(`error inserting todo`, error);
            return responseStatus.sendError(res, 'Unable to add todo', 500);
        }

        res.status(201).json({error: false, id: todo.uuid});
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
