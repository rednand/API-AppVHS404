const Castcrew = require("../models/CastCrew");

const Deletecastcrew = async (req, res) => {
  const id = req.params.id;
  const castcrew = await Castcrew.findOne({ _id: id });
  if (!castcrew) {
    res.status(422).json({ message: "O elenco nao foi encontrado" });
    return;
  }
  try {
    await Castcrew.deleteOne({ _id: id });
    res.redirect("http://localhost:3000/castdelete");
    // res.status(200).json({ message: "Filme removido" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const Editcastcrew = async (req, res, next) => {
  const id = req.params.id;
  const { cast, writer, director, producers } = req.body;
  const castcrew = {
    cast,
    writer,
    director,
    producers,
  };

  const dados = Object.assign({}, castcrew, { _id: id });

  try {
    const updatedcastcrew = await Castcrew.updateOne({ _id: id }, dados);
    if (updatedcastcrew.matchedCount === 0) {
      res.status(422).json({ message: "O filme nao foi encontrado" });
      return;
    }
    res.status(200).json({ message: "update", movies: castcrew });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const GetcastcrewById = async (req, res) => {
  const id = req.params.id;
  try {
    const castcrew = await Castcrew.findOne({ _id: id });
    if (!castcrew) {
      res.status(422).json({ message: "O filme nao foi encontrado" });
      return;
    }
    res.status(200).json({ message: "get id",  castcrew });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const Createcastcrew = async (req, res) => {
  try {
    var castcrew = new Castcrew();
    castcrew.cast = req.body.cast;
    castcrew.writer = req.body.writer;
    castcrew.director = req.body.director;
    castcrew.producers = req.body.producers;
    castcrew.save((err, doc) => {
      if (!err) {
        console.log("salvo");
        res.redirect("tablecast");
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

const listcastcrew = async (req, res) => {
  try {
    Castcrew.find().then((doc) => {
      res.render("../src/views/tablecast", {
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

const listAllcastcrew = async (req, res, next) => {
  try {
    const castJson = await Castcrew.find().then((filmes) => {
      console.log(`Total de filmes: ${filmes.length}`);
      const movies = Castcrew.find();
      return movies;
    });

    res.status(200).json(castJson);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports = {
  listAllcastcrew,
  listcastcrew,
  Createcastcrew,
  GetcastcrewById,
  Editcastcrew,
  Deletecastcrew,
};
