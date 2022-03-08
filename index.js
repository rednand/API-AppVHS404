const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(morgan("dev"));
//forma de ler JSON / middlewware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

const personRoutes = require("./routes/routes");

app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Ola express" });
});

//colocar no .env local/work
//DB_USER=rednand
//DB_PASSWORD=leeray10023
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fzlwr.mongodb.net/horrormoviesapi?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Servidor rodando...");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
