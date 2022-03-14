const { json } = require("express/lib/response");
const MoviesRepository = require("../repositories/MoviesRepository");
const req = require("express/lib/request");

const listAll = async (req, res, next) => {
  try {
    const movies = await MoviesRepository.listAll();
    res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const create = async (req, res, next) => {
  const {
    name,
    original_language,
    original_title,
    overview,
    release_date,
    trailer,
    genre,
  } = req.body;
  const poster = req.file.url;

  const data = {
    name,
    original_language,
    original_title,
    overview,
    release_date,
    trailer,
    genre,
    poster,
  };

  try {
    console.log(req.file);
    console.log(data);
    const hasData = data.name;

    if (hasData) {
      const movieCreated = await MoviesRepository.create(data);
      res.status(201).json({
        movie: movieCreated,
      });
    } else {
      res.status(400).json({ error: "O filme precisa de um nome" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports = {
  listAll,
  create,
};
