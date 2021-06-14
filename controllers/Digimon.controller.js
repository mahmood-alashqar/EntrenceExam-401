const superagent = require('superagent');
const Digimon = require('../models/Digimon.model');

async function getDigimon(req, res) {
  const superApi = `https://digimon-api.vercel.app/api/digimon`;
  let returndData = [];
  superagent.get(superApi).then(data => {
    returndData = data.body.map(mapingData => {
      return new Digimon(mapingData)
    })
    res.send(returndData);
  })
}
module.exports = getDigimon;