"use strict";

var fs = require('fs');
var path = require('path');
var Sequelize = require('Sequelize');
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

function getInitRefPromises() {
    var i = 0;
    var keys = Object.keys(db);
    var promises = [];
    while (i < keys.length) {
        var modelName = keys[i++];
        if ("initialize" in db[modelName]) {
            promises.push(db[modelName].initialize(db));
        }
    }
    return promises;
}

function getGenEnumPromises() {
    var i = 0;
    var keys = Object.keys(db);
    var promises = [];
    while (i < keys.length) {
        var modelName = keys[i++];
        if ("genEnum" in db[modelName]) {
            promises.push(db[modelName].genEnum(db));
        }
    }
    return promises;
}

function getModels() {
    //load all the models
    //this walks all the files in the current directory and assumes that anything that's not index.js (this file)
    //is a description of a database model and imports it so sequelize can create a model object
    //store the model object in an array
    fs
        .readdirSync(__dirname)
        .filter(function (file) {
            return (file.indexOf(".") !== 0) && (file !== "index.js");
        })
        .forEach(function (file) {
            var model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });
}

function createAssociations() {
    //create the foreign key associations
    Object.keys(db).forEach(function (modelName) {
        if ("associate" in db[modelName]) {
            db[modelName].associate(db);
        }
    });
}

db.init = new Promise(function (res, rej) {
    getModels();
    createAssociations();
    sequelize
        //verify a connection to the database
        .authenticate()
        //create the tables as described by the model
        .then(function (err) {
            return sequelize.sync({ force: config.forceUpdate }); //table rebuild option
        })
        //populate the reference data
        .then(function () {
            return Promise.all(getInitRefPromises());
        })
        //read the reference data to create enums
        .then(function () {
            
            return Promise.all(getGenEnumPromises());
        })
        //remember some things for later
        .then(function () {
            return Promise.resolve()
                .then(function () {
                    db.sequelize = sequelize;
                    db.Sequelize = Sequelize;
                });
        })
        //in case of error
        .catch(function (err) {
            console.log(err);
        });
});

//export this object
module.exports = db;