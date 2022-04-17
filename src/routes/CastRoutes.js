const express = require("express");
const routes = express.Router();
const CastCrew = require("../controllers/CastController");

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
  }
  next();
});

routes.get("/cast", (req, res) => {
  res.render("../src/views/formcast");
});

routes.get("/exclu", (req, res) => {
  res.render("../src/views/exclucast");
});

routes.get("/totalcast", CastCrew.listAllCastCrew, (req, res) => {
  res.render("postcast");
});

routes.get("/tablecast", CastCrew.listCastCrew);
routes.post("/postcast", CastCrew.CreateCastCrew);
routes.get("/castcrew/:id", CastCrew.GetCastCrewById);
routes.patch("/castcrew/:id", CastCrew.EditCastCrew);
routes.delete("/castcrew/:id", CastCrew.DeleteCastCrew);

module.exports = routes;
