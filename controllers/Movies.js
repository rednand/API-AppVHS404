const { json } = require("express/lib/response");
const MoviesRepository = require("../repositories/MoviesRepository");

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
  console.log(poster);
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
    const hasData = data.name;

    if (hasData) {
      const movies = await MoviesRepository.create(data);
      res.status(201).json({
        movies,
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
