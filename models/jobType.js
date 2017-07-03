"use strict"

module.exports = function(sequelize, DataTypes){
    var JobTypes = sequelize.define("jobtypes",{
        description: DataTypes.STRING,
        internalCode: DataTypes.STRING,
    },{
        paranoid: true
    });

    return JobTypes;
}