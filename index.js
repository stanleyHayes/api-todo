const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const app = express();

//I just made myself a coffee


app.listen(process.env.PORT,function () {
    console.log(`Server connected on PORT ${process.env.PORT}`);
});