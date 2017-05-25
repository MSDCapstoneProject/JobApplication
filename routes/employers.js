/*
 * GET employers listing.
 */

//var db = require('/models');

var db = require('../models');

var status = require('./resStatus');

exports.list = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM employers', function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
            res.render('employers', { page_title: "Employers Information", data: rows });
        });
    });
};

exports.add = function (req, res) {
    res.render('add_employers', { page_title: "Add Employer" });
};

/*Save the customer*/
exports.save = function (req, res) {
    var postData = req.body;

    if (postData.method == "add_candidate") {
        console.log("reached here");
    }

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone

        };

        var query = connection.query("INSERT INTO employers set ? ", data, function (err, rows) {

            if (err)
                console.log("Error inserting : %s ", err);

            res.redirect('/employers');

        });

        // console.log(query.sql); get raw query

    });
};


exports.search = function (req, res) {
    var postData = req.body;

    if (postData.method == "employerSearch") {
        var response = {};
        Promise.resolve()
            .then(function () {
                return db.Employer.findAll({
                    where: {name:  { $like: "%"+postData.name+"%" } }
                })
                //return db.sequelize.query("select * from employers where name like '%samsung%'");
            })
            .then(function (employers) {
                response.employee = [];
                employers.forEach(function(employee) {
                 response.employee.push(employee.dataValues);   
                });
                response.status = status.SUCCESS;
                res.json({ response });
            })
            .catch(function (err) {
                console.log('Error at employerSearch ' + err);
            })
    }
}



