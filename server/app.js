const express = require('express');
const morgan = require('morgan');
// const cors = require('cors')


const todosRouter = require('./routes/v1/todos');
const authRouter = require('./routes/v1/auth');

const app = express();
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/todos', todosRouter);
app.use('/api/v1', authRouter);

app.all('*', (req, res) => {
    res.json({
        status: 'failure',
        message: 'wrong url'
    })
});

// const corsOptions = {
//     origin: 'http://localhost:5050'
// }
// app.use(cors());


app.use((err, req, res, next) => {
    console.log('global error handler');
    res.json(err);
});

module.exports = app;
