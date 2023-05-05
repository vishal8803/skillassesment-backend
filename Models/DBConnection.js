const mongoose = require('mongoose');
const {DB_URI} = require("../helpers/env") 

mongoose.set('strictQuery', false);
mongoose.connect(DB_URI).then(function(db){
    console.log("DB Connected...");
}).catch(function(err){
    console.log("Error Encountered");
})

module.exports = mongoose;