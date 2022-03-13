const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const app = express();
const mongoose = require("mongoose");
const personRoutes = require("./routes/routes");
require("dotenv").config();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);
app.use("/person", personRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fzlwr.mongodb.net/horrormoviesapi?,
`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Servidor rodando...");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
