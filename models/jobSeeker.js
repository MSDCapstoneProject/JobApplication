"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobSeekers = sequelize.define("jobSeekers", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        street: DataTypes.TEXT,
        city: DataTypes.STRING,
        province: DataTypes.STRING,
        country: DataTypes.STRING,
        postalCode: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        sin: DataTypes.STRING,
        DOB: DataTypes.DATEONLY,
        status: DataTypes.STRING,
        gender: DataTypes.STRING,
    }, {
            paranoid: true
        });

    return JobSeekers;
};