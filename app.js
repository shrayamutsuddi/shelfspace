require("./connection");

const express = require("express");
const methodOverride = require("method-override");
const { default: mongoose } = require("mongoose");
const app = express();
const path = require("path");
require("dotenv").config();
const connectDB = require("./connection");
const PORT = process.env.PORT || 3000;
connectDB();
//
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//enabling static folder for css and js files
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

require("./routes/books")(app);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})



