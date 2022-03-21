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
  var x = new CommingSoonMovies();
  x.name = req.body.name;
  x.original_language = req.body.original_language;
  x.original_title = req.body.original_title;
  x.release_date = req.body.release_date;
  x.trailer = req.body.trailer;
  x.overview = req.body.overview;
  x.genre = req.body.genre;
  x.poster = req.file.url;
  x.save((err, doc) => {
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
      res
        .status(422)
        .json({ message: "O filme nao foi encontrado" });
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

routes.get("/total", Movie.listAll);
routes.post("/create", upload.single("poster"), Movie.create);
// routes.delete("/:id", Movie.delete);
module.exports = routes;
