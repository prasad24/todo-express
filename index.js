import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import todoRoutes from './Routes/todoRoutes';
import userRoutes from './Routes/userRoutes';
import validateToken from './middlewares/validateToken';

//create an express instance
const app = express();

//Set the dotenv config
app.set(dotenv.config());

//Set bodyParser
app.use(bodyParser.json());

//set the listening PORT
const PORT = process.env.PORT || 5000; //default port 5000

//Validate Auth Token middleware
app.use(validateToken);

//Routes
app.use('/api/todo', todoRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
