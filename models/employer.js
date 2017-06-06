"use strict";

module.exports = function (sequelize, DataTypes) {
    var Employers = sequelize.define("Employers", {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        website: DataTypes.STRING
    }, {
            paranoid: true,
        });

    return Employers;
};