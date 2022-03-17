const express = require("express");
const { route } = require("express/lib/application");
const req = require("express/lib/request");
const routes = express.Router();
const CommingSoonMovies = require("../models/CommingMovies");
const Movie = require("../controllers/Movies");
const upload = require("../upload");
const MoviesRepository = require("../repositories/MoviesRepository");
const multer = require("multer");

routes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movies = await CommingSoonMovies.findOne({ _id: id });
    if (!movies) {
      res.status(422).json({ message: "O usuario nao foi encontrado" });
      return;
    }
    res.status(200).json({ message: "get id", movies });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.patch("/:id", upload.single("poster"), async (req, res, next) => {
  const id = req.params.id;
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

  const movies = {
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
    const updatedMovies = await CommingSoonMovies.updateOne(
      { _id: id },
      movies
    );
    if (updatedMovies.matchedCount === 0) {
      res
        .status(422)
        .json({ message: "O usuario nao foi encontrado para edição" });
      return;
    }
    res.status(200).json({ message: "update", movies });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const movies = await CommingSoonMovies.findOne({ _id: id });
  if (!movies) {
    res.status(422).json({ message: "O usuario nao foi encontrado" });
    return;
  }
  try {
    await CommingSoonMovies.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuario removido" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.get("/", Movie.listAll);
routes.post("/create", upload.single("poster"), Movie.create);
// routes.delete("/:id", Movie.delete);
module.exports = routes;
