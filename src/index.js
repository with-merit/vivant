const express = require("express");
const app = express();
const connect = require("./configure/db");
const usercontroller = require("./controller/user.controller");
const moviecontroller = require("./controller/movie.controller");

app.use(express.json());
require("dotenv");

const port = process.env.PORT || 8080;

app.use("/user", usercontroller);
app.use("/movie", moviecontroller);

app.listen(port, async()=>{
    try {
        await connect();
        console.log(`listening on port ${port}`);
    } catch (error) {
        console.log({error: error.message})
    }
}) 