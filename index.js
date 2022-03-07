const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./config/routes");
const app = express();
const mongoose = require("mongoose");

app.use(morgan("dev"));
//forma de ler JSON / middlewware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

const DB_USER = "rednand";
const DB_PASSWORD = "leeray10023";

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fzlwr.mongodb.net/horrormoviesapi?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Servidor rodando...");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

//porta acessada pelo servidor
