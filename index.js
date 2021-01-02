const express = require('express');
const connectDB = require('./MongoseDB/mongoDB');

const app = express();
connectDB();

// declare varible
const PORT = process.env.PORT || 5000;

app.use(express.json());

// define router
app.use('/post', require('./router/api/getPOST'));

// start server
const server = app.listen(
    PORT,
    () => console.log(`Served on the port ${PORT}...`)
)