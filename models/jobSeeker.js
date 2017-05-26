"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobSeeker = sequelize.define("JobSeeker", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        sin: DataTypes.STRING,
        DOB: DataTypes.DATE,
        status: DataTypes.STRING,
        gender: DataTypes.STRING
    }, {
            paranoid: true,
        });

    return JobSeeker;
};



