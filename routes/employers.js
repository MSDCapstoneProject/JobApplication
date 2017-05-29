/*
 * GET employers.
 */

var db = require("../models");
var status = require("./resStatus");

var routes = {};

function get(req, res) {
    var employerId = req.query.id || null;

    Promise.resolve()
        .then(function () {
            if (employerId) {
                return db.Employer.findAll({ where: { id: employerId } }); //if id is present
            } else {
                return db.Employer.findAll(); //if id is not present
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

function post(req, res) {
    var postData = req.query.method ? req.query : req.body;
    var response = {};

    if (postData.method == "searchEmployer") {
        response = {};
        Promise.resolve()
            .then(function () {
                return db.Employer.findAll({
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
    else if (postData.method == "saveEmployer") {
        response = {};

        // building json for insert
        var entry = {
            name: postData.name,
            address: postData.address,
            email: postData.email,
            phone: postData.phone,
            website: postData.website || null
        };

        Promise.resolve()
            .then(function () {
                return db.Employer.create(entry);   //create a record
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
    } else if (postData.method == "editEmployer") {
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
                return db.Employer.update(entry, { where: { id: postData.id } }); //update a record with post request id
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
    } else if (postData.method == "deleteEmployer") {
        response = {};
        Promise.resolve()
            .then(function () {
                return db.Employer.destroy({ where: { id: postData.id } }); //delete a record with post request id
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


routes.get = get;
routes.post = post;
module.exports = routes;
