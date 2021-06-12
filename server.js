const express = require('express');
require('dotenv').config();
const db = require('./models');
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello world!')
})

db.sequelize.sync()
.then(() => {
  console.log('Connect to database successfully !');
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
  })
})
.catch(err => {
  console.log(err);
})