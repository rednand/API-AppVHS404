const express = require("express");
const routes = express.Router();
const Movie = require("../controllers/MoviesController");

routes.use(function (req, res, next) {
  // this middleware will call for each requested
  // and we checked for the requested query properties
  // if _method was existed
  // then we know, clients need to call DELETE request instead
  if (req.query._method == "DELETE") {
    // change the original METHOD
    // into DELETE method
    req.method = "DELETE";
    // and set requested url to /delete/:id
    req.url = req.path;
  } else if (req.query._method == "PATCH") {
    // change the original METHOD
    // into DELETE method
    req.method = "PATCH";
    // and set requested url to /delete/:id
    req.url = req.path;
  }
  next();
});
routes.get("/", (req, res) => {
  res.render("../src/views/form");
});
routes.get("/exclu", (req, res) => {
  res.render("../src/views/exclu");
});
routes.get("/total", Movie.listAll, (req, res) => {
  res.render("post");
});
routes.get("/table", Movie.listMovieTable);
routes.post("/post", Movie.CreateMovie);
routes.get("/edit/:id", Movie.listMovieTablebyId);
routes.get("/:id", Movie.GetMovieById);
routes.patch("/editpatch/:id", Movie.EditMovie);
routes.delete("/:id", Movie.DeleteMovie);

module.exports = routes;
