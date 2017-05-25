"use strict";

module.exports = function (sequelize, DataTypes) {
    var Employer = sequelize.define("Employer", {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
    }, {
            paranoid: true,
        });

    return Employer;
};