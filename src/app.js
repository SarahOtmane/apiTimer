const express = require('express')
const app = express()  
const port = 3000;

const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/apiTimer');

app.use(express.urlencoded());
app.use(express.json());

const userRoute = require('./routes/userRoute');
userRoute(app);

app.listen(port, () =>{
    console.log(`Example app listenning on port ${port}`);
})


