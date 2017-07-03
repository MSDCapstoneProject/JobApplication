"use strict"

module.exports = function(sequelize, DataTypes){
    var JobApplicationStatuses = sequelize.define("jobapplicationstatuses",{
        description: DataTypes.STRING,
        internalCode: DataTypes.STRING,
    },{
        paranoid: true
    });

    return JobApplicationStatuses;
}