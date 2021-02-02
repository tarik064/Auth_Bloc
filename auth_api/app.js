const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://tariq064:' + process.env.MONGODB_PW + '@test-cluster1.dmf3o.mongodb.net/authentication?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
})



app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accep, Authorization");

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Method", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/api/user', userRoutes);

app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;