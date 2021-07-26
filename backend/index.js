import apiRoutes from './src/routes/routes';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

let app = express();
app.use(cors());
dotenv.config();
// Import routes
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Heroku Mongoose connection
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });

var db = mongoose.connection;

// Added check for DB connection

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Server running on port " + port);
});