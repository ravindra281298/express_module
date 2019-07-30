const express =require('express');
const path=require('path');
const app =express();
// const moment=require('moment');
const logger=require('./middleware/logger');

// to serve the static file we have this one line command which will do the task
app.use(express.static(path.join(__dirname,'public')));

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/members',require('./routes/api/members'));

const port=3000;
const hostname='localhost';
app.listen(port,hostname,()=>{
    console.log(`running on http://${hostname}:${port}`);
});