"use strict"

module.exports = function(sequelize, DataTypes){
    var JobCategories = sequelize.define("JobCategories",{
        description: DataTypes.STRING,
        internalCode: DataTypes.STRING,
    },{
        paranoid: true
    });

    return JobCategories;
}