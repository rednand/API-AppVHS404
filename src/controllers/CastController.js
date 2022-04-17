const CastCrew = require("../models/CastCrew");

const DeleteCastCrew = async (req, res) => {
  const id = req.params.id;
  const castcrew = await CastCrew.findOne({ _id: id });
  if (!castcrew) {
    res.status(422).json({ message: "O usuario nao foi encontrado" });
    return;
  }
  try {
    await CastCrew.deleteOne({ _id: id });
    res.redirect("exclucast");
    // res.status(200).json({ message: "Filme removido" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const EditCastCrew = async (req, res, next) => {
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
    const updatedCastCrew = await CastCrew.updateOne({ _id: id }, dados);
    if (updatedCastCrew.matchedCount === 0) {
      res.status(422).json({ message: "O filme nao foi encontrado" });
      return;
    }
    res.status(200).json({ message: "update", movies: castcrew });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const GetCastCrewById = async (req, res) => {
  const id = req.params.id;
  try {
    const castcrew = await CastCrew.findOne({ _id: id });
    if (!castcrew) {
      res.status(422).json({ message: "O filme nao foi encontrado" });
      return;
    }
    res.status(200).json({ message: "get id",  castcrew });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const CreateCastCrew = async (req, res) => {
  try {
    var castcrew = new CastCrew();
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

const listCastCrew = async (req, res) => {
  try {
    CastCrew.find().then((doc) => {
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

const listAllCastCrew = async (req, res, next) => {
  try {
    const castJson = await CastCrew.find().then((filmes) => {
      console.log(`Total de filmes: ${filmes.length}`);
      const movies = CastCrew.find();
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
  listAllCastCrew,
  listCastCrew,
  CreateCastCrew,
  GetCastCrewById,
  EditCastCrew,
  DeleteCastCrew,
};
