const { process_params } = require("express/lib/router");
const mongoose = require("mongoose");
const { param } = require("../routes/routes");
const Movie = mongoose.model("CommingSoonMovies");

module.exports = {
  async listAll() {
    const movies = await Movie.find(
      {},
      "name original_language original_title overview release_date trailer poster genre"
    );
    return movies;
  },
  async create(data) {
    const movie = new Movie(data);
    return await movie.save();
  },
};
