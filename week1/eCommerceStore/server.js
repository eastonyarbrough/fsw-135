// Dependencies and PORT
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose')

const PORT = 9000;

// Middleware (used for every request)
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inventorydb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to the database")
)

// Routes
app.use("/inventory", require("./routes/inventoryRouter.js"))

// Error Handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).send({errMsg: err.message})
})

// Listener
app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
})