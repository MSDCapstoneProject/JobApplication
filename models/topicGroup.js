"use strict"

module.exports = function (sequelize, DataTypes) {
    var TopicGroups = sequelize.define("TopicGroups", {
        description: DataTypes.STRING,
        internalCode: DataTypes.STRING,
    }, {
            paranoid: true
        });

    return TopicGroups;
}