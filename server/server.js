const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const routes = require("../routes/routes");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const movieRoutes = require("../routes/routes");

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use("/movies", movieRoutes);
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


mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fzlwr.mongodb.net/horrormoviesapi
`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.info("Servidor rodando...");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
