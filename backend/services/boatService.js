const Boat = require('../database/models/boatModel.js');

//returns a promise such that, if resolved, returns all boats
function findBoats() {
  return Boat.find();
}

//returns a promise such that, if resolved, returns the requested boat
function getBoat(id) {
  return Boat.findById(id);
}

//returns a promise such that, if resolved, saves the boat and returns the saved boat
function saveBoat(params) {
  const boat = new Boat(params);
  return boat.save();
}

//returns a promise such that, if resolved, updates the specified boat and returns the updated boat
function updateBoat(id, params) {
  return Boat.findOneAndUpdate({_id:id}, params, {new:true});
}

//returns a promise such that, if resolved, deletes the specified boat and returns the deleted boat
function deleteBoat(id) {
  return Boat.findOneAndDelete({_id:id});
}

const boatServicesExport = {
  find: findBoats,
  get: getBoat,
  save: saveBoat,
  update: updateBoat,
  delete: deleteBoat
}

module.exports = boatServicesExport;