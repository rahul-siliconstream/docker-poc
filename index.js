const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://mongo:27017/myDb')
.then(()=>{
  console.log('.....Mongo db connected successfully.......');
})
.catch(()=>{
  console.log('......Error Occured.......');
})

app.get('/', (req, res) => {
  res.send('Hello Aman');
});

app.listen(3000);