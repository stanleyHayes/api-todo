const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
require("dotenv").config();

const TodosRoute = require("./routes/Todos");
const UsersRoute = require("./routes/Users");

const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(function () {
    console.log("Connected successfully to MongoDB");
}).catch(function (error) {
    console.log(`Error: ${error.message}`);
});

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/v1/users", UsersRoute);
app.use("/api/v1/todos", TodosRoute);


app.listen(process.env.PORT, function () {
    console.log(`Server connected on PORT ${process.env.PORT}`);
});