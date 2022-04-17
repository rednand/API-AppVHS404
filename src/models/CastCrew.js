const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const castCrewSchema = new Schema({
  id: String,
  cast: { type: new Array(), required: true },
  writer: String,
  director: String,
  producers: new Array(),
});

module.exports = mongoose.model("CastCrew", castCrewSchema);
