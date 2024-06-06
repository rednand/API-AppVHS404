require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const movieRoutes = require("../routes/MovieRoutes");
const castroutes = require("../routes/CastRoutes");

app.set("views", path.join(__dirname, "views"));
app.engine("ejs", require("ejs").renderFile)
app.set("view engine", "ejs");

mongoose.set('strictQuery', false);
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
const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT;
console.log(DB_USER, DB_PASSWORD, PORT);
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fzlwr.mongodb.net/horrormoviesapi`;
mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na em http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
