const mongoose = require('mongoose');
const express = require('express');
const datas = require('./routes/data')
mongoose.connect('mongodb://localhost/viPoc').then(()=> console.log('connected to db')).catch(err => console.log(err));

const app = express();
app.use(express.static('public'))
app.use(express.json());
app.use('/api/data',datas);


const port = process.env.PORT || 2700;
app.listen(port, ()=> console.log(`listening on port ${port}`));