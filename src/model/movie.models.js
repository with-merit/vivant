const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    moviename:{type:String, required:true},
    category:{type:String, required:true},
    actors:[{type:mongoose.Schema.Types.ObjectId, ref:"userModel"}]
})

const movie = mongoose.model("movieModel", movieSchema);

module.exports = movie;