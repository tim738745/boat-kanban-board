const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
  swimLane: {type: String, required: true},
  name: {type: String, required: true}
});

module.exports = boatSchema;