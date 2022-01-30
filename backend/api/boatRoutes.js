const express = require('express');
const router = express.Router();
const boatService = require('../services/boatService.js');

//endpoint to list all boats
router.get('/', function(req, res) {
  boatService.find().then(
    function(boats) {
      res.json(boats);
  }).catch(
    function(error) {
      res.json({"error":"operation failed"});
  });
});

//endpoint to get a specific boat
router.get('/:boatId', function(req, res) {
  const boatId = req.params.boatId;
  boatService.get(boatId).then(
    function(boat) {
      res.json(boat);
  }).catch(
    function(error) {
      res.json({"error":"operation failed"});
  });
});

//endpoint to save a new boat
router.post('/', function(req, res) {
  boatService.save(req.body).then(
    function(savedBoat) {
      res.json(savedBoat);
  }).catch(
    function(error) {
      res.json({"error":error});
  });
});

//endpoint to update an existing boat
router.put('/:boatId', function(req, res) {
  const boatId = req.params.boatId;
  boatService.update(boatId, req.body).then(
    function(updatedBoat) {
      res.json(updatedBoat);
  }).catch(
    function(err) {
      res.json({"error":"operation failed"});
  });
});

//endpoint to delete a boat
router.delete('/:boatId', function(req, res) {
  const boatId = req.params.boatId;
  boatService.delete(boatId).then(
    function(deletedBoat) {
      res.json(deletedBoat);
  }).catch(
    function(error) {
      res.json({"error":"operation failed"});
  });
});

module.exports = router