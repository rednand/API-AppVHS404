const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const movieRoutes = require("../routes/MovieRoutes");
const castroutes = require("../routes/CastRoutes");
require("dotenv").config();


app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("views"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(castroutes, movieRoutes);
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(function (req, res, next) {
  console.log(req.files); // JSON Object
  next();
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const PORT = process.env.PORT;
console.log(DB_USER, DB_PASSWORD, PORT);
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fzlwr.mongodb.net/horrormoviesapi`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
