import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import validator from 'validator';
import * as utils from '../lib/utils';
import pool from '../lib/database';
import uuid from 'uuid/v1';

import * as responseStatus from '../lib/responseStatus';

//create user
export const create = ((req, res) => {
    let {email, password} = req.body;

    email = email ? email.trim(): '';
    password = password ? password.trim() : '';

    //Validate Email
    if(!validator.isEmail(email)) {
        return responseStatus.sendError(res, 'Invalid email');
    }

    //Validate Password
    if(validator.isEmpty(password) || !utils.isValidPasswordPattern(password)) {
        return responseStatus.sendError(res, 'Invalid password. Should be at least 8 characters long with 1 uppercase, 1 lowercase, 1 digit and 1 special character');
    }

    const passwordHash = utils.getPasswordHash(password);

    const user = {
        uuid: uuid(),
        email,
        passwordHash
    }

    //Add the user to the database
    pool.getConnection((error, connection) => {
            connection.query('select * from users where email = ?', user.email, (error, results, fields) => {
            if(results.length > 0) {
                //Release the connection back to the pool
                connection.release();
                return responseStatus.sendError(res, 'Email already registered. Please login');
            } else {
                connection.query('insert into users SET ?', user, (error, results, fields) => {
                    if(error) {
                        //Release the connection back to the pool
                        connection.release();

                        console.log('Error creating user', error);
                        return responseStatus.sendError(res, 'Error creating user', 500);
                    }

                    //Release the connection back to the pool
                    connection.release();
                    res.json({error: false, user: { id: results.insertId }});
                });
            }
        });
    });
});