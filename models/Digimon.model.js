'use strict'
class Digimon {
  constructor(data) {
    this.name = data.name;
    this.img = data.img;
    this.level = data.level
    this.slug = data.name.toLowerCase().split(' ').join('-');
  }
}
module.exports = Digimon;
