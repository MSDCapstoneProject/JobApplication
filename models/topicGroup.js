"use strict";

module.exports = function (sequelize, DataTypes) {
    var TopicGroups = sequelize.define("topicgroups", {
        description: DataTypes.STRING,
        internalCode: DataTypes.STRING
    }, {
            paranoid: true
        });

    return TopicGroups;
}