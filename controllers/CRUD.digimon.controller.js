const DigimonModel = require('../models/scema.mongoose.model');

async function postData(req, res) {
  const { name, slug, img, level } = req.body;
  DigimonModel.find({ slug: slug }, (error, data) => {
    if (error) {
      res.send(error);
    }
    else {
      const newDigimon = new DigimonModel({
        name: name,
        slug: slug,
        img: img,
        level: level

      })
      newDigimon.save();
      DigimonModel.find({}, (error, data) => { res.send(data) })
    }
  })

}

async function getFavDigimon(req, res) {
  DigimonModel.find({}, (error, data) => { res.send(data) })
}

async function deleteDigimon(req, res) {
  DigimonModel.remove({ slug: req.params.slug }, (error, data) => {
    if (error) {
      res.send(error)
    }
    else {
      DigimonModel.find({}, (error, data) => {
        res.send(data);
      })
    }
  })
}

async function updateDigimon(req, res) {
  const { name, img, level } = req.body;
  DigimonModel.findOne({ slug: req.params.slug }, (error, data) => {
    if (error) { res.send(error) }
    else {
      data.name = name;
      data.img = img;
      data.level = level;
      data.save().then(() => DigimonModel.find({}, (error, data) => res.send(data)))
    }
  })
}

module.exports = {
  postData,
  getFavDigimon,
  deleteDigimon,
  updateDigimon
}