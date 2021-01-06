const express = require('express');
const connectDB = require('./MongoseDB/mongoDB');

const app = express();
connectDB();

// declare varible
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', '*');
    next();
});
// define router
app.use('/post', require('./router/api/post'));

// start server
const server = app.listen(
    PORT,
    () => console.log(`Served on the port ${PORT}...`)
)