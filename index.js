const mongoose = require('mongoose');
const express = require('express');
const datas = require('./routes/data')

const mongoURI = process.env.MONGO_URI || "mongodb+srv://onixevo27:19Lcm5dRsZXh1eIC@cluster0.fs43oks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log('connected to db')).catch(err => console.log(err));

const app = express();
app.use(express.static('public'))
app.use(express.json());
app.use('/api/data',datas);


const port = process.env.PORT || 2700;
app.listen(port, ()=> console.log(`listening on port ${port}`));
