import mysql from  'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

connection.connect((error) => {
    if(error) {
        console.error('Error connecting to mysql: ' + error);
        return;
    }

    //Connection is valid
    console.log('Connected to Mysql', connection.threadId);

});

module.exports = connection;