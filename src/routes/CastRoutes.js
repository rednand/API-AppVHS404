const express = require("express");
const routes = express.Router();
const castcrew = require("../controllers/CastController");

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

routes.get("/castdelete", (req, res) => {
  res.render("../src/views/castdelete");
});

routes.get("/totalcast", castcrew.listAllcastcrew, (req, res) => {
  res.render("postcast");
});

routes.get("/tablecast", castcrew.listcastcrew);
routes.post("/postcast", castcrew.Createcastcrew);
routes.get("/castcrew/:id", castcrew.GetcastcrewById);
routes.patch("/castcrew/:id", castcrew.Editcastcrew);
routes.delete("/:id", castcrew.Deletecastcrew);

module.exports = routes;
