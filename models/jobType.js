"use strict"

module.exports = function(sequelize, DataTypes){
    var JobTypes = sequelize.define("jobTypes",{
        description: DataTypes.STRING,
        internalCode: DataTypes.STRING,
    },{
        paranoid: true
    });

    return JobTypes;
}