const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/shelfspace")
.then(() => {
    console.log("Connected to the database");
})
.catch((error)=>{
    console.log("Error connecting to the database", error);
})