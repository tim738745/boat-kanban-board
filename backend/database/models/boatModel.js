const mongoose = require('mongoose');
const boatSchema = require('../schemas/boatSchema.js');

const Boat = mongoose.model('Boat', boatSchema);

module.exports = Boat;