const express = require("express");
const { route } = require("express/lib/application");
const req = require("express/lib/request");
const routes = express.Router();
const Person = require("../models/Person");

routes.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatório" });
    return;
  }
  const person = {
    name,
    salary,
    approved,
  };
  //create mongoose
  try {
    await Person.create(person);

    res.status(201).json({ message: "inserido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// routes.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   let newDB = filmes.filter((item) => {
//     if (!item.id) return item;
//   });

//   filmes = newDB;

//   return res.send(newDB);
// });

routes.get("/person", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.get("/:id", async (req, res) => {
  console.log(req);
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ message: "O usuario nao foi encontrado" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res
        .status(422)
        .json({ message: "O usuario nao foi encontrado para edição" });
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

routes.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ message: "O usuario nao foi encontrado" });
    return;
  }
  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: "Usuario removido" });

  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = routes;
