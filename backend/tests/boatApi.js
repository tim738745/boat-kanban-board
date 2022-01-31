const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('../config.js');
const connectionString = config.envDBConnectionString;
const port = config.envPort;
const chai = require('chai');
const chaiHttp = require('chai-http');

//read incoming request json bodies into req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//boat routes
const boats = require('../api/boatRoutes.js');
app.use('/boats', boats);

const should = chai.should();
chai.use(chaiHttp);

const boat1 = {
    swimLane: "Docked",
    name: "Queen Mary"
};

const boat2 = {
    swimLane: "Docked",
    name: "HMS Dreadnought"
}

let boatId1 = -1;
let boatId2 = -1;

app.listen(port, () => {

    describe('connect to db', () => {
        it("it should connect to the database", (done) => {
            mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }).then(
                () => {done()}
            );
        });
    });

    describe('save boat1', () => {
        it("it should save a new boat", (done) => {
            chai.request(app).post("/boats").send(boat1).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('swimLane').eql(boat1.swimLane);
                res.body.should.have.property('name').eql(boat1.name);
                res.body.should.have.property('_id');
                boatId1 = res.body._id;
                done();
            });
        });
    });
    
    describe('save boat2', () => {
        it("it should save another boat", (done) => {
            chai.request(app).post("/boats").send(boat2).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('swimLane').eql(boat2.swimLane);
                res.body.should.have.property('name').eql(boat2.name);
                res.body.should.have.property('_id');
                boatId2 = res.body._id;
                done();
            });
        });
    });
    
    describe("get all boats", () => {
        it("it should get all boats, and there should be at least two of them", (done) => {
            chai.request(app).get("/boats").end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.least(2);
                done();
            });
        })
    });
    
    describe('get boat1', () => {
        it("it should get the first saved boat", (done) => {
            chai.request(app).get("/boats/" + boatId1).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id').eql(boatId1);
                done();
            });
        });
    });
    
    describe('get boat2', () => {
        it("it should get the second saved boat", (done) => {
            chai.request(app).get("/boats/" + boatId2).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id').eql(boatId2);
                done();
            });
        });
    });
    
    describe("update boat1's swim lane", () => {
        it("it should update boat1's swim lane to 'Inbound to Harbour'", (done) => {
            const newSwimLane = "Inbound to Harbour"
            chai.request(app).put("/boats/" + boatId1).send({swimLane: newSwimLane}).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('swimLane').eql(newSwimLane);
                done();
            });
        });
    });
    
    describe("delete boat1", () => {
        it("it should delete boat1", (done) => {
            chai.request(app).delete("/boats/" + boatId1).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id').eql(boatId1);
                done();
            });
        });
    });
});