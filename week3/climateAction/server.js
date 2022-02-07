//Dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//PORT
const PORT = 9000;

//Middleware
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/issueSchema');
  console.log("Connected to MongoDB");
}

//Routes
app.use('/issues', require('./routes/issueRouter.js'))

//Error Handling
app.use((err, req, res, next) => {
  console.log(err)
  return res.send({errMsg: err.message})
})

//Listener
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})