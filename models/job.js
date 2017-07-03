"use strict";

module.exports = function (sequelize, DataTypes) {
    var Jobs = sequelize.define("jobs", {
        title: DataTypes.STRING,
        street: DataTypes.TEXT,
        city: DataTypes.STRING,
        postalCode: DataTypes.STRING,
        startDate: DataTypes.DATEONLY,
        endDate: DataTypes.DATEONLY,
        startTime: DataTypes.TIME,
        endTime: DataTypes.TIME,
        wage: DataTypes.DECIMAL(10, 2),
        description: DataTypes.TEXT,
        postDate: DataTypes.DATEONLY,
        expiryDate: DataTypes.DATEONLY,
        status: DataTypes.BOOLEAN,
        views: DataTypes.INTEGER,
        totalPositions: DataTypes.INTEGER,
        filledPositions: DataTypes.INTEGER
    }, {
            paranoid: true,
        });

    return Jobs;
};