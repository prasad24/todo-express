import pool from '../lib/database';

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
        return res.status(404).json({error: 'message has not been provided'});
    }

    if(!todo.message.trim()) {
        return res.status(404).json({error: 'message is required'});
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
