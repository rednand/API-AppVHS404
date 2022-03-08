const mongoose = require("mongoose");

const CommingSoonMovies = mongoose.model("CommingSoonMovies", {
  name: String,
  original_language: String,
  original_title: String,
  overview: String,
  release_date: Date,
  title: String,
  trailer: String,
  poster: String,
  genre: Object,
});

module.exports = CommingSoonMovies;
