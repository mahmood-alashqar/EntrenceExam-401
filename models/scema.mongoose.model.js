const mongoose = require('mongoose');

const digimonSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    tolowercase: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    tolowercase: true,
    trim: true
  },
  img: String,
  level: String
})
const digimonModel = new mongoose.model('digimon', digimonSchema);
module.exports = digimonModel;
