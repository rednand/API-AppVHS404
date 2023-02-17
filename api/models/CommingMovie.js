const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  original_language: String,
  original_title: String,
  overview: String,
  release_date: Date,
  trailer: String,
  castcrew: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "castcrew",
  },
  poster: {
    type: String,
    required: false,
    trim: true,
  },
  genre: new Array(),
});

module.exports = mongoose.model("commingsoonmovies", movieSchema);
