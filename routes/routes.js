const express = require("express");
const { route } = require("express/lib/application");
const req = require("express/lib/request");
const routes = express.Router();
const CommingSoonMovies = require("../models/CommingMovies");

routes.post("/movies", async (req, res) => {
  const {
    name,
    original_language,
    original_title,
    overview,
    release_date,
    title,
    trailer,
    poster,
    genre,
  } = req.body;
  const movies = {
    name,
    original_language,
    original_title,
    overview,
    release_date,
    title,
    trailer,
    poster,
    genre,
  };
  try {
    await CommingSoonMovies.create(movies);
    res.status(201).json({ message: "inserido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.get("/", async (req, res) => {
  try {
    const movies = await CommingSoonMovies.find();
    res.status(200).json({ message: "get All", movies });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

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

routes.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    name,
    original_language,
    original_title,
    overview,
    release_date,
    title,
    trailer,
    poster,
    genre,
  } = req.body;
  const movies = {
    name,
    original_language,
    original_title,
    overview,
    release_date,
    title,
    trailer,
    poster,
    genre,
  };
  try {
    const updatedMovies = await CommingSoonMovies.updateOne({ _id: id }, movies);
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

module.exports = routes;