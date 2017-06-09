/*
 * GET employers.
 */

var db = require("../models");
var status = require("./resStatus");

var routes = {};
var method;

exports.list = function (req, res) {

    var employerId = req.query.id || req.params.id;;

    Promise.resolve()
        .then(function () {
            if (employerId) {
                return db.Employers.findAll({
                    attributes: ['id', 'name', 'address', 'email', 'website'],
                    where: { id: employerId }
                }); //if id is present
            } else {
                return db.Employers.findAll({ attributes: ['id', 'name', 'address', 'email', 'website'] }); //if id is not present
            }
        })
        .then(function (employers) {
            if (employers) {
                //res.render("employers", { page_title: "Job Bridge - Employers", data: employers });
                res.json(employers);
            }
        })
        .catch(function (err) {
            console.log("Error at Employer get request" + err);
        })
}

/*
 * Post employers.
 */

exports.add = function (req, res) {
    method = "saveEmployer";
    post(req, res, method);
}

exports.update = function (req, res) {
    method = "editEmployer";
    post(req, res, method);
}

exports.delete = function (req, res) {
    method = "deleteEmployer";
    post(req, res, method);
}


function post(req, res, method) {
    var postData = Object.keys(req.query).length !== 0 ? req.query : Object.keys(req.body).length !== 0 ? req.body : null;
    

    var response = {};

    if (method == "searchEmployer") {
        response = {};
        Promise.resolve()
            .then(function () {
                return db.Employers.findAll({
                    attributes: ['id', 'name', 'address', 'email', 'website'],
                    where: { name: { $like: "%" + postData.name + "%" } }
                }); //currently searching only through name
            })
            .then(function (employers) {
                if (employers) {
                    response.employee = [];
                    employers.forEach(function (employee) {
                        response.employee.push(employee.dataValues);
                    });
                }
                response.status = status.SUCCESS;
                res.json({ response });
            })
            .catch(function (err) {
                console.log("Error at searchEmployer " + err);
            })
    }
    else if (method == "saveEmployer") {
        response = {};

        // building json for insert
        var entry = {
            name: postData.name,
            address: postData.address,
            email: postData.email,
            phone: postData.phone,
            website: postData.website || null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        Promise.resolve()
            .then(function () {
                return db.Employers.create(entry);   //create a record
            })
            .then(function (employers) {
                if (employers) {
                    response.name = employers.name;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at saveEmployer " + err);
                res.json({ status: status.EXCEPTION });
            })
    } else if (method == "editEmployer") {
        response = {};

        //create a json
        var entry = {
            name: postData.name,
            address: postData.address,
            email: postData.email,
            phone: postData.phone,
            website: postData.website || null,
            updatedAt: new Date()
        }

        Promise.resolve()
            .then(function () {
                return db.Employers.update(entry, { where: { id: postData.id } }); //update a record with post request id
            })
            .then(function (employers) {
                if (employers) {
                    response.name = postData.name;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at editEmployer " + err);
                res.json({ status: status.EXCEPTION });
            })
    } else if (method == "deleteEmployer") {
        response = {};
        Promise.resolve()
            .then(function () {
                return db.Employers.destroy({ where: { id: postData.id } }); //delete a record with post request id
            })
            .then(function (employers) {
                if (employers) {
                    response.name = postData.name;
                }
                response.status = status.SUCCESS;
                res.json(response);
            })
            .catch(function (err) {
                console.log("Error at deleteEmployer " + err);
                res.json({ status: status.EXCEPTION });
            })
    }
}
