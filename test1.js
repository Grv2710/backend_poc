const express = require('express');
const helmet = require("helmet")
const morgan = require("morgan")
const app = express();
const config = require("config")
const users = require("./routes/users")
const home = require("./routes/home")
app.set("view engine", "pug");
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));
app.use(morgan("tiny"))
app.use(helmet())
app.use("/", home)
app.use("/api/users", users)
console.log(config.get("name"))

const port = process.env.PORT || 2701;
app.listen(port, ()=> console.log(`listening on port ${port}...`))