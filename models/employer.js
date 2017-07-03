"use strict";

module.exports = function (sequelize, DataTypes) {
    var Employers = sequelize.define("employers", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        website: DataTypes.STRING,
        street: DataTypes.TEXT,
        city: DataTypes.STRING,
        province: DataTypes.STRING,
        country: DataTypes.STRING,
        postalCode: DataTypes.STRING
    }, {
            paranoid: true,
        });

    return Employers;
};