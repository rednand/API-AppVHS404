const CommingSoonMovies = require("../models/CommingMovie");

const listAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 30 } = req.query;
    const movies = await CommingSoonMovies.find()
      .populate("castcrew")
      .limit(limit * 1)
      .skip((page - 1) * limit);
    console.log("total movies:", movies.length);
    res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

const listMovieTable = async (req, res) => {
  try {
    CommingSoonMovies.find().then((doc) => {
      res.render("../src/views/table", {
        item: doc,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

const listMovieTablebyId = async (req, res) => {
  const id = req.params.id;
  try {
    await CommingSoonMovies.findOne({ _id: id }).then((movie) => {
      res.render("../src/views/editform", {
        movies: movie,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

const GetMovieById = async (req, res) => {
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
};

const CreateMovie = async (req, res) => {
  try {
    var movie = new CommingSoonMovies();
    movie.name = req.body.name;
    movie.original_language = req.body.original_language;
    movie.original_title = req.body.original_title;
    movie.release_date = req.body.release_date;
    movie.trailer = req.body.trailer;
    movie.overview = req.body.overview;
    movie.genre = req.body.genre;
    movie.poster = req.body.poster;
    movie.save((err, doc) => {
      if (!err) {
        console.log("salvo");
        res.redirect("table");
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    res.status(500).json({
      message: `${err.message} - falha ao cadastrar filme`,
    });
  }
};

const DeleteMovie = async (req, res) => {
  const id = req.params.id;
  const movies = await CommingSoonMovies.findOne({ _id: id });
  if (!movies) {
    res.status(422).json({ message: "O filme nao foi encontrado" });
    return;
  }
  try {
    await CommingSoonMovies.deleteOne({ _id: id });
    res.redirect("exclu");
    // res.status(200).json({ message: "Filme removido" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const EditMovie = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    original_language,
    original_title,
    overview,
    release_date,
    trailer,
    genre,
    poster,
  } = req.body;
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
};

module.exports = {
  listAll,
  listMovieTable,
  GetMovieById,
  CreateMovie,
  EditMovie,
  DeleteMovie,
  listMovieTablebyId,
};
