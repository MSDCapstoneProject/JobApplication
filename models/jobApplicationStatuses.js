"use strict"

module.exports = function(sequelize, DataTypes){
    var JobApplicationStatuses = sequelize.define("jobApplicationStatuses",{
        description: DataTypes.STRING,
        internalCode: DataTypes.STRING,
    },{
        paranoid: true
    });

    return JobApplicationStatuses;
}