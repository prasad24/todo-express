import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import todoRoutes from './Routes/todoRoutes';

//create an express instance
const app = express();

//Set the dotenv config
app.set(dotenv.config());

//Set bodyParser
app.use(bodyParser.json());

//set the listening PORT
const PORT = process.env.PORT || 5000; //default port 5000

//Routes
app.use('/api/todo', todoRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
