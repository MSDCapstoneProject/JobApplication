"use strict";

module.exports = function (sequelize, DataTypes) {
    var JobRatings = sequelize.define("jobRatings", {
        status: DataTypes.INTEGER
    }, {
            paranoid: true
        });
        
        return JobRatings;
} 