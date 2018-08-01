import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import dbConnection from './lib/database';

//create an express instance
const app = express();

//Set the dotenv config
app.set(dotenv.config());

//set the listening PORT
const PORT = process.env.PORT || 5000; //default port 5000

app.get("/", (req, res) => {
    res.json({app: "ToDo app"});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
