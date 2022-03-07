const express = require("express");
const routes = express.Router();
const filmes = require("../src/data/movies.json");

routes.get("/", (req, res) => {
  return res.json({ message: "Hello express", filmes });
});

routes.post("/addMovies", (req, res) => {
  const body = req.body;
  if (!body) return res.status(400).end();
  filmes.push(body);
  return res.json(filmes);
});

routes.delete("/:id", (req, res) => {
  const id = req.params.id;
  let newDB = filmes.filter((item) => {
    if (!item.id) return item;
  });

  filmes = newDB;

  return res.send(newDB);
});

module.exports = routes;
