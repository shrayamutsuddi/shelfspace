require("./connection");
const express = require("express");
const methodOverride = require("method-override");
const app = express();
const path = require("path");
//
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//enabling static folder for css and js files
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

require("./routes/books")(app);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})



