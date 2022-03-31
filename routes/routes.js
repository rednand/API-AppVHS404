const express = require("express");
const routes = express.Router();
const CommingSoonMovies = require("../models/CommingMovies");
const Movie = require("../controllers/Movies");
const upload = require("../upload");

routes.get("/", (req, res) => {
  res.render("home");
});

routes.get("/total", Movie.listAll, (req, res) => {
  res.render("post");
});
routes.get("/user", async (req, res) => {
  CommingSoonMovies.find().then((doc) => {
    res.render("user", {
      item: doc,
    });
  });
});

routes.post("/post", upload.single("poster"), (req, res) => {
  console.log(req.file);
  var movie = new CommingSoonMovies();
  movie.name = req.body.name;
  movie.original_language = req.body.original_language;
  movie.original_title = req.body.original_title;
  movie.release_date = req.body.release_date;
  movie.trailer = req.body.trailer;
  movie.overview = req.body.overview;
  movie.genre = req.body.genre;
  movie.poster = req.file.url;
  movie.save((err, doc) => {
    if (!err) {
      console.log("salvo");
      res.redirect("/user");
    } else {
      console.log(err);
    }
  });
});

routes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movies = await CommingSoonMovies.findOne({ _id: id });
    if (!movies) {
      res.status(422).json({ message: "O filme nao foi encontrado" });
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

  const dados = Object.assign({}, movies, { _id: id });

  try {
    const updatedMovies = await CommingSoonMovies.updateOne({ _id: id }, dados);
    if (updatedMovies.matchedCount === 0) {
      res.status(422).json({ message: "O filme nao foi encontrado" });
      return;
    }
    res.status(200).json({ message: "update", movies });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
routes.use(function (req, res, next) {
  // this middleware will call for each requested
  // and we checked for the requested query properties
  // if _method was existed
  // then we know, clients need to call DELETE request instead
  if (req.query._method == "DELETE") {
    // change the original METHOD
    // into DELETE method
    req.method = "DELETE";
    // and set requested url to /delete/:id
    req.url = req.path;
  }
  next();
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
    res.status(200).json({ message: "Filme removido" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.get("/total", Movie.listAll);
routes.post("/create", upload.single("poster"), Movie.create);
// routes.delete("/:id", Movie.delete);
module.exports = routes;
