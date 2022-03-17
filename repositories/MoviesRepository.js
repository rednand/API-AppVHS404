const mongoose = require("mongoose");
const Movie = mongoose.model("CommingSoonMovies");

module.exports = {
  async listAll() {
    Movie.find().then((filmes) => {
      console.log(`Total de filmes: ${filmes.length}`);
    });
    const movies = await Movie.find();
    return movies;
  },
  async create(data) {
    const movie = new Movie(data);
    return await movie.save();
  },
};
