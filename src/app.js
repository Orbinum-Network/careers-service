const express = require('express');
const cors = require('cors');
const validateRequest = require('./middlewares/validateRequest');
const routes = require("./routes");

const app = express();

app.use(cors())
app.use(validateRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/careers', routes)

module.exports = app;