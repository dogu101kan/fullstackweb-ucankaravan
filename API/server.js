const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const routers = require("./routers/index"); // middleware eklendi
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");


// Environment Variables

dotenv.config({
    path:"./config/env/config.env"
});

//MongoDb Connection
connectDatabase();

const app = express();
let cors = require("cors");
app.use(cors());

// Express - Json middleware
app.use(express.json());

const PORT = process.env.PORT;

// Routers Middleware
app.use("/api", routers);


// Error Handler
app.use(customErrorHandler);

// Static files

app.use(express.static(path.join(__dirname, "public")));



app.listen(PORT, () => {
    console.log(`API started on ${PORT}`)
})
