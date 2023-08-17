const express = require("express");
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json());
app.use(cookieParser)

//Route Imports
const product = require("./routes/productRoute");
app.use("/api/v1", product);
const user = require('./routes/userRoutes')
app.use("/api/v1",user)

//middleware for error
app.use(errorMiddleware);

module.exports = app;
